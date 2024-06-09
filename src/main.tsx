// libraries
import React from "react";
import ReactDOM from "react-dom/client";

// components
import App from "./App.tsx";

// styles
import "./assets/scss/index.scss";

// provider
import { AppProvider } from "./context/AppContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);
