import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter , Routes, Route } from 'react-router-dom'
import { Provider } from "react-redux";
import { store } from "./Store";
import "bootstrap/dist/css/bootstrap.min.css";
import Cart from "./Components/Cart";
import ProductDetails from "./Components/ProductDetails";
import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
