import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';

// Import slick-carousel CSS files
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const SelectedProduct = ({api, SelectedProduct}) => {
  const [product, setProducts] = useState(SelectedProduct);


export default SelectedProduct;