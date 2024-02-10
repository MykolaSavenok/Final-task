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

   const [errors, setErrors] = useState({
      name: "",
      tel: "",
      city: "",
      address: "",
   });

   const validationRegex = {
      name: /^[a-zA-Z\s]+$/,
      tel: /^[0-9]{10}$/,
      city: /^[a-zA-Z\s]+$/,
      address: /^[a-zA-Z0-9\s]+$/,
   };

   const validateForm = () => {
      let valid = true;
      const newErrors = {
         name: "",
         tel: "",
         city: "",
         address: "",
      };

      Object.keys(formData).forEach((field) => {
         if (validationRegex[field] && !validationRegex[field].test(formData[field].trim())) {
            newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is invalid!`;
            valid = false;
         }
      });

      setErrors(newErrors);
      return valid;
   };

   const updateFormData = (e) => {
      setFormData({
         ...formData,
         [e.target.name]: e.target.value,
      });
   };

   const buySmoothie = (e) => {
      e.preventDefault();
      if (validateForm()) {
         dispatch({
            type: 'SET_USER_DATA',
            payload: formData,
         });
         closeModal();
         console.log(formData);
      }
   };

   const cancelOrder = (e) => {
      e.preventDefault();
      closeModal();
      setErrors({
         name: "",
         tel: "",
         city: "",
         address: "",
      });
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
               <label htmlFor="form-tel">Phone:</label>
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
            <div className="form__error">{errors.name}</div>
            <div className="form__error">{errors.tel}</div>
            <div className="form__error">{errors.city}</div>
            <div className="form__error">{errors.address}</div>
         </form>
      </>
   );
};

export default Order;
