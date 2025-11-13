import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { SearchProvider } from "./context/SearchContext/index.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <SearchProvider>
        <App />
      </SearchProvider>
    </StrictMode>
  </BrowserRouter>
);
