import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { addAddress, updateAddress } from '../features/address/addressSlice';
import Header from './Header'

const AddressForm = () => {
  const dispatch = useDispatch();
  const location = useLocation()
  const navigate = useNavigate()

  const existingAddress = location.state?.existingAddress;

  const [address, setAddress] = useState({
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  });

    useEffect(() => {
      if (existingAddress) {
        setAddress(existingAddress);
      }
    }, [existingAddress]);


    const handleSubmit = (e) => {
      e.preventDefault();

      if (existingAddress) {
        dispatch(updateAddress({ addressId: existingAddress._id, updatedAddress: address }));
      } else {
        dispatch(addAddress(address));
      }
      navigate('/address-list'); 
    };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  return (<>
    <Header/>
    <div className='container py-3'>

      <h2>{existingAddress ? 'Edit Address' : 'Add New Address'}</h2>
    <form onSubmit={handleSubmit} className=''>
      <div className='mb-3'>
      <label htmlFor='addressLine1'>Address Line 1: 
      <input name="addressLine1" value={address.addressLine1}
        className='form-control'
        onChange={handleChange} placeholder="Address Line 1" required /> </label> </div><br/>
      <div className='mb-3'>
      <label htmlFor='addressLine2'>  Address Line 2: 
      <input name="addressLine2"  className='form-control'
  value={address.addressLine2} onChange={handleChange} placeholder="Address Line 2" /> </label></div><br/>

      <div className='mb-3'>
    <label htmlFor='city'>  City: 
      <input name="city"   className='form-control'
  value={address.city} onChange={handleChange} placeholder="City" required /> </label></div><br/> 

      <div className='mb-3'>
     <label htmlFor='state'> State: 
      <input name="state"         className='form-control'
   value={address.state} onChange={handleChange} placeholder="State" required /></label></div><br/>

      <div className='mb-3'>
     <label htmlFor='postalCode'> Postal Code: 
      <input name="postalCode"         className='form-control'
  value={address.postalCode} onChange={handleChange} placeholder="Postal Code" required /></label></div><br/>

      <div className='mb-3'>
      <label htmlFor='country'>Country: 
      <input name="country"          className='form-control'
 value={address.country} onChange={handleChange} placeholder="Country" required /></label></div><br/>
      <button type="submit">{existingAddress ? 'Update' : 'Add'} Address</button>
    </form></div>
    </>);
};

export default AddressForm;