import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from "react-redux";
import ConstructorHeader from "../ConstructorHeader/ConstructorHeader.jsx";
import dataList from '../../../../server/server-data/ingredients.mjs';
import dataPortion from '../../../../server/server-data/portion.mjs';
import './constructor.scss';
import ModalAccept from "../ui/Modal/ModalAccept.jsx";
import PortionSelector from "./PortionSelector.jsx";
import IngredientSelector from "./IngredientSelector.jsx";
import { calculateSmoothieTotalPrice } from "./calculateSmoothieTotalPrice.js";

const Constructor = () => {
   const smoothiesList = dataList.fruits;
   const vegetablesList = dataList.vegetables;

   const [fruitIngredients, setFruitIngredients] = useState([]);
   const [vegetableIngredients, setVegetableIngredients] = useState([]);
   const [selectedPortion, setSelectedPortion] = useState(dataPortion[0].size);
   const [smoothieTotalPrice, setSmoothieTotalPrice] = useState(0);
   const [addToBasketDisabled, setAddToBasketDisabled] = useState(true);
   const [modal, setModal] = useState(false)
   const [addSelect, setAddSelect] = useState(false);
   const dispatch = useDispatch();


   const handleSelectChange = (e, index) => {
      const newId = e.target.value;
      const selectedType = selectedIngredientType(newId);
      const updatedIngredients = [...fruitIngredients, ...vegetableIngredients];

      updatedIngredients[index] = {
         id: newId,
         type: selectedType,
         amount: 1,
      };

      if (selectedType === "fruit") {
         setFruitIngredients(updatedIngredients.filter((ingredient) => ingredient.type === "fruit"));
      } else {
         setVegetableIngredients(updatedIngredients.filter((ingredient) => ingredient.type === "vegetable"));
      }
   };

   useEffect(() => {
      const price = calculateSmoothieTotalPrice(fruitIngredients, vegetableIngredients, selectedPortion, smoothiesList, vegetablesList);
      setSmoothieTotalPrice(price);
   }, [fruitIngredients, vegetableIngredients, selectedPortion]);

   const selectedIngredientType = (id) => {
      const fruit = smoothiesList.find(fruit => fruit.id === id);
      return fruit ? "fruit" : "vegetable";
   };

   const deleteSelect = (index) => {
      const updatedIngredients = [...fruitIngredients, ...vegetableIngredients];
      updatedIngredients.splice(index, 1);

      const updatedFruitIngredients = updatedIngredients.filter(ingredient => ingredient.type === "fruit");
      const updatedVegetableIngredients = updatedIngredients.filter(ingredient => ingredient.type === "vegetable");

      setFruitIngredients(updatedFruitIngredients);
      setVegetableIngredients(updatedVegetableIngredients);
      setAddSelect(false);
   };

   const addFruit = () => {
      if (fruitIngredients.length + vegetableIngredients.length < 5) {
         setFruitIngredients((prevIngredients) => [...prevIngredients, { id: "", type: "fruit", amount: 1 }]);
      } else {
         setAddSelect(true)
      }
   };

   const addVega = () => {
      if (fruitIngredients.length + vegetableIngredients.length < 5) {
         setVegetableIngredients((prevIngredients) => [...prevIngredients, { id: "", type: "vegetable", amount: 1 }]);
      } else {
         setAddSelect(true)
      }
   };

   const clearIngredients = () => {
      setFruitIngredients([]);
      setVegetableIngredients([]);
   };

   const handleAddToBasket = () => {
      const smoothieData = {
         id: uuidv4(),
         name: "Constructor Smoothie",
         size: selectedPortion,
         price: smoothieTotalPrice,
         image: "/static/images/constructor/customSmoothie.jpg",
      };

      const ingredients = [...fruitIngredients, ...vegetableIngredients].filter(
         (ingredient) => ingredient.id !== ""
      );

      const smoothie = {
         ...smoothieData,
         ingredients: ingredients,
      };

      dispatch({
         type: "ADD_CUSTOM",
         payload: smoothie,
      });

      clearIngredients();
      setAddSelect(false);
      setModal(true);
      setTimeout(() => {
         setModal(false);
      }, 2000);
   };

   useEffect(() => {
      const hasSelectedIngredient = [...fruitIngredients, ...vegetableIngredients].some(
         (ingredient) => ingredient.id !== ""
      );
      setAddToBasketDisabled(!hasSelectedIngredient);
   }, [fruitIngredients, vegetableIngredients]);

   return (
      <section className="constructor">
         <ConstructorHeader />
         <div className="constructor__body container">
            <div className="constructor__img"><img src="/static/images/constructor/customSmoothie.jpg" alt="img" /></div>
            <div className="constructor__smoothies">
               <h4>Smoothies constructor</h4>
               <PortionSelector portion={dataPortion} handlePortionChange={setSelectedPortion} selectedPortion={selectedPortion} />
               <div className="constructor__btn">
                  <button onClick={addFruit} disabled={addSelect}>Add<br />Fruits</button>
                  <button onClick={addVega} disabled={addSelect}>Add<br />Vegetables</button>
               </div>
               <IngredientSelector
                  ingredients={[...fruitIngredients, ...vegetableIngredients]}
                  handleSelectChange={handleSelectChange}
                  smoothiesList={smoothiesList}
                  vegetablesList={vegetablesList}
                  deleteSelect={deleteSelect}
               />
               <div className="constructor__buy">
                  <span>Price: {smoothieTotalPrice}$</span>
                  <button onClick={() => handleAddToBasket()} disabled={addToBasketDisabled}>Add to basket</button>
               </div>
               <ModalAccept visible={modal} setVisible={setModal}>
                  <div className="modal-ok">
                     <p>Smothie Added</p>
                     <button onClick={() => setModal(false)}>Ok</button>
                  </div>
               </ModalAccept>
            </div>
         </div>
      </section>
   );
};

export default Constructor;