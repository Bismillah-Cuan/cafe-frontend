interface metadata {
    created_at: string;
    is_deleted: boolean;
    updated_at: string | null;
}

export interface SupplierObject {
    metadata: metadata;
    bank_account: string;
    id: number;
    type: string;
    name: string;
    address: string;
    phone_number: string;
}

export type SupplierType = SupplierObject[]