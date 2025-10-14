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
    <Link 
      key={id} 
      href={`${linkPrefix}/${id}`} 
      className="no-underline text-inherit"
    >
      <div className="border border-gray-200 rounded-xl overflow-hidden bg-white cursor-pointer transition-all duration-200 shadow-md hover:shadow-2xl hover:-translate-y-1">
        <div className="relative w-full h-48">
          <Image
            src={imageSrc}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority // ✅ preloads the main category image
          />
        </div>
        <div className="p-6">
          <h3 className="m-0 mb-2 text-2xl">{name}</h3>
          {description && <p className="text-gray-600 mb-4">{description}</p>}
          {productCount !== undefined && (
            <small className="text-gray-500 font-bold">
              {productCount} products available
            </small>
          )}
        </div>
      </div>
    </Link>
  )
}

export default CategoryCard

