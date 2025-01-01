import { createContext, useContext, useState } from "react";
import { TableData, Data } from "./generateTableData";
// Define the structure of your context

export interface Metadata {
  created_at: string;
  is_deleted: boolean;
  updated_at: string | null;
}

export interface PrContextProps {
raw_materials: [
  {
      id: number;
      name: string;
      brand: string;
      type: string;
      purchase_unit: string;
      quantity: number;
      quantity_unit: string;
      metadata: Metadata;
  }
][]
}

type PrContextSearch = {
  prList: PrContextProps;
  setPrList: React.Dispatch<React.SetStateAction<PrContextProps>>
}
type DataContextType = {
  materials: TableData<Data>;
  setMaterials: React.Dispatch<React.SetStateAction<TableData<Data>>>;
};

// Initialize the context with default values
const DataContext = createContext<DataContextType | undefined>(undefined);
const PrContext = createContext<PrContextSearch | undefined>(undefined);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [materials, setMaterials] = useState<TableData<Data>>({
    headers: [],
    rows: [],
  });

  const [prList, setPrList] = useState<PrContextProps>({
    raw_materials: [],
})


  return (
    <DataContext.Provider value={{materials, setMaterials,}}>
      <PrContext.Provider value={{prList, setPrList}}>
        {children}
      </PrContext.Provider>
    </DataContext.Provider>
  );
};

// Hook to use the context
export const UseDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataContext must be used within a DataProvider");
  }
  return context;
};

export const UsePrContext = () => {
  const context = useContext(PrContext);
  if (!context) {
    throw new Error("useDataContext must be used within a DataProvider");
  }
  return context;
};
