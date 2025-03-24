import { createFileRoute } from '@tanstack/react-router'
import CompanyDetail from '../pages/public/company-detail'

export const Route = createFileRoute('/company-detail/$id')({
  component: CompanyDetail,
})


