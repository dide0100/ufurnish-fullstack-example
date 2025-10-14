// /components/CategoryCard.tsx
// Reusable presentational component for rendering category card.

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface CategoryCardProps {
  id: string
  name: string
  description?: string
  image?: string
  productCount?: number
  linkPrefix?: string
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  id,
  name,
  description,
  image,
  productCount,
  linkPrefix = '/categories'
}) => {
  // Ensure image path has leading slash and /img/ prefix for Next.js Image component
  // Handle different formats: absolute URLs, paths starting with /, and relative paths
  let imageSrc = '/img/placeholder.png'
  if (image) {
    if (image.startsWith('http://') || image.startsWith('https://')) {
      // Absolute URL
      imageSrc = image
    } else if (image.startsWith('/')) {
      // Already has leading slash
      imageSrc = image
    } else if (image.startsWith('img/')) {
      // Has img/ prefix but no leading slash
      imageSrc = `/${image}`
    } else {
      // Relative path, add /img/ prefix
      imageSrc = `/img/${image}`
    }
  }

  return (
    <Link key={id} href={`${linkPrefix}/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
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
            src={imageSrc}
            alt={name}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, 50vw"
            priority // ✅ preloads the main category image
          />
        </div>
        <div style={{ padding: '1.5rem' }}>
          <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.5rem' }}>{name}</h3>
          {description && <p style={{ color: '#666', marginBottom: '1rem' }}>{description}</p>}
          {productCount !== undefined && (
            <small style={{ color: '#999', fontWeight: 'bold' }}>
              {productCount} products available
            </small>
          )}
        </div>
      </div>
    </Link>
  )
}

export default CategoryCard

