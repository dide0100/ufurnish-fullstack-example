// pages/categories/[categoryId].js
import { useState } from 'react';
import Head from 'next/head';
import ProductCard from '../../components/ProductCard';
import Layout from '../../components/Layout';

// --- Mock API ---
async function fetchProducts(categoryId, page = 1, pageSize = 10) {
  const allProducts = Array.from({ length: 50 }, (_, i) => ({
    id: `${categoryId}-${i + 1}`,
    name: `Product ${i + 1} in ${categoryId}`,
    price: (Math.random() * 100).toFixed(2),
    shortDescription: `A stylish ${categoryId} item number ${i + 1}.`,
    meta: {
      title: `Buy ${categoryId} Product ${i + 1} | ufurnish.com`,
      description: `Find ${categoryId} product ${i + 1} and similar items on ufurnish.com.`,
      image: `https://via.placeholder.com/600x400?text=${encodeURIComponent(categoryId + ' ' + (i + 1))}`,
    },
  }));
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  return allProducts.slice(start, end);
}

function CategoryPage({ categoryId, initialProducts, categoryMeta }) {
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
      {/* --- Page-specific SEO overrides --- */}
      <Head>
        <title>{categoryMeta.title}</title>
        <meta name="description" content={categoryMeta.description} />
        <meta property="og:image" content={categoryMeta.image} />
      </Head>

      <h1>{categoryMeta.heading}</h1>
      {products.map(p => <ProductCard key={p.id} product={p} />)}
      {hasMore ? (
        <button onClick={loadMore} style={{ margin: '16px' }}>Load More</button>
      ) : (
        <p>All products loaded</p>
      )}
    </>
  );
}

// --- ISR: Build static HTML + JSON, revalidate every minute ---
export async function getStaticProps({ params }) {
  const initialProducts = await fetchProducts(params.categoryId, 1, 10);
  const categoryMeta = {
    title: `Shop ${params.categoryId} Furniture | ufurnish.com`,
    description: `Browse ${params.categoryId} furniture — sofas, beds, tables and more. Compare top retailers easily on ufurnish.com.`,
    image: initialProducts[0]?.meta.image,
    heading: `Explore ${params.categoryId}`,
  };

  return {
    props: { categoryId: params.categoryId, initialProducts, categoryMeta },
    revalidate: 60,
  };
}

// --- ISR: Pre-generate top categories ---
export async function getStaticPaths() {
  const topCategories = ['sofas', 'beds', 'tables'];
  return {
    paths: topCategories.map(c => ({ params: { categoryId: c } })),
    fallback: 'blocking',
  };
}

// --- Attach layout (used by _app.js) ---
CategoryPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default CategoryPage;