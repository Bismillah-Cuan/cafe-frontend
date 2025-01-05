import { DataPurchaseRequest } from "./types";
import { PrContextProps } from "../../util/context";
import generateTableData from "../../util/generateTableData";
import { API_PURCHASE_REQUEST, API_RAW_MATERIALS_SEARCH } from "../../constants/URL_API";
import axios from "axios";


export async function FetchPurchaseRequests () {
    
    const access_token = localStorage.getItem('access_token')
    const headers = {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/json'
    }
    const response = await fetch(API_PURCHASE_REQUEST, {
        method: 'GET',
        headers: headers
    })

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

    const data: DataPurchaseRequest = await response.json()
    // console.log(data.pr_list);
    const header = data.pr_list.map(({division, metadata, requested_raw_materials, status, pr_code, user_id}) => {
        const header = {
            metadata,
            division,
            requested_raw_materials,
            status,
            pr_code,
            user_id
        }
        return header
        }
        
    )

    //0{division: 'kitchen', metadata: {…}, requested_raw_materials: Array(3), status: 'requested', pr_code: 'PR001', …}
    //1{division: 'sosmed', metadata: {…}, requested_raw_materials: Array(2), status: 'requested', pr_code: 'PR002', …}
    // console.log("Header", header);
    const tableData = generateTableData(header);
    
    
    return {tableData: tableData, division: data.pr_list[0].division, pr_code: data.pr_list[0].pr_code}
}

export async function CreatePurchaseRequests (data: any) {

    const access_token = localStorage.getItem('access_token')
    console.log("stringify data",JSON.stringify(data, null, 2));
    const headers = {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/json'
    }
    const response = await fetch(API_PURCHASE_REQUEST, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    })

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    alert("Purchase Request created successfully!"); 
}

export async function FetchSearchPurchaseRequests () {

    const access_token = localStorage.getItem('access_token')
    const headers = {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json'
    }
    const response = await fetch(API_RAW_MATERIALS_SEARCH, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({word : ""})
    });

    

    const data: PrContextProps = await response.json()
    console.log("Search",data);
    
    return data

}