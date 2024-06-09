// libraries
import { createContext } from "react";

// types
import { AppContextType, AppContextProviderProps } from "./AppTypes";

export const AppContext = createContext<AppContextType | null>(null);

export const AppProvider = ({ children }: AppContextProviderProps) => {
  const value = {
    apiKey: "2dca580c2a14b55200e784d157207b4d",
    apiBaseUrl: "https://api.themoviedb.org/3",
    imageBaseUrl: "https://image.tmdb.org/t/p/w500",
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
