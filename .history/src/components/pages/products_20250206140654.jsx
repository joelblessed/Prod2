import React, { useEffect, useState } from 'react';
import "./products.css"
import { useNavigate } from 'react-router-dom';


const Products = ({api,loading,images, filteredProducts, setSelectedProduct , addToCart, handleShowAlert ,showAlert, searchTerm, highlightText}) => {
 const [currentIndex, setCurrentIndex] = useState(0)

  
  const navigate = useNavigate();
  const handleProductClick = (product) => {
    setSelectedProduct(product);
    navigate("/selectedProduct")
  };
  const nextImage =() =>{
    setCurrentIndex((prevIndex) => (prevIndex +1) %images.length) 
  }

  return (
    <>
  

    <div className='box1'>
            <h1></h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                
                <div style={{ display: 'flex', flexWrap: 'wrap' }}   >
                  
                    {/* <div>
                        <a className='btn btn-primary btn-sm me-1' href="">
                            Edit
                        </a>
                        <button type='button' className='btn btn-danger btn-sm'>Delete</button>
                    </div> */}
                  {filteredProducts.map((product, index) => (
                   
                    <div key={product.id} className='box2'  >
                      {product.images.map((image, index) =>(

                    
                    <img className='image'
                        key={index}
                      src={product.images[0]}
                        alt={product.name}
                        onClick={() => handleProductClick(product)}
                       
                        />
                      ))}
                         <span className='text'>
                            <a  className='name'><span style={{color:"black"}} 
                                dangerouslySetInnerHTML={{
                                __html: highlightText(product.name, searchTerm),
                                       }}
                                 ></span> </a>
                            <a>Description: {product.desc}</a>
                            <a>Price: {product.price}</a>
                         </span>
                         <div className='cart'>
                            <button className='btn btn-warning' onClick={ () => addToCart(product)} >Add to Cart</button>
                            
                         </div>
                          
                         
                    </div>

                  ))}
                  
                  <button onClick={handleShowAlert}>Show Custom Alert</button>
      {showAlert && (
        <div style={{ padding: "10px", backgroundColor: "red", color: "white" }}>
          This is a custom alert!
        </div>
      )}
      

            
     
                </div>
               
            )}
            
        </div > 
            </>
  )
}

export default Products
