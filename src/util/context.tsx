import { createContext, useContext, useState } from "react";
import { TableData, Data } from "./generateTableData";
// Define the structure of your context
type DataContextType = {
  materials: TableData<Data>;
  setMaterials: React.Dispatch<React.SetStateAction<TableData<Data>>>;
};

// Initialize the context with default values
const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [materials, setMaterials] = useState<TableData<Data>>({
    headers: [],
    rows: [],
  });


  return (
    <DataContext.Provider
      value={{
        materials,
        setMaterials,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

// Hook to use the context
export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataContext must be used within a DataProvider");
  }
  return context;
};
