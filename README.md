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
```
---

## 3. Configure Environment
```bash
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

---

## 4. Run the App
```bash
npm run dev
```
Then open http://localhost:3000/categories/sofas

---

## 5. How It Works

### a. Unified REST API

File: /pages/api/v1/products/[categoryId].ts
	•	Simulates multiple retailer APIs and normalizes their data into a consistent schema:

```bash
    {
        id: string,
        name: string,
        price: number,
        stock: number,
        category: string,
        image: string,
        retailer: string
    }
```
	•	Uses Promise.all to simulate concurrent API calls.
	•	Validates input, handles errors, and returns a standardized response envelope.

### b. Incremental Static Regeneration (ISR)

File: /pages/categories/[categoryId].tsx
	•	Pre-renders category pages for SEO.
	•	Revalidates every 60 seconds to keep data fresh.
	•	Supports dynamic client-side rendering (e.g., pagination) if needed.

### c. Shared Types

File: /types/product.ts
	•	Used by both frontend and backend to ensure type safety.

### d. Example URLs

	•	http://localhost:3000/categories/sofas
	•	http://localhost:3000/categories/tables
	•	http://localhost:3000/api/v1/products/sofas — direct API access

## Frontend Components
	•	ProductCard.tsx — displays product image, name, price, stock, and retailer.
	•	Layout.tsx (optional) — provides consistent page header, footer, and SEO meta tags.

## 7. REST API Design Principles
### 1.	Resource Naming
	•	Endpoints represent collections and resources.
Example: /api/v1/products → all products
/api/v1/products/:categoryId → products by category
### 2.	Versioning
	•	/v1/ allows future evolution without breaking existing clients.
### 3.	HTTP Methods
	•	GET → Retrieve data
	•	POST → Create resources
	•	PUT/PATCH → Update resources
	•	DELETE → Remove resources
### 4.	Validation & Errors
	•	400 → invalid input
	•	404 → resource not found
	•	405 → method not allowed
	•	500 → internal server error
	•	All errors use consistent JSON: { "success": false, "error": "Message" }
### 5.	Response Envelope
	•	Success: { "success": true, "data": [...] }
	•	Failure: { "success": false, "error": "Message" }
### 6.	Consistency
	•	Same structure across all endpoints for predictable client consumption.
### 7.	Extensibility
	•	New endpoints or versions can be added without breaking current clients.
