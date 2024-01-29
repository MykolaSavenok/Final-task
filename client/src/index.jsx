import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import store from "./store/reducers/store.js";
import { Provider } from "react-redux";
import '../src/assets/index.scss'
import App from "./App.jsx";
import Main from "./components/Main/Main.jsx";
import About from "./components/About/About.jsx";
import Basket from "./components/Basket/Basket.jsx";
import Constructor from "./components/Constructor/Constructor.jsx";
import Page404 from "./components/Page404/Page404.jsx";


const router = createBrowserRouter(
   [
      {
         path: '/',
         element: <App />,
         children: [
            {
               index: true,
               element: <Main />
            },
            {
               path: '/about',
               element: <About />
            },
            {
               path: '/basket',
               element: <Basket />
            },
            {
               path: '/constructor',
               element: <Constructor />
            }
         ]
      },
      {
         path: '*',
         element: <Page404 />
      }
   ]);


const rootEl = document.getElementById('root');
const root = ReactDOM.createRoot(rootEl);

root.render(
   <React.StrictMode>
      <Provider store={store}>
         <RouterProvider router={router} />
      </Provider>
   </React.StrictMode>
);