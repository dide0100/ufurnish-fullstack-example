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

// Product detail page component - displays full product information
export default function ProductPage({ product }: ProductPageProps) {
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
    <div className="p-8 max-w-4xl mx-auto">
      <Link href={`/categories/${product.category}`} className="text-blue-600 hover:text-blue-800 no-underline inline-block mb-6">
        ← Back to {product.category}
      </Link>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <div>
          <Image
            src={imageSrc}
            alt={product.name}
            width={400}
            height={400}
            className="object-cover rounded-lg w-full"
            priority
          />
        </div>
        
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-2xl font-bold text-gray-800 mb-4">
            €{product.price}
          </p>
          <p className={`font-bold mb-4 ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </p>
          <p className="text-gray-600 mb-4">
            Sold by: <strong>{product.retailer}</strong>
          </p>
          
          <button 
            className={`px-8 py-4 text-white rounded border-none text-base transition-colors ${
              product.stock > 0 
                ? 'bg-blue-600 hover:bg-blue-700 cursor-pointer' 
                : 'bg-gray-400 cursor-not-allowed'
            }`}
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