import React, { useState, useEffect } from 'react';
import { Search, FileText, Building2, DollarSign, Users, Clock, CheckCircle2, XCircle, TrendingUp } from 'lucide-react';
import { Company, companyService } from '@/services/companyService';
import { useAuth } from '@/app/contexts/AuthContext';
import { useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardHeader } from '@/app/components/ui/card';
import { Input } from '@/app/components/ui/input';
import { Avatar, AvatarFallback } from '@/app/components/ui/avatar';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';


function AdminDashboard() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved'>('all');
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();

  const sectors = ['all', 'Tecnologia', 'Agricultura', 'Energia', 'Saúde', 'Educação'];

  useEffect(() => {
    // if (!isAdmin) {
    //   navigate({
    //     to:"/"
    //   });
    //   return;
    // }
    loadCompanies();
  }, [isAdmin, navigate]);

  const loadCompanies = async () => {
    try {
      setLoading(true);
      const data = await companyService.listCompanies();
      setCompanies(data || []);
    } catch (err) {
      setError('Erro ao carregar empresas. Por favor, tente novamente mais tarde.');
      console.error('Error loading companies:', err);
      setCompanies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (companyId: string) => {
    try {
      await companyService.approveCompany(companyId);
      await loadCompanies(); // Recarrega a lista após aprovar
    } catch (err) {
      console.error('Error approving company:', err);
      setError('Erro ao aprovar empresa. Por favor, tente novamente.');
    }
  };

  const handleReject = async (companyId: string) => {
    try {
      await companyService.rejectCompany(companyId);
      await loadCompanies(); // Recarrega a lista após rejeitar
    } catch (err) {
      console.error('Error rejecting company:', err);
      setError('Erro ao rejeitar empresa. Por favor, tente novamente.');
    }
  };

  const filteredCompanies = companies.filter(company => {
    if (!company) return false;
    const matchesSearch = company.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = selectedSector === 'all' || company.sector === selectedSector;
    const matchesStatus = statusFilter === 'all' || company.status === statusFilter;
    return matchesSearch && matchesSector && matchesStatus;
  });

  const formatCurrency = (value: number | undefined) => {
    if (value === undefined || value === null) return 'N/A';
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'AOA' });
  };

  // if (!isAdmin) {
  //   return null;
  // }

  // if (loading) {
  //   return (
  //     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
  //       <div className="flex items-center justify-center h-64">
  //         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  //       </div>
  //     </div>
  //   );
  // }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="bg-destructive/10 border-destructive">
          <CardContent className="p-4 text-destructive">
            {error}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-4">Painel de Administração</h1>
        <p className="text-muted-foreground">Gerencie e aprove as empresas cadastradas</p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <Input
              type="text"
              placeholder="Buscar empresas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-2">
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="h-9 px-3 rounded-md border border-input bg-background text-sm"
            >
              <option value="all">Todos os Setores</option>
              {sectors.filter(sector => sector !== 'all').map(sector => (
                <option key={sector} value={sector}>{sector}</option>
              ))}
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as 'all' | 'pending' | 'approved')}
              className="h-9 px-3 rounded-md border border-input bg-background text-sm"
            >
              <option value="all">Todos os Status</option>
              <option value="pending">Pendentes</option>
              <option value="approved">Aprovadas</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-sm text-muted-foreground">
          {filteredCompanies.length} {filteredCompanies.length === 1 ? 'empresa encontrada' : 'empresas encontradas'}
        </p>
      </div>

      {/* Companies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCompanies.map(company => (
          <Card key={company.id} className="hover:shadow-md transition-all duration-200">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {company.name?.charAt(0) || '?'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {company.name || 'Sem nome'}
                    </h3>
                    <p className="text-sm text-muted-foreground">ID: #{company.id?.slice(0, 6)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                    {company.sector || 'Não especificado'}
                  </Badge>
                  {company.status === 'pending' ? (
                    <Badge variant="default" className="bg-yellow-50 text-yellow-700 hover:bg-yellow-100">
                      <Clock className="h-3 w-3 mr-1" />
                      Pendente
                    </Badge>
                  ) : (
                    <Badge variant="default" className="bg-green-50 text-green-700 hover:bg-green-100">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Aprovada
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4 line-clamp-2 text-sm">{company.description || 'Sem descrição'}</p>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Building2 size={16} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{company.location || 'Localização não especificada'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign size={16} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{formatCurrency(company.valuation)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp size={16} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{company.equity || 0}% equity</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Min: {formatCurrency(company.minInvestment)}</span>
                </div>
              </div>

              {/* Documents Section */}
              {company.documents && company.documents.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-foreground mb-2">Documentos</h4>
                  <div className="space-y-2">
                    {company.documents.map((doc) => (
                      <div key={doc.id} className="flex items-center gap-2 text-sm">
                        <FileText size={16} className="text-muted-foreground" />
                        <a
                          href={doc.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          {doc.name}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              {company.status === 'pending' && (
                <div className="flex gap-2">
                  <Button
                    variant="default"
                    className="flex-1"
                    onClick={() => handleApprove(company.id)}
                  >
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Aprovar
                  </Button>
                  <Button
                    variant="destructive"
                    className="flex-1"
                    onClick={() => handleReject(company.id)}
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Rejeitar
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCompanies.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">Nenhuma empresa encontrada com os filtros selecionados.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default AdminDashboard; 