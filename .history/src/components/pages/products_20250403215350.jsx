import React, { useEffect, useState, useRef } from "react";
import "./products.css";
import { AuthContext } from "../../AuthContext";
import { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCartBeforeLogin, addToCartAPI } from "../../cartAction";
import styled, { keyframes } from "styled-components";
import { useTranslation } from "react-i18next";
import Slider from "react-slick";
import { useNavigate, Link } from "react-router-dom";
import "../translations/i18n";
import {
  BoxContainer,
  AddtocartButton,
  MAddtocartButton,
  MAddToWishList,
  Price,
  Discount,
  DescriptionContainer,
  DescriptionTitle,
  DescriptionContent,
  StatusContainer,
  StatusContent,
  StatusTitle,
  CloseButton,
  Name,
  positions,
  iospositions,
  fontSizes,
  iosfontSizes,
  categoryShadow,
} from "./styledComponents";
import { addToCart, removeFromCart } from "../../cartSlice";
import Box from "./boxes";

const Products = ({
  api,
  loading,
  add,
  images,
  filteredProducts,
  SelectedProduct,
  addToCart,
  handleShowAlert,
  showAlert,
  searchTerm,
  highlightText,
  selectedCategory,
  Fortop,
  addToWishlist,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [products, setProducts] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
 

  const [selected, setSelected] = useState(false);
  const userId = localStorage.getItem("userId");
  const [showDetails, setShowDetails] = useState(true);
  const username = localStorage.getItem("username");
  const previewRef = useRef(null);
  const { t, i18n } = useTranslation();
  const buttonRef = useRef(null);
  const position = positions[i18n.language] || position.en;
  const fontSize = fontSizes[i18n.language] || fontSize.en;
  const Iposition = iospositions[i18n.language] || position.en;
  const IfontSize = iosfontSizes[i18n.language] || fontSize.en;


  const dispatch = useDispatch(); // Function to check screen size

  // Function to check screen size
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 1000);
  };

  useEffect(() => {
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize); // Update on resize
    return () => window.removeEventListener("resize", handleResize);
  }, []);

 

 
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Toggle the selection state of a product
  const toggleSelection = (id, currentSelection) => {
    // Update the product on the server using PATCH
    fetch(`${api}/updateProducts/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isSelected: !currentSelection }),
    })
      .then((response) => response.json())
      .then((updatedProduct) => {
        // Update the local state to reflect the change
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === id ? updatedProduct : product
          )
        );
      })
      .catch((error) => console.error("Error updating product:", error));
  };

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

    const liked = product.likedBy.some((user) => user.userId === userId);
    const endpoint = liked ? "dislike" : "like";

    const response = await fetch(`${api}/products/${product.id}/${endpoint}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, username }), // Send user info
    });

    const updatedProduct = await response.json();

    // Update state
    setProducts(
      products.map((p) =>
        p.id === product.id ? { ...p, ...updatedProduct } : p
      )
    );
    setSelectedProduct({ ...product, ...updatedProduct });
  };
  // ////////////////////////////////////////////////////////

  const handleMouseEnter = () => {
    if (buttonRef.current) {
      buttonRef.current.click();
    }
  };

  // ///////////////////////////////////////////////////////////

  const show = (event) => {
    setShowDetails((prevShow) => !prevShow);
    if (previewRef.current && !previewRef.current.contains(event.target)) {
    }
  };

  // useEffect(() => {
  //   // Attach event listener to the whole document
  //   document.addEventListener("mousedown", show);
  //   return () => {
  //     document.removeEventListener("mousedown", show);
  //   };
  // }, []);
 

  return (
    <div>
      <div>
        <Box
          Mobject={filteredProducts}
          Dobject={filteredProducts}
          selectedDProduct={selectedProduct}
          toggleLike={toggleLike}
          show={show}
         
          handleProductHid={handleProductHid}
         
          isMobile={isMobile}
      
          
          showDetails={showDetails}
          position={position}
          Iposition={Iposition}
          fontSize={fontSize}
          IfontSize={IfontSize}
          highlightText={highlightText}
        />
      </div>
    </div>
  );
};

export default Products;
