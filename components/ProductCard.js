// components/ProductCard.js
import React from 'react';

export default function ProductCard({ product }) {
  return (
    <div style={{ border: '1px solid #ddd', margin: '8px', padding: '8px' }}>
      <h3>{product.name}</h3>
      <p>Price: £{product.price}</p>
    </div>
  );
}