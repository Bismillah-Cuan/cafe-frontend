import { RawMaterialResponse, Data } from "./types";
import generateTableData from "../../util/generateTableData";
import { API_RAW_MATERIALS } from "../../constants/URL_API";
export async function DataFetchMaterial()  {
    const token = localStorage.getItem('access_token');
            const headers = {
              'Authorization': `Bearer ${token}`, // Add "Bearer" if required for JWT tokens
              'Content-Type': 'application/json', // Ensure content type is specified
            };
            const response = await fetch(API_RAW_MATERIALS, {
              method: 'GET',
              headers: headers,
            });
      
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
      
            const data: RawMaterialResponse = await response.json();
           
            const {raw_materials}: {raw_materials: Data[]} = data
            // console.log(raw_materials);
            const tableData = generateTableData(raw_materials);
            
            // console.log(tableData);
            

  return tableData
  
}

export async function DeleteMaterial(id: number, name: string): Promise<void> {
    try {
      const token = localStorage.getItem('access_token');
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };
      console.log(JSON.stringify({ id, name }));
      const response = await fetch(
        API_RAW_MATERIALS, 
        {
          method: 'DELETE',
          body: JSON.stringify({ id, name }),
          headers: headers,
        }
      );
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Failed to delete material. Status: ${response.status}, Message: ${errorData.message || "Unknown error"}`
        );
      }
    } catch (error) {
        if (error instanceof Error) {
          // Narrowing the type to Error
          console.error("Error deleting material:", error.message);
        } else {
          console.error("An unknown error occurred:", error);
        }
      }
  }

export async function CreateMaterial(data: Data): Promise<void> {
    try {
      const token = localStorage.getItem('access_token');
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };
      console.log(JSON.stringify(data));
      const response = await fetch(
        API_RAW_MATERIALS, 
        {
          method: 'POST',
          body: JSON.stringify(data),
          headers: headers,
        }
      );
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Failed to create material. Status: ${response.status}, Message: ${errorData.message || "Unknown error"}`
        );
      }
  
      alert("Material created successfully!");    
    } catch (error) {
      if (error instanceof Error) {
        // Narrowing the type to Error
        console.error("Error creating material:", error.message);
        alert(`Error: ${error.message}`);
      } else {
        console.error("An unknown error occurred:", error);
        alert("An unknown error occurred. Please try again.");
      }
    }
}