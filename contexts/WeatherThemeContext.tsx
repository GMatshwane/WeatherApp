import React, { createContext, useState } from "react";

/**
 * The weather theme context type.
 */
interface WeatherThemeContextType {
  backgroundColor: string;
  setBackgroundColor: (color: string) => void;
}

/**
 * The weather theme context
 */
export const WeatherThemeContext = createContext<WeatherThemeContextType>({
  backgroundColor: "#f5f5f5",
  setBackgroundColor: () => {},
});

/**
 * The weather theme provider.
 * @param children - The children.
 */
export const WeatherThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [backgroundColor, setBackgroundColor] = useState("#f5f5f5");

  return (
    <WeatherThemeContext.Provider
      value={{ backgroundColor, setBackgroundColor }}
    >
      {children}
    </WeatherThemeContext.Provider>
  );
};
