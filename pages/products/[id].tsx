// pages/products/[id].tsx
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { GetStaticProps, GetStaticPaths } from 'next'
import type { Product, ApiResponse } from '../../types/product'
import { getBaseUrl } from '../../lib/config'
import productsData from '../../data/products.json'

interface ProductPageProps {
  product: Product
}

export default function ProductPage({ product }: ProductPageProps) {
  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <Link href={`/categories/${product.category}`} style={{ color: '#0066cc', textDecoration: 'none' }}>
        ← Back to {product.category}
      </Link>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '2rem' }}>
        <div>
          <Image
            src={product.image}
            alt={product.name}
            width={400}
            height={400}
            style={{ objectFit: 'cover', borderRadius: '8px' }}
            priority
          />
        </div>
        
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{product.name}</h1>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#333', marginBottom: '1rem' }}>
            €{product.price}
          </p>
          <p style={{ 
            color: product.stock > 0 ? 'green' : 'red', 
            fontWeight: 'bold',
            marginBottom: '1rem'
          }}>
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </p>
          <p style={{ color: '#666', marginBottom: '1rem' }}>
            Sold by: <strong>{product.retailer}</strong>
          </p>
          
          <button 
            style={{
              backgroundColor: product.stock > 0 ? '#007bff' : '#ccc',
              color: 'white',
              padding: '1rem 2rem',
              border: 'none',
              borderRadius: '4px',
              fontSize: '1rem',
              cursor: product.stock > 0 ? 'pointer' : 'not-allowed'
            }}
            disabled={product.stock === 0}
          >
            {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ISR: Generate static pages with revalidation
export const getStaticProps: GetStaticProps<ProductPageProps> = async ({ params }) => {
  const productId = params?.id as string

  if (!productId) {
    return { notFound: true }
  }

  // Fetch product from local API
  const baseUrl = getBaseUrl()
  const res = await fetch(`${baseUrl}/api/v1/product/${productId}`)
  const json: ApiResponse<Product> = await res.json()

  if (!json.success || !json.data) {
    return { notFound: true }
  }

  return {
    props: { product: json.data },
    revalidate: 60, // ISR: revalidate every 60s
  }
}

// Generate paths for all products at build time
export const getStaticPaths: GetStaticPaths = async () => {
  // Get all product IDs from the data
  const paths = productsData.map((product) => ({
    params: { id: product.id },
  }))

  return {
    paths,
    fallback: 'blocking', // Generate new products on first request
  }
}