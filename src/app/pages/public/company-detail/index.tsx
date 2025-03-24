import  { useState, useEffect } from 'react';

import { Building2, Users, TrendingUp, DollarSign, BarChart as ChartBar, FileText, MapPin, Calendar, ArrowLeft, Download, Share2, Heart, MessageSquare, Globe, Mail, Clock, CheckCircle2 } from 'lucide-react';
import { Company, companyService } from '@/services/companyService';

import { Link } from '@tanstack/react-router';
import { Route } from '@/app/routes/company-detail.$id';


// Função auxiliar para formatar valores monetários com segurança
const formatCurrency = (value: number | undefined | null): string => {
  if (value === undefined || value === null) return 'N/A';
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'AOA' });
};

function CompanyDetail() {
  const { id } = Route.useParams();
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    loadCompany();
  }, [id]);

  const loadCompany = async () => {
    try {
      setLoading(true);
      if (id) {
        const data = await companyService.getCompanyById(id);
        setCompany(data);
      }
    } catch (err) {
      setError('Erro ao carregar dados da empresa');
      console.error('Error loading company:', err);
    } finally {
      setLoading(false);
    }
  };
  const handleDownload = (fileUrl: string, fileName: string) => {
    if (!fileUrl) {
      console.error("URL do arquivo não encontrada");
      return;
    }

    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName || "documento.pdf"; // Nome do arquivo
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !company) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Empresa não encontrada</h2>
          <Link


            to="/marketeplace"

            className="text-blue-600 hover:text-blue-800">
            Voltar para o Marketplace
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[500px]">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-blue-800/90" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1664575602276-acd073f104c1?q=80&w=1200&h=400&fit=crop')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-end pb-12">
            <Link to="/marketeplace" className="inline-flex items-center text-white mb-8 hover:text-blue-100 transition">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Voltar para o Marketplace
            </Link>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-white mb-4">{company.name || 'Sem nome'}</h1>
                <div className="flex items-center gap-4">
                  <span className="bg-white/20 text-white text-sm font-medium px-3 py-1 rounded-full">
                    {company.sector || 'Sem setor'}
                  </span>
                  <div className="flex items-center text-white/90 gap-2">
                    <MapPin size={16} />
                    <span>{company.location || 'Localização não especificada'}</span>
                  </div>
                  <div className="flex items-center text-white/90 gap-2">
                    <Calendar size={16} />
                    <span>Fundada em {company.foundedYear || 'N/A'}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button onClick={() => navigator.share({ url: window.location.href })} className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition">
                  <Share2 size={18} />
                  Compartilhar
                </button>
                <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition">
                  <Heart size={18} />
                  Favoritar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Status Badge */}
            <div className="mb-8">
              {company.status === 'pending' ? (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-center gap-3">
                  <Clock className="h-5 w-5 text-yellow-600" />
                  <div>
                    <h3 className="font-medium text-yellow-800">Empresa em Análise</h3>
                    <p className="text-sm text-yellow-700">Nossa equipe está analisando sua empresa. Em breve você receberá uma atualização.</p>
                  </div>
                </div>
              ) : (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <div>
                    <h3 className="font-medium text-green-800">Empresa Aprovada</h3>
                    <p className="text-sm text-green-700">Esta empresa foi verificada e aprovada por nossa equipe.</p>
                  </div>
                </div>
              )}
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-sm mb-8">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6" aria-label="Tabs">
                  {['overview', 'team', 'financials', 'documents'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${activeTab === tab
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                    >
                      {tab === 'overview' ? 'Visão Geral' :
                        tab === 'team' ? 'Equipe' :
                          tab === 'financials' ? 'Financeiro' : 'Documentos'}
                    </button>
                  ))}
                </nav>
              </div>
              <div className="p-6">
                {activeTab === 'overview' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Sobre a Empresa</h2>
                    <p className="text-gray-600 leading-relaxed">{company.description || 'Sem descrição disponível'}</p>
                    <div className="mt-6 grid grid-cols-2 gap-4">
                      {company.website && (
                        <a href={company.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 hover:text-blue-800">
                          <Globe size={18} />
                          Website
                        </a>
                      )}
                      <button className="flex items-center gap-2 text-blue-600 hover:text-blue-800">
                        <Mail size={18} />
                        Contato
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === 'team' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Nossa Equipe</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {company.team?.map((member) => (
                        <div key={member.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-2xl font-bold text-blue-600">
                              {member.name?.charAt(0) || '?'}
                            </span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{member.name || 'Nome não disponível'}</h3>
                            <p className="text-gray-600">{member.role || 'Cargo não especificado'}</p>
                            {member.bio && (
                              <p className="text-sm text-gray-500 mt-1">{member.bio}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'financials' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Métricas Financeiras</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {/* Receita Anual */}
                      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-50 rounded-lg">
                              <DollarSign className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <h3 className="text-sm font-medium text-gray-600">Receita Anual</h3>
                              <p className="text-xs text-gray-500">Último ano fiscal</p>
                            </div>
                          </div>
                          <TrendingUp className="h-4 w-4 text-green-500" />
                        </div>
                        <div className="text-2xl font-bold text-gray-900 mb-2">
                          {formatCurrency(company.financials?.revenue)}
                        </div>
                        <div className="text-sm text-gray-500">
                          {company.financials?.growth ? `+${company.financials.growth}% vs. ano anterior` : 'Dados não disponíveis'}
                        </div>
                      </div>

                      {/* Crescimento */}
                      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-50 rounded-lg">
                              <TrendingUp className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                              <h3 className="text-sm font-medium text-gray-600">Taxa de Crescimento</h3>
                              <p className="text-xs text-gray-500">Crescimento anual</p>
                            </div>
                          </div>
                          <ChartBar className="h-4 w-4 text-green-500" />
                        </div>
                        <div className="text-2xl font-bold text-gray-900 mb-2">
                          {company.financials?.growth ? `${company.financials.growth}%` : 'N/A'}
                        </div>
                        <div className="text-sm text-gray-500">
                          {company.financials?.growth ? 'Crescimento positivo' : 'Dados não disponíveis'}
                        </div>
                      </div>

                      {/* Clientes */}
                      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-50 rounded-lg">
                              <Users className="h-5 w-5 text-purple-600" />
                            </div>
                            <div>
                              <h3 className="text-sm font-medium text-gray-600">Base de Clientes</h3>
                              <p className="text-xs text-gray-500">Clientes ativos</p>
                            </div>
                          </div>
                          <Users className="h-4 w-4 text-purple-500" />
                        </div>
                        <div className="text-2xl font-bold text-gray-900 mb-2">
                          {company.financials?.customers?.toLocaleString() || 'N/A'}
                        </div>
                        <div className="text-sm text-gray-500">
                          {company.financials?.customers ? 'Clientes ativos' : 'Dados não disponíveis'}
                        </div>
                      </div>

                      {/* Funcionários */}
                      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-orange-50 rounded-lg">
                              <Users className="h-5 w-5 text-orange-600" />
                            </div>
                            <div>
                              <h3 className="text-sm font-medium text-gray-600">Equipe</h3>
                              <p className="text-xs text-gray-500">Total de funcionários</p>
                            </div>
                          </div>
                          <Users className="h-4 w-4 text-orange-500" />
                        </div>
                        <div className="text-2xl font-bold text-gray-900 mb-2">
                          {company.financials?.employees?.toLocaleString() || 'N/A'}
                        </div>
                        <div className="text-sm text-gray-500">
                          {company.financials?.employees ? 'Funcionários ativos' : 'Dados não disponíveis'}
                        </div>
                      </div>
                    </div>

                    {/* Gráfico de Tendências */}
                    <div className="mt-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Tendências de Crescimento</h3>
                      <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                        <p className="text-gray-500">Gráfico de tendências em desenvolvimento</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'documents' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Documentos</h2>
                    <div className="space-y-4">
                      {company.documents?.map((doc) => (
                        <div key={doc.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <FileText className="h-5 w-5 text-gray-400" />
                            <div>
                              <h3 className="font-medium text-gray-900">{doc.name || 'Documento sem nome'}</h3>
                              <p className="text-sm text-gray-500">{doc.type || 'Tipo não especificado'}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => handleDownload(doc.fileUrl, doc.name)}
                            className="text-blue-600 hover:text-blue-800 flex items-center gap-2 cursor-pointer"
                          >
                            <Download size={18} />
                            Download
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Investment Details Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h2 className="text-2xl font-bold mb-6">Detalhes do Investimento</h2>
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Building2 className="text-gray-400" size={20} />
                    <span className="text-gray-600">Valorização</span>
                  </div>
                  <span className="font-semibold">
                    {formatCurrency(company.valuation)}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <DollarSign className="text-gray-400" size={20} />
                    <span className="text-gray-600">Investimento Mínimo</span>
                  </div>
                  <span className="font-semibold">
                    {formatCurrency(company.min_investment)}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="text-gray-400" size={20} />
                    <span className="text-gray-600">Equity Oferecido</span>
                  </div>
                  <span className="font-semibold">{company.equity || 'N/A'}%</span>
                </div>
              </div>

              <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition mb-4 flex items-center justify-center gap-2">
                <MessageSquare size={18} />
                Iniciar Conversa
              </button>

              <button className="w-full border border-gray-300 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition flex items-center justify-center gap-2">
                <Calendar size={18} />
                Agendar Reunião
              </button>

              {/* Additional Info */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="font-semibold mb-4">Informações Adicionais</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock size={16} />
                    <span>Última atualização: {company.createdAt ? new Date(company.createdAt).toLocaleDateString('pt-BR') : 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Globe size={16} />
                    <span>Localização: {company.location || 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users size={16} />
                    <span>Setor: {company.sector || 'N/A'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyDetail;