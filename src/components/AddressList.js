import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchAddresses,
  deleteAddress,
  selectAddress,
} from "../features/address/addressSlice";
import Header from "./Header";
import "bootstrap/dist/css/bootstrap.min.css";

const AddressList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const addresses = useSelector((state) => state.addresses.addresses);
  const status = useSelector((state) => state.addresses.status);
  const error = useSelector((state) => state.addresses.error);
  const selectedAddressId = useSelector(
    (state) => state.addresses.selectedAddressId
  );

  useEffect(() => {
    dispatch(fetchAddresses());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteAddress(id));
  };

  const handleSelect = (id) => {
    dispatch(selectAddress(id));
    navigate("/checkout"); // Redirect to the checkout page after selecting an address
  };

  const handleEdit = (address) => {
    navigate(`/addresses/${address._id}`, {
      state: { existingAddress: address },
    });
  };

  const handleAddNew = () => {
    navigate("/addresses/new");
  };

  return (
    <>
      <Header />
      <div className="container my-5">
        <div className="card shadow-sm border-light p-4">
          <h3 className="text-center mb-4">Saved Delivery Addresses</h3>
          {status === "loading" && <div className="text-center">Loading...</div>}
          {error && <div className="alert alert-danger">{error}</div>}
          {addresses.length === 0 ? (
            <div className="alert alert-info text-center">
              No addresses available. Please add a new address.
            </div>
          ) : (
            addresses.map((address) => (
              <div
                key={address._id}
                className="card mb-3 shadow-sm border-light"
                style={{ cursor: "pointer" }}
              >
                <div className="card-body d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <input
                      type="radio"
                      name="address"
                      value={address._id}
                      checked={selectedAddressId === address._id}
                      onChange={() => handleSelect(address._id)}
                      className="form-check-input me-3"
                    />
                    <div>
                      <h5 className="card-title">{address.addressLine1}</h5>
                      <p className="card-text">
                        {address.city}, {address.state}, {address.country}{" "}
                        {address.postalCode}
                      </p>
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={() => handleDelete(address._id)}
                      className="btn btn-outline-danger btn-sm me-2"
                    >
                      <i className="bi bi-trash"></i> Delete
                    </button>
                    <button
                      onClick={() => handleEdit(address)}
                      className="btn btn-outline-warning btn-sm"
                    >
                      <i className="bi bi-pencil"></i> Edit
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
          <button
            onClick={handleAddNew}
            className="btn btn-success w-100 mt-3 d-flex justify-content-center"
          >
            <i className="bi bi-plus-lg me-2"></i> Add New Address
          </button>
        </div>
      </div>
    </>
  );
};

export default AddressList;
