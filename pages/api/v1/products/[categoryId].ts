// /pages/api/v1/products/[categoryId].ts
// Versioned REST API route following common design principles:
// - Naming: /api/v1/products/:categoryId
// - Versioning: "v1" allows safe evolution of API without breaking clients
// - Error Handling: All responses return consistent JSON envelopes
// - Validation: Rejects invalid category IDs with 400 responses

import type { NextApiRequest, NextApiResponse } from 'next'
import type { Product, ApiResponse } from '../../../../types/product.ts'

// Simulated external sources (would normally be fetched from live APIs)
const sourceA = [
  { id: 'a1', title: 'Modern Sofa', cost: 499, available: true, imageUrl: '/img/sofa1.jpg' },
  { id: 'a2', title: 'Classic Armchair', cost: 299, available: false, imageUrl: '/img/chair1.jpg' }
]

const sourceB = [
  { product_id: 'b1', name: 'Wooden Coffee Table', price_eur: 199, in_stock: true, img: '/img/table1.jpg' }
]

// Utility: normalize retailer data into the unified Product format
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<Product[]>>
) {
  try {
    const { categoryId } = req.query

    // Validation: ensure a valid category is provided
    if (!categoryId || typeof categoryId !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Invalid or missing categoryId parameter.'
      })
    }

    // Method check (only allow GET)
    if (req.method !== 'GET') {
      return res.status(405).json({
        success: false,
        error: `Method ${req.method} not allowed. Use GET instead.`
      })
    }

    // Simulate external fetch (could be Promise.all for multiple APIs)
    const products = normalizeProducts(categoryId)

    // Example: simulate no products found
    if (products.length === 0) {
      return res.status(404).json({
        success: false,
        error: `No products found for category: ${categoryId}`
      })
    }

    // Success: return normalized data
    res.status(200).json({
      success: true,
      data: products
    })
  } catch (err) {
    // Fallback: global error handling
    console.error('API Error:', err)
    res.status(500).json({
      success: false,
      error: 'Internal server error. Please try again later.'
    })
  }
}