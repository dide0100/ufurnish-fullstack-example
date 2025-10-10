// pages/_app.tsx
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import type { ReactElement, ReactNode } from 'react'
import Layout from '../components/Layout'

// Extend Next.js page type to allow per-page layout
export type NextPageWithLayout<P = {}> = AppProps['Component'] & {
  getLayout?: (page: ReactElement) => ReactNode
}

interface MyAppProps extends AppProps {
  Component: NextPageWithLayout
}

export default function MyApp({ Component, pageProps }: MyAppProps) {
  // If a page defines its own layout, use it; otherwise use default Layout
  const getLayout = Component.getLayout || ((page) => <Layout title="" description="" image="">{page}</Layout>)
  return getLayout(<Component {...pageProps} />)
}