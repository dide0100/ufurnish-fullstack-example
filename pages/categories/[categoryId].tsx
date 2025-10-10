// /pages/categories/[categoryId].tsx
// Uses Incremental Static Regeneration (ISR) for SEO and freshness.
// Fetches from versioned API endpoint (/api/v1/products/:categoryId).
// Handles both build-time generation and runtime revalidation.

import type { GetStaticPaths, GetStaticProps } from 'next'
import { useState } from 'react'
import type { Product, ApiResponse } from '../../types/product.js'

interface CategoryPageProps {
  categoryId: string
  products: Product[]
}

export default function CategoryPage({ categoryId, products }: CategoryPageProps) {
  const [productList, setProductList] = useState(products)

  return (
    <>
      <head>
        <title>{categoryId} - Furniture Collection | ufurnish.com</title>
        <meta
          name="description"
          content={`Explore ${categoryId} products from top furniture retailers.`}
        />
        <meta property="og:title" content={`${categoryId} - Furniture on ufurnish.com`} />
        <meta
          property="og:description"
          content={`Discover ${products.length} ${categoryId} products from leading brands.`}
        />
      </head>

      <main>
        <h1>{categoryId}</h1>
        <div className="product-grid">
          {productList.map(p => (
            <div key={p.id} className="product-card">
              <img src={p.image} alt={p.name} />
              <h3>{p.name}</h3>
              <p>€{p.price}</p>
              <p>{p.stock > 0 ? 'In stock' : 'Out of stock'}</p>
              <small>{p.retailer}</small>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}

// Statically generate paths for known categories
export const getStaticPaths: GetStaticPaths = async () => {
  const categories = ['sofas', 'tables', 'chairs']
  const paths = categories.map(cat => ({ params: { categoryId: cat } }))
  return { paths, fallback: 'blocking' }
}

// ISR: pre-render + revalidate every 60s
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const categoryId = params?.categoryId as string

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products/${categoryId}`)
  const json: ApiResponse<Product[]> = await res.json()

  if (!json.success || !json.data) {
    return { notFound: true }
  }

  return {
    props: { categoryId, products: json.data },
    revalidate: 60
  }
}