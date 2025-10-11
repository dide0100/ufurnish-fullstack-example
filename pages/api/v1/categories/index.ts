// pages/api/v1/categories/index.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import type { Category, CategoryApiResponse } from '../../../../types/category'
import categoriesData from '../../../../data/categories.json' // import JSON

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<CategoryApiResponse>
  ) {
    if (req.method === 'GET') {
      // Map JSON data to Category interface if needed
      const categories: Category[] = categoriesData.map((cat) => ({
        ...cat,
        image: `/${cat.image}`, // assume image filename in JSON
      }))
  
      return res.status(200).json({ success: true, data: categories })
    }
  
    res.setHeader('Allow', ['GET'])
    return res.status(405).json({ success: false, error: `Method ${req.method} not allowed.` })
  }

/**
 * In-memory mock categories for demonstration.
 * In a real app, these would come from a database or external API.
 */
// const categories: Category[] = [
//   {
//     id: 'sofas',
//     name: 'Sofas',
//     description: 'Comfortable sofas for every home style.',
//     image: 'https://via.placeholder.com/300x200?text=Sofas',
//     productCount: 42,
//     updatedAt: new Date().toISOString(),
//   },
//   {
//     id: 'beds',
//     name: 'Beds',
//     description: 'Find the perfect bed for your bedroom.',
//     image: 'https://via.placeholder.com/300x200?text=Beds',
//     productCount: 28,
//     updatedAt: new Date().toISOString(),
//   },
//   {
//     id: 'tables',
//     name: 'Tables',
//     description: 'Dining and coffee tables for all occasions.',
//     image: 'https://via.placeholder.com/300x200?text=Tables',
//     productCount: 33,
//     updatedAt: new Date().toISOString(),
//   },
// ]

// /**
//  * @route GET /api/v1/categories
//  * @version v1
//  * @description Returns all categories in a standardized API response format.
//  */
// export default function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<CategoryApiResponse>
// ) {
//   if (req.method === 'GET') {
//     return res.status(200).json({ success: true, data: categories })
//   }

//   // Handle unsupported methods
//   res.setHeader('Allow', ['GET'])
//   return res.status(405).json({
//     success: false,
//     error: `Method ${req.method} not allowed.`,
//   })
// }