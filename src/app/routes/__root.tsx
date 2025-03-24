import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { Navbar } from '../components/Navbar'
import router from '@/routes'
import Footer from '../components/footer'

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