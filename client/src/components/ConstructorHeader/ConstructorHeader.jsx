import React from "react";
import './constructorHeader.scss'

const ConstructorHeader = () => {
   return (
      <>
         <div className="constructor-header">
            <div className="constructor-header__img"><img src="/static/images/constructor/smooth.jpg" alt="header-img" /></div>
            <div className="constructor-header__content">Here you can create your own smoothie from the ingredients you are
               interested in</div>
         </div>
      </>
   )
}

export default ConstructorHeader;