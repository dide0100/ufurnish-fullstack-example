import mysql from 'mysql2/promise'

export const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'ufurnish_user',
  password: process.env.DB_PASS || 'StrongPassword123!',
  database: process.env.DB_NAME || 'ufurnish',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})