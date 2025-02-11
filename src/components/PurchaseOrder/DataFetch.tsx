import { DataPurchaseOrder } from "./types";
import { PrContextProps } from "../../util/context";
import generateTableData from "../../util/generateTableData";
import { API_PURCHASE_ORDER, API_RAW_MATERIALS_SEARCH } from "../../constants/URL_API";

export async function FetchPurchaseOrders () {
    
    const access_token = localStorage.getItem('access_token')
    const headers = {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/json'
    }
    const response = await fetch(API_PURCHASE_ORDER, {
        method: 'GET',
        headers: headers
    })

    console.log("response",response);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

    const data: DataPurchaseOrder = await response.json()
    // console.log(data.pr_list);
    const header = data.purchase_orders
    
    
    return {PurhcaseOrderData: header}
}

export async function UpdatePurchaseOrder (po_code: string, data?: any,  status?: string, updateType?: string) {
    const access_token = localStorage.getItem('access_token')

    function updateDataType () {
        if (updateType === "status") {
            return  {
                po_code: po_code,
                status: status,
                update_type: updateType
            }
        } else if(updateType === "supplier") {
           return {
                po_code: po_code,
                update_type: updateType,
                update_supplier: data?.map((item: any) => (
                    console.log(item.id), {
                    raw_material_id: item.id,
                    supplier_name: item.supplier_name
                }))
            } 
        } else if(updateType === "supplier_notes") {
            return {
                po_code: po_code,
                update_type: updateType,
                supplier_name: data.supplier_name,
                supplier_notes: data.supplier_notes
            } 
        } else if(updateType === "received_data") {
            return {
                po_code: po_code,
                update_type: updateType,
                received_qty: data.received_qty,
                raw_material_id: data.raw_material_id,
                received_notes: data.received_notes

            } 
        }
    }

    const bodyUpdateData = updateDataType()
    

    console.log("stringify data",JSON.stringify(bodyUpdateData, null, 2));
    const headers = {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/json'
    }
    const response = await fetch(API_PURCHASE_ORDER, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(bodyUpdateData)
   })

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    // alert("Purchase Order updated successfully!"); 
}

export async function CreatePurchaseOrder(data: any) {
    const pr_code = {pr_code: data}
    const access_token = localStorage.getItem('access_token')
    console.log("stringify data",JSON.stringify(data, null, 2));
    const headers = {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/json'
    }
    const response = await fetch(API_PURCHASE_ORDER, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(pr_code)
    })

}