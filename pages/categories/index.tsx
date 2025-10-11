// pages/categories/index.tsx
import { GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import type { Category, CategoryApiResponse } from '../../types/category'

interface CategoriesPageProps {
  categories: Category[]
}

export default function CategoriesPage({ categories }: CategoriesPageProps) {
  return (
    <div>
      <h1>Furniture Categories</h1>
      <ul>
        {categories.map((cat) => (
          <li key={cat.id} style={{ marginBottom: '1rem' }}>
            <Link href={`/categories/${cat.id}`}>
              <div>
                <Image
                  src={cat.image || '/public/img/placeholder.png'}
                  alt={cat.name}
                  width={300}
                  height={200}
                  className="object-cover rounded-lg"
                />
                <h3>{cat.name}</h3>
                <p>{cat.description}</p>
                <small>{cat.productCount} products</small>
              </div>
            </Link>
          </li>
        ))}
      </ul>
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