import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchAddresses,
  deleteAddress,
  selectAddress,
} from "../features/address/addressSlice";

const AddressList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const addresses = useSelector((state) => state.addresses.addresses);
  const status = useSelector((state) => state.addresses.status);
  const error = useSelector((state) => state.addresses.error);
  const selectedAddressId = useSelector(
    (state) => state.addresses.selectedAddressId,
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
      <div className="border border-grey rounded p-2">
        <h3>Saved Delivery Addresses</h3>
        {status === "loading" && <p>fetching addresses...</p>}
        {error && <p>{error}</p>}
        {addresses.map((address) => (
          <div
            key={address._id}
            className="border border-grey py-2 rounded container mb-3"
          >
            <div className="d-flex justify-content-between align-items-center">
              <label>
                <input
                  type="radio"
                  name="address"
                  value={address._id}
                  checked={selectedAddressId === address._id}
                  onChange={() => handleSelect(address._id)}
                />
                <span className="ms-2">
                  {address.addressLine1}, {address.city}, {address.state},{" "}
                  {address.postalCode}, {address.country}
                </span>
              </label>
              <div className="d-flex">
                <button
                  onClick={() => handleDelete(address._id)}
                  className="btn btn-danger "
                >
                  Delete
                </button>
                <button
                  onClick={() => handleEdit(address)}
                  className="btn btn-warning mx-2  d-flex flex-wrap"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
        <button onClick={handleAddNew} className="mt-2 btn btn-success">
          Add New Address
        </button>
      </div>
    </>
  );
};

export default AddressList;
