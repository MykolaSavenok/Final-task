export function calculateSmoothieTotalPrice(fruitIngredients, vegetableIngredients, selectedPortion, smoothiesList, vegetablesList) {
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

   const roundedPrice = Number(Math.round(totalPrice * 100) / 100);

   return roundedPrice.toFixed(2);
};