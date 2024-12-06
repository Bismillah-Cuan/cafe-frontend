import { TableHeaders } from "../components/ReusableTable/TableTypes";
import { useState } from "react";

interface Metadata {
    created_at: string;
    is_deleted: boolean;
    updated_at: string | null;
  }
  
interface Data {
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



function generateTableData(data: Data[]): TableData<Data> {
    
    // Extract headers dynamically from the first item's keys
    const headers: TableHeaders<Data>[] = Object.keys(data[0])
      .filter(key => key !== 'metadata' && key !== 'id') // Exclude 'metadata' if needed
      .map(key => ({
        Header: key.replace(/_/g, ' '),
        accessor: key.replace(/_/g, '_').toLowerCase(), // Format as "KEY NAME"
        Cell: ({ row }: any) => row.values[key],
      }));
  
    // Rows are the same as the input data
    const rows: Data[] = data;
  
    // Add "actions" column if needed
    return { headers, rows };
  }
  
  export default generateTableData