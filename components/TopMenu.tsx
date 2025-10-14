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
    <nav className="bg-gray-800 shadow-md">
      <ul className="flex list-none m-0 p-0 max-w-7xl mx-auto">
        {menuItems.map((item) => (
          <li key={item.href} className="m-0">
            <Link
              href={item.href}
              className={`
                block px-6 py-4 no-underline transition-all duration-200
                border-b-3
                ${isActive(item.href) 
                  ? 'text-white font-bold bg-gray-700 border-b-4 border-blue-500' 
                  : 'text-gray-400 font-normal bg-transparent border-b-4 border-transparent hover:bg-gray-700 hover:text-white'
                }
              `}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

