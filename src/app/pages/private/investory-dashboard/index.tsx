
import { Building2, TrendingUp, DollarSign, Users, ArrowUpRight, ArrowDownRight, Clock, FileText, Receipt } from 'lucide-react';

// Função auxiliar para formatar valores em AOA
const formatCurrency = (value: number): string => {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'AOA' });
};

function InvestorDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Área do Investidor</h1>
        <div className="flex items-center gap-2 text-gray-600">
          <Clock size={18} />
          <span>Última atualização: {new Date().toLocaleString('pt-BR')}</span>
        </div>
      </div>
      
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Investimentos Ativos</h3>
              <p className="text-xs text-gray-500">Empresas em portfólio</p>
            </div>
            <div className="p-2 bg-blue-50 rounded-lg">
              <Building2 className="h-5 w-5 text-blue-600" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl font-bold text-gray-900">3</p>
            <p className="text-sm text-gray-500">empresas</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Capital Investido</h3>
              <p className="text-xs text-gray-500">Total investido</p>
            </div>
            <div className="p-2 bg-green-50 rounded-lg">
              <DollarSign className="h-5 w-5 text-green-600" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(2500000)}</p>
            <p className="text-sm text-gray-500">AOA</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Retorno Total</h3>
              <p className="text-xs text-gray-500">Desde o início</p>
            </div>
            <div className="p-2 bg-purple-50 rounded-lg">
              <TrendingUp className="h-5 w-5 text-purple-600" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-2xl font-bold text-green-600">+15%</p>
            <p className="text-sm text-gray-500">vs. mês anterior</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Oportunidades</h3>
              <p className="text-xs text-gray-500">Em análise</p>
            </div>
            <div className="p-2 bg-orange-50 rounded-lg">
              <Users className="h-5 w-5 text-orange-600" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl font-bold text-gray-900">12</p>
            <p className="text-sm text-gray-500">novas</p>
          </div>
        </div>
      </div>

      {/* Portfolio Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Meu Portfólio</h2>
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1">
            Ver todos <ArrowUpRight size={16} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-4 px-4 text-sm font-medium text-gray-600">Empresa</th>
                <th className="text-left py-4 px-4 text-sm font-medium text-gray-600">Setor</th>
                <th className="text-left py-4 px-4 text-sm font-medium text-gray-600">Investimento</th>
                <th className="text-left py-4 px-4 text-sm font-medium text-gray-600">Equity</th>
                <th className="text-left py-4 px-4 text-sm font-medium text-gray-600">Performance</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-sm font-medium text-blue-600">TA</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">TechAngola</p>
                      <p className="text-sm text-gray-500">ID: #12345</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">Tecnologia</span>
                </td>
                <td className="py-4 px-4 font-medium">{formatCurrency(1000000)}</td>
                <td className="py-4 px-4 font-medium">2%</td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2 text-green-600">
                    <ArrowUpRight size={16} />
                    <span className="font-medium">+25%</span>
                  </div>
                </td>
              </tr>
              <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-sm font-medium text-green-600">EF</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">EcoFarms</p>
                      <p className="text-sm text-gray-500">ID: #12346</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full">Agricultura</span>
                </td>
                <td className="py-4 px-4 font-medium">{formatCurrency(800000)}</td>
                <td className="py-4 px-4 font-medium">1.5%</td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2 text-green-600">
                    <ArrowUpRight size={16} />
                    <span className="font-medium">+10%</span>
                  </div>
                </td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                      <span className="text-sm font-medium text-orange-600">SA</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">SolarAngola</p>
                      <p className="text-sm text-gray-500">ID: #12347</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="px-2 py-1 bg-orange-50 text-orange-700 text-xs rounded-full">Energia</span>
                </td>
                <td className="py-4 px-4 font-medium">{formatCurrency(700000)}</td>
                <td className="py-4 px-4 font-medium">1%</td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2 text-red-600">
                    <ArrowDownRight size={16} />
                    <span className="font-medium">-5%</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Atividade Recente</h2>
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1">
            Ver histórico <ArrowUpRight size={16} />
          </button>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <DollarSign className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Investimento em TechAngola</p>
                <p className="text-sm text-gray-600">{formatCurrency(1000000)} - 2% equity</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Há 2 dias</p>
              <p className="text-xs text-gray-500">ID: #TRX123</p>
            </div>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-50 rounded-lg">
                <FileText className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Relatório Trimestral - EcoFarms</p>
                <p className="text-sm text-gray-600">Documento disponível</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Há 5 dias</p>
              <p className="text-xs text-gray-500">ID: #DOC456</p>
            </div>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-50 rounded-lg">
                <Receipt className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Dividendos - SolarAngola</p>
                <p className="text-sm text-gray-600">{formatCurrency(50000)} recebidos</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Há 1 semana</p>
              <p className="text-xs text-gray-500">ID: #DIV789</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvestorDashboard;