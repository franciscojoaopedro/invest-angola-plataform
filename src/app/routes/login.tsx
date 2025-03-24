import { createFileRoute } from '@tanstack/react-router'
import { Login } from '../pages/public/auth/login'

export const Route = createFileRoute('/login')({
  component: Login,
  ssr: true
})
