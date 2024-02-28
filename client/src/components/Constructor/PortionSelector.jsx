import React from "react";

const PortionSelector = ({ portion, selectedPortion, handlePortionChange }) => {
   return (
      <div>
         <div className="constructor__portion-title">Select your portion: Max 5</div>
         <div className="constructor__portion">
            {portion.map(portion => (
               <div className="constructor__portion-row" key={portion.id}>
                  <input
                     id={portion.id}
                     type="radio"
                     name="portion"
                     checked={selectedPortion === portion.size}
                     onChange={() => handlePortionChange(Number(portion.size))}
                  />
                  <div htmlFor={portion.size}>
                     {portion.name}: {portion.size}ml
                  </div>
               </div>
            ))}
         </div>
      </div>
   )
};

export default PortionSelector;