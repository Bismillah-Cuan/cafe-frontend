import { TableHeaders } from "../ReusableTable/TableTypes";

export interface DataPurchaseRequest {
    pr_list: [
        {division: string;
        metadata: {
            created_at: string; 
            is_deleted: boolean;
            updated_at: string | null; 
        },
        pr_code: string;
        requested_raw_materials: [
            {
            details: {
                brand: string;
                id: number;
                name: string;
                purchase_unit: string;
                quantity_unit: string;
                type: string;
                quantity: number;
                raw_material_id: number;
            };
            notes: string;
            quantity: number;
            raw_material_id: number;
            }
        ];
        status: string;
        user_id: number;
}
]
    };
    
    
    export interface PurchaseRequestsResponse {
        purchase_requests: DataPurchaseRequest[]
    }
    
    
    export interface TableData<T> {
    headers: TableHeaders<T>[];
    rows: DataPurchaseRequest[];
    }