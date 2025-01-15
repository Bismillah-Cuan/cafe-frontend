export interface DataPurchaseOrder {
    purchase_orders: Array<
        {
            division: string;
            po_code: string;
            requested_raw_materials: [
                {
                raw_material_details: {
                    brand: string;
                    id: number;
                    name: string;
                    purchase_unit: string;
                    quantity_unit: string;
                    type: string;
                };
                received_notes: string;
                received_quantity: number;
                requested_notes: string;
                requested_quantity: number;
                supplier_name: string;
                supplier_notes: string;
                }
            ];
            status: string;
            user_id: number;
        }
    >
    };
export interface DataPurchaseOrderFiltered {
    
            division: string;
            status:string;
            po_code: string;
            requested_raw_materials: [
                {
                raw_material_details: {
                    brand: string;
                    id: number;
                    name: string;
                    purchase_unit: string;
                    quantity_unit: string;
                    type: string;
                };
                received_notes: string;
                received_quantity: number;
                requested_notes: string;
                requested_quantity: number;
                supplier_name: string;
                supplier_notes: string;
                }
            ];
        }
    
    
    
    
    export interface PurchaseRequestsResponse {
        purchase_orders: DataPurchaseOrder[]
    }