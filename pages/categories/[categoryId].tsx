// /pages/categories/[categoryId].tsx
// Uses Incremental Static Regeneration (ISR) for SEO and freshness.
// Fetches from versioned API endpoint (/api/v1/products/:categoryId).
// Uses next/image for optimized image loading.
// Handles both build-time generation and runtime revalidation.

import type { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import { useState } from 'react'
import type { Product, ApiResponse } from '../../types/product.js'
import { getBaseUrl } from '../../lib/config'
import path from 'path'
import { Category } from '../../types/category.js'

interface CategoryPageProps {
  categoryId: string
  products: Product[]
}

// Dynamic metadata generation for SEO (Next.js 15+)
export async function generateMetadata({ params }: { params: { categoryId: string } }) {
  const categoryId = params.categoryId
  return {
    title: `${categoryId} - Furniture Collection | ufurnish.com`,
    description: `Explore ${categoryId} products from top furniture retailers.`,
    openGraph: {
      title: `${categoryId} - Furniture on ufurnish.com`,
      description: `Discover beautiful ${categoryId} products from leading brands.`,
      images: ['/img/og-default.jpg'],
    },
    twitter: {
      card: 'summary_large_image',
    },
  }
}

// Category Page Component
export default function CategoryPage({ categoryId, products }: CategoryPageProps) {
  const [productList] = useState(products)

  return (
    <main style={{ padding: '1rem' }}>
      <h1 style={{ textTransform: 'capitalize' }}>{categoryId}</h1>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '1.5rem',
          marginTop: '1rem',
        }}
      >
        {productList.map((p) => (
          <div
            key={p.id}
            style={{
              border: '1px solid #eee',
              borderRadius: '8px',
              padding: '1rem',
              textAlign: 'center',
              background: '#fff',
            }}
          >
            <div style={{ position: 'relative', width: '100%', height: '200px' }}>
              <Image
                src={p.image || '/img/placeholder.png'}
                alt={p.name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                style={{ objectFit: 'cover', borderRadius: '8px' }}
              />
            </div>
            <h3 style={{ margin: '0.5rem 0' }}>{p.name}</h3>
            <p>€{p.price}</p>
            <p style={{ color: p.stock > 0 ? 'green' : 'red' }}>
              {p.stock > 0 ? 'In stock' : 'Out of stock'}
            </p>
            <small>{p.retailer}</small>
          </div>
        ))}
      </div>
    </main>
  )
}

// ✅ Dynamically generate paths from categories.json
export const getStaticPaths: GetStaticPaths = async () => {
  const fs = await import('fs');
  const path = await import('path');
  
  const filePath = path.join(process.cwd(), 'data', 'categories.json');
  const fileContents = fs.readFileSync(filePath, 'utf-8');
  type Category = { id: string };
  const categories: Category[] = JSON.parse(fileContents);

  const paths = categories.map((cat) => ({
    params: { categoryId: cat.id },
  }))

  return {
    paths,
    fallback: 'blocking', // allow ISR fallback for new categories
  }
}

// ISR: pre-render + revalidate every 60s
// ✅ Fetch category-specific products from your mock API route
export const getStaticProps: GetStaticProps<CategoryPageProps> = async ({ params }) => {
  const fs = await import('fs')
  const path = await import('path')
  const categoryId = params?.categoryId as string

  // Load category info locally
  const categoriesPath = path.join(process.cwd(), 'data', 'categories.json')
  const categories: Category[] = JSON.parse(fs.readFileSync(categoriesPath, 'utf-8'))
  const category = categories.find((c) => c.id === categoryId)

  if (!category) {
    return { notFound: true }
  }

  // Fetch products for that category from local API route
  const baseUrl = getBaseUrl()
  const res = await fetch(`${baseUrl}/api/v1/products/${categoryId}`)
  const json: ApiResponse<Product[]> = await res.json()

  if (!json.success || !json.data) {
    return { notFound: true }
  }

  return {
    props: {
      categoryId,
      products: json.data,
    },
    revalidate: 60, // ISR: revalidate every 60s
  }
}