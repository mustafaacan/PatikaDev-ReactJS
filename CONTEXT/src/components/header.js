import { useContext } from "react";
import ThemeContext from "./../context/ThemeContext";

export default function Header() {
  const data = useContext(ThemeContext);
  console.log(data);
  return (
    <div>
      <h2>
        Header Component and obtained data from context{" : "}
        {data ? data.theme : "None"}
      </h2>
    </div>
  );
}
