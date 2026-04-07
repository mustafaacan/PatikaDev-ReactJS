import List from "./List";
import Form from "./Form";
import { useEffect, useState } from "react";

export default function Contacts() {
  const [contact, setContanct] = useState([
    { fullname: "Mustafa", phoneNumber: 12345 },
    { fullname: "Selin", phoneNumber: 1235789 },
  ]);

  useEffect(() => {
    console.log(contact);
  }, [contact]);

  return (
    <div>
      <List contacts={contact} />
      <Form addContanct={setContanct} contact={contact} />
    </div>
  );
}
