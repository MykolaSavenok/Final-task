import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import './header.scss';

const Header = () => {
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const items = useSelector((state) => state.basketReducer.products);
   const itemsSmoothies = useSelector((state) => state.customReducer.smoothies);

   const selectTotalCount = () => {
      const totalCount = items.reduce((acc, item) => acc + item.count, 0) +
         itemsSmoothies.reduce((acc, item) => acc + item.count, 0);
      return isNaN(totalCount) ? 0 : totalCount;
   };

   const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
      document.body.style.overflow = isMenuOpen ? "auto" : "hidden";
   };

   const closeMenu = () => {
      setIsMenuOpen(false);
      document.body.style.overflow = "auto";
   };

   return (
      <header className="header">
         <div className="header__body container">
            <NavLink to={'/'} >
            <div className="header__logo"><img src="/static/images/main/smoothie-logo.png" alt="logo" /></div>
            </NavLink>
            <div className="header__menu menu">
               <nav className={`menu__body ${isMenuOpen ? '_active-menu' : ''}`}>
                  <ul className="menu__list">
                     <NavLink to={'/'} onClick={closeMenu}><li className="menu__link">Home</li></NavLink>
                     <NavLink to={'/constructor'} onClick={closeMenu}><li className="menu__link">Smoothies constructor</li></NavLink>
                     <NavLink to={'/about'} onClick={closeMenu}><li className="menu__link">About</li></NavLink>
                  </ul>
               </nav>
            </div>
            <div className='header__row'>
               <NavLink to={'/basket'}
                  onClick={closeMenu}>
                  <button className="header__basket">
                     <img src="/static/images/basket/basket.svg" alt="basket" />
                     <span>{selectTotalCount()}</span>
                  </button>
               </NavLink>
               <div onClick={toggleMenu} className={`menu__icon icon-menu ${isMenuOpen ? '_active-menu' : ''}`}>
                  <span></span>
                  <span></span>
                  <span></span>
               </div>
            </div>
         </div>
      </header>
   )
}

export default Header;
