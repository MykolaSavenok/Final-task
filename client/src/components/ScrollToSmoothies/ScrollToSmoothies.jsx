const ScrollToSmoothies = ({ scrollToId }) => {
   const targetElement = document.getElementById(scrollToId);

   if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
   } else {
      console.error(`Element with ID "${scrollToId}" not found.`);
   }
};

export default ScrollToSmoothies;
