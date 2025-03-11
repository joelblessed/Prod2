import React, { useEffect,useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCartBeforeLogin, loadCartAfterLogin, removeFromCartAPI, clearCartOnLogout } from "../../cartAction";
import { useNavigate, Link } from "react-router-dom";
const Cart = ({api}) => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();

    

    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.items);
    const token = localStorage.getItem("token"); // Check if user is signed in

    // 1. Load cart from localStorage before login
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        if (!token && storedCart.length > 0) {
            dispatch({ type: "cart/setCart", payload: storedCart }); // Manually dispatch to set cart state
        }
    }, [dispatch, token]);

    // 2. Load cart from server after login
    useEffect(() => {
        if (token) {
            dispatch(loadCartAfterLogin()); // Merge local and server cart
        }
    }, [dispatch, token]);

    // Add to Cart (Before Login)
    const handleAddToCart = (product) => {
        dispatch(addToCartBeforeLogin(product));
    };

    // Remove Item from Cart
    const handleRemoveFromCart = (productId) => {
        dispatch(removeFromCartAPI(productId));
    };

    // Clear Cart on Logout
    const handleClearCart = () => {
        dispatch(clearCartOnLogout());
    };

      


  var requestOptions = {
    method: 'DELETE',
    redirect: 'follow'
  };
  
  const deleteItem = async (itemId) => {
    try {
      await  fetch(`${api}/cart/${itemId}`, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
      // Remove the deleted item from state
      setProducts(cart.filter((item) => item.id !== itemId));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };
  const decrementQuantity = (itemId,currentQuantity)=>{
    const updatedQuantity = currentQuantity -1;
    if (currentQuantity <= 1) return;
    var requestOptions = {
  method: 'PUT',
  redirect: 'follow'
};

fetch(`${api}/cart/${itemId}/decrement`, requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
  setProducts(
    cart.map((item) =>
     item.id === itemId ? { ...item, quantity: updatedQuantity } : item
   ));
  }

   //  Increment Products
   const incrementQuantity = (itemId,currentQuantity)=>{
    const updatedQuantity = currentQuantity + 1;
    var requestOptions = {
  method: 'PUT',
  redirect: 'follow'
};

fetch(`${api}/cart/${itemId}/increment`, requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
  setProducts(
    cart.map((item) =>
     item.id === itemId ? { ...item, quantity: updatedQuantity } : item
   ));

  }      


    return (
        <div style={{ background: "none" }}>
          {cart.length === 0 ? (
            <h1>No items in the cart</h1>
          ) : (
            <div className="box1" style={{ width: "100%" }}>
              <h1></h1>
              {loading ? (
                <p>Loading...</p>
              ) : (
                <div>
                  <div style={{}}>
                    {/* <div>
                            <a className='btn btn-primary btn-sm me-1' href="">
                                Edit
                            </a>
                            <button type='button' className='btn btn-danger btn-sm'>Delete</button>
                        </div> */}
    
                    {cart.map((product, index) => (
                      <div
                        style={{
                          width: "90%",
                          margin: "20px",
                        }}
                      >
                        <div
                          key={product.id}
                          style={{
                            width: "auto",
                            height: "200px",
                            marginTop: "10px",
                          }}
                          className="box2"
                        >
                          <div style={{ display: "flex" }}>
                            <div style={{ display: "grid", marginRight: "10px" }}>
                            {product.images.length > 0 ? (
                           <img
                               src={product.images[0]} // Display first image only
                               alt={product.name}
                               style={{
                                   width: "300px",
                                   height: "300px",
                                   objectFit: "cover",
                                   borderRadius: "8px",
                               }}
                           />
                       ) : (
                           <p>No image available</p>
                       )}
                            </div>
    
                            <div style={{ display: "grid", width: "100%" }}>
                              <label
                                style={{ background: "yellow", height: "25px" }}
                              >
                                Description:{" "}
                              </label>
                              <p
                                style={{
                                  background: "red",
                                  height: "100px",
                                  marginTop: "1px",
                                  overflow: "auto",
                                }}
                              >
                                {product.desc}
                              </p>
                              <span
                                className="text"
                                style={{
                                  background: "green",
                                  height: "72px",
                                  width: "200px",
                                  marginTop: "-16px",
                                }}
                              >
                                <a
                                  className="name"
                                  style={{
                                    background: "",
                                    width: "auto",
                                    height: "",
                                    color: "black",
                                    fontSize: "15px",
                                  }}
                                >
                                  <span
                                    style={{ color: "black" }}
                                    dangerouslySetInnerHTML={{
                                      __html: highlightText(
                                        product.name,
                                        searchTerm
                                      ),
                                    }}
                                  ></span>
                                </a>
                                <a
                                  style={{
                                    background: "",
                                    marginTop: "px",
                                    fontSize: "14px",
                                  }}
                                >
                                  Price:<a>cfa {product.price}</a>
                                </a>
                                <div
                                  style={{
                                    background: "",
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <label
                                    style={{
                                      border: "1px solid blue",
                                      width: "40px",
                                      borderRadius: "8px",
                                      color: "white",
                                      fontWeight: "bold",
                                      background: "blue",
                                      height: "25px",
                                      textAlign: "center",
                                      fontSize: "15px",
                                    }}
                                  >
                                    {product.quantity}
                                  </label>
                                  <button
                                    style={{
                                      border: "1px solid grey",
                                      width: "50px",
                                      borderRadius: "8px",
                                      color: "white",
                                      fontWeight: "bold",
                                      background: "grey",
                                      height: "25px",
                                    }}
                                    onClick={() =>
                                      incrementQuantity(
                                        product.id,
                                        product.quantity
                                      )
                                    }
                                  >
                                    +
                                  </button>
                                  <button 
                                    style={{
                                      border: "1px solid grey",
                                      width: "50px",
                                      borderRadius: "8px",
                                      color: "white",
                                      fontWeight: "bold",
                                      background: "grey",
                                      height: "25px",
                                    }}
                                    onClick={() =>
                                      decrementQuantity(
                                        product.id,
                                        product.quantity
                                      )
                                    }
                                  >
                                    -
                                  </button>
                                  <button
                                    style={{
                                      border: "1px solid red",
                                      width: "50px",
                                      borderRadius: "8px",
                                      color: "red",
                                      fontWeight: "bold",
                                      background: "none",
                                      height: "25px",
                                    }}
                                    onClick={() => deleteItem(product.id)}
                                  >
                                    X
                                  </button>
                                </div>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="cart">
                      <Link to={"/checkout"} className="btn btn-warning">
                        checkout
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      );
    }
    
export default Cart;