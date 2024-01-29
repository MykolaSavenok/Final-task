import React from "react";
import './modal.scss';

const ModalAccept = ({ children, visible, setVisible }) => {
   const rootClasses = ['modal'];
   if (visible) {
      rootClasses.push('active');
      document.body.style.overflow = "hidden";
   } else {
      document.body.style.overflow = "auto";
   }


   return (
      <>
         <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <div className="modal__container">
               <div className="modal__body" onClick={(e) => e.stopPropagation()}>
                  {children}
               </div>
            </div>
         </div>
      </>
   );
};

export default ModalAccept;