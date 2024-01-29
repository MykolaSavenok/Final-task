import React from "react";
import './benefits.scss';

const Benefits = () => {
   return (
      <>
         <section className="benefits">
            <div className="container">
               <h2 className="benefits__title">Our Benefits</h2>
               <div className="benefits__body">
                  <div className="benefits__items item">
                     <div className="item__body">
                        <div className="item__num">1</div>
                        <div className="item__content">
                           <h3 className="item__title">High quality ingredients</h3>
                           <p className="item__text">Our smoothies are made with only the freshest and highest quality ingredients, including organic fruits, vegetables, superfoods, and plant-based protein.</p>
                        </div>
                     </div>
                     <div className="item__body">
                        <div className="item__num">2</div>
                        <div className="item__content">
                           <h3 className="item__title">Professional team</h3>
                           <p className="item__text">Our team is comprised of professionals with a wide range of experience and expertise. Our team works together to ensure that all our clients’ needs are met, and that their projects succeed.</p>
                        </div>
                     </div>
                     <div className="item__body">
                        <div className="item__num">3</div>
                        <div className="item__content">
                           <h3 className="item__title">Huge choice</h3>
                           <p className="item__text">We have a wide selection of smoothies to choose from, including fruity and creamy. Or you can customize your own smoothie to your own taste with our build-your-own smoothie options!</p>
                        </div>
                     </div>
                     <div className="item__body">
                        <div className="item__num">4</div>
                        <div className="item__content">
                           <h3 className="item__title">fast Delivery</h3>
                           <p className="item__text">Our skilled team works hard to provide speedy shipping with tracking capabilities. We are dedicated to getting orders out as soon as possible!</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </>
   );
};


export default Benefits;