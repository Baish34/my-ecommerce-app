import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../features/categories/categoriesSlice";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const CategoryList = () => {
  const dispatch = useDispatch();
  const { categories, status, error } = useSelector(
    (state) => state.categories
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCategories());
    }
  }, [dispatch, status]);

  if (status === "loading") return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mt-3">
      <div className="d-flex justify-content-center flex-wrap">
        {categories.map((category) => (
          <div key={category._id} className="text-center m-2">
            <Link
              to={`/category/${category._id}`}
              className="text-decoration-none text-dark"
            >
              <div
                className="rounded-circle border bg-light d-flex align-items-center justify-content-center"
                style={{ width: "80px", height: "80px" }}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="img-fluid rounded-circle"
                  style={{ maxWidth: "70px", maxHeight: "70px" }}
                />
              </div>
              <div
                className="mt-2"
                style={{ fontSize: "14px", fontWeight: "bold" }}
              >
                {category.name}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
