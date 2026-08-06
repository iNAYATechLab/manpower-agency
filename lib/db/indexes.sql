-- Steps 83-86: Indexes & Constraints
-- iNAYATechLab Inc. - Manpower SaaS

-- ========== 83. agency_id FK indexes (for RLS performance) ==========
CREATE INDEX IF NOT EXISTS idx_users_agency_id ON users(agency_id);
CREATE INDEX IF NOT EXISTS idx_workers_agency_id ON workers(agency_id);
CREATE INDEX IF NOT EXISTS idx_clients_agency_id ON clients(agency_id);
CREATE INDEX IF NOT EXISTS idx_job_sites_agency_id ON job_sites(agency_id);
CREATE INDEX IF NOT EXISTS idx_contracts_agency_id ON contracts(agency_id);
CREATE INDEX IF NOT EXISTS idx_job_demands_agency_id ON job_demands(agency_id);
CREATE INDEX IF NOT EXISTS idx_worker_deployments_agency_id ON worker_deployments(agency_id);
CREATE INDEX IF NOT EXISTS idx_timesheets_agency_id ON timesheets(agency_id);
CREATE INDEX IF NOT EXISTS idx_payrolls_agency_id ON payrolls(agency_id);
CREATE INDEX IF NOT EXISTS idx_invoices_agency_id ON invoices(agency_id);
CREATE INDEX IF NOT EXISTS idx_departments_agency_id ON departments(agency_id);
CREATE INDEX IF NOT EXISTS idx_designations_agency_id ON designations(agency_id);

-- ========== 84. Unique indexes for email & username ==========
CREATE UNIQUE INDEX IF NOT EXISTS idx_users_email_unique ON users(email);
CREATE UNIQUE INDEX IF NOT EXISTS idx_users_username_unique ON users(username);
CREATE UNIQUE INDEX IF NOT EXISTS idx_agencies_email_unique ON agencies(email);
CREATE UNIQUE INDEX IF NOT EXISTS idx_agencies_slug_unique ON agencies(slug);
CREATE UNIQUE INDEX IF NOT EXISTS idx_roles_name_unique ON roles(name);

-- ========== 85. Duplicate checking indexes for passport & NID ==========
CREATE UNIQUE INDEX IF NOT EXISTS idx_workers_passport_unique ON workers(passport_number) WHERE passport_number IS NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS idx_workers_email_unique ON workers(email) WHERE email IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_workers_passport_expiry ON workers(passport_expiry);
CREATE INDEX IF NOT EXISTS idx_workers_akama_expiry ON workers(akama_expiry);
CREATE INDEX IF NOT EXISTS idx_workers_work_permit_expiry ON workers(work_permit_expiry);
CREATE INDEX IF NOT EXISTS idx_workers_medical_expiry ON workers(medical_expiry);
-- Composite duplicate check: agency + passport
CREATE UNIQUE INDEX IF NOT EXISTS idx_workers_agency_passport ON workers(agency_id, passport_number) WHERE passport_number IS NOT NULL;

-- ========== 92. Slow-query tracking indexes ==========
CREATE INDEX IF NOT EXISTS idx_workers_status ON workers(status);
CREATE INDEX IF NOT EXISTS idx_workers_blacklisted ON workers(is_blacklisted);
CREATE INDEX IF NOT EXISTS idx_timesheets_status ON timesheets(status);
CREATE INDEX IF NOT EXISTS idx_payrolls_status ON payrolls(status);
CREATE INDEX IF NOT EXISTS idx_invoices_status ON invoices(status);
CREATE INDEX IF NOT EXISTS idx_audit_logs_timestamp ON audit_logs(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_audit_logs_username ON audit_logs(username);
CREATE INDEX IF NOT EXISTS idx_job_demands_status ON job_demands(status);
CREATE INDEX IF NOT EXISTS idx_worker_deployments_status ON worker_deployments(status);
CREATE INDEX IF NOT EXISTS idx_clients_country ON clients(country);
CREATE INDEX IF NOT EXISTS idx_job_sites_client ON job_sites(client_id);
CREATE INDEX IF NOT EXISTS idx_timesheet_entries_worker_date ON timesheet_entries(worker_id, date);

-- ========== 86. Primary Key & Cascade Delete (already in Prisma, here for reference) ==========
-- All tables use cuid() PK, FKs have ON DELETE CASCADE where agency is parent
-- Example: FOREIGN KEY (agency_id) REFERENCES agencies(id) ON DELETE CASCADE

-- Slow query log helper (for Step 91-92)
-- Enable pg_stat_statements for tracking
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;
