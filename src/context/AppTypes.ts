export interface AppContextType {
  apiKey: string;
  apiBaseUrl: string;
  imageBaseUrl: string;
}

export interface AppContextProviderProps {
  children: React.ReactNode;
}
