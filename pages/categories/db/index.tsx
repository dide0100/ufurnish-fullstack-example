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
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-center mb-8 text-4xl font-bold">
        Furniture Categories from DB
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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