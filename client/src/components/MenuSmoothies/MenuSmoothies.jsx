import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import './menu-smoothies.scss'
import dataStandart from '../../../../server/server-data/standartMenu.mjs';
import ModalAccept from "../ui/Modal/ModalAccept";
import { Swiper, SwiperSlide } from "swiper/react";
import {  Pagination, A11y } from 'swiper/modules';
import './swiper.scss';
import 'swiper/css/pagination';


const MenuSmoothies = () => {
   const [modal, setModal] = useState(false);
   const [filter, setFilter] = useState("All");
   const standart = dataStandart.standart;
   const dispatch = useDispatch();


   const handleAddToBasket = (item) => {

      if (!item.count) {
         item.count = 1;
      }
      dispatch({
         type: "ADD_PRODUCT",
         payload: item,
      });

      setModal(true);
      setTimeout(() => {
         setModal(false);
      }, 3000);
   };

   const filteredStandart = standart.filter((item) => {
      if (filter === "All") {
         return true;
      } else {
         return item.type === filter;
      }
   });

   const ActiveClass = (buttonFilter) => {
      return `smoothies__btn ${filter === buttonFilter ? "active" : ""}`;
   };

   return (
      <section className="smoothies">
         <div className="smoothies__body container" id="smoothies">
            <h2 className="smoothies__title">Menu of our smoothies</h2>
            <nav className="smoothies__menu">
               <ul className="smoothies__list">
                  <button className={ActiveClass("All")} onClick={() => setFilter("All")}>All</button>
                  <button className={ActiveClass("fruits")} onClick={() => setFilter("fruits")}>Fruits</button>
                  <button className={ActiveClass("vegetables")} onClick={() => setFilter("vegetables")}>Vegetables</button>
               </ul>
            </nav>
            <div className="smoothies__block block-items">
               <Swiper
                  modules={[Pagination, A11y]}
                  spaceBetween={15}
                  slidesPerView={3}
                  pagination={{ clickable: true }}
                  onSwiper={(swiper) => console.log(swiper)}
                  onSlideChange={() => console.log('slide change')}
               >

                  <div className="block-items__columns">
                     {filteredStandart.map((item) => (
                        <SwiperSlide key={item.id}>
                           <div className="block-items__item">
                              <div className="block-items__img"><img src={item.image} alt={item.name} /></div>
                              <div className="block-items__body">
                                 <h3>{item.name}</h3>
                                 <p>{item.description}</p>
                                 <div className="block-items__buy">
                                    <span>Price: {item.price}$</span>
                                    <button onClick={() => handleAddToBasket(item)}>+</button>
                                 </div>
                              </div>
                           </div>
                        </SwiperSlide>
                     ))}
                  </div>
               </Swiper>
            </div>
            <ModalAccept visible={modal} setVisible={setModal}>
               <div className="modal-ok">
                  <p>Smothie Added</p>
                  <button onClick={() => setModal(false)}>Ok</button>
               </div>
            </ModalAccept>
         </div>
      </section >
   );
};

export default MenuSmoothies;