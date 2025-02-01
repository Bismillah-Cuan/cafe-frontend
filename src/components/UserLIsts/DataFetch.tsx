import { API_SUPPLIERS } from "../../constants/URL_API";
import { SupplierType } from "./types";
export async function fetchSuppliers() {
    const access_token = localStorage.getItem('access_token')
    try {
        const response = await fetch(API_SUPPLIERS, {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        });
        const data = await response.json();
        const supplierData: SupplierType = data.suppliers
        // console.log(supplierData);
        return supplierData;
    } catch (error) {
        console.error("Error fetching suppliers:", error);
    }
}