import { combineReducers, createStore } from 'redux';
import basketReducer from './basketReducer.js';
import customReducer from './customReducer.js';
import orderReducer from './orderReducer.js'
import { composeWithDevTools } from 'redux-devtools-extension';

const loadState = () => {
   try {
      const serializedState = localStorage.getItem('state');
      if (serializedState === null) {
         return undefined;
      }
      return JSON.parse(serializedState);
   } catch (err) {
      return undefined;
   }
};


const saveState = (state) => {
   try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('state', serializedState);
   } catch (err) {
      console.log('Error');
   }
};

const persistedState = loadState();

const rootReducer = combineReducers({
   basketReducer: basketReducer,
   customReducer: customReducer,
   orderReducer: orderReducer,
});

const store = createStore(rootReducer, persistedState, composeWithDevTools());

store.subscribe(() => {
   saveState(store.getState());
});

export default store;