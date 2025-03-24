
import { motion } from 'framer-motion';

import { Building2, DollarSign, TrendingUp, Users, Clock, CheckCircle2 } from 'lucide-react';

import { Card, CardContent, CardHeader } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Avatar, AvatarFallback } from "@/app/components/ui/avatar";
import { Company } from '@/services/companyService';
import { Link } from '@tanstack/react-router';

interface CompanyCardProps {
  company: Company;
  formatCurrency: (value: number | undefined) => string;
}

export function CompanyCard({ company, formatCurrency }: CompanyCardProps) {
  return (
    <Link

      to='/company-detail/$id'
      params={{
        id: company.id
      }}
    >
      <Card className="h-full hover:shadow-md transition-all duration-200 group">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-primary/10 text-primary">
                  {company.name?.charAt(0) || '?'}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  {company.name || 'Sem nome'}
                </h3>
                <p className="text-sm text-muted-foreground">ID: #{company.id?.slice(0, 6)}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                {company.sector || 'Não especificado'}
              </Badge>
              {company.status === "pending" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Badge variant="default" className="bg-yellow-50 text-yellow-700 hover:bg-yellow-100 rounded-lg shadow-md transition-all duration-300">
                    <Clock className="h-3 w-3 mr-1" />
                    Pendente
                  </Badge>
                </motion.div>
              )}

              {company.status === "approved" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Badge variant="default" className="bg-green-50 text-green-700 hover:bg-green-100 rounded-lg shadow-md transition-all duration-300">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Aprovada
                  </Badge>
                </motion.div>
              )}

              {company.status === "rejected" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Badge variant="default" className="bg-red-50 text-red-700 hover:bg-red-100 rounded-lg shadow-md transition-all duration-300">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Rejeitada
                  </Badge>
                </motion.div>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4 line-clamp-2 text-sm">{company.description || 'Sem descrição'}</p>
          <div className="grid grid-cols-2 gap-4">
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
        </CardContent>
      </Card>
    </Link>
  );
} 