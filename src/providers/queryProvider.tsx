import React from "react"
import {

    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

interface QueryProviderProps {
    children: React.ReactNode
}

const queryClient = new QueryClient()

export default function QueryProvider({
    children

}: QueryProviderProps) {





    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools  />
        </QueryClientProvider>
    )
}