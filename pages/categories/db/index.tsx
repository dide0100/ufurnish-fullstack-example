// pages/categories/db/index.tsx
// Server-side rendered categories page that fetches data directly from MySQL database
import { GetServerSideProps } from 'next'
import { pool } from '@/lib/db'
import CategoryCard from '@/components/CategoryCard'

type Category = {
  id: string
  name: string
  description: string
  image: string
  productCount: number
}

type Props = { categories: Category[] }

// Categories page component - renders all furniture categories from database
export default function CategoriesDBPage({ categories }: Props) {
  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2.5rem' }}>
        Furniture Categories from DB
      </h1>
      
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
        }}
      >
        {categories.map((cat) => (
          <CategoryCard
            key={cat.id}
            id={cat.id}
            name={cat.name}
            description={cat.description}
            image={cat.image}
            productCount={cat.productCount}
            linkPrefix="/categories/db"
          />
        ))}
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const [rows] = await pool.query('SELECT id, name, description, image, product_count AS productCount FROM categories')
  return { props: { categories: rows } }
}