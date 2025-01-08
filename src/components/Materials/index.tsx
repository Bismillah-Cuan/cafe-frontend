import ReusableTable from "../../components/ReusableTable"
import Header from "../../components/Header"
import ReusableForm from "../../components/ReusableForm"
import CreateFormButton from "../../components/CreateFormButton"
import ReusableDetailPopOut from "../../components/ReusableDetailPopOut"
import EditDetailButton from "../../components/EditDetailButton"
import { useState, useEffect, useCallback, useRef, useMemo } from "react"
import { TableData, Data, RawMaterialResponse } from "./types"
import ErrorModal from "../ErrorModal"
import {DataFetchMaterial, DeleteMaterial, CreateMaterial} from "./DataFetch"
import {MaterialFormFields} from "./MaterialFormFields"
import { UseDataContext } from "../../util/context"



export const Materials = () => {
  const [showForm, setShowForm] = useState(false);
  const [showEditDetail, setShowEditDetail] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [itemEditId, setitemEditId] = useState({
    name: "" ,
    brand: "",
  });
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();
  const {materials, setMaterials} = UseDataContext();
  const [fetchTrigger, setFetchTrigger] = useState(false); 

  const materialsStorage = getMaterialFromLocalStorage();
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
                  <EditDetailButton key={`edit-${row.original.id}`} onClick={() => handleEditDetail(row.original.name, row.original.brand)}  label="Edit" />
                  <EditDetailButton key={`delete-${row.original.id}`} onClick={() => handleDelete(row.original.id, row.original.name)} label="Delete" />
                </div>
              )
            })
          }
          // Update materials only if data has changed
          
  
          localStorage.setItem("materials", JSON.stringify(tableData))

          setMaterials(tableData);
          setIsFetching(false);
          
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

    function getMaterialFromLocalStorage() {
      if(!isFetching) {
        const getMaterialsStorage = localStorage.getItem("materials");
        const materialsStorage: TableData<Data> = JSON.parse(getMaterialsStorage!);

        return materialsStorage;
      }
    }

    
    async function handleDelete(id: number, name: string) {

      try {
        await DeleteMaterial(id, name)
        setMaterials((prev) => ({ ...prev, rows: prev.rows.filter((item) => item.id !== id) }));
        console.log(`Deleted item with id ${id} - ${name}`);
        console.log(JSON.stringify({id, name}));
      } catch (error) {
        setMaterials((prev) => ({...prev, materials}));
      }

      setFetchTrigger(!fetchTrigger);
      
    }

    function handleEditDetail(name: string, brand: string) {
      const materialsStorage = getMaterialFromLocalStorage();
      console.log('Materials:', materialsStorage);
      const item = materialsStorage!.rows.find((item) => item.name === name && item.brand === brand);

      console.log(item);
      if (item) {
        setShowEditDetail((prev) => !prev);
        console.log(showEditDetail);
        
        setitemEditId(
          {
            name: item.name!,
            brand: item.brand!
          }
        );
      } 
      
    }
      
      function handleShowForm() {
        setShowForm((prev) => !prev);
      }
    
     async function handleSubmit(data: any) {
      console.log('Before setMaterials:', materials);
      
        try {
          await CreateMaterial(data);
          setMaterials((prev) => {
            const updatedMaterials = { ...prev, rows: [...prev.rows, data] };
            return updatedMaterials;
          })
          console.log('After setMaterials (should be outdated):', materials);
        } catch (error) {
          setMaterials(materials);
        }
        setShowForm(!showForm);
        setFetchTrigger(prev => !prev);
      }
      const closeForm = () => {setShowForm(false); setShowEditDetail(false)};
      
  return (
    <div>
        <div className="w-full mr-8 text-slate-800 relative overflow-x-hidden flex flex-col gap-5">
      <section className="flex justify-end items-center">
        <div>
        <CreateFormButton onClick={handleShowForm} label="Create Materials" />
        {showForm && 
          <ReusableForm 
            fields={MaterialFormFields} 
            onSubmit={handleSubmit} 
            onClose={closeForm} 
            buttonLabel="Submit" 
            isSelected={showForm}/>}
        {showEditDetail ? (
          <ReusableDetailPopOut 
            fields={materialsStorage!.headers.filter((header) => header.accessor !== 'actions')} 
            values={materialsStorage!.rows.find((item) => item.name === itemEditId.name && item.brand === itemEditId.brand)?? {brand: '', name: '', type: '', purchase_unit: '', quantity: 0, quantity_unit: ''}}
            onSubmit={handleSubmit} 
            onClose={closeForm} 
            buttonLabel="Submit" 
            isSelected={showEditDetail}/>) : (null)}
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
