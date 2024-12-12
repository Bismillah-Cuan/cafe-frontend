import ReusableTable from "../../components/ReusableTable"
import Header from "../../components/Header"
import ReusableForm from "../../components/ReusableForm"
import CreateFormButton from "../../components/CreateFormButton"
import ReusableDetailPopOut from "../../components/ReusableDetailPopOut"
import EditDetailButton from "../../components/EditDetailButton"
import { useState, useEffect, useCallback, useRef } from "react"
import { TableData, Data, RawMaterialResponse } from "./types"
import ErrorModal from "../ErrorModal"
import {DataFetchMaterial, DeleteMaterial, createMaterial} from "./DataFetch"
import {MaterialFormFields} from "./MaterialFormFields"
import { useDataContext } from "../../util/context"
import { set } from "date-fns"


export const Materials = () => {
  const [showForm, setShowForm] = useState(false);
  const [showEditDetail, setShowEditDetail] = useState(false);
  const [itemEditId, setitemEditId] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();
  const {materials, setMaterials} = useDataContext();
  const [fetchTrigger, setFetchTrigger] = useState(0); 

  // const logMaterials = useCallback(() => {
  //   // console.log('Materials updated:', materials);
   
  // }, [addedMaterials]);

    useEffect(() => {
      async function handleFetch() {
        try {
          setIsFetching(true);
          
         const tableData = await DataFetchMaterial();
  
          if (!tableData.headers.find(header => header.accessor === 'actions')) {
            tableData.headers.push({
              Header: 'Action',
              accessor: 'action',
              Cell: ({ row }: any) => (
                <div className="flex gap-2 mr-3">
                  <EditDetailButton key={`edit-${row.original.id}`} onClick={() => handleEditDetail(row.original.id)}  label="Edit" />
                  <EditDetailButton key={`delete-${row.original.id}`} onClick={() => handleDelete(row.original.id, row.original.name)} label="Delete" />
                </div>
              )
            })
          }
          // Update materials only if data has changed
          setIsFetching(false);
          setMaterials(tableData)  // Update the ref)
          console.log(materials);
  
        } catch (error) {
          if (error instanceof Error) {
            setError({message: error.message || 'An error occurred while fetching data.'});
          }
        }
      }
      handleFetch(); 
      }, [fetchTrigger]);
      
      if (error) {

        return <ErrorModal title="An Error occured" message={error.message} />;
      }

     async function handleDelete(id: number, name: string) {

        try {
          await DeleteMaterial(id, name)
          setMaterials((prev) => ({ ...prev, rows: prev.rows.filter((item) => item.id !== id) }));
          console.log(`Deleted item with id ${id} - ${name}`);
          console.log(JSON.stringify({id, name}));
        } catch (error) {
          setMaterials(materials);
        }
        
      }

      function handleEditDetail(id: number) {
        setFetchTrigger(prev => prev + 1);
        console.log('After setFetchTrigger:', fetchTrigger);
        const item = materials.rows.find((item) => item.id === id);
        console.log(item);
        if (item) {
          setShowEditDetail((prev) => !prev);
          console.log(showEditDetail);
          
          setitemEditId(item.id);
        }
        
      }
      
      function handleShowForm() {
        setShowForm((prev) => !prev);
      }
    
     async function handleSubmit(data: any) {
      console.log('Before setMaterials:', materials);
        await createMaterial(data);
        setShowForm(!showForm);
        setMaterials((prev) => ({ ...prev, rows: [...prev.rows, data] }));
        console.log('After setMaterials (should be outdated):', materials);
      }
      const closeForm = () => {setShowForm(false); setShowEditDetail(false)};
      
  return (
    <div>
        <div className="w-full mr-8 text-slate-800 relative overflow-x-hidden flex flex-col gap-5">
      <section className="flex justify-between items-center">
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
            fields={materials.headers.filter((header) => header.accessor !== 'actions')} 
            values={materials.rows.find((item) => item.id === itemEditId)?? {brand: '', name: '', type: '', purchase_unit: '', quantity: 0, quantity_unit: ''}}
            onSubmit={handleSubmit} 
            onClose={closeForm} 
            buttonLabel="Submit" 
            isSelected={showEditDetail}/>}
        </div>
      </section>
      <section>
        {isFetching && <p>Sedang Mengambil Data Tabel.....</p>}
       {!isFetching && <ReusableTable tableFields={materials.headers} data={materials.rows}/>} 
      </section>
    </div>
    </div>
  )
}
