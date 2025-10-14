// pages/categories/index.tsx
import { GetStaticProps } from 'next'
import type { Category, CategoryApiResponse } from '../../types/category'
import CategoryCard from '../../components/CategoryCard'

interface CategoriesPageProps {
  categories: Category[]
}

export default function CategoriesPage({ categories }: CategoriesPageProps) {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-center mb-8 text-4xl font-bold">
        Furniture Categories
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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