import type { NextApiRequest, NextApiResponse } from 'next'
import type { ApiResponse, Product } from '../../../../types/database'
import { getProductsByCategory } from '../../../../lib/queries'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<Product[]>>
) {
  const { categoryId } = req.query

  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    return res.status(405).json({ success: false, error: `Method ${req.method} not allowed.` })
  }

  if (typeof categoryId !== 'string') {
    return res.status(400).json({ success: false, error: 'Invalid category ID' })
  }

  try {
    const products = await getProductsByCategory(categoryId)
    res.status(200).json({ success: true, data: products })
  } catch (err) {
    console.error('Error fetching products:', err)
    res.status(500).json({ success: false, error: 'Database error' })
  }
}