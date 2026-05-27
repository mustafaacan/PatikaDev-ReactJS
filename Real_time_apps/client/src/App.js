import "./App.css";

import { useEffect, useState } from "react";
// This Modele manually defined within the same folder (you may see under setupTests.js file)
import { init, subscribe } from "./socketApi";
import Palatte from "./components/Palatte";

function App() {
  const [activeColor, setActiveColor] = useState("#282c34");

  useEffect(() => {
    init();

    subscribe((color) => {
      setActiveColor(color);
    });
  }, []);

  return (
    <div className="App" style={{ backgroundColor: activeColor }}>
      <h1>{activeColor}</h1>
      <Palatte activeColor={activeColor} />
    </div>
  );
}

export default App;
