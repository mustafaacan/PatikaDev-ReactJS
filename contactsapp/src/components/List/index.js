import { useState } from "react";

export default function List({ contacts }) {
  const [filterText, setText] = useState("");

  // Steps
  // 1) obtain both key-value pairs of contacts item by item
  // 2) filter the items if key or value includes target text in anywhere
  // 3) to reduce the irrelevent issues, both target text and key-value pairs converted to lowercased string
  // and by using trim() spaces in target text (both sides) removed

  const filtered = contacts.filter((item) => {
    return Object.keys(item).some((key) => {
      return item[key]
        .toString()
        .toLowerCase()
        .includes(filterText.trim().toLowerCase());
    });
  });

  return (
    <div>
      <h1>Contacts</h1>
      <input
        placeholder="Filter Contact"
        value={filterText}
        maxLength={10}
        onChange={(event) => {
          setText(event.target.value);
        }}
      ></input>
      <h4> Total User : {Object.keys(filtered).length} </h4>
      <p> UserName -- Phone</p>
      <ul>
        {filtered.map((item, index) => (
          <li
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <span>{item.fullname}</span>
            <span>{item.phoneNumber}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
