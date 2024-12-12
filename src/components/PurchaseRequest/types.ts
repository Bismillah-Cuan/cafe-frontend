import { TableHeaders } from "../ReusableTable/TableTypes";

export interface Data {
    id: number;
    name: string;
    brand: string;
    type: string;
    purchase_unit: string;
    quantity: number;
    note: string;
    }
    
    export interface PurchaseRequestsResponse {
        purchase_requests: Data[]
    }
    
    
    export interface TableData<T> {
    headers: TableHeaders<T>[];
    rows: Data[];
    }