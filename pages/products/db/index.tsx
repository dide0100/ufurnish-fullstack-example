// pages/products/db/index.tsx
// Server-side rendered products page that fetches data directly from MySQL database
import { GetServerSideProps } from 'next'
import { pool } from '@/lib/db'
import ProductCardWithLink from '@/components/ProductCardWithLink'

type Product = {
  id: number
  category: string
  name: string
  description: string
  price: number
  image: string
  stock: number
  retailer: string
}

type Props = { products: Product[] }

// Products page component - renders all products from database
export default function ProductsDBPage({ products }: Props) {
  return (
    <main className="p-8 max-w-6xl mx-auto">
      <h1 className="text-center mb-8 text-4xl font-bold">
        Products from DB
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p, index) => (
          <ProductCardWithLink
            key={p.id}
            id={p.id}
            name={p.name}
            price={p.price}
            stock={p.stock}
            image={p.image}
            retailer={p.retailer}
            linkPrefix="/products/db"
            priority={index === 0}
          />
        ))}
      </div>
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const [rows] = await pool.query(`
    SELECT id, category_id AS category, name, description, price, image, stock, retailer
    FROM products
  `)
  return { props: { products: rows } }
}