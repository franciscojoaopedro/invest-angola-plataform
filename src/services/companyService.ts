import { supabase } from '../lib/supabase';

export interface Company {
  id: string;
  name: string;
  sector: string;
  location: string;
  foundedYear: number;
  valuation: number;
  minInvestment: number;
  equity: number;
  description: string;
  website?: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  createdBy: string;
  team: TeamMember[];
  financials: Financials;
  documents: Document[];
}

export interface TeamMember {
  id: string;
  companyId: string;
  name: string;
  role: string;
  bio?: string;
}

export interface Financials {
  id: string;
  companyId: string;
  revenue: number;
  growth: number;
  customers: number;
  employees: number;
}

export interface Document {
  id: string;
  companyId: string;
  name: string;
  type: string;
  fileUrl: string;
}

export const companyService = {
  // Listar todas as empresas aprovadas
  async listCompanies() {
    const { data, error } = await supabase
      .from('companies')
      .select(`
        *,
        team_members (*),
        financials (*),
        documents (*)
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Criar nova empresa
  async createCompany(companyData: Omit<Company, 'id' | 'status' | 'createdAt' | 'createdBy'>) {
    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) throw new Error('Usuário não autenticado');

    const { data: company, error: companyError } = await supabase
      .from('companies')
      .insert({
        name: companyData.name,
        sector: companyData.sector,
        location: companyData.location,
        founded_year: companyData.foundedYear,
        valuation: companyData.valuation,
        min_investment: companyData.minInvestment,
        equity: companyData.equity,
        description: companyData.description,
        website: companyData.website,
        created_by: user.id,
        status: 'pending'
      })
      .select()
      .single();

    if (companyError) throw companyError;

    // Inserir membros da equipe
    if (companyData.team.length > 0) {
      const { error: teamError } = await supabase
        .from('team_members')
        .insert(
          companyData.team.map(member => ({
            company_id: company.id,
            name: member.name,
            role: member.role,
            bio: member.bio,
          }))
        );

      if (teamError) throw teamError;
    }

    // Inserir dados financeiros
    const { error: financialsError } = await supabase
      .from('financials')
      .insert({
        company_id: company.id,
        revenue: companyData.financials.revenue,
        growth: companyData.financials.growth,
        customers: companyData.financials.customers,
        employees: companyData.financials.employees,
      });

    if (financialsError) throw financialsError;

    return company;
  },

  // Upload de documentos
  async uploadDocument(companyId: string, file: File, name: string, type: string) {
    try {
      // Get current user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) throw new Error('Usuário não autenticado');

      // Sanitize the file name
      const sanitizedName = name
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');

      const fileExt = file.name.split('.').pop()?.toLowerCase() || '';
      const fileName = `${sanitizedName}-${Date.now()}.${fileExt}`;
      const filePath = `${user.id}/${companyId}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('company-documents')
        .upload(filePath, file);

      if (uploadError) {
        if (uploadError.message.includes('Bucket not found')) {
          throw new Error('Storage bucket não configurado. Por favor, configure o bucket "company-documents" no Supabase.');
        }
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('company-documents')
        .getPublicUrl(filePath);

      const { error: documentError } = await supabase
        .from('documents')
        .insert({
          company_id: companyId,
          name,
          type,
          file_url: publicUrl,
        });

      if (documentError) throw documentError;
    } catch (error) {
      console.error('Error uploading document:', error);
      throw error;
    }
  },

  // Buscar empresa por ID
  async getCompanyById(id: string) {
    const { data, error } = await supabase
      .from('companies')
      .select(`
        *,
        team_members!company_id (
          id,
          company_id,
          name,
          role,
          bio
        ),
        financials!company_id (
          id,
          company_id,
          revenue,
          growth,
          customers,
          employees
        ),
        documents!company_id (
          id,
          company_id,
          name,
          type,
          file_url
        )
      `)
      .eq('id', id)
      .single();

    if (error) throw error;

    // Mapear os dados para o formato esperado
    return {
      ...data,
      team: data.team_members || [],
      financials: data.financials?.[0] || null,
      documents: data.documents || []
    };
  },

  async approveCompany(companyId: string): Promise<void> {
    const { error } = await supabase
      .from('companies')
      .update({ status: 'approved' })
      .eq('id', companyId);

    if (error) throw error;
  },

  async rejectCompany(companyId: string): Promise<void> {
    const { error } = await supabase
      .from('companies')
      .update({ status: 'rejected' })
      .eq('id', companyId);

    if (error) throw error;
  },
}; 