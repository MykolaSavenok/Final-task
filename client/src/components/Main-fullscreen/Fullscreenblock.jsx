import React from "react";
import './fullscreen.scss';
import ScrollToSmoothies from "../ScrollToSmoothies/ScrollToSmoothies.jsx";

const Fullscreen = () => {

   return (
      <section className="home">
         <div className="container">
            <div className="home__body">
               <h1 className="home__title">Welcome to our store!</h1>
               <p className="home__text">Here we have a range of refreshing and delicious smoothies, made from fresh fruit and juice. Whether you're looking for a protein-packed option or just a sweet snack, we've got something for everyone. </p>
            </div>
            <div className="home__down" onClick={() => ScrollToSmoothies({ scrollToId: 'smoothies' })}><img src="/static/images/main/arrow.png" alt="" /></div>
         </div>
         <div className="home__bg"><img src="/static/images/main/main__fullscreen.png" alt="" /></div>
      </section>
   );
};

export default Fullscreen;
