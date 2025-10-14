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
    <div className="product-card">
      <img src={imageSrc} alt={name} />
      <h3>{name}</h3>
      <p>€{price}</p>
      <p>{stock > 0 ? 'In stock' : 'Out of stock'}</p>
      <small>{retailer}</small>
    </div>
  )
}
export default ProductCard
