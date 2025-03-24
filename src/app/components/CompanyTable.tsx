
import { motion } from 'framer-motion';

import { Building2, DollarSign, Users, Clock, CheckCircle2, Percent,  } from 'lucide-react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import { Badge } from "@/app/components/ui/badge";
import { Avatar, AvatarFallback } from "@/app/components/ui/avatar";
import { Company } from '@/services/companyService';
import { Link } from '@tanstack/react-router';

interface CompanyTableProps {
  companies: Company[];
  formatCurrency: (value: number | undefined) => string;
}

export function CompanyTable({ companies, formatCurrency }: CompanyTableProps) {
  return (
    <div className="rounded-xl border bg-card">
      <div className="relative w-full overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Empresa</TableHead>
              <TableHead>Setor</TableHead>
              <TableHead>Localização</TableHead>
              <TableHead>Valoração</TableHead>
              <TableHead>Investimento Min.</TableHead>
              <TableHead>Acções</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {companies.map((company) => (
              <TableRow key={company.id} className="hover:bg-muted/50 transition-colors">
                <TableCell>
                  <Link
                  
                  key={company.id}
                  to="/company-detail/$id"
                  
                  params={{
                    id:company.id
                  }}
                  className="flex items-center gap-3 group">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {company.name?.charAt(0) || '?'}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                        {company.name || 'Sem nome'}
                      </p>
                      <p className="text-sm text-muted-foreground">ID: #{company.id?.slice(0, 6)}</p>
                    </div>
                  </Link>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                    {company.sector || 'Não especificado'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Building2 size={16} className="text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{company.location || 'Não especificada'}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <DollarSign size={16} className="text-muted-foreground" />
                    <span className="text-sm font-medium">{formatCurrency(company.valuation)}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Users size={16} className="text-muted-foreground" />
                    <span className="text-sm font-medium">{formatCurrency(company.min_investment)}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Percent size={16} className="text-muted-foreground" />
                    <span className="text-sm font-medium">  {company.equity}</span>
                  </div>
                </TableCell>
                <TableCell>
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
} 