import React, { useContext } from "react";
import UserContext from "../context/UserContext";

export default function Profile() {
  const data = useContext(UserContext);

  const handleLogin = () => {
    if (data.login) {
      data.setLogin(null);
    } else {
      data.setLogin({
        username: "mustafa",
      });
    }
  };

  return (
    <div>
      <h3>{data.login ? "Hello " + data.login.username : "Please Login"}</h3>
      <button onClick={handleLogin}>{data.login ? "Logout" : "Login"}</button>
    </div>
  );
}
