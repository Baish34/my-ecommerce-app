import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CategoryProducts from "./pages/CategoryProducts";
import Wishlist from "./components/Wishlist";
import User from "./components/User";
import Cart from "./components/Cart";
import AddressList from "./components/AddressList";
import AddressForm from "./components/AddressForm";
import Checkout from "./components/Checkout";
import OrderConfirm from "./components/OrderConfirm";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:categoryId" element={<CategoryProducts />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/user" element={<User />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/address-list" element={<AddressList />} />
        <Route path="/addresses/:addressId" element={<AddressForm />} />
        <Route path="/addresses/new" element={<AddressForm />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-confirm" element={<OrderConfirm />} />
      </Routes>
    </Router>
  );
};

export default App;
