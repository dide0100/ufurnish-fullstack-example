// pages/ssr-product/[id].js
import React from 'react';
/*
Behavior:
	•	Every time you reload /ssr-product/1, the price will change.
	•	Shows “always fresh” behavior.
*/

export default function SSRProduct({ product }) {
  return (
    <div>
      <h1>SSR Product Page</h1>
      <p>ID: {product.id}</p>
      <p>Name: {product.name}</p>
      <p>Price: £{product.price}</p>
    </div>
  );
}

// This runs on every request
export async function getServerSideProps({ params }) {
  // Simulate fetching data
  const product = {
    id: params.id,
    name: `Product ${params.id}`,
    price: (Math.random() * 100).toFixed(2), // changes every request
  };

  return { props: { product } };
}