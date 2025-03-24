import { createFileRoute } from '@tanstack/react-router'
import { Login } from '../pages/public/auth/login'
import { authService } from '@/services/authService'

export const Route = createFileRoute('/login')({
  component: Login,
  ssr: true
})
