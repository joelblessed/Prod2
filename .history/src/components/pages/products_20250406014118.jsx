import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../../wishlistSlice";
import React, { useEffect, useState, useRef, useCallback } from "react";
import Fuse from "fuse.js";
import { useTranslation } from "react-i18next";
import "./products.css";
import { useNavigate, Link } from "react-router-dom";
import "../translations/i18n";
import { debounce } from "lodash";
import Box from "./boxes";
import DesktopCards from "./ProductCards/desktopCards";
import DesktopNavbar from "../Navbar/DesktopNavbar";

const Products = ({
  glofilteredProducts,
  SelectedProduct,
  highlightText,
  loaderRef,

  category,
  api,
  Search,




}) => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [mproducts, setMProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

    // Function to check screen size
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 760);
    };
  
    useEffect(() => {
      handleResize(); // Initial check
      window.addEventListener("resize", handleResize); // Update on resize
      return () => window.removeEventListener("resize", handleResize);
    }, []);
  

  const fetchProducts = useCallback(async () => {
    // Handle fetching new products based on page or other conditions
    // Example:
    const res = await fetch(`${api}/products?page=${page}&limit=4`);
    const data = await res.json();
    const fetched = data.products || data;

    if (fetched.length === 0) setHasMore(false);

    // Set filtered products based on fetched data
    const uniqueProducts = (prev, newItems) => {
      const ids = new Set(prev.map((p) => p.id));
      return [...prev, ...newItems.filter((item) => !ids.has(item.id))];
    };

    setFilteredProducts((prev) => uniqueProducts(prev, fetched));
    setProducts((prev) => uniqueProducts(prev, fetched));
  }, [page]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    if (!hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      { rootMargin: "100px" }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [hasMore]);

  useEffect(() => {
    if (searchTerm && window.innerWidth < 768) {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 300); // delay allows render
    }
  }, [searchTerm]);

  // useEffect(() => {
  //   if (searchTerm && searchTerm.trim() !== "") {
  //     // Use fuse search if products already loaded
  //     const fuse = new Fuse(glofilteredProducts, {
  //       keys: ["name", "category", "owner", "brand.name"],
  //       threshold: 0.3,
  //     });

  //     const results = fuse.search(searchTerm.trim());
  //     const matched = results.map((res) => res.item);
  //     setFilteredProducts(matched);
  //     setProducts(matched);
  //     setHasMore(false); // Stop pagination on search
  //   } else {
  //     setFilteredProducts(products); // Reset when search clears
  //     setProducts(products); // Reset to original products
  //     setHasMore(true); // Enable pagination again
  //   }
  // }, [searchTerm, glofilteredProducts, products]);


  const handleSearchClick = () => {
    if (searchTerm && searchTerm.trim() !== "") {
      const fuse = new Fuse(glofilteredProducts, {
        keys: ["name", "category", "owner", "brand.name"],
        threshold: 0.3,
      });
  
      const results = fuse.search(searchTerm.trim());
      const matched = results.map((res) => res.item);
      setFilteredProducts(matched);
      setProducts(matched);
      setHasMore(false);
    } else {
      setFilteredProducts(products);
      setProducts(products);
      setHasMore(true);
    }
  };
  const fetchSearchResults = async (query) => {
    if (!query) {
      setFilteredProducts([]); // Or fetch default list
      return;
    }

    const res = await fetch(`${api}/search?query=${query}`);
    const data = await res.json();
    setFilteredProducts(data);
    setProducts(data);
  };

  // Debounced search function
  const debouncedSearch = debounce((query) => {
    fetchSearchResults(query);
  }, 200); // Delay in milliseconds

  useEffect(() => {
    // Trigger the debounced search when the search term changes
    debouncedSearch(searchTerm);

    // Cleanup debounce function when the component unmounts or searchTerm changes
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchTerm]);

  const handleProductClick = (product) => {
    SelectedProduct(product);
    localStorage.setItem("selectedProduct", product);
    navigate("/selectedProduct");
  };

  return (
    <div>
      <div>
        {isMobile ? (
          <Mobi
        ):(
 <DesktopNavbar 
 search={handleSearchClick}
 searchTerm={searchTerm}
 setSearchTerm={setSearchTerm}
            
          
 
             />
        )}
       
        <Box
          Mobject={products}
          Dobject={filteredProducts}
          loaderRef={loaderRef}
          SelectedProduct={handleProductClick}
          handleProductClick={handleProductClick}
          highlightText={highlightText}
          category={category}
        />
      </div>
    </div>
  );
};

export default Products;
