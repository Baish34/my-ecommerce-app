import { useDispatch } from "react-redux";
import { addToWishlist } from "../features/wishlist/wishlistSlice";
import { addToCart } from "../features/cart/cartSlice";
import { useState } from "react";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { _id, imageUrl, name, price, rating } = product;
  const [message, setMessage] = useState('');

  const handleAddToWishlist = () => {
    dispatch(addToWishlist({ productId: _id }));
    setMessage("Your product has been added to your wishlist.");
    setTimeout(() => setMessage(""), 3000); // Hide message after 3 seconds
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ productId: _id, quantity: 1 }));
    setMessage("Your product has been added to your cart.");
    setTimeout(() => setMessage(""), 3000); // Hide message after 3 seconds
  };

  return (
    <div className="card d-flex flex-row">
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ width: "200px", height: "226px", backgroundColor: "#f8f9fa" }}
      >
        <img
          src={imageUrl || "path/to/default-image.jpg"}
          alt={name || "Product Image"}
          style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "cover" }}
        />
      </div>
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{name || "Unnamed Product"}</h5>
        <p className="card-text">
          <strong>${price || "N/A"}</strong>
        </p>
        <p className="card-text">Rating: {rating || "N/A"} stars</p>
        <div className="mt-auto">
          <button
            className="btn btn-primary w-100 mb-2"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
          <button
            className="btn btn-secondary w-100"
            onClick={handleAddToWishlist}
          >
            Save to Wishlist
          </button>
        </div>
        {message && <div className="alert alert-success mt-2">{message}</div>}
      </div>
    </div>
  );
};

export default ProductCard;
