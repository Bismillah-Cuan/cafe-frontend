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