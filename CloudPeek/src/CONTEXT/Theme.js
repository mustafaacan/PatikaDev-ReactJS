// will be available for all the components
// TOP LEVEL

import { createContext, useEffect, useState, useContext } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const readFromStorage = localStorage.getItem("theme")
    ? localStorage.getItem("theme")
    : "dark";

  const [theme, setTheme] = useState(readFromStorage);
  const values = { theme, setTheme };

  useEffect(() => {
    localStorage.setItem("theme", theme);

    if (theme === "dark") {
      document.body.setAttribute("data-bs-theme", "dark");
    } else {
      document.body.setAttribute("data-bs-theme", "light");
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
