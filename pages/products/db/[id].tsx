// pages/products/db/[id].tsx
// Server-side rendered product detail page that fetches data directly from MySQL database
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { GetServerSideProps } from 'next'
import { pool } from '@/lib/db'
import type { Product } from '@/types/product'

interface ProductPageProps {
  product: Product
}

// Product detail page component - displays full product information from database
export default function ProductDBPage({ product }: ProductPageProps) {
  // Ensure image path has leading slash and /img/ prefix for Next.js Image component
  // Handle different formats: absolute URLs, paths starting with /, and relative paths
  let imageSrc = '/img/placeholder.png'
  if (product.image) {
    if (product.image.startsWith('http://') || product.image.startsWith('https://')) {
      imageSrc = product.image
    } else if (product.image.startsWith('/')) {
      imageSrc = product.image
    } else if (product.image.startsWith('img/')) {
      imageSrc = `/${product.image}`
    } else {
      imageSrc = `/img/${product.image}`
    }
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <Link href={`/categories/db/${product.category}`} style={{ color: '#0066cc', textDecoration: 'none' }}>
        ← Back to {product.category}
      </Link>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '2rem' }}>
        <div>
          <Image
            src={imageSrc}
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

// Server-side data fetching - fetches product from MySQL database
export const getServerSideProps: GetServerSideProps<ProductPageProps> = async ({ params }) => {
  const productId = params?.id as string

  const [rows] = await pool.query(
    `SELECT id, category_id AS category, name, description, price, image, stock, retailer
     FROM products 
     WHERE id = ?`,
    [productId]
  )
  
  const products = rows as Product[]

  if (!products.length || !products[0]) {
    return { notFound: true }
  }

  return {
    props: { product: products[0]! }
  }
}

