const initialState = {
   smoothies: [],
}

const customReducer = (state = initialState, action) => {
   switch (action.type) {

      case "ADD_CUSTOM":
         const smoothie = action.payload;
         smoothie.count = 1;
         return {
            ...state,
            smoothies: [...state.smoothies, smoothie]
         };

      case "REMOVE_CUSTOM":
         return {
            ...state,
            smoothies: state.smoothies.filter(smoothie => smoothie.id !== action.payload.id),
         };

      case "REMOVE_CUSTOM_COUNT":
         return {
            ...state,
            smoothies: state.smoothies.map(smoothie =>
               smoothie.id === action.payload.id
                  ? { ...smoothie, count: smoothie.count - 1 }
                  : smoothie
            ),
         };

      case "ADD_CUSTOM_COUNT":
         return {
            ...state,
            smoothies: state.smoothies.map(smoothie =>
               smoothie.id === action.payload.id
                  ? { ...smoothie, count: smoothie.count + 1 }
                  : smoothie
            ),
         };

      default:
         return state;
   }
}

export default customReducer;
