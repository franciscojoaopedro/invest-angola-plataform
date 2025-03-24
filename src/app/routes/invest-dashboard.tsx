import { createFileRoute, redirect } from '@tanstack/react-router'
import InvestorDashboard from '../pages/private/investory-dashboard'
import { authService } from '@/services/authService'

export const Route = createFileRoute('/invest-dashboard')({
  component: InvestorDashboard,
  beforeLoad: async ({ location }) => {
    if (!  authService.isAuthenticated) {
      throw redirect({
        to: '/login',
        search: {

          redirect: location.href,
        },
      })
    }
  }
})

