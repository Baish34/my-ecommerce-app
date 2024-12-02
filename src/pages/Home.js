import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CategoryList from "../components/CategoryList";
import { fetchCategories } from "../features/categories/categoriesSlice";
import Header from "../components/Header";
import image1 from '../images/image1.png';

const Home = () => {
  const dispatch = useDispatch();
  const { categories, status, error } = useSelector(
    (state) => state.categories
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Moved the category logic outside JSX
  const laptopCategory = categories?.find(
    (category) => category.name === "Laptops"
  );
  const cameraCategory = categories?.find(
    (category) => category.name === "Cameras"
  );

  return (
    <div className="home bg-light-subtle">
      <Header />
      {/* Handle loading and error states */}
      {status === "loading" && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <div>
        <CategoryList />
      </div>
      <div className="container pt-3">
        <img
          src={image1}
          className="img-fluid"
          alt="banner"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="container pt-5">
        <div className="row">
          <div className="col-12">
            <h3>Top Laptop and Camera</h3>
          </div>
          {laptopCategory && (
            <div className="col-md-6">
              <Link
                to={`/category/${laptopCategory._id}`}
                className="text-decoration-none text-dark"
              >
                <div className="card mb-3">
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img
                        src="https://images.samsung.com/is/image/samsung/p6pim/in/np960xgl-xg1in/gallery/in-galaxy-book4-ultra-16-inch-np960-np960xgl-xg1in-thumb-541771884?$152_152_PNG$"
                        alt="Laptop"
                        className="img-fluid"
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">Dell XPS 13</h5>
                        <p className="card-text">
                          Discover the power and versatility of the Dell.
                          Perfect for work and play.
                        </p>
                        <p className="card-text">
                          <small className="text-body-secondary">
                            Last updated 3 mins ago
                          </small>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )}
          {cameraCategory && (
            <div className="col-md-6">
              <Link
                to={`/category/${cameraCategory._id}`}
                className="text-decoration-none text-dark"
              >
                <div className="card mb-3">
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img
                        src="https://in.canon/media/image/2023/02/06/d2a14a492cb94cbab491012c291fd6f5_EOS+R8+RF24-50mm+f4.5-6.3+IS+STM+Front+Slant.png"
                        className="img-fluid"
                        alt="Camera"
                        style={{ height: "152px", width: "152px" }}
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">Canon EOS R5</h5>
                        <p className="card-text">
                          Capture stunning photos and videos with the Canon.
                        </p>
                        <p className="card-text">
                          <small className="text-body-secondary">
                            Last updated 5 mins ago
                          </small>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
