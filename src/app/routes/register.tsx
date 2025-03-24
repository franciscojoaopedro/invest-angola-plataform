import { createFileRoute } from '@tanstack/react-router'
import Register from '../pages/public/register/Register'

export const Route = createFileRoute('/register')({
  component: Register,
})


