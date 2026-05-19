// Once the search / update button just clicked, locationing and data obtaining will be started.
// LOW LEVEL

import { createContext, useContext, useState } from "react";

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [weather, setWeather] = useState({
    forecast: [],
  });
  const values = { weather, setWeather };

  return (
    <WeatherContext.Provider value={values}>{children}</WeatherContext.Provider>
  );
};

export const useWeather = () => useContext(WeatherContext);
