import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Header from "./COMPONENT/Header";
import Cards from "./COMPONENT/Cards";
import { ThemeProvider } from "./CONTEXT/Theme";
import { InfoProvider } from "./CONTEXT/ProcessInfo";
import { WeatherProvider } from "./CONTEXT/Weather";
import Info from "./COMPONENT/Info";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <InfoProvider>
        <WeatherProvider>
          <Header />
          <Info />
          <Cards />
        </WeatherProvider>
      </InfoProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
