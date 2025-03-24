-- Enable RLS
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE financials ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- Policies for companies table
CREATE POLICY "Allow public read access to companies"
ON companies FOR SELECT
TO public
USING (true);

CREATE POLICY "Allow authenticated users to create companies"
ON companies FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Allow company owners to update their own companies"
ON companies FOR UPDATE
TO authenticated
USING (auth.uid() = created_by)
WITH CHECK (auth.uid() = created_by);

-- Policies for team_members table
CREATE POLICY "Allow public read access to team members"
ON team_members FOR SELECT
TO public
USING (true);

CREATE POLICY "Allow authenticated users to create team members"
ON team_members FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Allow company owners to update their team members"
ON team_members FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM companies
    WHERE companies.id = team_members.company_id
    AND companies.created_by = auth.uid()
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM companies
    WHERE companies.id = team_members.company_id
    AND companies.created_by = auth.uid()
  )
);

-- Policies for financials table
CREATE POLICY "Allow public read access to financials"
ON financials FOR SELECT
TO public
USING (true);

CREATE POLICY "Allow authenticated users to create financials"
ON financials FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Allow company owners to update their financials"
ON financials FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM companies
    WHERE companies.id = financials.company_id
    AND companies.created_by = auth.uid()
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM companies
    WHERE companies.id = financials.company_id
    AND companies.created_by = auth.uid()
  )
);

-- Policies for documents table
CREATE POLICY "Allow public read access to documents"
ON documents FOR SELECT
TO public
USING (true);

CREATE POLICY "Allow authenticated users to create documents"
ON documents FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Allow company owners to update their documents"
ON documents FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM companies
    WHERE companies.id = documents.company_id
    AND companies.created_by = auth.uid()
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM companies
    WHERE companies.id = documents.company_id
    AND companies.created_by = auth.uid()
  )
);

-- Storage policies
CREATE POLICY "Allow public read access to company documents"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'company-documents');

CREATE POLICY "Allow authenticated users to upload company documents"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'company-documents'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Allow company owners to update their documents"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'company-documents'
  AND (storage.foldername(name))[1] = auth.uid()::text
)
WITH CHECK (
  bucket_id = 'company-documents'
  AND (storage.foldername(name))[1] = auth.uid()::text
); 