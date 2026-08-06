# Changelog
All notable changes to `manpower-agency-saas` follow **International Version Control System (IVCS)** - SemVer 2.0.0 + Keep a Changelog.

Format: `vMAJOR.MINOR.PATCH+BUILD` | Date: ISO 8601 (YYYY-MM-DD) | Language: EN/BN

## [v1.9.0] - 2026-08-07
### Phase 10 (Steps 211-230) - Payroll & Client Invoicing
**Build:** `20260807-2667543` | **Author:** iNAYATechLab Inc. (Samiullah Pk) | **Steps:** 211-230 (20 steps)

#### Added
- **211:** Approved Timesheet → Payroll Engine (`lib/payroll/engine.ts` - generatePayrollFromTimesheet)
- **212:** Basic Salary Calculator (`lib/payroll/calculator.ts` - regularHours × payRate)
- **213:** Overtime Pay Calculation (overtimeHours × otRate)
- **214:** Advance Loan & Deduction Cutting Logic (deductions + advanceCut)
- **215:** Net Payable Success Logic (gross - totalDeductions)
- **216:** Bulk Payroll Processing Service (`generateBulkPayroll` + `calculateBulkTotals`)
- **217:** Individual PDF Pay-slip Generator (`lib/payroll/payslip.ts` - generatePayslipPDF)
- **218:** Pay-slip Template Design (HTML branded #1D0B2E/#E5B84B, table, net payable)
- **219:** Bank Disbursement CSV/Excel Generator (`lib/payroll/bank-export.ts` - generateBankCSV)
- **220:** Worker Portal Pay-slip Download (`app/worker/payslips/page.tsx` - 3 payslips, download)
- **221:** Client Invoice Generator Engine (`lib/invoicing/engine.ts` - generateInvoice)
- **222:** Billing Hours × Client Rate Logic (`lib/invoicing/calculations.ts` - subtotal)
- **223:** VAT/Tax Field (vatPercent 15%)
- **224:** Service Charge & Commission Calculator (serviceChargePercent 5%)
- **225:** Multi-Currency Conversion Service (`lib/invoicing/currency.ts` - USD/SAR/BDT/EUR, convertCurrency)
- **226:** Real-time Exchange Rate API (`fetchRealTimeRate` mock, 100ms, convertWithRealTimeRate)
- **227:** Branded Professional PDF Invoice Design (`components/invoicing/invoice-pdf.tsx` - #1D0B2E header, table)
- **228:** Invoice Auto-Email Service (`lib/invoicing/email.ts` - sendInvoiceEmail to hr@neom.com)
- **229:** Payment Status Tracker (`lib/invoicing/status.ts` - unpaid/paid/partial/overdue, trackInvoiceStatus)
- **230:** Stripe/PayPal Payment Gateway Backend Link (`lib/invoicing/payment-gateway.ts` - generatePaymentLink)

#### Routes
- `/agency/payroll` — Payroll Generation (211, 216, 219) + Payslip PDF (217-218) + Bank CSV (219)
- `/worker/payslips` — Worker Portal (220)
- `/agency/invoices` — Invoicing (221-230) + Multi-Currency (225-226) + PDF (227) + Email (228) + Status (229) + Stripe/PayPal (230)

#### Verified
- `npm run build` ✓ 26 routes (3 payroll/invoice routes + 23 previous + middleware 28.7 kB)
- Gift: https://github.com/iNAYATechLab/manpower-agency

---

## [v1.8.0] - 2026-08-07
### Phase 9 (Steps 191-210) - Timesheet & Overtime Automation
**Build:** `20260807-2667543` | **Author:** iNAYATechLab Inc. (Samiullah Pk) | **Steps:** 191-210 (20 steps)

#### Added
- **191-210:** Daily Shift Table, Weekly Roster, Hourly Grid, Worker Entry, Bulk Entry, OT Fields, 1.5x/2.0x Multiplier, Night Allowance, Hazard Pay, GPS Validation, Geofencing Radius, Holiday Override, Edit History, Dispute System, Submission Workflow, Client Pending List, Bulk Approve, Rejection Flow, Digital Signature, Locked Status

---

## [v1.7.0] - 2026-08-07
### Phase 8 (Steps 171-190) - Client & Contact Management
**Build:** `20260807-d091f2c` | **Author:** iNAYATechLab Inc. (Samiullah Pk) | **Steps:** 171-190 (20 steps)

---

## [v1.6.0] - 2026-08-07
### Phase 7 (Steps 151-170) - Worker Onboarding & Skill Directory
**Build:** `20260807-c6ee6bb` | **Author:** iNAYATechLab Inc. (Samiullah Pk) | **Steps:** 151-170 (20 steps)

---

## [v1.5.0] - 2026-08-07
### Phase 6 (Steps 131-150) - Main Dashboard & Navigation UI
**Build:** `20260807-53974f9` | **Author:** iNAYATechLab Inc. (Samiullah Pk) | **Steps:** 131-150 (20 steps)

---

## [v1.4.0] - 2026-08-07
### Phase 5 (Steps 101-130) - Authentication & 2FA Security
**Build:** `20260807-7681c7e` | **Author:** iNAYATechLab Inc. (Samiullah Pk) | **Steps:** 101-130 (30 steps)

---

## [v1.3.0] - 2026-08-07
### Phase 4 (Steps 71-100) - Security, RLS & Data Isolation
**Build:** `20260807-736b6e7` | **Author:** iNAYATechLab Inc. (Samiullah Pk) | **Steps:** 71-100 (30 steps)

---

## [v1.2.0] - 2026-08-07
### Phase 3 (Steps 41-70) - Multi-Tenant Database Schema & Relations
**Build:** `20260807-736b6e7` | **Author:** iNAYATechLab Inc. (Samiullah Pk) | **Steps:** 41-70 (30 tables)

---

## [v1.1.0] - 2026-08-07
### Phase 2 (Steps 21-40) - Super Admin & Company Backbone
**Build:** `20260807-3f777a7` | **Author:** iNAYATechLab Inc. (Samiullah Pk) | **Steps:** 21-40 (20 steps)

---

## [v1.0.0] - 2026-08-07
### Phase 1 (Steps 1-20) - Foundation
**Build:** `20260807-c18d3ee` | **Author:** iNAYATechLab Inc. (Samiullah Pk)

---

## Unreleased
### [v2.0.0] - Phase 11 (Steps 231-260) - Planned
- Compliance, Document Storage & Expiry Alerts

---

**IVCS Rules:** MAJOR=Architecture, MINOR=Phase (20 steps), PATCH=Hotfix, BUILD=YYYYMMDD-hash. Tag: `v*` annotated. Branch: `main` stable.
