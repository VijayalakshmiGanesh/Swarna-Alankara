import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {BrowserRouter as Router} from "react-router-dom";

import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import {ProductProvider} from "./contexts/ProductContext";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { WishListProvider } from "./contexts/WishListContext";

// Call make Server
makeServer();



const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(

  <StrictMode>
    <Router>
      <ProductProvider>
        <AuthProvider>
          <CartProvider>
            <WishListProvider>
               <App />
           </WishListProvider>
          </CartProvider>
        </AuthProvider>
      </ProductProvider>
    </Router>
  </StrictMode>
);