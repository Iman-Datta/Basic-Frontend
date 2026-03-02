import React from "react";

const ProductCard = React.memo(function ProductCard({ product, addToCart }) {
  return (
    <div style={styles.card}>
      <h3>{product.name}</h3>
      <p>Price: ₹{product.price}</p>
      <p>Category: {product.category}</p>
      <p>Stock: {product.stock}</p>

      <button onClick={() => addToCart(product)} style={styles.btn}>
        Add to Cart
      </button>
    </div>
  );
});

const styles = {
  card: {
    border: "1px solid #ccc",
    padding: "15px",
    width: "220px",
    borderRadius: "8px",
  },
  btn: {
    padding: "8px 12px",
    background: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default ProductCard;
