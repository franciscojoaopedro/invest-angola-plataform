import { createFileRoute } from '@tanstack/react-router'
import Marketplace from '../pages/public/marketplace/Marketplace'

export const Route = createFileRoute('/marketeplace')({
  component: Marketplace,
})


