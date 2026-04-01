import { useState } from "react";

const boxStyle = {
  padding: "20px",
  margin: "10px",
  borderRadius: "10px",
};

function FirstState() {
  const [name, setName] = useState("Mustafa");
  const nameArr = [
    "Hacer",
    "Mert",
    "Selin",
    "Mustafa",
    "Mehmet",
    "Alice",
    "Jhon",
    "Kennedy",
    "Leon",
    "Jane",
  ];

  function nameSelector() {
    let item = nameArr[Math.floor(Math.random() * nameArr.length)];
    while (true) {
      if (item !== name) {
        setName(item);
        break;
      } else {
        item = nameArr[Math.floor(Math.random() * nameArr.length)];
      }
    }
  }

  return (
    <div style={boxStyle}>
      <h2>Hello {name}</h2>
      <button onClick={nameSelector}>Click for Name</button>
    </div>
  );
}

export default FirstState;
