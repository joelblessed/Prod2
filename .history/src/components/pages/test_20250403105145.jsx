import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import ProductCard from './productCard';
import { fetchProducts } from '../../wishListApi';

// components/ProductCard.jsx

import { useDispatch, useSelector } from 'react-redux';
import { 
  itemAdded, 
  itemRemoved,
  guestItemAdded,
  guestItemRemoved,
  selectWishlistItems,
  selectGuestWishlistItems
} from '../../wishlistSlice';
import { selectCurrentToken } from '../../authSlice';
import styled from 'styled-components';

const Test = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Proper useSelector hook
  const auth = useSelector(state => state.auth);
  const wishlist = useSelector(state => state.wishlist);
  
  // Determine which wishlist to use
  const currentWishlist = auth.token ? wishlist.items : wishlist.guestItems;

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error('Failed to load products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const filteredProducts = products.filter(product =>
    searchTerm
      ? product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase())
      : true
  );

  const highlightText = (text, term) => {
    if (!term) return text;
    const regex = new RegExp(`(${term})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  };

  if (loading) {
    return <LoadingContainer>Loading products...</LoadingContainer>;
  }

  return (
    <ProductsContainer>
      <SearchContainer>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </SearchContainer>

      {filteredProducts.length === 0 ? (
        <EmptyState>
          No products found {searchTerm && `matching "${searchTerm}"`}
        </EmptyState>
      ) : (
        <ProductsGrid>
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              isInWishlist={currentWishlist.includes(product.id)}
              onWishlistToggle={() => {}}
              highlightText={highlightText}
              searchTerm={searchTerm}
            />
          ))}
        </ProductsGrid>
      )}
    </ProductsContainer>
  );
};


// Styled Components
const ProductsContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 1.2rem;
  color: #666;
`;

const SearchContainer = styled.div`
  margin-bottom: 2rem;
  
  input {
    width: 100%;
    max-width: 500px;
    padding: 0.75rem 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    
    &:focus {
      outline: none;
      border-color: #4caf50;
    }
  }
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 8px;
  color: #666;
`;

export default Test;