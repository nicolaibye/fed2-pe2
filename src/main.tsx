import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { SearchProvider } from "./context/SearchContext/index.tsx";
import { AdventureProvider } from "./context/AdventureContext/index.tsx";
import { FilterProvider } from "./context/FilterContext/index.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <SearchProvider>
        <AdventureProvider>
          <FilterProvider>
            <App />
          </FilterProvider>
        </AdventureProvider>
      </SearchProvider>
    </StrictMode>
  </BrowserRouter>
);
