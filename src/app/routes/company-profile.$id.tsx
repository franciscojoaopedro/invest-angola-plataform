import { createFileRoute } from '@tanstack/react-router'
import CompanyProfileDetail from '../pages/public/company-profile'

export const Route = createFileRoute('/company-profile/$id')({
  component:CompanyProfileDetail ,
})

