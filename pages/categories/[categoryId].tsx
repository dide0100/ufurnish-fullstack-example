// This page statically generates a category page (SEO-friendly)
// and revalidates every 60 seconds to keep data fresh.
// It fetches standardized product data from our unified API.

import type { GetStaticPaths, GetStaticProps } from 'next'
import { useState } from 'react'

interface Product {
  id: string
  name: string
  price: number
  stock: number
  category: string
  image: string
  retailer: string
}

interface CategoryPageProps {
  categoryId: string
  products: Product[]
}

export default function CategoryPage({ categoryId, products }: CategoryPageProps) {
  const [productList, setProductList] = useState(products)

  return (
    <>
      <head>
        {/* Dynamic metadata for SEO */}
        <title>{categoryId} - Furniture Collection | ufurnish.com</title>
        <meta name="description" content={`Explore ${categoryId} products from top retailers.`} />
        <meta property="og:title" content={`${categoryId} - Furniture on ufurnish.com`} />
        <meta property="og:description" content={`Discover ${products.length} ${categoryId} products`} />
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

// Generate static paths for known categories
export const getStaticPaths: GetStaticPaths = async () => {
  const categories = ['sofas', 'tables', 'chairs']
  const paths = categories.map(cat => ({ params: { categoryId: cat } }))
  return { paths, fallback: 'blocking' }
}

// Statically generate page + revalidate every 60s
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const categoryId = params?.categoryId as string
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${categoryId}`)
  const products: Product[] = await res.json()

  return {
    props: { categoryId, products },
    revalidate: 60 // ISR - rebuild every 60 seconds
  }
}