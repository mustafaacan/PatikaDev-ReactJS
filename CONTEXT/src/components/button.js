import { useContext } from "react";
import ThemeContext from "./../context/ThemeContext";

// with using useContext hook and target component, components should be informed about the incoming context

export default function Button() {
  // CAUTION : we just sent the necessary context as object so the data is an object
  const data = useContext(ThemeContext);

  console.log(data);

  return (
    <div>
      <h2>
        Button Component and obtained data from context{" : "}
        {data ? data.theme : "None"}
      </h2>
      <button
        onClick={() => {
          data.setTheme(data.theme === "light" ? "dark" : "light");
        }}
      >
        Change the Theme
      </button>
    </div>
  );
}
