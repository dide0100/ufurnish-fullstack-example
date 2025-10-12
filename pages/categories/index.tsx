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
          <Link key={cat.id} href={`/categories/${cat.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div
              style={{
                border: '1px solid #eee',
                borderRadius: '12px',
                overflow: 'hidden',
                background: '#fff',
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)'
              }}
            >
              <div style={{ position: 'relative', width: '100%', height: '200px' }}>
                <Image
                  src={cat.image ? `${cat.image}` : '/img/placeholder.png'}
                  alt={cat.name}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority // ✅ preloads the main category image
                />
              </div>
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.5rem' }}>{cat.name}</h3>
                <p style={{ color: '#666', marginBottom: '1rem' }}>{cat.description}</p>
                <small style={{ color: '#999', fontWeight: 'bold' }}>
                  {cat.productCount} products available
                </small>
              </div>
            </div>
          </Link>
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