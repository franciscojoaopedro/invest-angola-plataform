import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import router from '@/routes'
import Footer from '../components/footer'
import { Navbar } from '../components/header'

export const Route = createRootRoute({
  component: () => (
    <>

      <Navbar />
      <Outlet />
      <Footer/>
      <TanStackRouterDevtools
      router={router}

      />
    </>
  ),
})