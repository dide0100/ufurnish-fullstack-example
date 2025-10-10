/*
Tradeoffs:
	•	Pros: Always fresh data, good for user-specific content.
	•	Cons: Slower response, heavier server load, not cacheable easily.
*/

// pages/products/[id].js
import React from 'react';

export default function ProductPage({ product }) {
  return (
    <div>
      <h1>{product.name}</h1>
      <p>Price: £{product.price}</p>
    </div>
  );
}

// This runs on every request
export async function getServerSideProps(context) {
  const { id } = context.params;
  const res = await fetch(`https://api.example.com/products/${id}`);
  const product = await res.json();

  return { props: { product } };
}