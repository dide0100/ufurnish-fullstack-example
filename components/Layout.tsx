// components/Layout.tsx
import Head from 'next/head'
import type { ReactNode } from 'react'
import TopMenu from './TopMenu'

interface LayoutProps {
  children: ReactNode
  title?: string
  description?: string
  image?: string
}

export default function Layout({
  children,
  title,
  description,
  image,
}: LayoutProps) {
  const defaultTitle = 'ufurnish.com – Discover Furniture Online'
  const defaultDescription = 'Compare and discover furniture from top UK retailers.'
  const defaultImage = 'https://via.placeholder.com/600x400?text=ufurnish'

  return (
    <>
      <Head>
        <title>{title || defaultTitle}</title>
        <meta name="description" content={description || defaultDescription} />
        <meta property="og:title" content={title || defaultTitle} />
        <meta property="og:description" content={description || defaultDescription} />
        <meta property="og:image" content={image || defaultImage} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <header className="bg-gray-100">
        <div className="p-4 max-w-7xl mx-auto">
          <h2 className="m-0 text-2xl font-semibold">ufurnish.com</h2>
        </div>
        <TopMenu />
      </header>

      <main className="p-4">{children}</main>

      <footer className="mt-8 p-4 bg-gray-50 text-center">
        <small>© {new Date().getFullYear()} ufurnish.com</small>
      </footer>
    </>
  )
}