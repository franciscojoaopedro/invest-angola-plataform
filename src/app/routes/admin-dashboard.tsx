import { createFileRoute } from '@tanstack/react-router'
import AdminDashboard from '../pages/private/admin-dashboard'

export const Route = createFileRoute('/admin-dashboard')({
  component: AdminDashboard,
})

