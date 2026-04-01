import { useState } from "react";

const boxStyle = {
  padding: "20px",
  margin: "10px",
  borderRadius: "10px",
};

const buttonStyle = {
  margin: "3px",
};

function CounterState() {
  const [obj, setState] = useState(0);

  function add() {
    setState(obj + 1);
  }

  function remove() {
    if (obj > 0) {
      setState(obj - 1);
    } else {
    }
  }

  return (
    <div style={boxStyle}>
      <h2>COUNTER</h2>
      <p>
        CURRENT ITEM IS : <b>{obj}</b>
      </p>
      <button onClick={add} style={buttonStyle}>
        Increase Counter
      </button>
      <button onClick={remove} style={buttonStyle}>
        Decrease Counter
      </button>
      <button
        onClick={() => {
          setState(0);
        }}
        style={buttonStyle}
      >
        Reset Counter
      </button>
    </div>
  );
}

export default CounterState;
