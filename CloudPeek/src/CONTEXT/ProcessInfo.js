// will be available for all components
// MID LEVEL
import { createContext, useState, useContext } from "react";

const InfoContext = createContext();

export const InfoProvider = ({ children }) => {
  const [Info, setInfo] = useState({
    isActive: false,
    processStatus: false,
    message: "",
    latestUpdate: null,
  });
  const values = { Info, setInfo };

  return <InfoContext.Provider value={values}>{children}</InfoContext.Provider>;
};

export const useInfo = () => useContext(InfoContext);
