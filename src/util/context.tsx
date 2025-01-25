import { createContext, useContext, useState, useMemo, useEffect } from "react";
import { DataPurchaseOrder } from "../components/PurchaseOrder/types";
import { TableData, Data } from "./generateTableData";
// Define the structure of your context

export interface Metadata {
  created_at: string;
  is_deleted: boolean;
  updated_at: string | null;
}

export interface RawMaterial {
      id: number;
      name: string;
      brand: string;
      type: string;
      purchase_unit: string;
      quantity: number;
      quantity_unit: string;
      metadata: Metadata;
}

export interface PrContextProps {
raw_materials: RawMaterial[]
}

type PrContextSearch = {
  prList: PrContextProps;
  setPrList: React.Dispatch<React.SetStateAction<PrContextProps>>
}
type DataContextType = {
  materials: TableData<Data>;
  setMaterials: React.Dispatch<React.SetStateAction<TableData<Data>>>;
  prData : TableData<Data>;
  setPrData: React.Dispatch<React.SetStateAction<TableData<Data>>>
  poData: DataPurchaseOrder['purchase_orders'];
  setPoData: React.Dispatch<React.SetStateAction<DataPurchaseOrder['purchase_orders']>>
  tablePoData: TableData<Data>
  setTablePoData: React.Dispatch<React.SetStateAction<TableData<Data>>>
};

// Initialize the context with default values
const DataContext = createContext<DataContextType | undefined>(undefined);
const PrContext = createContext<PrContextSearch | undefined>(undefined);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {

  const dummyPR: PrContextProps = {
    raw_materials: [
      {
        id: 1 ,
        name: "Rice",
        brand: "A",
        type: "A",
        purchase_unit: "A",
        quantity: 10,
        quantity_unit: "A",
        metadata: {
          created_at: "2023-01-01",
          is_deleted: false,
          updated_at: null,
        },
      },
      {
        id: 2,
        name: "Butter",
        brand: "B",
        type: "B",
        purchase_unit: "B",
        quantity: 5,
        quantity_unit: "B",
        metadata: {
          created_at: "2023-01-01",
          is_deleted: false,
          updated_at: null,
        },
      },
      {
        id: 3,
        name: "Milk",
        brand: "C",
        type: "C",
        purchase_unit: "C",
        quantity: 3,
        quantity_unit: "C",
        metadata: {
          created_at: "2023-01-01",
          is_deleted: false,
          updated_at: null,
        },
      },
      {
        id: 4,
        name: "Egg",
        brand: "D",
        type: "D",
        purchase_unit: "D",
        quantity: 2,
        quantity_unit: "D",
        metadata: {
          created_at: "2023-01-01",
          is_deleted: false,
          updated_at: null,
        },
      },
    ],
  }

  const [materials, setMaterials] = useState<TableData<Data>>({
    headers: [],
    rows: [],
  });

  const [prData, setPrData] = useState<TableData<Data>>({
    headers: [],
    rows: [],
  })

  const [prList, setPrList] = useState<PrContextProps>(dummyPR)

  const [poData, setPoData] = useState<DataPurchaseOrder['purchase_orders']>([]);

  const [tablePoData, setTablePoData] = useState<TableData<Data>>({
    headers: [],
    rows: [],
  })

  useEffect(() => {
    localStorage.setItem('materials', JSON.stringify(materials));
    localStorage.setItem('prData', JSON.stringify(prData));
  }, [materials, prData]);


  return (
    <DataContext.Provider value={{materials, setMaterials, prData, setPrData, poData, setPoData, tablePoData, setTablePoData}}>
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
    throw new Error("usePrContext must be used within a DataProvider");
  }
  return context;
};
