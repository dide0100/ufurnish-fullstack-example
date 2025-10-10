// pages/categories/[categoryId].js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ProductCard from '../../components/ProductCard';

// Fake API to simulate fetching products from server
async function fetchProducts(categoryId, page = 1, pageSize = 10) {
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
  const [products, setProducts] = useState(initialProducts);
  const [page, setPage] = useState(2); // page 1 already loaded
  const [hasMore, setHasMore] = useState(true);
  const pageSize = 10;

  const loadMore = async () => {
    const newProducts = await fetchProducts(categoryId, page, pageSize);
    setProducts(prev => [...prev, ...newProducts]);
    setPage(prev => prev + 1);
    if (newProducts.length < pageSize) setHasMore(false);
  };

  return (
    <div>
      <h1>Category {categoryId}</h1>
      {products.map(p => <ProductCard key={p.id} product={p} />)}
      {hasMore ? (
        <button onClick={loadMore} style={{ margin: '16px' }}>Load More</button>
      ) : (
        <p>All products loaded</p>
      )}
    </div>
  );
}

// --- ISR: pre-generate popular categories ---
export async function getStaticProps({ params }) {
  const initialProducts = await fetchProducts(params.categoryId, 1, 10);
  return {
    props: {
      categoryId: params.categoryId,
      initialProducts,
    },
    revalidate: 30, // regenerate this page every 30s
  };
}

export async function getStaticPaths() {
  // Pre-render top categories
  const topCategories = ['sofas', 'beds', 'tables'];
  return {
    paths: topCategories.map(c => ({ params: { categoryId: c } })),
    fallback: 'blocking', // other categories generated on first request
  };
}