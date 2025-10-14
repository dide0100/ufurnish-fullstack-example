// pages/ssr-product/[id].js
import React from 'react';
/*
Behavior:
	•	Every time you reload /ssr-product/1, the price will change.
	•	Shows “always fresh” behavior.
*/

export default function SSRProduct({ product }) {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">SSR Product Page</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-lg mb-2"><span className="font-semibold">ID:</span> {product.id}</p>
        <p className="text-lg mb-2"><span className="font-semibold">Name:</span> {product.name}</p>
        <p className="text-lg mb-2"><span className="font-semibold">Price:</span> £{product.price}</p>
      </div>
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