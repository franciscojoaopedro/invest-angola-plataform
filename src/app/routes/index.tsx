import { createFileRoute } from '@tanstack/react-router'
import Home from '../pages/public/home/Home'
import { authService } from '@/services/authService'

export const Route = createFileRoute('/')({
  component: Home,
 
})

