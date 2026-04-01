import { useState } from "react";

// CAUTION : For multiple inputs, you may choice from operation such Formik.

const boxStyle = {
  padding: "20px",
  margin: "10px",
  borderRadius: "10px",
};

function InputState() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  function updateInput(event) {
    if (event.target.id === "name") {
      if (event.target.value !== null) {
        setName(event.target.value);
      }
    } else {
      if (event.target.value !== null) {
        setSurname(event.target.value);
      }
    }
  }

  return (
    <div style={boxStyle}>
      <h2>State from Input Element</h2>
      <label htmlFor="name">Please Enter your Name </label>
      <input id="name" value={name} onChange={updateInput}></input>
      <br />
      <label htmlFor="surname">Please Enter your Surname </label>
      <input id="surname" value={surname} onChange={updateInput}></input>
      <h3>
        Welcome {name} {surname}
      </h3>
    </div>
  );
}

export default InputState;
