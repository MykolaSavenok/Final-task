import React from "react"
import './about.scss'

const About = () => {
   return (
      <section>
         <div className="about-us">
            <div className="container">
               <div className="about-us__row">
                  <p className="about-us__text">The best smoothie bar on the planet earth.<br /> If it's a smoothie, it's only us.</p>
                  <div className="about-us__image"><img src="/static/images/aboutUs/smuzi.jpg" alt="smuzi" /></div>
               </div>
               <div className="contacts">
                  <h2 className="contacts__header">Contacts</h2>
                  <p className="contacts__text">Congratulations! You made the right choice, it couldn't have been any other way. We guess your wishes and make your holiday special. It's time to call, introduce ourselves and tell you why it took us so long to find each other.</p>
                  <address className="contacts__info">
                     <p>c. Kiyv</p>
                     <p>street Khreshchatyk 1</p>
                     <div className="contacts__number">
                        <a href="tel:+380677777777">Tel: +380677777777</a>
                        <a href="tel:+380670000000">Tel: +380670000000</a>
                     </div>
                  </address>
               </div>
            </div>
         </div>
      </section>
   );
};

export default About;