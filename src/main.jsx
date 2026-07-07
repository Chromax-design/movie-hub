import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "../node_modules/normalize.css/normalize.css";
import GlobalStyles from "./styles/GlobalStyle.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GlobalStyles />
    <App />
  </React.StrictMode>,
);
