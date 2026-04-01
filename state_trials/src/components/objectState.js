import { useState } from "react";

const boxStyle = {
  padding: "20px",
  margin: "10px",
  borderRadius: "10px",
};

function ObjectState() {
  const [Obj, setAddress] = useState({ city: "Izmir", zipCode: 35350 });

  function addNewItem() {
    const cities = [
      "Izmir",
      "Istanbul",
      "Ankara",
      "Edirne",
      "Trabzon",
      "Antalya",
      "Uşak",
    ];

    const newObject = {
      city: cities[Math.floor(Math.random() * cities.length)],
      zipCode: Math.floor(Math.random() * 5000),
    };

    setAddress(newObject);
  }

  return (
    <div style={boxStyle}>
      <h2>Object State</h2>
      <h3> City with Random Zip code </h3>
      <p>
        {Obj.city} {Obj.zipCode}
      </p>
      <button onClick={addNewItem}>Add Random Address</button>
    </div>
  );
}

export default ObjectState;
