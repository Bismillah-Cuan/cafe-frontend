import { TableHeaders } from "../ReusableTable/TableTypes";

export interface Metadata {
    created_at: string;
    is_deleted: boolean;
    updated_at: string | null;
  }
  
export interface Data {
id: number;
name: string;
brand: string;
type: string;
purchase_unit: string;
quantity: number;
quantity_unit: string;
metadata: Metadata;
jumlah: number
}

export interface RawMaterialResponse {
    raw_materials: Data[]
}


export interface TableData<T> {
headers: TableHeaders<T>[];
rows: Data[];
}