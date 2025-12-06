import { createContext, useState } from "react";
import type { ReactNode } from "react";

export type FilterKeys = "prices" | "types" | "ratings" | "amenities";

export interface FilterContextType {
  search: string;
  prices: string[];
  types: string[];
  ratings: string[];
  amenities: string[];
}

export interface FilterContextValue {
  filters: FilterContextType;
  toggleFilter: (filter: FilterKeys, value: string | number) => void;
  setSearch: (value: string) => void;
}

const FilterContext = createContext<FilterContextValue>({
  filters: {
    search: "",
    prices: [],
    types: [],
    ratings: [],
    amenities: [],
  },
  toggleFilter: () => {},
  setSearch: () => {},
});

export function FilterProvider({ children }: { children: ReactNode }) {
  const [filters, setFilter] = useState<FilterContextType>({
    search: "",
    prices: [],
    types: [],
    ratings: [],
    amenities: [],
  });

  function toggleFilter(filter: FilterKeys, value: string | number) {
    setFilter((prev) => {
      const exists = prev[filter].includes(value as never);
      return {
        ...prev,
        [filter]: exists
          ? prev[filter].filter((item) => item !== value)
          : [...prev[filter], value],
      };
    });
  }

  function setSearch(value: string) {
    setFilter((prev) => ({
      ...prev,
      search: value,
    }));
  }

  return (
    <FilterContext.Provider value={{ filters, toggleFilter, setSearch }}>
      {children}
    </FilterContext.Provider>
  );
}

export default FilterContext;
