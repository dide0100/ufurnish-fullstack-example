// components/Layout.js
import Head from 'next/head';

export default function Layout({ children, title, description, image }) {
  const defaultTitle = 'ufurnish.com – Discover Furniture Online';
  const defaultDescription = 'Compare and discover furniture from top UK retailers.';
  const defaultImage = 'https://via.placeholder.com/600x400?text=ufurnish';

  return (
    <>
      <Head>
        <title>{title || defaultTitle}</title>
        <meta name="description" content={description || defaultDescription} />
        <meta property="og:title" content={title || defaultTitle} />
        <meta property="og:description" content={description || defaultDescription} />
        <meta property="og:image" content={image || defaultImage} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <header style={{ padding: '1rem', background: '#f6f6f6' }}>
        <h2>ufurnish.com</h2>
      </header>

      <main style={{ padding: '1rem' }}>{children}</main>

      <footer style={{ marginTop: '2rem', padding: '1rem', background: '#fafafa' }}>
        <small>© {new Date().getFullYear()} ufurnish.com</small>
      </footer>
    </>
  );
}