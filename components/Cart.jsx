import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchCart, removeFromCart, increaseQuantity, decreaseQuantity, moveToWishlist } from "../features/cart/cartSlice";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Header";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartStatus = useSelector((state) => state.cart.status);
  const cartItems = useSelector((state) => state.cart.items);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [deliveryCharges, setDeliveryCharges] = useState(10);
   const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    if (cartStatus === 'idle') {
      dispatch(fetchCart());
    }
  }, [cartStatus, dispatch]);

  useEffect(() => {
    calculateTotalPrice(cartItems);
  }, [cartItems]);

  const handleRemove = (productId) => {
    console.log("Removing product with ID:", productId);
    dispatch(removeFromCart(productId));
     alert(`Product has been removed from the Cart.`);
  };

  const handleIncrement = (productId)=>{
    dispatch({ type: 'cart/incrementQuantity', payload: productId });
    dispatch(increaseQuantity(productId))
    setAlertMessage("Product incremented successfully!");
      setTimeout(()=>{
    setAlertMessage("")
        }, 2000)

  }  

  const handleDecrement = (productId)=>{
    dispatch({ type: 'cart/decrementQuantity', payload: productId });
    dispatch(decreaseQuantity(productId))
    setAlertMessage("Product decremented successfully!");
      setTimeout(()=>{
    setAlertMessage("")
        }, 2000)

  }



  const handleMoveToWishlist = async (productId) => {
    try {
      await dispatch(moveToWishlist({ productId })).unwrap();
       alert(`Product has been added to your wishlist.`);
      navigate("/wishlist");
    } catch (error) {
      console.error("Failed to move item to wishlist:", error);
    }
  };

  const calculateTotalPrice = (items) => {
    const total = items.reduce((sum, item) => sum + item.productId.price * item.quantity, 0);
    setTotalPrice(total);
  };

  const calculateFinalAmount = () => {
    const discountAmount = (discount / 100) * totalPrice;
    const finalPrice = totalPrice - discountAmount + deliveryCharges;
    return finalPrice.toFixed(2);
  };

  if (cartStatus === "loading") {
    return (
      <div className="text-center my-5">
        <span className="spinner-border text-primary" role="status" />
      </div>
    );
  }

  if (cartStatus === "failed") {
    return (
      <div className="text-center text-danger my-5">
        Failed to load cart. Please try again later.
      </div>
    );
  }

  const handleAddress = () => {
    navigate('/address-list')
  }

  return (
    <>
      <Header />
      <div className="container my-4">
        <h2 className="text-center mb-4">Your Cart</h2>
         {alertMessage && <div className="alert alert-success">{alertMessage}</div>} 
        {cartItems.length > 0 ? (
          <div className="row">
            <div className="col-md-9">
              <div className="row">
                {cartItems.map((item) => (
                  <div key={item.productId._id} className="col-md-4 mb-4">
                    <div className="card h-100 shadow-sm">
                      <img
                        src={item.productId.imageUrl || "path/to/default-image.jpg"}
                        className="card-img-top"
                        alt={item.productId.name}
                        style={{ objectFit: "cover", height: "200px" }}
                      />
                      <div className="card-body d-flex flex-column">
                        <h5 className="card-title">{item.productId.name}</h5>
                        <p className="card-text">
                          <strong>Price: ${item.productId.price}</strong>
                        </p>
                        <div className="d-flex align-items-center">
                          <p><button onClick={()=>handleIncrement(item.productId._id)}> + </button> Quantity: {item.quantity} <button onClick={()=> handleDecrement(item.productId._id)}> - </button></p>
                        </div>
                        <button className="btn btn-danger mb-2 mt-2" onClick={() => handleRemove(item.productId._id)}>
                          Remove
                        </button>
                        <button className="btn btn-secondary" onClick={() => handleMoveToWishlist(item.productId._id)}>
                          Move to Wishlist
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-md-3">
              <div className="card p-3">
                <h5 className="card-title">Price Details</h5>
                <hr />
                <p className="card-text">
                  <strong>Total Price: ${totalPrice.toFixed(2)}</strong>
                </p>
                <p className="card-text">
                  <strong>Discount: ${((discount / 100) * totalPrice).toFixed(2)}</strong>
                </p>
                <p className="card-text">
                  <strong>Delivery Charges: ${deliveryCharges.toFixed(2)}</strong>
                </p>
                <hr />
                <p className="card-text">
                  <strong>Final Amount: ${calculateFinalAmount()}</strong>
                </p>
                <button className="btn btn-primary w-100" onClick={handleAddress}>Place Order</button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <p>Your cart is empty. Start adding some products!</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
