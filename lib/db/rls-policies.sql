-- Steps 72-82: RLS Policies for Multi-Tenancy + CEO Bypass (Step 74)
-- Each table has 2 policies: agency_isolation + CEO bypass

-- ========== 72. agencies RLS ==========
CREATE POLICY agencies_isolation ON agencies
  FOR ALL USING (
    is_ceo_bypass() OR id = current_setting('app.current_agency_id', true)::text
  );
CREATE POLICY agencies_ceo_bypass ON agencies
  FOR ALL USING (is_ceo_bypass());

-- ========== 73. users RLS ==========
CREATE POLICY users_isolation ON users
  FOR ALL USING (
    is_ceo_bypass() OR agency_id = current_setting('app.current_agency_id', true)::text OR agency_id IS NULL
  );

-- ========== 74. CEO Bypass Override Logic ==========
-- is_ceo_bypass() function already handles CEO (empty agency_id = unrestricted)
-- CEO username = 'CEO', role = super_admin, agencyId = NULL
-- When CEO queries, app.current_agency_id is RESET (empty), so all policies pass

-- ========== 75. workers tenant isolation ==========
CREATE POLICY workers_isolation ON workers
  FOR ALL USING (
    is_ceo_bypass() OR agency_id = current_setting('app.current_agency_id', true)::text
  );
CREATE POLICY workers_ceo_bypass ON workers
  FOR ALL USING (is_ceo_bypass());

-- ========== 76. clients RLS ==========
CREATE POLICY clients_isolation ON clients
  FOR ALL USING (
    is_ceo_bypass() OR agency_id = current_setting('app.current_agency_id', true)::text
  );

-- ========== 77. contracts RLS ==========
CREATE POLICY contracts_isolation ON contracts
  FOR ALL USING (
    is_ceo_bypass() OR agency_id = current_setting('app.current_agency_id', true)::text
  );

-- ========== 78. job_sites isolation ==========
CREATE POLICY job_sites_isolation ON job_sites
  FOR ALL USING (
    is_ceo_bypass() OR agency_id = current_setting('app.current_agency_id', true)::text
  );

-- ========== 79. timesheets RLS ==========
CREATE POLICY timesheets_isolation ON timesheets
  FOR ALL USING (
    is_ceo_bypass() OR agency_id = current_setting('app.current_agency_id', true)::text
  );

-- ========== 80. payrolls safety rules ==========
CREATE POLICY payrolls_isolation ON payrolls
  FOR ALL USING (
    is_ceo_bypass() OR agency_id = current_setting('app.current_agency_id', true)::text
  );
-- Additional safety: Only agency_admin and CEO can modify payrolls
CREATE POLICY payrolls_write_safety ON payrolls
  FOR INSERT WITH CHECK (
    is_ceo_bypass() OR current_setting('app.current_user_role', true) IN ('agency_admin', 'super_admin')
  );

-- ========== 81. invoices security ==========
CREATE POLICY invoices_isolation ON invoices
  FOR ALL USING (
    is_ceo_bypass() OR agency_id = current_setting('app.current_agency_id', true)::text
  );

-- ========== 82. compliance_documents RLS (worker_documents as compliance) ==========
CREATE POLICY compliance_documents_isolation ON worker_documents
  FOR ALL USING (
    is_ceo_bypass() OR EXISTS (
      SELECT 1 FROM workers w
      WHERE w.id = worker_documents.worker_id
      AND w.agency_id = current_setting('app.current_agency_id', true)::text
    )
  );
-- Also for generic compliance_documents if exists
-- CREATE POLICY compliance_docs_isolation ON compliance_documents FOR ALL USING (is_ceo_bypass() OR agency_id = current_setting('app.current_agency_id', true)::text);

-- ========== Additional: audit_logs & system_notifications ==========
CREATE POLICY audit_logs_isolation ON audit_logs
  FOR ALL USING (
    is_ceo_bypass() OR agency_id = current_setting('app.current_agency_id', true)::text OR agency_id IS NULL
  );

CREATE POLICY system_notifications_isolation ON system_notifications
  FOR ALL USING (
    is_ceo_bypass() OR agency_id = current_setting('app.current_agency_id', true)::text OR agency_id IS NULL
  );
