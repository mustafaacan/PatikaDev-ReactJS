import { createContext, useEffect, useState } from "react";

// First Context Creation and exporting for usage

const ThemeContext = createContext();

// gather all the children component under provider and make the value available for all of them
// as similar usage inside the index.js, value can be provided even from the script

export const ThemeProvider = ({ children }) => {
  // The Theme value should be read from the locale storage. As defult, the value will be light
  const readFromStorage = localStorage.getItem("theme")
    ? localStorage.getItem("theme")
    : "light";

  // similar to parent - child components, by the definetion of state within context (think that parent component)
  // all the changes can be caught within any component
  const [theme, setTheme] = useState(readFromStorage);
  const values = { theme, setTheme };

  useEffect(() => {
    // Update the Locale Storage and Change the Theme
    localStorage.setItem("theme", theme);

    if (theme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>
  );
};

// still needed for targeting the context for components (check the button.js)
export default ThemeContext;
