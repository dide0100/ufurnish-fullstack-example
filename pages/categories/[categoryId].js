// pages/categories/[categoryId].js
import Head from 'next/head';
import { useState } from 'react';
import ProductCard from '../../components/ProductCard';

// Simulated server data source
async function fetchProducts(categoryId, page = 1, pageSize = 10) {
  const allProducts = Array.from({ length: 50 }, (_, i) => ({
    id: `${categoryId}-${i + 1}`,
    name: `Product ${i + 1} in ${categoryId}`,
    price: (Math.random() * 100).toFixed(2),
    shortDescription: `A great ${categoryId} product number ${i + 1}.`,
    meta: {
      title: `Buy ${categoryId} - Product ${i + 1} | ufurnish.com`,
      description: `Discover Product ${i + 1} in our ${categoryId} collection. Compare prices and find inspiration on ufurnish.com.`,
      image: `https://via.placeholder.com/600x400?text=${encodeURIComponent(categoryId + ' ' + (i + 1))}`,
    },
  }));

  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  return allProducts.slice(start, end);
}

export default function CategoryPage({ categoryId, initialProducts, categoryMeta }) {
  const [products, setProducts] = useState(initialProducts);
  const [page, setPage] = useState(2);
  const [hasMore, setHasMore] = useState(true);
  const pageSize = 10;

  const loadMore = async () => {
    const newProducts = await fetchProducts(categoryId, page, pageSize);
    setProducts(prev => [...prev, ...newProducts]);
    setPage(prev => prev + 1);
    if (newProducts.length < pageSize) setHasMore(false);
  };

  return (
    <>
      {/* --- SEO Metadata dynamically generated --- */}
      <Head>
        <title>{categoryMeta.title}</title>
        <meta name="description" content={categoryMeta.description} />
        <meta property="og:title" content={categoryMeta.title} />
        <meta property="og:description" content={categoryMeta.description} />
        <meta property="og:image" content={categoryMeta.image} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <main style={{ padding: '16px' }}>
        <h1>{categoryMeta.heading}</h1>

        {/* --- ISR Pre-rendered products --- */}
        {products.map(p => <ProductCard key={p.id} product={p} />)}

        {/* --- Dynamic Pagination (Client Fetch) --- */}
        {hasMore ? (
          <button onClick={loadMore} style={{ margin: '16px' }}>Load More</button>
        ) : (
          <p>All products loaded</p>
        )}
      </main>
    </>
  );
}

// --- ISR: Static Generation + Revalidation ---
export async function getStaticProps({ params }) {
  const initialProducts = await fetchProducts(params.categoryId, 1, 10);

  // --- Derive SEO metadata from category or first product ---
  const categoryMeta = {
    title: `Shop ${params.categoryId} Furniture Online | ufurnish.com`,
    description: `Browse our ${params.categoryId} collection — discover, compare, and shop the latest furniture styles on ufurnish.com.`,
    image: initialProducts[0]?.meta.image ?? 'https://via.placeholder.com/600x400',
    heading: `Explore ${params.categoryId}`,
  };

  return {
    props: {
      categoryId: params.categoryId,
      initialProducts,
      categoryMeta,
    },
    revalidate: 60, // Regenerate every 60 seconds
  };
}

// --- ISR: Pre-build popular categories ---
export async function getStaticPaths() {
  const topCategories = ['sofas', 'beds', 'tables'];
  return {
    paths: topCategories.map(c => ({ params: { categoryId: c } })),
    fallback: 'blocking',
  };
}