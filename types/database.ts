export interface Category {
    id: string
    name: string
    description: string
    image: string
    product_count: number
    updated_at: string
  }
  
  export interface Product {
    id: number
    category_id: string
    name: string
    description: string
    price: number
    image: string
    stock: number
    retailer: string
  }
  
  export interface ApiResponse<T> {
    success: boolean
    data?: T
    error?: string
  }