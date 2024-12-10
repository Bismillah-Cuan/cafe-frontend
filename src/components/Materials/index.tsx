import ReusableTable from "../../components/ReusableTable"
import Header from "../../components/Header"
import ReusableForm from "../../components/ReusableForm"
import CreateFormButton from "../../components/CreateFormButton"
import ReusableDetailPopOut from "../../components/ReusableDetailPopOut"
import EditDetailButton from "../../components/EditDetailButton"
import { useState, useEffect } from "react"
import { tableData } from "../../util/tableDummyData"
import {format, set} from "date-fns"
import { ColumnFilter } from "../../components/ColumnFilter"
import { TableData, Data, RawMaterialResponse } from "./types"
import { TableHeaders } from "../ReusableTable/TableTypes"
import generateTableData from "../../util/generateTableData"
import ErrorModal from "../ErrorModal"
import {DataFetchMaterial, DeleteMaterial} from "./DataFetch"
import {MaterialFormFields} from "./MaterialFormFields"


export const Materials = () => {
  const [showForm, setShowForm] = useState(false);
  const [showEditDetail, setShowEditDetail] = useState(false);
  const [itemEditId, setitemEditId] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();
  const [data, setData] = useState<TableData<Data>>({
    headers: [],
    rows: [],
    });

    useEffect(() => {
        
        async function handleFetch() {
          try {
            setIsFetching(true);
           
           const tableData = await DataFetchMaterial();

            if (!tableData.headers.find(header => header.accessor === 'actions')) {
              tableData.headers.push({
                Header: 'Actions',
                accessor: 'actions',
                Cell: ({ row }: any) => (
                  <div className="flex gap-2 mr-3">
                    <EditDetailButton key={`edit-${row.original.id}`} onClick={() => handleEditDetail(row.original.id)}  label="Edit" />
                    <EditDetailButton key={`delete-${row.original.id}`} onClick={() => handleDelete(row.original.id, row.original.name)} label="Delete" />
                  </div>
                )
              })
            }
            setData(tableData);
            
          } catch (error) {
            if (error instanceof Error) {
              setError({message: error.message || 'An error occurred while fetching data.'});
            }
            
          }
          setIsFetching(false);
        }
        
        handleFetch();
        
      }, []);
      
      if (error) {
        return <ErrorModal title="An Error occured" message={error.message} />;
      }

     async function handleDelete(id: number, name: string) {

        try {
          await DeleteMaterial(id, name)
          setData((prev) => ({ ...prev, rows: prev.rows.filter((item) => item.id !== id) }));
          console.log(`Deleted item with id ${id} - ${name}`);
        } catch (error) {
          setData(data);
        }
        
      }
      function handleEditDetail(id: number) {
        const item = data.rows.find((item) => item.id === id);
        if (item) {
          setShowEditDetail((prev) => !prev);
          setitemEditId(item.id);
        }
        
      }
      
      function handleShowForm() {
        setShowForm((prev) => !prev);
      }
    
      function handleSubmit(data: any) {
        setShowForm(!showForm);
        console.log(data);
        setData((prev) => ({ ...prev, rows: [...prev.rows, data] }));
      }
      const closeForm = () => {setShowForm(false); setShowEditDetail(false)};
      
  return (
    <div>
        <div className="w-full mr-8 text-slate-800 relative overflow-x-hidden flex flex-col gap-5">
      <header className="flex justify-between items-center">
        <div>
        <CreateFormButton onClick={handleShowForm} label="Create Order" />
        {showForm && 
          <ReusableForm 
            fields={MaterialFormFields} 
            onSubmit={handleSubmit} 
            onClose={closeForm} 
            buttonLabel="Submit" 
            isSelected={showForm}/>}
        {showEditDetail && 
          <ReusableDetailPopOut 
            fields={data.headers.filter((header) => header.accessor !== 'actions')} 
            values={data.rows.find((item) => item.id === itemEditId)?? {brand: '', name: '', type: '', purchase_unit: '', quantity: 0, quantity_unit: ''}}
            onSubmit={handleSubmit} 
            onClose={closeForm} 
            buttonLabel="Submit" 
            isSelected={showEditDetail}/>}
        </div>
      </header>
      <section>
        {isFetching && <p>Sedang Mengambil Data Tabel.....</p>}
       {!isFetching && <ReusableTable tableFields={data.headers} data={data.rows}/>} 
      </section>
    </div>
    </div>
  )
}
