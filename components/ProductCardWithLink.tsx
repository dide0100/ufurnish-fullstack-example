// /components/ProductCardWithLink.tsx
// Reusable presentational component for rendering product card with link and Next.js Image optimization.

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface ProductCardWithLinkProps {
  id: string | number
  name: string
  price: number
  stock: number
  image: string
  retailer: string
  linkPrefix?: string
  priority?: boolean
}

const ProductCardWithLink: React.FC<ProductCardWithLinkProps> = ({
  id,
  name,
  price,
  stock,
  image,
  retailer,
  linkPrefix = '/products',
  priority = false
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
          borderRadius: '8px',
          padding: '1rem',
          textAlign: 'center',
          background: '#fff',
          cursor: 'pointer',
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)'
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = 'none'
        }}
      >
        <div style={{ position: 'relative', width: '100%', height: '200px' }}>
          <Image
            src={imageSrc}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            style={{ objectFit: 'cover', borderRadius: '8px' }}
            priority={priority} // ✅ priority for first image (LCP optimization)
          />
        </div>
        <h3 style={{ margin: '0.5rem 0' }}>{name}</h3>
        <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#333' }}>€{price}</p>
        <p style={{ color: stock > 0 ? 'green' : 'red' }}>
          {stock > 0 ? 'In stock' : 'Out of stock'}
        </p>
        <small style={{ color: '#666' }}>{retailer}</small>
      </div>
    </Link>
  )
}

export default ProductCardWithLink

