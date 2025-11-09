import { createContext, useState} from "react";
import type { ReactNode } from "react";
type CryptoContextType = {
  data: any[];                     // <- You can replace `any` with your CryptoData type later
  setData: React.Dispatch<React.SetStateAction<any[]>>;
};

export const ContextApp = createContext<CryptoContextType | null>(null);

type CryptoProviderProps = {
  children: ReactNode;
};

export const CryptoProvider = ({ children }: CryptoProviderProps) => {
  const [data, setData] = useState<any[]>([]);

  return (
    <ContextApp.Provider value={{ data, setData }}>
      {children}
    </ContextApp.Provider>
  );
};