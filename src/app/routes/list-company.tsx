import { createFileRoute, redirect } from '@tanstack/react-router';
import CompanyListing from '../pages/public/company-listing';
import { authService } from '@/services/authService';

export const Route = createFileRoute('/list-company')({
  component: CompanyListing,
  beforeLoad: async ({ location }) => {
    const isAuthenticated = await authService.isAuthenticated(); // Se isAuthenticated for uma função assíncrona

    if (!isAuthenticated) {
      throw redirect({
        to: '/login',
        search: { redirect: location.href },
      });
    }
  },
});
