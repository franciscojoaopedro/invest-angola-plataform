-- Habilita RLS para o bucket
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Remove políticas existentes
DROP POLICY IF EXISTS "Allow public read access to company documents" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated uploads to company documents" ON storage.objects;

-- Cria novas políticas
CREATE POLICY "Allow public read access to company documents"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'company-documents');

CREATE POLICY "Allow authenticated uploads to company documents"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'company-documents' AND
  (storage.foldername(name))[1] = auth.uid()::text
); 