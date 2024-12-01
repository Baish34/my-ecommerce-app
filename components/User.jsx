import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../features/user/userSlice";
import Header from "./Header";
import { useEffect } from "react";

const User = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const status = useSelector((state) => state.user.status);
  const error = useSelector((state) => state.user.error);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);
  console.log(user);

  return (
    <>
      <Header />
      <div className="container py-5">
        <h2 className="text-center mb-4 fw-bold text-primary">User Profile</h2>

        {status === "loading" && (
          <div className="text-center">
            <p className="text-muted">Fetching user...</p>
          </div>
        )}
        {error && (
          <div className="text-center">
            <p className="text-danger">An error occurred while fetching user</p>
          </div>
        )}

        {user && (
          <div className="d-flex justify-content-center">
            <div
              className="card shadow border-0"
              style={{ width: "30rem", borderRadius: "15px" }}
            >
              <div
                className="card-header bg-primary text-white text-center"
                style={{
                  borderTopLeftRadius: "15px",
                  borderTopRightRadius: "15px",
                }}
              >
                <h3>{user.name}</h3>
              </div>
              <div className="card-body p-4">
                <h5 className="mb-3">
                  <i className="bi bi-envelope-fill text-primary me-2"></i>
                  Email: <span className="text-secondary">{user.email}</span>
                </h5>
                <h5 className="mb-4">
                  <i className="bi bi-telephone-fill text-primary me-2"></i>
                  Phone:{" "}
                  <span className="text-secondary">{user.phoneNumber}</span>
                </h5>
                <h5 className="text-primary fw-bold mb-3">Saved Addresses</h5>
                <ul className="list-group">
                  {user.addresses?.map((address) => (
                    <li
                      key={address._id}
                      className="list-group-item border-0 mb-2 shadow-sm"
                      style={{
                        borderRadius: "10px",
                        backgroundColor: "#f8f9fa",
                      }}
                    >
                      <p className="mb-1 fw-bold">{address.addressLine1}</p>
                      <p className="mb-0">
                        {address.city}, {address.state}
                      </p>
                      <p className="mb-0">
                        {address.postalCode}, {address.country}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default User;
