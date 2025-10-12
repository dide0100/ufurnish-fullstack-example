// /pages/api/v1/product/[id].ts
// API endpoint for fetching individual products by ID

import type { NextApiRequest, NextApiResponse } from 'next'
import type { Product, ApiResponse } from '../../../../types/product.ts'
import productsData from '../../../../data/products.json'

export default function handler(req: NextApiRequest, res: NextApiResponse<ApiResponse<Product>>) {
  const { id } = req.query

  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    return res
      .status(405)
      .json({ success: false, error: `Method ${req.method} not allowed.` })
  }

  if (!id || typeof id !== 'string') {
    return res
      .status(400)
      .json({ success: false, error: 'Missing or invalid product ID parameter.' })
  }
debugger;
  // Find the specific product by ID
  const product = productsData.find((p) => p.id === id)

  if (!product) {
    return res.status(404).json({
      success: false,
      error: `Product with ID ${id} not found.`,
    })
  }

  // Return the product with correct image path
  const formattedProduct: Product = {
    ...product,
    // ✅ Correct public path (Next.js automatically maps /public/img/... to /img/...)
    image: `/img/${product.image}`,
  }

  return res.status(200).json({ success: true, data: formattedProduct })
}
