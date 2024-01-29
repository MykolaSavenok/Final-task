import React from "react";
import './special.scss';

const SpecaialOffer = () => {
   return (
      <>
         <section className="special">
            <div className="container">
               <div className="special__body">
                  <div className="special__content">
                     <h3 className="special__title">Special offer of the week</h3>
                     <p className="special__text">Get ready to relax and refuel this week with our special offer! Get this offer now and enjoy the deliciousness!</p>
                     <div className="special__time">
                        <div>
                           <p>03</p>
                           <span>Days</span>
                        </div>
                        <div>
                           <p>08</p>
                           <span>Hours</span>
                        </div>
                        <div>
                           <p>09</p>
                           <span>Minutes</span>
                        </div>
                     </div>
                  </div>
                  <div className="special__img"><img src="/static/images/special/special.png" alt="special" /></div>
               </div>
            </div>
         </section>
      </>
   );
};


export default SpecaialOffer;
