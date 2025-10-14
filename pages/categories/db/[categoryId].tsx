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
  const bannerImage = category.image ? `${category.image.replace('.jpg', '_banner.jpg')}` : '/img/placeholder.png'
  return (
    <main className="p-4">
      {/* Category banner image (priority for LCP) */}
      <div className="relative w-full h-96 mb-4">
         <Image
            src={category.image ? `/${bannerImage}` : '/img/placeholder.png'}
           alt={category.name}
           fill
           className="object-cover rounded-lg"
           priority // ✅ preloads the main category image
         />
      </div>

      <h1 className="capitalize text-4xl font-bold mb-4">{category.name}</h1>
      <p className="text-gray-700 mb-6">{category.description}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
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
