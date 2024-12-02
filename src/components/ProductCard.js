import { useDispatch } from "react-redux";
import { addToWishlist } from "../features/wishlist/wishlistSlice";
import { addToCart } from "../features/cart/cartSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { _id, imageUrl, name, price, rating } = product;

  const handleAddToWishlist = () => {
    dispatch(addToWishlist({ productId: _id }));
    alert(`Your Product has been added to your wishlist.`);
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ productId: _id, quantity: 1 }));
    alert(`Your Product has been added to your cart.`);
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
      </div>
    </div>
  );
};

export default ProductCard;
