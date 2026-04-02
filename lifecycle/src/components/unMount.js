import { useEffect, useState } from "react";
import UseEffectExample from "./useEffectExample";

const boxStyle = {
  padding: "20px",
  margin: "10px",
  border: "1px solid black",
  borderRadius: "10px",
};

const buttonStyle = {
  margin: "3px",
};

export default function UnMount() {
  const [unMount, Isvalid] = useState(true);

  useEffect(() => {
    console.log("Toggle Triggerred", `Current Value ${unMount}`);
  });

  return (
    <div style={boxStyle}>
      <h1> UNMOUNT Example </h1>
      {unMount && <UseEffectExample />}
      <button style={buttonStyle} onClick={() => Isvalid(!unMount)}>
        {unMount ? "UnMount" : "Mount"}
      </button>
    </div>
  );
}
