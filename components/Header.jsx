import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Header = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };


  return (
    <header className="bg-white shadow-sm">
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container-fluid">
            <Link className="navbar-brand fs-3" to="/">
              ElectroMart
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <form
                className="d-flex flex-grow-1 justify-content-center"
                role="search"
                onSubmit={handleSearchSubmit}
              >
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  style={{ maxWidth: "250px" }}
                />
                <button className="btn btn-outline-danger" type="submit">
                  Search
                </button>
              </form>
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="/cart">
                    <i className="bi bi-cart"></i>
                  </Link>
                </li>
                <li className="nav-item me-2">
                  <Link className="nav-link" to="/wishlist">
                    <i className="bi bi-heart"></i>
                  </Link>
                </li>
                  <li className="nav-item">
                    <Link
                      className="btn btn-outline-danger d-flex align-items-center"
                      to="/user"
                    >
                      Sign Up
                    </Link>
                  </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;


