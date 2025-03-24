-- Remove as políticas existentes da tabela documents
DROP POLICY IF EXISTS "Allow authenticated users to create documents" ON documents;
DROP POLICY IF EXISTS "Allow company owners to update their documents" ON documents;

-- Cria novas políticas que verificam o ownership da empresa
CREATE POLICY "Allow authenticated users to create documents"
ON documents
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM companies
    WHERE companies.id = documents.company_id
    AND companies.created_by = auth.uid()
  )
);

CREATE POLICY "Allow company owners to update their documents"
ON documents
FOR UPDATE
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