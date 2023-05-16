import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {BrowserRouter as Router} from "react-router-dom";

import "./index.css";
import App from "./App";
import { makeServer } from "./server";

// Call make Server
makeServer();



const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(

  <StrictMode>
    <Router>
      <App />
    </Router>
       
  </StrictMode>
);