# ufurnish-fullstack-example
# ufurnish.com Full Stack Example (Next.js + TypeScript)

This example demonstrates a simplified **full stack architecture** for a product aggregation platform like **ufurnish.com**, using **Next.js** with **TypeScript**.  

It includes:

- **Frontend (Next.js)** using **Incremental Static Regeneration (ISR)** for SEO and performance.  
- **Backend API routes** to unify and normalize product data from multiple sources.  
- **TypeScript types** shared across the stack for safety and maintainability.  
- **REST API design principles** (naming, versioning, error handling, validation).

---

## 1. File Structure

```

ufurnish-fullstack-example/
├── components/
│   └── ProductCard.tsx            # Reusable React component for product display
│
├── pages/
│   ├── api/
│   │   └── v1/
│   │       └── products/
│   │           └── [categoryId].ts    # Unified backend API (Node.js + TypeScript)
│   │
│   └── categories/
│       └── [categoryId].tsx       # Category page using ISR + SEO metadata
│
├── public/
│   └── img/                       # Sample static images
│
├── types/
│   └── product.ts                  # Shared Product interface
│
├── .env.local                      # Environment variables (NEXT_PUBLIC_BASE_URL)
│
├── package.json
├── tsconfig.json
└── README.md

```
---

## 2. Installation

### Requirements
- Node.js ≥ 18  
- npm or yarn  
- Git (optional)

---

### Setup

```bash
# 1. Clone the repository
git clone https://github.com/dide0100/ufurnish-fullstack-example.git
cd ufurnish-fullstack-example

# 2. Install dependencies
npm install
# or
yarn install