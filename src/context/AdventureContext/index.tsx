import { createContext, useState } from "react";
import type { ReactNode } from "react";

type AdventureType = "affluent" | "guardian" | "explorer" | null;

interface AdventureContextInterface {
  adventureType: AdventureType;
  setAdventureType: (value: AdventureType) => void;
}

const AdventureContext = createContext<AdventureContextInterface>({
  adventureType: null,
  setAdventureType: () => {},
});

export const AdventureProvider = ({ children }: { children: ReactNode }) => {
  const [adventureType, setAdventureType] = useState<AdventureType>(null);

  console.log(adventureType);

  return (
    <AdventureContext.Provider value={{ adventureType, setAdventureType }}>
      {children}
    </AdventureContext.Provider>
  );
};

export default AdventureContext;
