import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import NativeFetch from "./components/NativeFetch";
import AxiosFetch from "./components/AxiosUsage";

const URL = "https://jsonplaceholder.typicode.com/users";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <h2>To gather the data from APIs, please click one of the buttons below</h2>
    <NativeFetch url={URL} />
    <AxiosFetch url={URL} />
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
