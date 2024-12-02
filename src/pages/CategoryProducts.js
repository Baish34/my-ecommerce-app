import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  setFilters,
  clearFilters,
} from "../features/products/productsSlice";
import ProductCard from "../components/ProductCard";
import Header from "../components/Header";
import "bootstrap/dist/css/bootstrap.min.css";

const categoryMap = {
  "66754d915f83c7d0aad9ebf3": "Accessories",
  "66754d915f83c7d0aad9ebf0": "Laptops",
  "66754d915f83c7d0aad9ebf1": "Smartphones",
  "66754d915f83c7d0aad9ebf2": "Cameras",
};

const CategoryProducts = () => {
  const dispatch = useDispatch();
  const { filteredProducts, status, error, filters, products } = useSelector(
    (state) => state.products
  );

  const [ratingFilter, setRatingFilter] = useState(filters.rating ?? null);
  const [priceFilter, setPriceFilter] = useState(filters.price ?? "lowToHigh");
  const [categoryFilter, setCategoryFilter] = useState(filters.categories ?? []);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 4000]); 

  const categories = Array.from(
    new Set(
      products
        .map((product) => categoryMap[product.category])
        .filter((category) => category)
    )
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    const selectedCategories = categoryFilter.map((name) =>
      Object.keys(categoryMap).find((key) => categoryMap[key] === name)
    );

    dispatch(
      setFilters({
        rating: ratingFilter,
        price: priceFilter,
        categories: selectedCategories,
        searchTerm: searchTerm.trim().toLowerCase(),
        priceRange: priceRange,
      })
    );
  }, [dispatch, ratingFilter, priceFilter, categoryFilter, searchTerm, priceRange]);

  const handleRatingChange = (e) => {
    setRatingFilter(e.target.value ? Number(e.target.value) : null);
  };

  const handlePriceChange = (e) => {
    const newRange = [...priceRange];
    newRange[e.target.dataset.index] = Number(e.target.value);
    setPriceRange(newRange);
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setCategoryFilter((prev) =>
      prev.includes(value)
        ? prev.filter((category) => category !== value)
        : [...prev, value]
    );
  };

  const handleClearFilters = () => {
    setRatingFilter(null);
    setPriceFilter("lowToHigh");
    setCategoryFilter([]);
    setSearchTerm(""); // Clear search term
    setPriceRange([0, 1000]); // Reset price range
    dispatch(clearFilters());
  };

  const filteredBySearch = (filteredProducts || []).filter((product) =>
    product.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
  );

  const filteredByPrice = filteredBySearch.filter(
    (product) =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
  );

  const sortedProducts = React.useMemo(() => {
    const sorted = [...filteredByPrice];
    if (priceFilter === "lowToHigh") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (priceFilter === "highToLow") {
      sorted.sort((a, b) => b.price - a.price);
    }
    return sorted;
  }, [filteredByPrice, priceFilter]);

  if (status === "loading")
    return <div className="text-center my-5">Loading...</div>;
  if (status === "error")
    return (
      <div className="text-center text-danger my-5">
        Error: {error || "Something went wrong"}
      </div>
    );

  return (
    <div>
      <Header onSearch={setSearchTerm} />
      <div className="container-fluid px-0">
        <div className="row gx-0">
          <div className="col-lg-3 mb-4">
            <div className="p-4 bg-white rounded shadow-sm">
              <h5 className="mb-3">
                Filters
                <span
                  className="float-end text-primary"
                  style={{ cursor: "pointer" }}
                  onClick={handleClearFilters}
                >
                  Clear
                </span>
              </h5>

              {/* Category Filter */}
              <div className="mb-4">
                <h6 className="mb-3">Category</h6>
                {categories.map((category) => (
                  <div className="form-check" key={category}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value={category}
                      checked={categoryFilter.includes(category)}
                      onChange={handleCategoryChange}
                    />
                    <label className="form-check-label">{category}</label>
                  </div>
                ))}
              </div>

              {/* Rating Filter */}
              <div className="mb-4">
                <h6 className="mb-3">Rating</h6>
                {[4, 3, 2, 1].map((star) => (
                  <div className="form-check" key={star}>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="rating"
                      value={star}
                      checked={ratingFilter === star}
                      onChange={handleRatingChange}
                    />
                    <label className="form-check-label">
                      {star} Star{star > 1 ? "s" : ""} & above
                    </label>
                  </div>
                ))}
              </div>

              {/* Myntra-like Price Range Slider */}
              <div className="mb-4">
                <h6 className="mb-3">Price Range</h6>
                <input
                  type="range"
                  className="form-range"
                  min="0"
                  max="4000"
                  step="10"
                  value={priceRange[0]}
                  onChange={handlePriceChange}
                  data-index="0"
                  style={{ width: "100%" }}
                />
                <div className="d-flex justify-content-between">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>

              {/* Sort By Price */}
              <div className="mb-4">
                <h6 className="mb-3">Sort by</h6>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="price"
                    value="lowToHigh"
                    checked={priceFilter === "lowToHigh"}
                    onChange={handlePriceChange}
                  />
                  <label className="form-check-label">Price - Low to High</label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="price"
                    value="highToLow"
                    checked={priceFilter === "highToLow"}
                    onChange={handlePriceChange}
                  />
                  <label className="form-check-label">Price - High to Low</label>
                </div>
              </div>
            </div>
          </div>

          {/* Product Listing */}
          <div className="col-lg-9">
            <div className="bg-light p-4 rounded shadow-sm">
              <h5 className="mb-4">
                Showing All Products ({sortedProducts.length} products)
              </h5>
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-2 g-4">
                {sortedProducts.map((product) => (
                  <div className="col mb-4" key={product._id}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryProducts;
