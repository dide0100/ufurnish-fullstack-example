// lib/config.ts
// This utility ensures consistent base URL handling across environments

export function getBaseUrl(): string {
    if (typeof window !== 'undefined') {
      // Running in the browser — use relative path
      return ''
    }
  
    // Running on the server (ISR, SSR, or API)
    if (process.env.NEXT_PUBLIC_BASE_URL) return process.env.NEXT_PUBLIC_BASE_URL
    if (process.env.NODE_ENV === 'development') return 'http://localhost:3000'
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  
    throw new Error('Base URL not found. Set NEXT_PUBLIC_BASE_URL or VERCEL_URL.')
  }