// pages/isr-product/[id].js
import React from 'react';
/*
Behavior:
	•	First request generates the page.
	•	Reloading within 10 seconds shows the same price (cached).
	•	After 10 seconds, the next request regenerates the page with a new random price.
*/

export default function ISRProduct({ product }) {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">ISR Product Page</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-lg mb-2"><span className="font-semibold">ID:</span> {product.id}</p>
        <p className="text-lg mb-2"><span className="font-semibold">Name:</span> {product.name}</p>
        <p className="text-lg mb-2"><span className="font-semibold">Price:</span> £{product.price}</p>
      </div>
    </div>
  );
}

// Generates static pages but revalidates every 10 seconds
export async function getStaticProps({ params }) {
  // Simulate fetching data
  const product = {
    id: params.id,
    name: `Product ${params.id}`,
    price: (Math.random() * 100).toFixed(2), // changes on revalidation
  };

  return { 
    props: { product }, 
    revalidate: 10, // seconds
  };
}

export async function getStaticPaths() {
  return {
    paths: [], // no pre-rendered paths
    fallback: 'blocking', // generate on first request
  };
}