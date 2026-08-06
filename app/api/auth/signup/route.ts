/**
 * Step 103: Sign-Up & Agency Onboarding API
 * POST /api/auth/signup { agencyName, agencyEmail, adminName, adminEmail, password }
 */

import { NextRequest, NextResponse } from "next/server";
import { hashPassword, isStrongPassword } from "@/lib/auth/password";
import { generateVerificationToken } from "@/lib/auth/verification";
import { rateLimit, RATE_LIMITS } from "@/lib/auth/rate-limiter";
import { auditAuthEvent } from "@/lib/auth/audit";
import { prisma } from "@/lib/db/prisma";

export async function POST(req: NextRequest) {
  const ip = req.ip || req.headers.get("x-forwarded-for") || "127.0.0.1";
  const body = await req.json().catch(() => ({}));

  const { agencyName, agencyEmail, adminName, adminEmail, password, slug } = body;

  if (!agencyName || !agencyEmail || !adminName || !adminEmail || !password) {
    return NextResponse.json({ error: "All fields required: agencyName, agencyEmail, adminName, adminEmail, password" }, { status: 400 });
  }

  const rl = rateLimit(`signup:${ip}`, RATE_LIMITS.auth.limit, RATE_LIMITS.auth.windowMs);
  if (!rl.allowed) return NextResponse.json({ error: "Too many signups" }, { status: 429 });

  const pwCheck = isStrongPassword(password);
  if (!pwCheck.ok) return NextResponse.json({ error: pwCheck.reason }, { status: 400 });

  try {
    // Check existing agency
    const existingAgency = await prisma.agency.findFirst({ where: { OR: [{ email: agencyEmail }, { slug: slug || agencyName.toLowerCase().replace(/\s+/g, "-") }] } });
    if (existingAgency) return NextResponse.json({ error: "Agency already exists" }, { status: 409 });

    const existingUser = await prisma.user.findFirst({ where: { OR: [{ email: adminEmail }, { username: adminEmail }] } });
    if (existingUser) return NextResponse.json({ error: "User already exists" }, { status: 409 });

    const agency = await prisma.agency.create({
      data: {
        name: agencyName,
        slug: slug || agencyName.toLowerCase().replace(/\s+/g, "-") + "-" + Date.now().toString(36).slice(2, 5),
        email: agencyEmail,
        isActive: true,
      },
    });

    await prisma.agencySettings.create({
      data: { agencyId: agency.id },
    });

    const agencyAdminRole = await prisma.role.findUnique({ where: { name: "agency_admin" } });
    if (!agencyAdminRole) throw new Error("agency_admin role not found - run seed");

    const passwordHash = hashPassword(password);
    const user = await prisma.user.create({
      data: {
        username: adminEmail.split("@")[0]!,
        email: adminEmail,
        passwordHash,
        fullName: adminName,
        agencyId: agency.id,
        roleId: agencyAdminRole.id,
        roleType: "agency_admin",
        isActive: true,
      },
    });

    // Verification link (Step 127)
    const { link } = generateVerificationToken(adminEmail);
    // In prod: send email via Resend
    console.log(`[ONBOARDING] Agency ${agency.name} created, verify: ${link}`);

    auditAuthEvent({ event: "SIGNUP_SUCCESS", username: user.username, userId: user.id, ip: String(ip) });

    return NextResponse.json({ success: true, agencyId: agency.id, userId: user.id, verificationLink: link });
  } catch (e) {
    // Fallback mock if no DB
    if ((e as Error).message.includes("Can't reach database")) {
      const mockAgencyId = `agency_mock_${Date.now()}`;
      const { link } = generateVerificationToken(adminEmail);
      auditAuthEvent({ event: "SIGNUP_SUCCESS", username: adminEmail, ip: String(ip), details: { mock: true } });
      return NextResponse.json({ success: true, agencyId: mockAgencyId, mock: true, verificationLink: link });
    }
    console.error(e);
    return NextResponse.json({ error: "Signup failed", details: (e as Error).message }, { status: 500 });
  }
}
