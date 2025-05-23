import React, { createContext, useContext, useState } from "react";
import { CurrentWeather } from "../models/current";

type SelectedLocationContextType = {
  selectedLocation: CurrentWeather | null;
  setSelectedLocation: (loc: CurrentWeather) => void;
};

const SelectedLocationContext = createContext<SelectedLocationContextType>({
  selectedLocation: null,
  setSelectedLocation: () => {},
});

export const useSelectedLocation = () => useContext(SelectedLocationContext);

export const SelectedLocationProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [selectedLocation, setSelectedLocation] =
    useState<CurrentWeather | null>(null);
  return (
    <SelectedLocationContext.Provider
      value={{ selectedLocation, setSelectedLocation }}
    >
      {children}
    </SelectedLocationContext.Provider>
  );
};
