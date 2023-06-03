import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// import { BrowserRouter } from "react-router-dom";
import { HashRouter } from "react-router-dom/cjs/react-router-dom.min";
import { Provider } from "react-redux";
import store from "./redux/store";
import axios from "axios";

// axios.defaults.baseURL = "http://localhost:3001";
axios.defaults.baseURL = "https://foodsapp-back.up.railway.app";

//? BROWSER ROUTER AND PROVIDER FOR APP
ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById("root")
);
