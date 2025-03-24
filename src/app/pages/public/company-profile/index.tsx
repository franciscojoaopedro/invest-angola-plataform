import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { useAuth } from "@/app/contexts/AuthContext";

import { Company, companyService, Document, TeamMember } from "@/services/companyService";
import React, { useEffect, useState } from "react";
import { ArrowLeft, Info, DollarSign, FileText, Users } from "lucide-react";
import { Route } from "@/app/routes/company-profile.$id";

const CompanyProfileDetail: React.FC = () => {
  const { id } = Route.useParams();
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const loadCompany = async () => {
      if (!id) return;
      try {
        const data = await companyService.getCompanyById(id);
        setCompany(data);
      } catch (err) {
        setError("Erro ao carregar detalhes da empresa");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadCompany();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !company) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">{error || "Empresa não encontrada"}</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <Button variant="outline" onClick={() => window.history.back()} className="mb-6 flex items-center">
        <ArrowLeft className="mr-2" size={18} /> Voltar
      </Button>

      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">{company.name}</h1>
        <div className="flex items-center gap-3">
          <Badge variant={company.status === "approved" ? "default" : "secondary"}>
            {company.status === "approved" ? "Aprovada" : "Pendente"}
          </Badge>
          <span className="text-gray-500 text-sm">ID: {company.id}</span>
        </div>
      </div>

      <div className="grid gap-6">
        <Card className="p-6 shadow-lg bg-gray-50 border">
          <h2 className="text-2xl font-semibold mb-4 flex items-center text-gray-700">
            <Info className="mr-2 text-blue-500" size={22} /> Visão Geral
          </h2>
          <p className="text-gray-600 leading-relaxed">{company.description}</p>
        </Card>

        <Card className="p-6 shadow-lg bg-gray-50 border">
          <h2 className="text-2xl font-semibold mb-4 flex items-center text-gray-700">
            <DollarSign className="mr-2 text-green-500" size={22} /> Informações Financeiras
          </h2>
          <div className="grid gap-4">
            <div>
              <label className="text-sm text-gray-500">Valoração</label>
              <p className="text-lg font-semibold text-gray-700">
                {new Intl.NumberFormat("pt-AO", { style: "currency", currency: "AOA" }).format(company.financials.revenue)}
              </p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Investimento Mínimo</label>
              <p className="text-lg font-semibold text-gray-700">
                {new Intl.NumberFormat("pt-AO", { style: "currency", currency: "AOA" }).format(company.financials.growth)}
              </p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Equity Oferecido</label>
              <p className="text-lg font-semibold text-gray-700">{company.equity}%</p>
            </div>
          </div>
        </Card>

        {company.documents && company.documents.length > 0 && (
          <Card className="p-6 shadow-lg bg-gray-50 border">
            <h2 className="text-2xl font-semibold mb-4 flex items-center text-gray-700">
              <FileText className="mr-2 text-purple-500" size={22} /> Documentos
            </h2>
            <div className="grid gap-4">
              {company.documents.map((doc: Document, index: number) => (
                <div key={index} className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm border">
                  <div>
                    <p className="font-medium text-gray-700">{doc.name}</p>
                    <p className="text-sm text-gray-500">{doc.type}</p>
                  </div>
                  <Button variant="outline" asChild>
                    <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer">
                      Visualizar
                    </a>
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        )}

        {company.team && company.team.length > 0 && (
          <Card className="p-6 shadow-lg bg-gray-50 border">
            <h2 className="text-2xl font-semibold mb-4 flex items-center text-gray-700">
              <Users className="mr-2 text-orange-500" size={22} /> Membros da Equipe
            </h2>
            <div className="grid gap-4">
              {company.team.map((member: TeamMember, index: number) => (
                <div key={index} className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm border">
                  <div>
                    <p className="font-medium text-gray-700">{member.name}</p>
                    <p className="text-sm text-gray-500">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {user && company.createdBy === user.id && (
          <div className="flex justify-end gap-4 mt-6">
            <Button variant="outline" className="px-6 py-2 text-gray-700 border-gray-400 hover:border-gray-600">
              Editar
            </Button>
            <Button className="bg-blue-600 text-white px-6 py-2 hover:bg-blue-700">Gerenciar Investimentos</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyProfileDetail;
