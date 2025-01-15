import { DataPurchaseRequest } from "../components/PurchaseRequest/types"
import { useContext, createContext, useState } from "react"

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

const DataContext = createContext<PrContextSearch | undefined>(undefined)

export const DataProvider = ({children}: {children: React.ReactNode}) => {
    const [prList, setPrList] = useState<PrContextProps>({
        raw_materials: [],
    })

  return (
    <DataContext.Provider value={{prList, setPrList}}>
        {children}
    </DataContext.Provider>
  );
}

export const UsePrContext = () => {
    const context = useContext(DataContext);
    if (!context) {
      throw new Error("useDataContext must be used within a DataProvider");
    }
    return context;
  };

