import { pool } from './db'
import type { Category, Product } from '../types/database'

export async function getAllCategories(): Promise<Category[]> {
  const [rows] = await pool.query('SELECT * FROM categories ORDER BY name ASC')
  return rows as Category[]
}

export async function getProductsByCategory(categoryId: string): Promise<Product[]> {
  const [rows] = await pool.query('SELECT * FROM products WHERE category_id = ?', [categoryId])
  return rows as Product[]
}