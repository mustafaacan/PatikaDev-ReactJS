import { useState, useEffect, React } from "react";

const boxStyle = {
  padding: "20px",
  margin: "10px",
  border: "1px solid black",
  borderRadius: "10px",
};

const buttonStyle = {
  margin: "3px",
};

export default function UseEffectExample() {
  const [number, setNumber] = useState(0);
  const [action, setAction] = useState("");
  //OPEN THE CONSOLE SCREEN

  // only 1 time will be seen on the screen on first render
  useEffect(() => {
    console.log("Component Mounted");
  }, []);

  //There will be log on the screen for each trigger
  useEffect(() => {
    console.log("State Triggered", `Current State ${number}`);
    return () => {
      console.log("Component UnMount");
    };
  }, [number]);

  // Action hook to detect action reset or not
  useEffect(() => {
    if (action === "Reset") {
      console.log("State Reset");
    }
  }, [action]);

  return (
    <div style={boxStyle}>
      <h2>Current Item: {number} </h2>
      <button
        style={buttonStyle}
        onClick={() => {
          setNumber(number + 1);
          setAction("Increase");
        }}
      >
        Increase
      </button>
      <button
        style={buttonStyle}
        onClick={() => {
          setNumber(0);
          setAction("Reset");
        }}
      >
        Reset
      </button>
    </div>
  );
}
