import { createContext, useState } from "react";
import type { ReactNode } from "react";

interface SearchContextType {
  isSummary: boolean;
  setIsSummary: (value: boolean) => void;
}

const SearchContext = createContext<SearchContextType>({
  isSummary: false,
  setIsSummary: () => {},
});

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [isSummary, setIsSummary] = useState(false);
  console.log(isSummary);

  return (
    <SearchContext.Provider value={{ isSummary, setIsSummary }}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContext;
