import React from "react"
import './about.scss'

const About = () => {
   return (
      <section>
         <div className="about-us">
            <div className="container">
               <div className="about-us__row">
                  <p className="about-us__text">Congratulations! You made the right choice, it couldn't have been any other way. We guess your wishes and make your holiday special. It's time to call, introduce ourselves and tell you why it took us so long to find each other.</p>
                  <div className="about-us__image"><img src="/static/images/aboutUs/smuzi.jpg" alt="smuzi" /></div>
               </div>
               <div className="contacts">
                  <div className="contacts__body">
                     <div className="contacts__img"><img src="/static/images/aboutUs/AboutMap.png" alt="maps" /></div>
                     <div className="contacts__content">
                        <h2 className="contacts__title">Contacts</h2>
                        <address className="contacts__info">
                           <p>c. Kiyv</p>
                           <p>street Khreshchatyk, 1</p>
                           <div className="contacts__number">
                              <a href="tel:+380677777777">Tel: +380677777777</a>
                              <a href="tel:+380670000000">Tel: +380930000000</a>
                           </div>
                        </address>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
};

export default About;