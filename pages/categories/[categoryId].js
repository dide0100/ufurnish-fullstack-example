// pages/categories/[categoryId].js
import { useState } from 'react';
import Head from 'next/head';
import ProductCard from '../../components/ProductCard';
import Layout from '../../components/Layout';

/**
 * Hybrid ISR + API-driven front end
 * ---------------------------------
 * This page statically generates category pages for SEO (ISR)
 * using data fetched from our unified backend API.
 * It also supports client-side pagination for large datasets.
 */

async function fetchProducts(categoryId, page = 1) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${categoryId}?page=${page}`);
  return res.json();
}

function CategoryPage({ categoryId, initialData, categoryMeta }) {
  const [products, setProducts] = useState(initialData.products);
  const [page, setPage] = useState(2);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = async () => {
    const data = await fetchProducts(categoryId, page);
    setProducts(prev => [...prev, ...data.products]);
    setPage(prev => prev + 1);
    if (data.products.length < data.pageSize) setHasMore(false);
  };

  return (
    <>
      {/* --- Per-page SEO metadata --- */}
      <Head>
        <title>{categoryMeta.title}</title>
        <meta name="description" content={categoryMeta.description} />
        <meta property="og:image" content={categoryMeta.image} />
      </Head>

      <h1>{categoryMeta.heading}</h1>

      {products.map(p => <ProductCard key={p.productId} product={p} />)}

      {hasMore ? (
        <button onClick={loadMore} style={{ margin: '16px' }}>Load More</button>
      ) : (
        <p>All products loaded</p>
      )}
    </>
  );
}

// --- ISR: Build HTML from backend API, revalidate every 60s ---
export async function getStaticProps({ params }) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const data = await fetch(`${baseUrl}/api/products/${params.categoryId}?page=1`).then(res => res.json());

  const categoryMeta = {
    title: `Shop ${params.categoryId} Furniture | ufurnish.com`,
    description: `Browse ${params.categoryId} furniture and decor. Compare prices easily on ufurnish.com.`,
    image: data.products[0]?.image,
    heading: `Explore ${params.categoryId}`,
  };

  return {
    props: {
      categoryId: params.categoryId,
      initialData: data,
      categoryMeta,
    },
    revalidate: 60,
  };
}

// --- ISR pre-generation of key categories ---
export async function getStaticPaths() {
  const topCategories = ['sofas', 'beds', 'tables'];
  return {
    paths: topCategories.map(c => ({ params: { categoryId: c } })),
    fallback: 'blocking',
  };
}

CategoryPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default CategoryPage;