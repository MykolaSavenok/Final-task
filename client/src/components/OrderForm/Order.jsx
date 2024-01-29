import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import "./order.scss"

const Order = ({ closeModal }) => {
   const dispatch = useDispatch();
   const order = useSelector(state => state.orderReducer.userData);


   useEffect(() => {
      setFormData({
         name: order.userName || "",
         tel: order.userTel || "",
         delivery: order.deliveryType || "Pickup",
         city: order.city || "",
         address: order.address || "",
      });
   }, [order]);


   const [formData, setFormData] = useState({
      name: "",
      tel: "",
      delivery: "Delivery",
      city: "",
      address: "",
   });


   const updateFormData = (e) => {
      setFormData({
         ...formData,
         [e.target.name]: e.target.value,
      });
   };

   const buySmoothie = (e) => {
      e.preventDefault();
      dispatch({
         type: 'SET_USER_DATA',
         payload: formData,
      });
      closeModal();
      console.log(formData);
   };

   const cancelOrder = (e) => {
      e.preventDefault();
      closeModal();
   };

   return (
      <>
         <form className="form">
            <div className="form__pair">
               <label htmlFor="form-name">Name:</label>
               <input
                  type="text"
                  id="form-name"
                  className="form__input"
                  name="name"
                  value={formData.name}
                  onChange={updateFormData}
               />
            </div>
            <div className="form__pair">
               <label htmlFor="form-tel">Tel:</label>
               <input
                  type="text"
                  id="form-tel"
                  className="form__input"
                  name="tel"
                  value={formData.tel}
                  onChange={updateFormData}
               />
            </div>
            <div className="form__delivery">
               <label htmlFor="form-delivery">Select delivery:</label>
               <select
                  id="form-delivery"
                  name="delivery"
                  value={formData.delivery}
                  onChange={updateFormData}
               >
                  <option value="Pickup">Pickup</option>
                  <option value="Delivery">Delivery</option>
               </select>
            </div>
            {formData.delivery === 'Delivery' && (
               <>
                  <div className="form__pair">
                     <label htmlFor="form-city">City:</label>
                     <input
                        type="text"
                        id="form-city"
                        className="form__input"
                        name="city"
                        value={formData.city}
                        onChange={updateFormData}
                     />
                  </div>
                  <div className="form__pair">
                     <label htmlFor="form-address">Address:</label>
                     <input
                        type="text"
                        id="form-address"
                        className="form__input"
                        name="address"
                        value={formData.address}
                        onChange={updateFormData}
                     />
                  </div>
               </>
            )}
            <div className="form__button">
               <button onClick={buySmoothie} className="form__accept">Accept</button>
               <button onClick={cancelOrder} className="form__accept">X</button>
            </div>
         </form>
      </>
   );
};

export default Order;
