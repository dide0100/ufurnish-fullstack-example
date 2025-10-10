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

  if (loading) return <p>Loading products...</p>

  return (
    <div className="grid">
      {products.map((p) => (
        <div key={p.id}>
          <h4>{p.name}</h4>
          <p>€{p.price}</p>
        </div>
      ))}
    </div>
  )
}