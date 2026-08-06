-- Step 71: PostgreSQL Row Level Security (RLS) Activate
-- iNAYATechLab Inc. - Manpower Agency SaaS
-- IVCS v1.3.0 - Phase 4 (71-100)
-- Enable RLS on all multi-tenant tables

-- Enable RLS
ALTER TABLE agencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE agency_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE workers ENABLE ROW LEVEL SECURITY;
ALTER TABLE worker_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE worker_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_sites ENABLE ROW LEVEL SECURITY;
ALTER TABLE contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_demands ENABLE ROW LEVEL SECURITY;
ALTER TABLE worker_deployments ENABLE ROW LEVEL SECURITY;
ALTER TABLE timesheets ENABLE ROW LEVEL SECURITY;
ALTER TABLE timesheet_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE payrolls ENABLE ROW LEVEL SECURITY;
ALTER TABLE payroll_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoice_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_notifications ENABLE ROW LEVEL SECURITY;

-- Create app.current_agency_id setting (for RLS context)
-- Usage: SET app.current_agency_id = 'agency_123';
-- Super Admin (CEO) => RESET app.current_agency_id (empty = bypass)

-- Helper function: Check if current user is CEO (super_admin bypass)
CREATE OR REPLACE FUNCTION is_ceo_bypass() RETURNS BOOLEAN AS $$
BEGIN
  RETURN current_setting('app.current_agency_id', true) = '' OR current_setting('app.current_agency_id', true) IS NULL;
END;
$$ LANGUAGE plpgsql;
