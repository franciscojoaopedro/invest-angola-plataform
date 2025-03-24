import { createFileRoute } from '@tanstack/react-router'
import { Signup } from '../pages/public/auth/signup'

export const Route = createFileRoute('/signup')({
  component: Signup,
})


