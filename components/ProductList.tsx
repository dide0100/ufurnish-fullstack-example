// components/ProductList.tsx
import React, { useEffect, useState } from 'react'
import type { Product, ApiResponse } from '../types/product'
import { getBaseUrl } from '../lib/config'

interface ProductListProps {
  categoryId: string
}

export const ProductList: React.FC<ProductListProps> = ({ categoryId }) => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true)
      try {
        const baseUrl = getBaseUrl()
        // ✅ Client side uses relative URL ("")
        const res = await fetch(`${baseUrl}/api/v1/products/${categoryId}`)
        const json: ApiResponse<Product[]> = await res.json()
        if (json.success && json.data) setProducts(json.data)
      } catch (err) {
        console.error('Error fetching products:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [categoryId])

  if (loading) return <p className="text-center text-gray-600 py-8">Loading products...</p>

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((p) => (
        <div key={p.id} className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
          <h4 className="text-lg font-semibold mb-2">{p.name}</h4>
          <p className="text-xl font-bold text-gray-800">€{p.price}</p>
        </div>
      ))}
    </div>
  )
}