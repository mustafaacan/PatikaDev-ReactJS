import { useState } from "react";

import { send } from "../socketApi";

function Palatte({ activeColor }) {
  const [color, setColor] = useState(activeColor);

  return (
    <div className="palette">
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
      <button onClick={() => send(color)}>Send to Others</button>
    </div>
  );
}

export default Palatte;
