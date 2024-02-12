import React from 'react';

const IngredientSelector = ({ ingredients, handleSelectChange, smoothiesList, vegetablesList, deleteSelect }) => {
   return (
      <>
         {ingredients.map((selectedIngredient, index) => (
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
         ))}
      </>
   );
};

export default IngredientSelector;