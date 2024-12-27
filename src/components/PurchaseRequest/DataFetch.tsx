import { DataPurchaseRequest } from "./types";
import generateTableData from "../../util/generateTableData";
export async function fetchPurchaseRequests () {
    
    const access_token = localStorage.getItem('access_token')
    const headers = {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/json'
    }
    const response = await fetch('http://127.0.0.1:5000/api/v1/purchase-request/', {
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