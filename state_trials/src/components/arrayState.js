import { useState } from "react";

const boxStyle = {
  padding: "20px",
  margin: "10px",
  borderRadius: "10px",
};

const buttonStyle = {
  margin: "3px",
};

function ArrayState() {
  const [name, setName] = useState(["Mustafa", "Selin"]);

  function manageItem(event) {
    if (event.target.id === "reset") {
      setName(["Mustafa", "Selin"]);
    } else {
      const item = prompt("Please Enter New Item: ");

      if (item !== null) {
        setName([...name, item]);
      } else {
        setName(name);
      }
    }
  }

  return (
    <div style={boxStyle}>
      <h2>Array State</h2>
      {name.map((item, index) => (
        <p key={index}>{item}</p>
      ))}
      <button id="add" style={buttonStyle} onClick={manageItem}>
        Add New Item
      </button>
      <button id="reset" style={buttonStyle} onClick={manageItem}>
        Reset Item List
      </button>
    </div>
  );
}

export default ArrayState;
