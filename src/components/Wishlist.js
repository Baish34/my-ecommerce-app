import { useSelector, useDispatch } from "react-redux";
import {
  fetchWishlist,
  deleteWishlistItem,
} from "../features/wishlist/wishlistSlice";
import { addToCart } from "../features/cart/cartSlice";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Header";

const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlistStatus = useSelector((state) => state.wishlist.status);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [message, setMessage] = useState(''); // State for success messages

  useEffect(() => {
    dispatch(fetchWishlist()).then((response) => {
      setWishlistItems(response.payload || []);
    });
  }, [dispatch]);

  const handleRemove = (productId) => {
    dispatch(deleteWishlistItem(productId));
    setWishlistItems((prevItems) =>
      prevItems.filter((item) => item.productId._id !== productId),
    );
    setMessage("Product has been removed from your wishlist.");
    setTimeout(() => setMessage(""), 3000); // Hide message after 3 seconds
  };

  const handleAddToCart = (productId) => {
    dispatch(addToCart({ productId, quantity: 1 }));
    setMessage("Product has been added to your cart.");
    setTimeout(() => setMessage(""), 3000); // Hide message after 3 seconds
  };

  if (wishlistStatus === "loading") {
    return (
      <div className="text-center my-5">
        <span className="spinner-border text-primary" role="status" />
      </div>
    );
  }

  if (wishlistStatus === "failed") {
    return (
      <div className="text-center text-danger my-5">
        Failed to load wishlist. Please try again later.
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="container my-4">
        <h2 className="text-center mb-4">Your Wishlist</h2>
        {message && <div className="alert alert-success">{message}</div>} {/* Display success message */}
        {wishlistItems.length > 0 ? (
          <div className="row">
            {wishlistItems.map((item) => {
              const { _id, imageUrl, name, price } = item.productId;
              return (
                <div key={_id} className="col-md-3 mb-4">
                  <div className="card h-100 shadow-sm">
                    <div
                      className="d-flex justify-content-center align-items-center"
                      style={{
                        width: "100%",
                        height: "200px",
                        backgroundColor: "#f8f9fa",
                      }}
                    >
                      <img
                        src={imageUrl || "path/to/default-image.jpg"}
                        className="card-img-top"
                        alt={name || "Product"}
                        style={{ objectFit: "cover", maxHeight: "100%" }}
                      />
                    </div>
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">
                        {name || "Unnamed Product"}
                      </h5>
                      <p className="card-text">
                        <strong>${price || "N/A"}</strong>
                      </p>
                      <div className="mt-auto">
                        <button
                          className="btn btn-primary w-100 mb-2"
                          onClick={() => handleAddToCart(item.productId._id)}
                        >
                          Add to Cart
                        </button>
                        <button
                          className="btn btn-danger w-100"
                          onClick={() => handleRemove(_id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center">
            <p>Your wishlist is empty. Start adding some products!</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Wishlist;
