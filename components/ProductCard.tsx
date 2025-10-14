// /components/ProductCard.tsx
// Reusable presentational component for rendering product info.

import React from 'react'

interface ProductCardProps {
  name: string
  price: number
  stock: number
  image: string
  retailer: string
}

const ProductCard: React.FC<ProductCardProps> = ({ name, price, stock, image, retailer }) => {
  // Ensure image path has leading slash and /img/ prefix
  // Handle different formats: absolute URLs, paths starting with /, and relative paths
  let imageSrc = '/img/placeholder.png'
  if (image) {
    if (image.startsWith('http://') || image.startsWith('https://')) {
      imageSrc = image
    } else if (image.startsWith('/')) {
      imageSrc = image
    } else if (image.startsWith('img/')) {
      imageSrc = `/${image}`
    } else {
      imageSrc = `/img/${image}`
    }
  }
  
  return (
    <div className="border border-gray-200 rounded-lg p-4 text-center bg-white">
      <img src={imageSrc} alt={name} className="w-full h-48 object-cover rounded-lg mb-4" />
      <h3 className="text-lg font-semibold mb-2">{name}</h3>
      <p className="text-xl font-bold text-gray-800 mb-2">€{price}</p>
      <p className={`mb-2 ${stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
        {stock > 0 ? 'In stock' : 'Out of stock'}
      </p>
      <small className="text-gray-600">{retailer}</small>
    </div>
  )
}
export default ProductCard
