import { createContext, useState } from "react";
import type { ReactNode } from "react";

interface SearchContextType {
  isSummary: boolean;
  setIsSummary: (value: boolean) => void;

  startDate: Date | null;
  setStartDate: (value: Date | null) => void;

  endDate: Date | null;
  setEndDate: (value: Date | null) => void;

  numberOfDays: number;
  setNumberOfDays: (value: number) => void;

  numberOfGuests: number;
  setNumberOfGuests: (value: number) => void;

  location: string;
  setLocation: (value: string) => void;
}

const SearchContext = createContext<SearchContextType>({
  isSummary: false,
  setIsSummary: () => {},

  startDate: null,
  setStartDate: () => {},

  endDate: null,
  setEndDate: () => {},

  numberOfDays: 0,
  setNumberOfDays: () => {},

  numberOfGuests: 0,
  setNumberOfGuests: () => {},

  location: "",
  setLocation: () => {},
});

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [isSummary, setIsSummary] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [numberOfDays, setNumberOfDays] = useState(0);
  const [numberOfGuests, setNumberOfGuests] = useState(0);
  const [location, setLocation] = useState("");

  return (
    <SearchContext.Provider
      value={{
        isSummary,
        setIsSummary,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        numberOfDays,
        setNumberOfDays,
        numberOfGuests,
        setNumberOfGuests,
        location,
        setLocation,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContext;
