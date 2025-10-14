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
    <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2.5rem' }}>
        Products from DB
      </h1>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '1.5rem',
        }}
      >
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