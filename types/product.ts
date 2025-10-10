// /types/product.ts
// Shared Product interface for both frontend and backend.
// Ensures consistency across layers and simplifies future maintenance.

export interface Product {
    id: string
    name: string
    price: number
    stock: number
    category: string
    image: string
    retailer: string
  }
  
  // Common structure for all REST API responses (for consistency)
  export interface ApiResponse<T> {
    success: boolean
    data?: T
    error?: string
  }