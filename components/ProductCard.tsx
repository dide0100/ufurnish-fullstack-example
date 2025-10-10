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

const ProductCard: React.FC<ProductCardProps> = ({ name, price, stock, image, retailer }) => (
  <div className="product-card">
    <img src={image} alt={name} />
    <h3>{name}</h3>
    <p>€{price}</p>
    <p>{stock > 0 ? 'In stock' : 'Out of stock'}</p>
    <small>{retailer}</small>
  </div>
)

export default ProductCard