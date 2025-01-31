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
import CustomPrompt from "../CustomPrompt"
import ConfrimPrompt from "../ConfirmPrompt"
import LoadingPrompt from "../LoadingPrompt"



export const Materials = () => {
  const [showForm, setShowForm] = useState(false);
  const [showEditDetail, setShowEditDetail] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [itemEditId, setitemEditId] = useState({
    name: "" ,
    brand: "",
    id: 0
  });
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();
  const {materials, setMaterials} = UseDataContext();
  const [fetchTrigger, setFetchTrigger] = useState(false); 
  const [isConfirm, setIsConfirm] = useState(false);
  const [showPrompt, setShowPrompt] = useState({
    isShow: false,
    isSuccess: false
  })
  const [showLoading, setShowLoading] = useState(false);

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
                  <EditDetailButton key={`delete-${row.original.id}`} onClick={() => handleConfirmPrompt(row.original.id, row.original.name, row.original.brand)} label="Delete" />
                </div>
              )
            })
          }
          // Update materials only if data has changed
          
  
          localStorage.setItem("materials", JSON.stringify(tableData))

          setMaterials(tableData);
          setIsFetching(false);
          
        } catch (error) {
          throw new Error("An error occurred while fetching data");
        }
      } 
      handleFetch();
      

      }, [fetchTrigger]);

   
    if (error) {

      return <ErrorModal title="An Error occured" message="An error occurred while fetching data" />;
    }

    function getMaterialFromLocalStorage() {
      if(!isFetching) {
        const getMaterialsStorage = localStorage.getItem("materials");
        const materialsStorage: TableData<Data> = JSON.parse(getMaterialsStorage!);

        return materialsStorage;
      }
    }

    
    async function handleDelete(id: number, name: string) {
          setShowLoading(true);
          try {
            await DeleteMaterial(id, name)
            setMaterials((prev) => ({ ...prev, rows: prev.rows.filter((item) => item.id !== id) }));


            setIsConfirm(false) //Close Confirmation prompt
            setShowPrompt({isSuccess: true, isShow: true}) //Open Success prompt
          } catch (error) {
            setMaterials((prev) => ({...prev, materials}));
            setShowPrompt({isSuccess: false, isShow: true});
           
          }
          setFetchTrigger(!fetchTrigger);
          setShowLoading(false);
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
            brand: item.brand!,
            id : 0
          }
        );
      } 
      
    }
      
      function handleShowForm() {
        setShowForm((prev) => !prev);
      }
    
     async function handleSubmit(data: any) {
      // console.log('Before setMaterials:', materials);
      setShowLoading(true);
        try {
          await CreateMaterial(data);
          setMaterials((prev) => {
            const updatedMaterials = { ...prev, rows: [...prev.rows, data] };
            return updatedMaterials;
          })
          // console.log('After setMaterials (should be outdated):', materials);

          setShowPrompt({isSuccess: true, isShow: true});
        } catch (error) {
          setMaterials(materials);
          setShowPrompt({isSuccess: false, isShow: true});
        }
        setShowForm(!showForm);
        setFetchTrigger(prev => !prev);
        setShowLoading(false);
      }
      const closeForm = () => {
          setShowForm(false); setShowEditDetail(false); setShowPrompt((prev) => ({...prev, isShow: false})); setIsConfirm(false)
        };

      function handleConfirmPrompt(id: number, name: string, brand: string) {
        setitemEditId({
          id: id!,
          name: name!,
          brand: brand
        })
        setIsConfirm(true);
      }
      
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
              {isConfirm && 
                <ConfrimPrompt OnConfirm={()=>handleDelete(itemEditId.id, itemEditId.name)}  OnClose={closeForm}
                title="Delete Material" message={`Anda yakin ingin menghapus ${itemEditId.name} - ${itemEditId.brand}?`}/>}
              {showPrompt.isShow && 
              <CustomPrompt   
                title="Success" message={`Aksi yang anda lakukan berhasil`} isSuccess={showPrompt.isSuccess} OnConfirm={closeForm}/>}
            </div>
        </section>
      <section>
        {isFetching && <p>Sedang Mengambil Data Tabel.....</p>}
       {!isFetching && <ReusableTable tableFields={materials.headers} data={materials.rows}/>} 
      </section>
      </div>
      {showLoading && <LoadingPrompt />}
    </div>
  )
}
