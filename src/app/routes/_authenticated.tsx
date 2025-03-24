import { createFileRoute, redirect } from '@tanstack/react-router'
import { authService } from '@/services/authService'

// src/routes/_authenticated.tsx
export const Route = createFileRoute('/_authenticated')({

  beforeLoad: async ({ location }) => {
    if (!  authService.isAuthenticated) {
      throw redirect({
        to: '/login',
        search: {

          redirect: location.href,
        },
      })
    }
  },
})