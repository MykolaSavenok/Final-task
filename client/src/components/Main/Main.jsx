import React from "react";
import Fullscreen from '../Main-fullscreen/Fullscreenblock.jsx'
import MenuSmoothies from "../MenuSmoothies/MenuSmoothies.jsx";
import WeAre from "../WeAre/WeAre";
import Benefits from "../Benefits/Benefits.jsx";
import SpecaialOffer from "../SpecaialOffer/SpecaialOffer.jsx";


const Main = () => {
   return (
      <>
         <Fullscreen />
         <WeAre />
         <MenuSmoothies scrollToId="smoothies" />
         <Benefits />
         <SpecaialOffer />
      </>
   )
};

export default Main;