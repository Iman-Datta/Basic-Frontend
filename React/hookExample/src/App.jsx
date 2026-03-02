import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { initialProducts } from "./products";
import ProductCard from "./ProductCard";
import "./App.css";

function App() {
  const [products] = useState(initialProducts);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  const searchInputRef = useRef(null);
  const prevSearchRef = useRef("");
  const listScrollRef = useRef(null);

  // Auto-focus on search
  useEffect(() => {
    searchInputRef.current.focus();
  }, []);

  // Scroll to products after clicking search
  const handleSearch = () => {
    prevSearchRef.current = search;
    listScrollRef.current.scrollIntoView({ behavior: "smooth" });
  };

  // -------------------- useMemo (filtered products) --------------------
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchCategory = category === "All" || p.category === category;
      return matchSearch && matchCategory;
    });
  }, [search, category, products]);

  // -------------------- useMemo (total inventory value) --------------------
  const totalValue = useMemo(() => {
    return products.reduce((sum, p) => sum + p.price * p.stock, 0);
  }, [products]);

  // -------------------- useCallback --------------------
  const addToCart = useCallback((product) => {
    setCartItems((prev) => [...prev, product]);
    setCartCount((prev) => prev + 1);
  }, []);

  return (
    <div className="app">
      <h1>Product Management (React + Vite)</h1>

      {/* Cart Count */}
      <h3>Cart Items: {cartCount}</h3>

      {/* Search */}
      <input
        ref={searchInputRef}
        type="text"
        placeholder="Search product..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {/* Category dropdown */}
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="All">All</option>
        <option value="Electronics">Electronics</option>
        <option value="Furniture">Furniture</option>
      </select>

      <div ref={listScrollRef}></div>

      <h2>Products</h2>

      {/* Product list */}
      <div className="product-list">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>

      {/* Inventory Value */}
      <h2>Total Inventory Value: ₹{totalValue}</h2>

      {/* Previous Search */}
      <p>Previous Search: {prevSearchRef.current}</p>
    </div>
  );
}

export default App;