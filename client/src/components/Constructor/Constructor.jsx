import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from "react-redux";
import ConstructorHeader from "../ConstructorHeader/ConstructorHeader.jsx";
import dataList from '../../../../server/server-data/ingredients.js';
import dataPortion from '../../../../server/server-data/portion.js';
import './constructor.scss';
import ModalAccept from "../ui/Modal/ModalAccept.jsx";

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


   const ingredientsSelects = () => (
      [...fruitIngredients, ...vegetableIngredients].map((selectedIngredient, index) => (
         <div className="constructor__list custom-select" key={index}>
            <label className="custom-select__label" htmlFor={`ingredientSelect${index}`}>
               {selectedIngredient.type === "fruit" ? "Choose a fruit ingredient" : "Choose a vegetable ingredient"}
            </label>
            <div className="custom-select__selects">
               <select
                  id={`ingredientSelect${index}`}
                  value={selectedIngredient.id}
                  onChange={(e) => handleSelectChange(e, index)}
               >
                  <option disabled className="custom-select__option" value="">Select an ingredient</option>
                  {selectedIngredient.type === "fruit" ? (
                     smoothiesList.map(fruit => (
                        <option key={fruit.id} value={fruit.id} disabled={!fruit.inStock}>
                           {fruit.name}
                        </option>
                     ))
                  ) : (
                     vegetablesList.map(vegetable => (
                        <option key={vegetable.id} value={vegetable.id} disabled={!vegetable.inStock}>
                           {vegetable.name}
                        </option>
                     ))
                  )}
               </select>
               <button className="custom-select__btn" onClick={() => deleteSelect(index)}>Delete</button>
            </div>
         </div>
      ))
   );

   const calculateSmoothieTotalPrice = () => {
      const selectedIngredients = [...fruitIngredients, ...vegetableIngredients].filter(
         (ingredient) => ingredient.id !== ""
      );

      const totalAmount = selectedIngredients.reduce((acc, ingredient) => acc + ingredient.amount, 0);

      const totalPrice = selectedIngredients.reduce((acc, ingredient) => {
         const ingredientList = ingredient.type === "fruit" ? smoothiesList : vegetablesList;
         const selected = ingredientList.find((item) => item.id === ingredient.id);
         if (selected) {
            const portionPercentage = ingredient.amount / totalAmount;
            const ingredientPrice = (portionPercentage * selectedPortion * selected.literPrice) / 1000;
            return acc + ingredientPrice;
         }
         return acc;
      }, 0);

      return totalPrice.toFixed(2);
   };

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
      const price = calculateSmoothieTotalPrice();
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
               <div>
                  <div className="constructor__portion-title">Select your portion:</div>
                  <div className="constructor__portion">
                     {dataPortion.map(portion => (
                        <div className="constructor__portion-row" key={portion.id}>
                           <input
                              id={portion.id}
                              type="radio"
                              name="portion"
                              checked={selectedPortion === portion.size}
                              onChange={() => setSelectedPortion(Number(portion.size))}
                           />
                           <div htmlFor={portion.size}>
                              {portion.name}: {portion.size}ml
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
               <div className="constructor__btn">
                  <button onClick={addFruit} disabled={addSelect}>Add<br />Fruits</button>
                  <button onClick={addVega} disabled={addSelect}>Add<br />Vegetables</button>
               </div>
               {ingredientsSelects()}
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