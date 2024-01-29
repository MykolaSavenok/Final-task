const initialState = {
   products: [],
};

const basketReducer = (state = initialState, action) => {
   switch (action.type) {

      case "ADD_PRODUCT":
         const existingProduct = state.products.find(item => item.id === action.payload.id);

         if (existingProduct) {
            if (existingProduct.count < 10) {
               return {
                  ...state,
                  products: state.products.map(item =>
                     item.id === action.payload.id ? { ...item, count: item.count + 1 } : item
                  ),
               };
            } else {
               return state;
            }
         } else {
            return {
               ...state,
               products: [...state.products, { ...action.payload, count: 1 }],
            };
         }

      case "REMOVE_PRODUCT":
         return {
            ...state,
            products: state.products.filter(product => product.id !== action.payload.id),
         };
      case "ADD_COUNT":
         return {
            ...state,
            products: state.products.map((item) => {
               return item.id !== action.payload.id
                  ? item
                  : { ...item, count: item.count + 1 };
            }),
         };
      case "REMOVE_COUNT":
         return {
            ...state,
            products: state.products.map((item) => {
               return item.id !== action.payload.id
                  ? item
                  : { ...item, count: item.count - 1 };
            }),
         };
      default:
         return state;
   };
}

export default basketReducer;



