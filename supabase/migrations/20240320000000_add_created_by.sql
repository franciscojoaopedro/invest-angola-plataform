-- Adiciona a coluna created_by na tabela companies
ALTER TABLE companies
ADD COLUMN created_by UUID REFERENCES auth.users(id);

-- Remove as políticas existentes
DROP POLICY IF EXISTS "Allow authenticated users to create companies" ON companies;
DROP POLICY IF EXISTS "Allow company owners to update their own companies" ON companies;

-- Cria novas políticas com a coluna created_by
CREATE POLICY "Allow authenticated users to create companies"
ON companies
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Allow company owners to update their own companies"
ON companies
FOR UPDATE
TO authenticated
USING (auth.uid() = created_by)
WITH CHECK (auth.uid() = created_by); 