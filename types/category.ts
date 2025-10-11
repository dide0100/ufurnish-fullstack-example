// types/category.ts
/**
 * Category interface represents a single furniture category entity.
 * This can be used for both API responses and frontend rendering.
 */
export interface Category {
    /** Unique identifier for the category (used in URLs and API routes) */
    id: string
  
    /** Human-readable category name */
    name: string
  
    /** Optional description for SEO or display purposes */
    description?: string
  
    /** Optional image URL representing the category */
    image?: string
  
    /** Number of products in this category (optional metadata) */
    productCount?: number
  
    /** ISO date string of when the category was last updated */
    updatedAt?: string
  }
  
  /**
   * Example: API response wrapper for category data
   */
  export interface CategoryApiResponse {
    success: boolean
    data?: Category[]
    error?: string
  }