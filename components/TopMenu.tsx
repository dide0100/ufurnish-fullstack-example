// components/TopMenu.tsx
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function TopMenu() {
  const router = useRouter()
  
  const menuItems = [
    { href: '/', label: 'Home' },
    { href: '/categories', label: 'Categories (JSON)' },
    { href: '/categories/db', label: 'Categories (DB)' },
  ]

  const isActive = (href: string) => {
    if (href === '/') {
      return router.pathname === '/'
    }
    return router.pathname.startsWith(href)
  }

  return (
    <nav
      style={{
        backgroundColor: '#333',
        padding: '0',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}
    >
      <ul
        style={{
          display: 'flex',
          listStyle: 'none',
          margin: 0,
          padding: 0,
          maxWidth: '1400px',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        {menuItems.map((item) => (
          <li key={item.href} style={{ margin: 0 }}>
            <Link
              href={item.href}
              style={{
                display: 'block',
                padding: '1rem 1.5rem',
                color: isActive(item.href) ? '#fff' : '#ccc',
                textDecoration: 'none',
                fontWeight: isActive(item.href) ? 'bold' : 'normal',
                backgroundColor: isActive(item.href) ? '#555' : 'transparent',
                transition: 'all 0.2s',
                borderBottom: isActive(item.href) ? '3px solid #007bff' : '3px solid transparent',
              }}
              onMouseEnter={(e) => {
                if (!isActive(item.href)) {
                  e.currentTarget.style.backgroundColor = '#444'
                  e.currentTarget.style.color = '#fff'
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive(item.href)) {
                  e.currentTarget.style.backgroundColor = 'transparent'
                  e.currentTarget.style.color = '#ccc'
                }
              }}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

