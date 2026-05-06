import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "./context/ThemeContext";
import { UserProvider } from "./context/UserContext";
import Button from "./components/button";
import Header from "./components/header";
import Profile from "./components/profile";

// importing context

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* just moved the provider inside the context side
    <ThemeContext.Provider value="dark">
      <Button />
    </ThemeContext.Provider>
    */}
    <ThemeProvider>
      {/* by adding UserProvider under ThemeProvider, themes will be available also for users */}
      <UserProvider>
        <Header />
        <Profile />
        <Button />
        <p>
          <span>Short Description</span> {" : "} button just deployed within the
          Button component. However, the context for both Header and Button
          components can be managed within one component (Button Component)
        </p>
        <p>
          In additional, change on body is available by the additional part of
          useEffect inside ThemeContext.js please check the script for details.
          If you want to change the only components, for each div inside the
          components, you may use the code below, <br></br>
          <br></br>
          {'className={data.theme === "dark" ? "dark" : ""}'}
        </p>
      </UserProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
