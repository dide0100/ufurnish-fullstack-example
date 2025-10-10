// pages/categories/[categoryId].js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ProductCard from '../../components/ProductCard';

// Fake API function to simulate server-side filtering and pagination
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

export default function CategoryPage() {
  const router = useRouter();
  const { categoryId } = router.query;

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const pageSize = 10;

  useEffect(() => {
    if (!categoryId) return;

    async function loadProducts() {
      const newProducts = await fetchProducts(categoryId, page, pageSize);
      setProducts(prev => [...prev, ...newProducts]);
      if (newProducts.length < pageSize) setHasMore(false);
    }

    loadProducts();
  }, [categoryId, page]);

  const loadMore = () => setPage(prev => prev + 1);

  return (
    <div>
      <h1>Category {categoryId}</h1>
      <div>
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {hasMore ? (
        <button onClick={loadMore} style={{ margin: '16px' }}>
          Load More
        </button>
      ) : (
        <p>All products loaded</p>
      )}
    </div>
  );
}