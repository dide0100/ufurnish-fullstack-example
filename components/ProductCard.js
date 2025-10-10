// components/ProductCard.js
export default function ProductCard({ product }) {
  return (
    <article style={{ border: '1px solid #ddd', padding: '8px', margin: '8px' }}>
      <h3>{product.name}</h3>
      <p>Price: £{product.price}</p>
      <p>{product.shortDescription}</p>
    </article>
  );
}