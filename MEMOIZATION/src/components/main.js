import { useState } from "react";
import Header from "./header";

export default function Main() {
  const [number, setNumber] = useState(0);

  return (
    <div>
      <Header num={number > 5 ? number : 0} />
      <h2>{number}</h2>
      <button onClick={() => setNumber(number + 1)}>Increase</button>
    </div>
  );
}
