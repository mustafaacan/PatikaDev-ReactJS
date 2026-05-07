import { createContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const readFromStorage = (() => {
    try {
      const storedUser = localStorage.getItem("loggedIn");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      localStorage.removeItem("loggedIn");
      return null;
    }
  })();

  const [login, setLogin] = useState(readFromStorage);

  const values = { login, setLogin };

  useEffect(() => {
    if (login) {
      localStorage.setItem("loggedIn", JSON.stringify(login));
    } else {
      localStorage.removeItem("loggedIn");
    }
  }, [login]);

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export default UserContext;
