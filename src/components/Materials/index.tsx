import ReusableTable from "../../components/ReusableTable"
import Header from "../../components/Header"
import ReusableForm from "../../components/ReusableForm"
import CreateFormButton from "../../components/CreateFormButton"
import ReusableDetailPopOut from "../../components/ReusableDetailPopOut"
import EditDetailButton from "../../components/EditDetailButton"
import { useState, useEffect } from "react"
import { tableData } from "../../util/tableDummyData"
import {format} from "date-fns"
import { ColumnFilter } from "../../components/ColumnFilter"


type TableFields = {
    Header: string;
    accessor: string;
    Cell: any
    Filter: any
  }

export const Materials = () => {

    
    useEffect(() => {
        async function handleFetch() {
          try {
            const token = localStorage.getItem('access_token');
            const headers = {
              'Authorization': `Bearer ${token}`, // Add "Bearer" if required for JWT tokens
              'Content-Type': 'application/json' // Ensure content type is specified
            };
            const response = await fetch("http://127.0.0.1:5000/api/v1/raw-materials", {
              method: 'GET',
              headers: headers,
            });
      
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
      
            const data = await response.json();
            console.log(data);
          } catch (error) {
            console.error("Error Fetching:", error);
          }
        }
      
        handleFetch();
      }, []);
        

  return (
    <div>
        <button>Fetch Data</button>
    </div>
  )
}
