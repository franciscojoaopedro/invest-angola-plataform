/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './app/routes/__root'
import { Route as SignupImport } from './app/routes/signup'
import { Route as RegisterImport } from './app/routes/register'
import { Route as MarketeplaceImport } from './app/routes/marketeplace'
import { Route as LoginImport } from './app/routes/login'
import { Route as ListCompanyImport } from './app/routes/list-company'
import { Route as InvestDashboardImport } from './app/routes/invest-dashboard'
import { Route as DashboardImport } from './app/routes/dashboard'
import { Route as CompanyListingImport } from './app/routes/company-listing'
import { Route as CompaniesImport } from './app/routes/companies'
import { Route as AdminDashboardImport } from './app/routes/admin-dashboard'
import { Route as AuthenticatedImport } from './app/routes/_authenticated'
import { Route as IndexImport } from './app/routes/index'
import { Route as CompanyProfileIdImport } from './app/routes/company-profile.$id'
import { Route as CompanyDetailIdImport } from './app/routes/company-detail.$id'

// Create/Update Routes

const SignupRoute = SignupImport.update({
  id: '/signup',
  path: '/signup',
  getParentRoute: () => rootRoute,
} as any)

const RegisterRoute = RegisterImport.update({
  id: '/register',
  path: '/register',
  getParentRoute: () => rootRoute,
} as any)

const MarketeplaceRoute = MarketeplaceImport.update({
  id: '/marketeplace',
  path: '/marketeplace',
  getParentRoute: () => rootRoute,
} as any)

const LoginRoute = LoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const ListCompanyRoute = ListCompanyImport.update({
  id: '/list-company',
  path: '/list-company',
  getParentRoute: () => rootRoute,
} as any)

const InvestDashboardRoute = InvestDashboardImport.update({
  id: '/invest-dashboard',
  path: '/invest-dashboard',
  getParentRoute: () => rootRoute,
} as any)

const DashboardRoute = DashboardImport.update({
  id: '/dashboard',
  path: '/dashboard',
  getParentRoute: () => rootRoute,
} as any)

const CompanyListingRoute = CompanyListingImport.update({
  id: '/company-listing',
  path: '/company-listing',
  getParentRoute: () => rootRoute,
} as any)

const CompaniesRoute = CompaniesImport.update({
  id: '/companies',
  path: '/companies',
  getParentRoute: () => rootRoute,
} as any)

const AdminDashboardRoute = AdminDashboardImport.update({
  id: '/admin-dashboard',
  path: '/admin-dashboard',
  getParentRoute: () => rootRoute,
} as any)

const AuthenticatedRoute = AuthenticatedImport.update({
  id: '/_authenticated',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const CompanyProfileIdRoute = CompanyProfileIdImport.update({
  id: '/company-profile/$id',
  path: '/company-profile/$id',
  getParentRoute: () => rootRoute,
} as any)

const CompanyDetailIdRoute = CompanyDetailIdImport.update({
  id: '/company-detail/$id',
  path: '/company-detail/$id',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/_authenticated': {
      id: '/_authenticated'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthenticatedImport
      parentRoute: typeof rootRoute
    }
    '/admin-dashboard': {
      id: '/admin-dashboard'
      path: '/admin-dashboard'
      fullPath: '/admin-dashboard'
      preLoaderRoute: typeof AdminDashboardImport
      parentRoute: typeof rootRoute
    }
    '/companies': {
      id: '/companies'
      path: '/companies'
      fullPath: '/companies'
      preLoaderRoute: typeof CompaniesImport
      parentRoute: typeof rootRoute
    }
    '/company-listing': {
      id: '/company-listing'
      path: '/company-listing'
      fullPath: '/company-listing'
      preLoaderRoute: typeof CompanyListingImport
      parentRoute: typeof rootRoute
    }
    '/dashboard': {
      id: '/dashboard'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof DashboardImport
      parentRoute: typeof rootRoute
    }
    '/invest-dashboard': {
      id: '/invest-dashboard'
      path: '/invest-dashboard'
      fullPath: '/invest-dashboard'
      preLoaderRoute: typeof InvestDashboardImport
      parentRoute: typeof rootRoute
    }
    '/list-company': {
      id: '/list-company'
      path: '/list-company'
      fullPath: '/list-company'
      preLoaderRoute: typeof ListCompanyImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/marketeplace': {
      id: '/marketeplace'
      path: '/marketeplace'
      fullPath: '/marketeplace'
      preLoaderRoute: typeof MarketeplaceImport
      parentRoute: typeof rootRoute
    }
    '/register': {
      id: '/register'
      path: '/register'
      fullPath: '/register'
      preLoaderRoute: typeof RegisterImport
      parentRoute: typeof rootRoute
    }
    '/signup': {
      id: '/signup'
      path: '/signup'
      fullPath: '/signup'
      preLoaderRoute: typeof SignupImport
      parentRoute: typeof rootRoute
    }
    '/company-detail/$id': {
      id: '/company-detail/$id'
      path: '/company-detail/$id'
      fullPath: '/company-detail/$id'
      preLoaderRoute: typeof CompanyDetailIdImport
      parentRoute: typeof rootRoute
    }
    '/company-profile/$id': {
      id: '/company-profile/$id'
      path: '/company-profile/$id'
      fullPath: '/company-profile/$id'
      preLoaderRoute: typeof CompanyProfileIdImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '': typeof AuthenticatedRoute
  '/admin-dashboard': typeof AdminDashboardRoute
  '/companies': typeof CompaniesRoute
  '/company-listing': typeof CompanyListingRoute
  '/dashboard': typeof DashboardRoute
  '/invest-dashboard': typeof InvestDashboardRoute
  '/list-company': typeof ListCompanyRoute
  '/login': typeof LoginRoute
  '/marketeplace': typeof MarketeplaceRoute
  '/register': typeof RegisterRoute
  '/signup': typeof SignupRoute
  '/company-detail/$id': typeof CompanyDetailIdRoute
  '/company-profile/$id': typeof CompanyProfileIdRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '': typeof AuthenticatedRoute
  '/admin-dashboard': typeof AdminDashboardRoute
  '/companies': typeof CompaniesRoute
  '/company-listing': typeof CompanyListingRoute
  '/dashboard': typeof DashboardRoute
  '/invest-dashboard': typeof InvestDashboardRoute
  '/list-company': typeof ListCompanyRoute
  '/login': typeof LoginRoute
  '/marketeplace': typeof MarketeplaceRoute
  '/register': typeof RegisterRoute
  '/signup': typeof SignupRoute
  '/company-detail/$id': typeof CompanyDetailIdRoute
  '/company-profile/$id': typeof CompanyProfileIdRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/_authenticated': typeof AuthenticatedRoute
  '/admin-dashboard': typeof AdminDashboardRoute
  '/companies': typeof CompaniesRoute
  '/company-listing': typeof CompanyListingRoute
  '/dashboard': typeof DashboardRoute
  '/invest-dashboard': typeof InvestDashboardRoute
  '/list-company': typeof ListCompanyRoute
  '/login': typeof LoginRoute
  '/marketeplace': typeof MarketeplaceRoute
  '/register': typeof RegisterRoute
  '/signup': typeof SignupRoute
  '/company-detail/$id': typeof CompanyDetailIdRoute
  '/company-profile/$id': typeof CompanyProfileIdRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | ''
    | '/admin-dashboard'
    | '/companies'
    | '/company-listing'
    | '/dashboard'
    | '/invest-dashboard'
    | '/list-company'
    | '/login'
    | '/marketeplace'
    | '/register'
    | '/signup'
    | '/company-detail/$id'
    | '/company-profile/$id'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | ''
    | '/admin-dashboard'
    | '/companies'
    | '/company-listing'
    | '/dashboard'
    | '/invest-dashboard'
    | '/list-company'
    | '/login'
    | '/marketeplace'
    | '/register'
    | '/signup'
    | '/company-detail/$id'
    | '/company-profile/$id'
  id:
    | '__root__'
    | '/'
    | '/_authenticated'
    | '/admin-dashboard'
    | '/companies'
    | '/company-listing'
    | '/dashboard'
    | '/invest-dashboard'
    | '/list-company'
    | '/login'
    | '/marketeplace'
    | '/register'
    | '/signup'
    | '/company-detail/$id'
    | '/company-profile/$id'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AuthenticatedRoute: typeof AuthenticatedRoute
  AdminDashboardRoute: typeof AdminDashboardRoute
  CompaniesRoute: typeof CompaniesRoute
  CompanyListingRoute: typeof CompanyListingRoute
  DashboardRoute: typeof DashboardRoute
  InvestDashboardRoute: typeof InvestDashboardRoute
  ListCompanyRoute: typeof ListCompanyRoute
  LoginRoute: typeof LoginRoute
  MarketeplaceRoute: typeof MarketeplaceRoute
  RegisterRoute: typeof RegisterRoute
  SignupRoute: typeof SignupRoute
  CompanyDetailIdRoute: typeof CompanyDetailIdRoute
  CompanyProfileIdRoute: typeof CompanyProfileIdRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AuthenticatedRoute: AuthenticatedRoute,
  AdminDashboardRoute: AdminDashboardRoute,
  CompaniesRoute: CompaniesRoute,
  CompanyListingRoute: CompanyListingRoute,
  DashboardRoute: DashboardRoute,
  InvestDashboardRoute: InvestDashboardRoute,
  ListCompanyRoute: ListCompanyRoute,
  LoginRoute: LoginRoute,
  MarketeplaceRoute: MarketeplaceRoute,
  RegisterRoute: RegisterRoute,
  SignupRoute: SignupRoute,
  CompanyDetailIdRoute: CompanyDetailIdRoute,
  CompanyProfileIdRoute: CompanyProfileIdRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/_authenticated",
        "/admin-dashboard",
        "/companies",
        "/company-listing",
        "/dashboard",
        "/invest-dashboard",
        "/list-company",
        "/login",
        "/marketeplace",
        "/register",
        "/signup",
        "/company-detail/$id",
        "/company-profile/$id"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/_authenticated": {
      "filePath": "_authenticated.tsx"
    },
    "/admin-dashboard": {
      "filePath": "admin-dashboard.tsx"
    },
    "/companies": {
      "filePath": "companies.tsx"
    },
    "/company-listing": {
      "filePath": "company-listing.tsx"
    },
    "/dashboard": {
      "filePath": "dashboard.tsx"
    },
    "/invest-dashboard": {
      "filePath": "invest-dashboard.tsx"
    },
    "/list-company": {
      "filePath": "list-company.tsx"
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/marketeplace": {
      "filePath": "marketeplace.tsx"
    },
    "/register": {
      "filePath": "register.tsx"
    },
    "/signup": {
      "filePath": "signup.tsx"
    },
    "/company-detail/$id": {
      "filePath": "company-detail.$id.tsx"
    },
    "/company-profile/$id": {
      "filePath": "company-profile.$id.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
