// /pages/categories/db/[categoryId].tsx
// Server-side rendered category detail page with products.
// Fetches data directly from MySQL database using pool queries.
// Uses next/image for optimized image loading.

import { GetServerSideProps } from 'next'
import Image from 'next/image'
import { useState } from 'react'
import { pool } from '@/lib/db'
import type { Category } from '@/types/category'
import type { Product } from '@/types/product'
import ProductCardWithLink from '@/components/ProductCardWithLink'

interface CategoryPageProps {
  category: Category
  products: Product[]
}

// Category Page Component - displays category banner and products from database
export default function CategoryDBPage({ category, products }: CategoryPageProps) {
  const [productList] = useState(products)

  return (
    <main style={{ padding: '1rem' }}>
      {/* Category banner image (priority for LCP) */}
      <div style={{ position: 'relative', width: '100%', height: '400px', marginBottom: '1rem' }}>
         <Image
           src={category.image ? `/${category.image}` : '/img/placeholder.png'}
           alt={category.name}
           fill
           style={{ objectFit: 'cover', borderRadius: '8px' }}
           priority // ✅ preloads the main category image
         />
      </div>

      <h1 style={{ textTransform: 'capitalize' }}>{category.name}</h1>
      <p>{category.description}</p>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '1.5rem',
          marginTop: '1rem',
        }}
      >
          {productList.map((p, index) => (
            <ProductCardWithLink
              key={p.id}
              id={p.id}
              name={p.name}
              price={p.price}
              stock={p.stock}
              image={p.image}
              retailer={p.retailer}
              linkPrefix="/products/db"
              priority={index === 0} // ✅ priority for first image (LCP optimization)
            />
          ))}
      </div>
    </main>
  )
}

// Server-side data fetching - fetches category and products from MySQL database
export const getServerSideProps: GetServerSideProps<CategoryPageProps> = async ({ params }) => {
  const categoryId = params?.categoryId as string

  // Fetch category info from DB
  const [categoryRows] = await pool.query(
    'SELECT id, name, description, image, product_count AS productCount FROM categories WHERE id = ?',
    [categoryId]
  )
  const categories = categoryRows as Category[]
  
  if (!categories.length || !categories[0]) {
    return { notFound: true }
  }

  const category: Category = categories[0]

  // Fetch products for that category from DB
  const [productRows] = await pool.query(
    `SELECT id, category_id AS category, name, description, price, image, stock, retailer 
     FROM products 
     WHERE category_id = ?`,
    [categoryId]
  )

  return {
    props: { 
      category, 
      products: productRows as Product[]
    }
  }
}
