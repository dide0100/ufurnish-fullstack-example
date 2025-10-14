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
    <Link 
      key={id} 
      href={`${linkPrefix}/${id}`} 
      className="no-underline text-inherit"
    >
      <div className="border border-gray-200 rounded-lg p-4 text-center bg-white cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
        <div className="relative w-full h-48 mb-4">
          <Image
            src={imageSrc}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover rounded-lg"
            priority={priority} // ✅ priority for first image (LCP optimization)
          />
        </div>
        <h3 className="my-2 text-lg font-semibold">{name}</h3>
        <p className="text-xl font-bold text-gray-800 mb-2">€{price}</p>
        <p className={`mb-2 ${stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
          {stock > 0 ? 'In stock' : 'Out of stock'}
        </p>
        <small className="text-gray-600">{retailer}</small>
      </div>
    </Link>
  )
}

export default ProductCardWithLink

