import { createFileRoute } from '@tanstack/react-router'
import CompanyListing from '../pages/public/company-listing'

export const Route = createFileRoute('/company-listing')({
  component: CompanyListing,
  codeSplitGroupings: []
})

