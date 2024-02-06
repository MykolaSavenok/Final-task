import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import './menuSmoothies.scss';
import ModalAccept from "../ui/Modal/ModalAccept";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y } from 'swiper/modules';
import './swiper.scss';


const MenuSmoothies = () => {
   const [modal, setModal] = useState(false);
   const [filter, setFilter] = useState("All");
   const [standart, setStandart] = useState([]);
   const dispatch = useDispatch();

   useEffect(() => {
      fetchMenu();
      console.log(fetchMenu);
   }, []);

   const fetchMenu = async () => {
      try {
         const response = await fetch('/standartMenu');
         if (!response.ok) {
            throw new Error('Failed to fetch menu data');
         }
         const data = await response.json(); 
         setStandart(data.standart); 
      } catch (error) {
         console.error("Error fetching menu:", error);
      }
   };


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
                  breakpoints={{
                     1100: {
                        slidesPerView: 3
                     },
                     767.98: {
                        slidesPerView: 2
                     },
                     450: {
                        slidesPerView: 1
                     }
                  }}
                  pagination={{ clickable: true }}
               >
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