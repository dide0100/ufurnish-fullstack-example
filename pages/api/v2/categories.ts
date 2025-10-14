import type { NextApiRequest, NextApiResponse } from 'next'
import type { ApiResponse, Category } from '../../../types/database'
import { getAllCategories } from '../../../lib/queries'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<Category[]>>
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    return res.status(405).json({ success: false, error: `Method ${req.method} not allowed.` })
  }

  try {
    const categories = await getAllCategories()
    res.status(200).json({ success: true, data: categories })
  } catch (err) {
    console.error('Error fetching categories:', err)
    res.status(500).json({ success: false, error: 'Database error' })
  }
}