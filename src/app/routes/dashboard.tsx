import { createFileRoute } from '@tanstack/react-router'
import Dashboard from '../pages/private/dashboard'

export const Route = createFileRoute('/dashboard')({
  component: Dashboard,
  codeSplitGroupings: []
})

