// pages/products/[id].js
import React from 'react';
/*
Tradeoffs:
	•	Pros: Always fresh data, good for user-specific content.
	•	Cons: Slower response, heavier server load, not cacheable easily.
*/
/*
// This runs on every request
export async function getServerSideProps(context) {
  const { id } = context.params;
  const res = await fetch(`https://api.example.com/products/${id}`);
  const product = await res.json();

  return { props: { product } };
}
*/

/*
Tradeoffs:
	•	Pros: Fast page loads, good for caching, scalable.
	•	Cons: Data may be slightly stale depending on revalidate interval.
*/

export default function ProductPage({ product }) {
  return (
    <div>
      <h1>{product.name}</h1>
      <p>Price: £{product.price}</p>
    </div>
  );
}


// Generates static pages but revalidates every 10 seconds
export async function getStaticProps({ params }) {
    const res = await fetch(`https://api.example.com/products/${params.id}`);
    const product = await res.json();
  
    return { 
      props: { product }, 
      revalidate: 10 // seconds
    };
  }
  
  // Needed for dynamic routes
  export async function getStaticPaths() {
    return {
      paths: [], // can pre-render popular products
      fallback: 'blocking', // others will be generated on first request
    };
  }