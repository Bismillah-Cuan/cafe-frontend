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
import { TableData, Data, RawMaterialResponse } from "./types"
import { TableHeaders } from "../ReusableTable/TableTypes"
import generateTableData from "../../util/generateTableData"


export const Materials = () => {
  const [showForm, setShowForm] = useState(false);
  const [showEditDetail, setShowEditDetail] = useState(false);
  const [itemEditId, setitemEditId] = useState(0);
  const [data, setData] = useState<TableData<Data>>({
    headers: [],
    rows: [],
    });

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
      
            const data: RawMaterialResponse = await response.json();
            const {raw_materials}: {raw_materials: Data[]} = data
            console.log(raw_materials);
            const tableData = generateTableData(raw_materials);
            
            console.log(tableData);
            return setData(tableData);
          } catch (error) {
            console.error("Error Fetching:", error);
          }
        }
      
        handleFetch();
      }, []);

      if (!data.headers.find(header => header.accessor === 'actions')) {
        data.headers.push({
          Header: 'Actions',
          accessor: 'actions',
          Cell: ({ row }: any) => (
            <div className="flex gap-2 mr-3">
              <EditDetailButton key={`edit-${row.original.id}`} onClick={() => handleEditDetail(row.original.id)}  label="Edit" />
              <EditDetailButton key={`delete-${row.original.id}`} onClick={() => handleDelete(row.original.id)} label="Delete" />
            </div>
          )
        })
      }
        
    
      function handleDelete(id: number) {
        setData((prev) => ({ ...prev, rows: prev.rows.filter((item) => item.id !== id) }));
    
        console.log(`Deleted item with id ${id}`);
      }
      function handleEditDetail(id: number) {
        const item = data.rows.find((item) => item.id === id);
        if (item) {
          setShowEditDetail((prev) => !prev);
          setitemEditId(item.id);
        }
        
      }
      
      // function handleShowForm() {
      //   setShowForm((prev) => !prev);
      // }
    
      // function handleSubmit(data: any) {
      //   setShowForm(!showForm);
      //   console.log(data);
      //   setData((prev) => [...prev, ...[data]]);
      // }
      const closeForm = () => {setShowForm(false); setShowEditDetail(false)};
      
  return (
    <div>
        <div className="w-full mr-8 text-slate-800 relative overflow-x-hidden flex flex-col gap-5">
      <header className="flex justify-between items-center">
        {/* <div>
        <CreateFormButton onClick={handleShowForm} label="Create Order" />
        {showForm && 
          <ReusableForm 
            fields={fields} 
            onSubmit={handleSubmit} 
            onClose={closeForm} 
            buttonLabel="Submit" 
            isSelected={showForm}/>}
        {showEditDetail && 
          <ReusableDetailPopOut 
            fields={columns} 
            values={data.find((item) => item.id === itemEditId)?? {id: "", date: "", user: "", materials: "", quantities: "", unit: ""}}
            onSubmit={handleSubmit} 
            onClose={closeForm} 
            buttonLabel="Submit" 
            isSelected={showEditDetail}/>}
        </div> */}
      </header>
      <section>
        <ReusableTable tableFields={data.headers} data={data.rows}/>
      </section>
    </div>
    </div>
  )
}
