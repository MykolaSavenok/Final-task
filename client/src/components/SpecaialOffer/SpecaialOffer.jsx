import React, { useState, useEffect } from "react";
import './special.scss';

const SpecaialOffer = () => {
   const getInitialVisitTime = () => {
      const storedTime = localStorage.getItem("initialVisitTime");
      if (storedTime) {
         return new Date(storedTime);
      } else {
         const currentTime = new Date();
         localStorage.setItem("initialVisitTime", currentTime);
         return currentTime;
      }
   };

   const calculateTimeLeft = () => {
      const difference = +getInitialVisitTime() + 7 * 24 * 60 * 60 * 1000 - +new Date();
      let timeLeft = {};

      if (difference > 0) {
         timeLeft = {
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60)
         };
      } else {
         localStorage.removeItem("initialVisitTime");
      }

      return timeLeft;
   };

   const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

   useEffect(() => {
      const timer = setTimeout(() => {
         setTimeLeft(calculateTimeLeft());
      }, 1000);

      return () => clearTimeout(timer);
   });

   const addLeadingZero = (value) => {
      return value < 10 ? `0${value}` : value;
   };

   return (
      <section className="special">
         <div className="container">
            <div className="special__body">
               <div className="special__content">
                  <h3 className="special__title">Special offer of the week</h3>
                  <p className="special__text">Get ready to relax and refuel this week with our special offer! Get this offer now and enjoy the deliciousness!</p>
                  <div className="special__time">
                     <div>
                        <p>{addLeadingZero(timeLeft.hours)}</p>
                        <span>Hours</span>
                     </div>
                     <div>
                        <p>{addLeadingZero(timeLeft.minutes)}</p>
                        <span>Minutes</span>
                     </div>
                     <div>
                        <p>{addLeadingZero(timeLeft.seconds)}</p>
                        <span>Seconds</span>
                     </div>
                  </div>
               </div>
               <div className="special__img"><img src="/static/images/special/special.png" alt="special" /></div>
            </div>
         </div>
      </section>
   );
};

export default SpecaialOffer;
