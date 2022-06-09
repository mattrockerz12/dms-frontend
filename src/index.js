import React from "react";
import ReactDOM from "react-dom/client";
//import "./index.css";
//import "bootstrap/dist/css/bootstrap.min.css";
//import "./assets/theme.js";
import "./assets/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import App from "./App";
import { Provider } from "react-redux";
import configureStore from "./redux/configureStore";
import { BrowserRouter } from "react-router-dom";

const store = configureStore();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
