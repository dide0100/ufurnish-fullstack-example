// pages/categories/index.tsx
import { GetStaticProps } from 'next'
import type { Category, CategoryApiResponse } from '../../types/category'
import CategoryCard from '../../components/CategoryCard'

interface CategoriesPageProps {
  categories: Category[]
}

export default function CategoriesPage({ categories }: CategoriesPageProps) {
  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2.5rem' }}>
        Furniture Categories
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
            {...(cat.description && { description: cat.description })}
            {...(cat.image && { image: cat.image })}
            {...(cat.productCount !== undefined && { productCount: cat.productCount })}
            linkPrefix="/categories"
          />
        ))}
      </div>
    </div>
  )
}

// Use ISR to regenerate every 24 hours (86400 seconds)
export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/categories`)
  const json: CategoryApiResponse = await res.json()

  if (!json.success || !json.data) {
    return { notFound: true }
  }

  return {
    props: { categories: json.data },
    revalidate: 86400,
  }
}