import { useState, useEffect } from "react";

const Test = ({ api, userId, username }) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(`${api}/products`);
      const data = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, [api]);

  // Toggle like/dislike with one button
  const toggleLike = async (product) => {
    if (!product) return;

    const liked = product.likedBy.some(user => user.userId === userId);
    const endpoint = liked ? "dislike" : "like";

    const response = await fetch(`${api}/products/${product.id}/${endpoint}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, username }), // Send user info
    });

    const updatedProduct = await response.json();

    // Update state
    setProducts(products.map(p => p.id === product.id ? { ...p, ...updatedProduct } : p));
    setSelectedProduct({ ...product, ...updatedProduct });
  };

  return (
    <div>
      <h2>Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <button onClick={() => setSelectedProduct(product)}>
              {product.name} (Likes: {product.likes})
            </button>
          </li>
        ))}
      </ul>

      {selectedProduct && (
        <div>
          <h3>{selectedProduct.name} (Likes: {selectedProduct.likes})</h3>
          <button onClick={() => toggleLike(selectedProduct)}>
            {selectedProduct.likedBy.some(user => user.userId === userId) ? "❤️ Liked" : "🤍 Like"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Test;