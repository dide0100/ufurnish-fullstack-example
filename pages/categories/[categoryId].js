// pages/categories/[categoryId].js
import { useState } from 'react';
import { useRouter } from 'next/router';
import ProductCard from '../../components/ProductCard';

// --- Fake API function simulating server-side product fetch ---
async function fetchProducts(categoryId, page = 1, pageSize = 10) {
  // Simulate 50 products per category
  const allProducts = Array.from({ length: 50 }, (_, i) => ({
    id: `${categoryId}-${i + 1}`,
    name: `Product ${i + 1} in Category ${categoryId}`,
    price: (Math.random() * 100).toFixed(2),
  }));

  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  return allProducts.slice(start, end);
}

export default function CategoryPage({ initialProducts, categoryId }) {
  // --- Client-side state for pagination (dynamic fetching) ---
  const [products, setProducts] = useState(initialProducts); // ISR first batch
  const [page, setPage] = useState(2); // page 1 is already pre-rendered
  const [hasMore, setHasMore] = useState(true);
  const pageSize = 10;

  const loadMore = async () => {
    // --- Dynamic fetch like SSR for additional pages ---
    const newProducts = await fetchProducts(categoryId, page, pageSize);
    setProducts(prev => [...prev, ...newProducts]);
    setPage(prev => prev + 1);
    if (newProducts.length < pageSize) setHasMore(false);
  };

  return (
    <div>
      <h1>Category {categoryId}</h1>

      {/* Render products */}
      {products.map(p => <ProductCard key={p.id} product={p} />)}

      {/* Pagination / Infinite scroll trigger */}
      {hasMore ? (
        <button onClick={loadMore} style={{ margin: '16px' }}>Load More</button>
      ) : (
        <p>All products loaded</p>
      )}
    </div>
  );
}

// --- ISR: Pre-generate category pages and first batch of products ---
export async function getStaticProps({ params }) {
  const initialProducts = await fetchProducts(params.categoryId, 1, 10);

  return {
    props: {
      categoryId: params.categoryId,
      initialProducts,
    },
    revalidate: 30, // regenerate this page every 30 seconds
  };
}

// --- ISR: Pre-render top categories; others generated on first request ---
export async function getStaticPaths() {
  const topCategories = ['sofas', 'beds', 'tables']; // popular categories
  return {
    paths: topCategories.map(c => ({ params: { categoryId: c } })),
    fallback: 'blocking', // generates pages on first request for other categories
  };
}