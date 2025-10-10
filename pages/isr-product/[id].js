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
    <div>
      <h1>ISR Product Page</h1>
      <p>ID: {product.id}</p>
      <p>Name: {product.name}</p>
      <p>Price: £{product.price}</p>
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