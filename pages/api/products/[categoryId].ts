// This API route acts as a backend layer that standardizes product data
// from multiple retailers before sending it to the frontend.
//
// Example: /api/products/sofas -> returns unified products from different sources.

import type { NextApiRequest, NextApiResponse } from 'next'

// Define a standardized Product interface for the entire app
interface Product {
  id: string
  name: string
  price: number
  stock: number
  category: string
  image: string
  retailer: string
}

// Simulated external data sources (in real case, fetched from APIs)
const sourceA = [
  { id: 'a1', title: 'Modern Sofa', cost: 499, available: true, imageUrl: '/img/sofa1.jpg' },
  { id: 'a2', title: 'Classic Armchair', cost: 299, available: false, imageUrl: '/img/chair1.jpg' }
]

const sourceB = [
  { product_id: 'b1', name: 'Wooden Coffee Table', price_eur: 199, in_stock: true, img: '/img/table1.jpg' }
]

// Helper to normalize data from different retailers into a unified format
function normalizeProducts(category: string): Product[] {
  const normalizedA = sourceA.map(item => ({
    id: item.id,
    name: item.title,
    price: item.cost,
    stock: item.available ? 1 : 0,
    category,
    image: item.imageUrl,
    retailer: 'Retailer A'
  }))

  const normalizedB = sourceB.map(item => ({
    id: item.product_id,
    name: item.name,
    price: item.price_eur,
    stock: item.in_stock ? 1 : 0,
    category,
    image: item.img,
    retailer: 'Retailer B'
  }))

  return [...normalizedA, ...normalizedB]
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Product[]>) {
  const { categoryId } = req.query
  const products = normalizeProducts(String(categoryId))
  res.status(200).json(products)
}