import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from '@tanstack/react-router'
import router from './routes'
import QueryProvider from './providers/queryProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryProvider >

    <RouterProvider  router={router} />

    </QueryProvider>

  </StrictMode>,
)
