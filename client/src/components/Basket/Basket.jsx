import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from "react-router-dom";
import './basket.scss';
import Order from "../OrderForm/Order.jsx";
import ModalAccept from "../ui/Modal/ModalAccept";

const Basket = () => {

   const items = useSelector((state) => state.basketReducer.products);
   const itemsSmoothies = useSelector((state) => state.customReducer.smoothies);
   const [totalPrice, setTotalPrice] = useState(0);
   const [modal, setModal] = useState(false)
   const dispatch = useDispatch();
   const allItems = [...items, ...itemsSmoothies];

   const deletesmoothie = (item) => {
      dispatch({
         type: "REMOVE_PRODUCT",
         payload: item,
      });
   };

   const deleteCustomsmoothie = (item) => {
      dispatch({
         type: "REMOVE_CUSTOM",
         payload: item,
      });
   };

   const addItemCount = (item) => {
      if (item.count !== 10) {
         dispatch({
            type: "ADD_COUNT",
            payload: item,
         });
      };
   }

   const removeItemCount = (item) => {
      if (item.count > 1) {
         dispatch({
            type: "REMOVE_COUNT",
            payload: item,
         });
      };
   }

   const removeCustomCount = (item) => {
      if (item.count > 1) {
         dispatch({
            type: "REMOVE_CUSTOM_COUNT",
            payload: item,
         });
      };
   }

   const addCustomCount = (item) => {
      if (item.count < 10) {
         dispatch({
            type: "ADD_CUSTOM_COUNT",
            payload: item,
         });
      };
   }

   useEffect(() => {
      const allItems = [...items, ...itemsSmoothies];
      const newTotalPrice = allItems.reduce((total, item) => {
         return total + item.price * item.count;
      }, 0);
      setTotalPrice(newTotalPrice);
   }, [items, itemsSmoothies]);

   return (
      <section className="basket">
         <div className="container">
            <div className="basket__body">
               {allItems.length === 0 ? (
                  <div>
                     <p className="basket__info">Nothing added yet</p>
                     <NavLink to="/constructor">
                        <button className="basket__go-to-smoothies">I want a smoothie!</button>
                     </NavLink>
                  </div>
               ) : (
                  <div>
                     <h2>Your Order:</h2>
                     <div className="items">
                        {itemsSmoothies.map((item) => (
                           <div className="shop-item" key={item.id}>
                              <div className="shop-item__img"><img src={item.image} alt={item.name} /></div>
                              <div className="shop-item__body">
                                 <h3>{item.name}</h3>
                                 <p>Size: {item.size}ml</p>
                                 <div className="shop-item__controll">
                                    <button onClick={() => removeCustomCount(item)}>-</button>
                                    <span>{item.count}</span>
                                    <button onClick={() => addCustomCount(item)}>+</button>
                                 </div>
                                 <div className="shop-item__price">
                                    <span>Price: {(item.price * item.count).toFixed(2)}$ </span>
                                    <button onClick={() => deleteCustomsmoothie(item)}>X</button>
                                 </div>
                              </div>
                           </div>
                        ))}
                        {items.map((item) => (
                           <div className="shop-item" key={item.id}>
                              <div className="shop-item__img"><img src={item.image} alt={item.name} /></div>
                              <div className="shop-item__body">
                                 <h3>{item.name}</h3>
                                 <p>Size: {item.size}ml</p>
                                 <div className="shop-item__controll">
                                    <button onClick={() => removeItemCount(item)}>-</button>
                                    <span>{item.count}</span>
                                    <button onClick={() => addItemCount(item)}>+</button>
                                 </div>
                                 <div className="shop-item__price">
                                    <span>Price: {(item.price * item.count).toFixed(2)}$</span>
                                    <button onClick={() => deletesmoothie(item)}>X</button>
                                 </div>
                              </div>
                           </div>
                        ))}
                     </div>
                     <div className="info-order">
                        <button className="info-order__make-order" onClick={() => setModal(true)}>Make an order</button>
                        <p className="info-order__total">Total Price: {totalPrice.toFixed(2)}$</p>
                     </div>
                  </div>
               )}
            </div>
            <ModalAccept visible={modal} setVisible={setModal}>
               <Order closeModal={() => setModal(false)}/>
            </ModalAccept>
         </div>
      </section>
   );
};

export default Basket;