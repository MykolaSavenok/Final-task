import React from "react";
import './weAre.scss';

const WeAre = () => {
   return (
      <section className="we-are">
         <div className="we-are__container">
            <div className="we-are__body container">
               <div className="we-are__img"><img src="/static/images/weAre/weAre.png" alt="image" /></div>
               <div className="we-are__content">
                  <h3>We are the best new store 2022</h3>
                  <p>Delicious, energizing and healthy smoothies - that's what you can expect from our store! Our selection includes delicious ingredients and unique combinations that you won't find anywhere else. We only use the freshest, locally-sourced ingredients, so you can always trust the quality of your smoothie. Join us in our store and enjoy a refreshing boost of energy!</p>
                  <div className="we-are__info">
                     <div>
                        <span>2022</span>
                        <p>Open in</p>
                     </div>
                     <div>
                        <span>8900+</span>
                        <p>Our sales</p>
                     </div>
                     <div>
                        <span>50+</span>
                        <p>employees</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}

export default WeAre;