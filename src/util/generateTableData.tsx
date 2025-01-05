import { TableHeaders } from "../components/ReusableTable/TableTypes";
import { useState } from "react";

interface Metadata {
    created_at: string;
    is_deleted: boolean;
    updated_at: string | null;
  }
  
export interface Data {
  name?: string;
  label?: string;
  type?: string;
  id?: number;
  brand?: string;
  purchase_unit?: string;
  note?: string;
  quantity?: number;
  quantity_unit?: string;
  metadata?: Metadata;
  division?: string;
  user_id?: number;
  pr_code?: string;
  status?: string;
  date?: string;
  placeholder?: string;
  defaultValue?: string;
  options?: { value: string; label: string }[]; // Only for "select" type
  validate?: (value: string) => string | null; // Validation function
}

export interface RawMaterialResponse {
    raw_materials: Data[]
}

export interface PurchaseRequestResponse {
    pr_list: Data[]
}


export interface TableData<T> {
headers: TableHeaders<T>[];
rows: Data[];
}



function generateTableData(data: Data[]): TableData<Data> {
    
    // Extract headers dynamically from the first item's keys
    const headers: TableHeaders<Data>[] = Object.keys(data[0])
      .filter(key =>  key !== 'id' && key !== 'user_id' && key !== 'pr_code') // Exclude 'metadata' if needed
      .map(key => ({
        Header: key.replace(/__/g, '/').replace(/_/g, ' ').replace("metadata", 'date'),
        accessor: key.replace(/_/g, '_').toLowerCase(), // Format as "KEY NAME"
        Cell: ({ row }: any) => {

         const value = row.values[key]

        if (Array.isArray(value)) {
          return value
            .map(item => item.details?.name) // Safely access `details.name`
            .filter(Boolean) // Remove undefined/null values
            .join(', '); // Join with commas
        
        }
        else if (key === "metadata") {
          if (value && value.created_at) {
            const date = new Date(value.created_at);
        
            // Check if the date is valid
            if (!isNaN(date.getTime())) {
              return date.toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'numeric',
                year: 'numeric',
              });
            }
        
            return null; // Handle invalid dates
          }
        
          return null; // Handle cases where "created_at" is not found
        }
        

          return value;
        }
      }));
  
    // Rows are the same as the input data
    const rows: Data[] = data;
  

    return { headers, rows };
  }
  
  export default generateTableData