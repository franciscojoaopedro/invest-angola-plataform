import React, { useEffect, useState } from 'react';
import * as Icons from 'lucide-react';
import { Financials,Company, Document,companyService } from '@/services/companyService';
import { redirect, useNavigate } from '@tanstack/react-router';
import { authService } from '@/services/authService';


// Interface for new company data without IDs and with correct types
interface NewCompanyData {
  name: string;
  sector: string;
  location: string;
  foundedYear: number;
  valuation: number;
  minInvestment: number;
  equity: number;
  description: string;
  website?: string;
  team: Array<{
    name: string;
    role: string;
    bio?: string;
  }>;
  financials: Financials;
  documents: Document[]; 
}

interface CompanyFormData {
  name: string;
  sector: string;
  location: string;
  foundedYear: string;
  valuation: string;
  minInvestment: string;
  equity: string;
  description: string;
  website: string;
  team: Array<{
    name: string;
    role: string;
    bio: string;
  }>;
  financials: {
    revenue: string;
    growth: string;
    customers: string;
    employees: string;
  };
  documents: Array<{
    name: string;
    type: string;
    file: File | null;
  }>;
}

function CompanyListing() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState<CompanyFormData>({
    name: '',
    sector: '',
    location: '',
    foundedYear: '',
    valuation: '',
    minInvestment: '',
    equity: '',
    description: '',
    website: '',
    team: [{ name: '', role: '', bio: '' }],
    financials: {
      revenue: '',
      growth: '',
      customers: '',
      employees: '',
    },
    documents: [
      { name: 'Pitch Deck', type: 'PDF', file: null },
      { name: 'Relatório Financeiro', type: 'PDF', file: null },
      { name: 'Plano de Negócios', type: 'PDF', file: null },
    ],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof CompanyFormData] as Record<string, string>),
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleTeamChange = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      team: prev.team.map((member, i) => 
        i === index ? { ...member, [field]: value } : member
      )
    }));
  };

  const addTeamMember = () => {
    setFormData(prev => ({
      ...prev,
      team: [...prev.team, { name: '', role: '', bio: '' }]
    }));
  };

  const handleFileChange = (index: number, file: File) => {
    setFormData(prev => ({
      ...prev,
      documents: prev.documents.map((doc, i) => 
        i === index ? { ...doc, file } : doc
      )
    }));
  };

  const validateForm = (): string | null => {
    if (!formData.name.trim()) return 'Nome da empresa é obrigatório';
    if (!formData.sector) return 'Setor é obrigatório';
    if (!formData.location.trim()) return 'Localização é obrigatória';
    if (!formData.foundedYear) return 'Ano de fundação é obrigatório';
    if (!formData.valuation) return 'Valorização é obrigatória';
    if (!formData.minInvestment) return 'Investimento mínimo é obrigatório';
    if (!formData.equity) return 'Equity é obrigatório';
    if (!formData.description.trim()) return 'Descrição é obrigatória';
    if (!formData.team[0].name.trim()) return 'Nome do primeiro membro da equipe é obrigatório';
    if (!formData.team[0].role.trim()) return 'Cargo do primeiro membro da equipe é obrigatório';
    if (!formData.financials.revenue) return 'Receita é obrigatória';
    if (!formData.financials.growth) return 'Crescimento é obrigatório';
    if (!formData.financials.customers) return 'Número de clientes é obrigatório';
    if (!formData.financials.employees) return 'Número de funcionários é obrigatório';
    if (!formData.documents[0].file) return 'Pitch Deck é obrigatório';
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);

      // Prepare company data
      const companyData: NewCompanyData = {
        name: formData.name,
        sector: formData.sector,
        location: formData.location,
        foundedYear: parseInt(formData.foundedYear),
        valuation: parseFloat(formData.valuation.replace(/[^0-9.-]+/g, '')),
        minInvestment: parseFloat(formData.minInvestment.replace(/[^0-9.-]+/g, '')),
        equity: parseFloat(formData.equity),
        description: formData.description,
        website: formData.website,
        team: formData.team.map(member => ({
          name: member.name,
          role: member.role,
          bio: member.bio
        })),
        financials: {
          revenue: parseFloat(formData.financials.revenue.replace(/[^0-9.-]+/g, '')),
          growth: parseFloat(formData.financials.growth),
          customers: parseInt(formData.financials.customers),
          employees: parseInt(formData.financials.employees),
          id: '',
          companyId: ''
        },
        documents: [] // Empty array for initial creation
      };

      // Create company - using type assertion since service implementation differs from its type definition
      const company = await companyService.createCompany(companyData as unknown as Omit<Company, 'id' | 'status' | 'createdAt'>);

      // Upload documents
      for (const doc of formData.documents) {
        if (doc.file) {
          await companyService.uploadDocument(company.id, doc.file, doc.name, doc.type);
        }
      }

      setSuccess(true);
      setTimeout(() => {
        navigate({
          from:"/list-company",
          to:"/companies"
        });
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar empresa. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };



  useEffect(()=>{

    
      if(!!authService.isAuthenticated){
        redirect({
          to:"/"
        })
      }
    
  },[authService.isAuthenticated])










  if (success) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-3xl mx-auto text-center">
          <Icons.CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Empresa Cadastrada com Sucesso!</h1>
          <p className="text-gray-600 mb-8">
            Sua empresa foi cadastrada com sucesso. Você será redirecionado para a lista de empresas em breve.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Listar Empresa</h1>
        <p className="text-gray-600 mb-8">
          Preencha o formulário abaixo para listar sua empresa na plataforma. 
          Nossa equipe irá analisar sua submissão e entrar em contato em breve.
        </p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Informações Básicas */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Informações Básicas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome da Empresa
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Setor
                </label>
                <select
                  name="sector"
                  value={formData.sector}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Selecione um setor</option>
                  <option value="Tecnologia">Tecnologia</option>
                  <option value="Agricultura">Agricultura</option>
                  <option value="Energia">Energia</option>
                  <option value="Saúde">Saúde</option>
                  <option value="Educação">Educação</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Localização
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ano de Fundação
                </label>
                <input
                  type="number"
                  name="foundedYear"
                  value={formData.foundedYear}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* Detalhes do Investimento */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Detalhes do Investimento</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Valorização da Empresa
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icons.DollarSign className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="valuation"
                    value={formData.valuation}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ex: 500.000"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Investimento Mínimo
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icons.DollarSign className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="minInvestment"
                    value={formData.minInvestment}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ex: 1.000"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Equity Oferecido
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">%</span>
                  </div>
                  <input
                    type="number"
                    name="equity"
                    value={formData.equity}
                    onChange={handleInputChange}
                    className="w-full pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ex: 5"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Website
                </label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://"
                />
              </div>
            </div>
          </div>

          {/* Descrição */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Descrição da Empresa</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descrição Detalhada
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Descreva sua empresa, sua missão, visão e objetivos..."
                required
              />
            </div>
          </div>

          {/* Equipe */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Equipe</h2>
            {formData.team.map((member, index) => (
              <div key={index} className="mb-6 last:mb-0">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Membro {index + 1}</h3>
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({
                        ...prev,
                        team: prev.team.filter((_, i) => i !== index)
                      }))}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remover
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nome
                    </label>
                    <input
                      type="text"
                      value={member.name}
                      onChange={(e) => handleTeamChange(index, 'name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cargo
                    </label>
                    <input
                      type="text"
                      value={member.role}
                      onChange={(e) => handleTeamChange(index, 'role', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Biografia
                    </label>
                    <textarea
                      value={member.bio}
                      onChange={(e) => handleTeamChange(index, 'bio', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Breve biografia do membro da equipe..."
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addTeamMember}
              className="mt-4 text-blue-600 hover:text-blue-800 flex items-center gap-2"
            >
              <Icons.Users className="h-5 w-5" />
              Adicionar Membro da Equipe
            </button>
          </div>

          {/* Dados Financeiros */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Dados Financeiros</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Receita Anual
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icons.DollarSign className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="financials.revenue"
                    value={formData.financials.revenue}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ex: 100.000"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Crescimento Anual
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">%</span>
                  </div>
                  <input
                    type="number"
                    name="financials.growth"
                    value={formData.financials.growth}
                    onChange={handleInputChange}
                    className="w-full pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ex: 50"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Número de Clientes
                </label>
                <input
                  type="number"
                  name="financials.customers"
                  value={formData.financials.customers}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ex: 50"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Número de Funcionários
                </label>
                <input
                  type="number"
                  name="financials.employees"
                  value={formData.financials.employees}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ex: 15"
                  required
                />
              </div>
            </div>
          </div>

          {/* Documentos */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Documentos</h2>
            <div className="space-y-4">
              {formData.documents.map((doc, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {doc.name}
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => handleFileChange(index, e.target.files?.[0] || new File([], ''))}
                        className="flex-1"
                        required
                      />
                      <Icons.FileText className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className={`bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition flex items-center gap-2 ${
                loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
              }`}
            >
              {loading ? 'Enviando...' : 'Enviar Aplicação'}
              {!loading && <Icons.ArrowRight size={20} />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CompanyListing;