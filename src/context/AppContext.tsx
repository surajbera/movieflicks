// libraries
import { createContext } from "react";

// types
import { AppContextType, AppContextProviderProps } from "./AppTypes";

export const AppContext = createContext<AppContextType | null>(null);

export const AppProvider = ({ children }: AppContextProviderProps) => {
  const value = {
    apiKey: "2dca580c2a14b55200e784d157207b4d",
    baseUrl: "https://api.themoviedb.org/3",
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
