/**
 * Steps 89-90: Seed Data Script + Test Agency & Dummy Workers
 * Run: npx prisma db seed  or  npx tsx prisma/seed.ts
 */

import { PrismaClient, RoleType, WorkerStatus, SkillGrade } from "@prisma/client";
import { randomBytes } from "crypto";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding iNAYATechLab Manpower SaaS...");

  // Clean existing (for re-seed)
  // await prisma.worker.deleteMany(); // etc.

  // === Roles (Step 44) ===
  const roles = await Promise.all(
    [
      { name: RoleType.super_admin, displayName: "Super Admin", description: "CEO Samiullah Pk - Unrestricted" },
      { name: RoleType.agency_admin, displayName: "Agency Admin", description: "Agency owner" },
      { name: RoleType.client, displayName: "Client", description: "Foreign employer" },
      { name: RoleType.field_supervisor, displayName: "Field Supervisor", description: "On-site supervisor" },
      { name: RoleType.worker, displayName: "Worker", description: "Deployed worker" },
    ].map((r) =>
      prisma.role.upsert({
        where: { name: r.name },
        update: {},
        create: { name: r.name, displayName: r.displayName, description: r.description },
      })
    )
  );
  console.log(`✓ Roles: ${roles.length}`);

  // === Permissions (Step 44) ===
  const permKeys = ["*", "workers:read", "workers:write", "clients:read", "payroll:read", "invoices:read"];
  for (const key of permKeys) {
    await prisma.permission.upsert({
      where: { key },
      update: {},
      create: { key, name: key, category: key.split(":")[0] || "system" },
    });
  }
  console.log("✓ Permissions");

  // === Agency (Test Agency - Step 90) ===
  const agency = await prisma.agency.upsert({
    where: { slug: "test-agency" },
    update: {},
    create: {
      name: "Test Agency Co.",
      slug: "test-agency",
      email: "test@agency.com",
      phone: "+966500000001",
      country: "SA",
      isActive: true,
    },
  });
  console.log(`✓ Agency: ${agency.name} (${agency.id})`);

  // Agency Settings (Step 43)
  await prisma.agencySettings.upsert({
    where: { agencyId: agency.id },
    update: {},
    create: {
      agencyId: agency.id,
      primaryColor: "#1D0B2E",
      secondaryColor: "#2A1143",
      defaultCurrency: "SAR",
      supportedCurrencies: ["USD", "SAR", "BDT"],
    },
  });

  // === CEO Super Admin (Step 21) ===
  const superAdminRole = roles.find((r) => r.name === RoleType.super_admin)!;
  const ceo = await prisma.user.upsert({
    where: { username: "CEO" },
    update: {},
    create: {
      username: "CEO",
      email: "iNAYATechLab@gmail.com",
      passwordHash: "$2b$10$CEO_HASHED_PASSWORD_PLACEHOLDER",
      fullName: "Samiullah Pk",
      roleId: superAdminRole.id,
      roleType: RoleType.super_admin,
      isSuperAdmin: true,
      isNonDeletable: true,
      isActive: true,
      agencyId: null, // Global
    },
  });
  console.log(`✓ CEO: ${ceo.username} (${ceo.id})`);

  // === Departments & Designations (47-48) ===
  const dept = await prisma.department.create({
    data: { agencyId: agency.id, name: "Construction", code: "DEPT-001" },
  });
  const desg = await prisma.designation.create({
    data: { agencyId: agency.id, departmentId: dept.id, title: "Welder", level: "Senior" },
  });

  // === Skills (49-50) ===
  const cat = await prisma.skillCategory.create({ data: { name: "Construction", description: "Construction skills" } });
  const skill = await prisma.skill.create({ data: { categoryId: cat.id, name: "Welder", code: "WELD" } });
  console.log(`✓ Skills: ${skill.name}`);

  // === Dummy Workers (Step 90) - 5 workers ===
  const workerNames = ["Abdul Karim", "Mohammad Ali", "Rahim Uddin", "Karim Mia", "Jamal Hossain"];
  for (let i = 0; i < 5; i++) {
    const code = `WRK-2026-${String(i + 1).padStart(3, "0")}`;
    const worker = await prisma.worker.create({
      data: {
        agencyId: agency.id,
        workerCode: code,
        fullName: workerNames[i]!,
        nationality: "Bangladeshi",
        country: "SA",
        phone: `+88017000000${i}1`,
        passportNumber: `PP${randomBytes(3).toString("hex").toUpperCase()}${i}`,
        passportExpiry: new Date("2028-12-31"),
        status: WorkerStatus.available,
        grade: SkillGrade.A,
        departmentId: dept.id,
        designationId: desg.id,
      },
    });
    await prisma.workerSkill.create({
      data: { workerId: worker.id, skillId: skill.id, grade: SkillGrade.A, years: 5 + i },
    });
    // Contact
    await prisma.workerContact.create({
      data: { workerId: worker.id, name: `Emergency ${i + 1}`, phone: `+88018000000${i}1`, isPrimary: true },
    });
    // Document
    await prisma.workerDocument.create({
      data: { workerId: worker.id, title: "Passport", type: "passport", fileUrl: `https://storage.inayatechlab.com/workers/${worker.id}/passport.pdf`, expiryDate: new Date("2028-12-31") },
    });
  }
  console.log("✓ Dummy Workers: 5");

  // === Client & Job Site (55-57) ===
  const client = await prisma.client.create({
    data: { agencyId: agency.id, companyName: "NEOM Construction Co.", companyCode: "NEOM-001", country: "SA", email: "hr@neom.com" },
  });
  const site = await prisma.jobSite.create({
    data: { agencyId: agency.id, clientId: client.id, name: "NEOM Site A", code: "NEOM-A", city: "Tabuk", country: "SA", latitude: 28.0, longitude: 35.0 },
  });
  console.log(`✓ Client & Site: ${client.companyName} / ${site.name}`);

  // === Contract & Demand (58-59) ===
  const contract = await prisma.contract.create({
    data: {
      agencyId: agency.id,
      clientId: client.id,
      contractNumber: `CTR-${Date.now()}`,
      title: "NEOM Welders Contract",
      startDate: new Date("2026-09-01"),
      endDate: new Date("2027-08-31"),
      status: "active",
      totalValue: 500000,
      currency: "SAR",
    },
  });
  await prisma.jobDemand.create({
    data: {
      agencyId: agency.id,
      clientId: client.id,
      jobSiteId: site.id,
      contractId: contract.id,
      title: "50 Welders for NEOM",
      quantity: 50,
      billingRate: 25,
      payRate: 18,
      profitMargin: 7,
      requiredGrade: SkillGrade.A,
    },
  });
  console.log("✓ Contract & Demand");

  console.log("✅ Seed completed - Test Agency + 5 Workers + Client/Site Ready");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
