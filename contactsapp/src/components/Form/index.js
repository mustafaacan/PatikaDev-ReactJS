import { useEffect, useState } from "react";

const initialFormValues = { fullname: "", phoneNumber: "" };

export default function Form({ addContanct, contact }) {
  const [FORM, setForm] = useState(initialFormValues);

  function onChangeInput(e) {
    if (e.target.name === "phoneNumber") {
      setForm({
        ...FORM,
        phoneNumber: e.target.value.replace(/\D/g, ""),
      });
    } else {
      setForm({ ...FORM, fullname: e.target.value });
    }
  }

  // even the variable obtained from props (outside), on change of variable
  // some useEffect methods can be used.
  useEffect(() => {
    setForm(initialFormValues);
  }, [contact]);

  function onSubmitForm(e) {
    // since using form structure, when click button, system will be waiting for a response (there wont be any response)
    // by using the preventDefault() method, this problem can be solved.
    e.preventDefault();
    if (FORM.fullname.trim() === "" || FORM.phoneNumber.trim() === "") {
      return false;
    }
    console.log(FORM);
    addContanct([...contact, FORM]);
  }

  // onChange in "input" is critical. both user inputs and state changes can be reflect inside the "input" tag directly.
  // we may use useRef or FormData structure as alternatives.

  return (
    <div>
      <form onSubmit={onSubmitForm}>
        <input
          name="fullname"
          placeholder="Fullname"
          value={FORM.fullname}
           maxLength={10}
          onChange={onChangeInput}
        ></input>
        <input
          name="phoneNumber"
          placeholder="phoneNumber"
          value={FORM.phoneNumber}
           maxLength={12}
          onChange={onChangeInput}
        ></input>
        <button> ADD </button>
      </form>
    </div>
  );
}
