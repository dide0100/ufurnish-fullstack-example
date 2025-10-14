import fs from 'fs'
import path from 'path'
import { pool } from '../lib/db.js'
import type { Category, Product } from '../types/database'

async function importData() {
  const categoriesPath = path.join(process.cwd(), 'data', 'categories.json')
  const productsPath = path.join(process.cwd(), 'data', 'products.json')

  const categories: Category[] = JSON.parse(fs.readFileSync(categoriesPath, 'utf8'))
  const products: Product[] = JSON.parse(fs.readFileSync(productsPath, 'utf8'))

  console.log('Importing categories...')
  for (const cat of categories) {
    const nameVariant = `${cat.name} (DB)`
    await pool.query(
      `INSERT INTO categories (id, name, description, image, product_count)
       VALUES (?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE name=VALUES(name), description=VALUES(description),
       image=VALUES(image), product_count=VALUES(product_count)`,
      [cat.id, nameVariant, cat.description, cat.image, cat.product_count]
    )
  }

  console.log('Importing products...')
  for (const p of products) {
    const nameVariant = `${p.name} [DB]`
    await pool.query(
      `INSERT INTO products (category_id, name, description, price, image, stock, retailer)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [p.category_id, nameVariant, p.description, p.price, p.image, p.stock, p.retailer]
    )
  }

  console.log('Import complete.')
  await pool.end()
}

importData().catch((err) => {
  console.error(err)
  process.exit(1)
})