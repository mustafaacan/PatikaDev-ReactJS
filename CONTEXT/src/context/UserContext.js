import { createContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [login, setLogin] = useState(null);

  const values = { login, setLogin };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export default UserContext;
