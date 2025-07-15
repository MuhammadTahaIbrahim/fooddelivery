import React, { useContext, useEffect } from 'react'
import "./PlaceOrder.css";
import { StoreContext } from '../../context/StoreContext';
import { useState } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData(data => ({ ...data, [name]: value }))
  }

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo['quantity'] = cartItems[item._id];
        orderItems.push(itemInfo)
      }
    })
    // console.log(orderItems);
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    }

    let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    }
    else {
      alert("Error");
    }
  }

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/cart")
      toast.error("Login please");
    }
    else if (getTotalCartAmount() === 0) {
      navigate("/cart")
      toast.error("No items in your cart");
    }
  }, [token])

  return (
    <>
      <form onSubmit={placeOrder} className='place-order'>
        <div className="place-order-left">
          <p className="title">Delivery Information</p>
          <div className="multi-fields">
            <input required name="firstName" onChange={onChangeHandler} value={data.firstName} type="text" placeholder='first name' id='' />
            <input required name="lastName" onChange={onChangeHandler} value={data.lastName} type="text" placeholder='last name' id='' />
          </div>

          <input required name="email" onChange={onChangeHandler} value={data.email} type="email" id="" placeholder='email address' />
          <input required name="street" onChange={onChangeHandler} value={data.street} type="text" id="" placeholder='street' />
          <div className="multi-fields">
            <input required type="text" placeholder='city' name='city' onChange={onChangeHandler} value={data.city} id='' />
            <input required type="text" placeholder='state' name='state' onChange={onChangeHandler} value={data.state} id='' />
          </div>
          <div className="multi-fields">
            <input required type="text" placeholder='zip code' name='zipcode' id='' onChange={onChangeHandler} value={data.zipcode} />
            <input required type="text" placeholder='country' name='country' id='' onChange={onChangeHandler} value={data.country} />
          </div>

          <input required type="text" name="phone" id="" placeholder='phone' onChange={onChangeHandler} value={data.phone} />
        </div>

        <div className="place-order-right">
          <div className="cart-total">
            <h2>Cart Totals</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>${getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Total</p>
                <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
              </div>
            </div>
            <button type='submit'>PROCEED TO PAYMENT</button>
          </div>
        </div>
      </form>
    </>
  )
}

export default PlaceOrder
