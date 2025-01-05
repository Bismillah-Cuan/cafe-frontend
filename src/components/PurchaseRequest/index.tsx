import ReusableAddListItemForm from "../ReusableAddListItemForm"
import { PurchaseRequestsResponse, DataPurchaseRequest, TableData } from "./types"
import { Data } from "../../util/generateTableData"
import ReusableTable from "../ReusableTable"
import CreateFormButton from "../CreateFormButton"
import EditDetailButton from "../EditDetailButton"
import ReusablePrDetailPopOut from "../ReusablePrDetailPopOut"
import { dummyPR } from "./DummyPR"
import { useEffect, useState, useContext } from "react"
import { FetchPurchaseRequests, FetchSearchPurchaseRequests, CreatePurchaseRequests } from "./DataFetch"
import { UsePrContext, UseDataContext } from "../../util/context"


const statusColor = {
  requested: "bg-yellow-400",
  approved: "bg-green-400",
  rejected: "bg-red-400"
}
export const PurchaseRequest = () => {

    
    // const [purchaseRequests, setPurchaseRequests] = useState<PurchaseRequestsResponse>({})
    const [showForm, setShowForm] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    const [fetchTrigger, setFetchTrigger] = useState(false);
    const [showEditDetail, setShowEditDetail] = useState(false);
    const [division , setDivision] = useState("");
    const {prList, setPrList} = UsePrContext();
    const {prData, setPrData} = UseDataContext();
    const [itemEditId, setitemEditId] = useState(0);
 
    const [error, setError] = useState( {} as any);

    useEffect(() => {
      async function handleFetch() {
        try {
          
          setIsFetching(true);
          console.log(isFetching);
          const {tableData, division, pr_code} = await FetchPurchaseRequests();
          setDivision(division);  
          const existingHeader = tableData.headers.find(header => header.accessor === 'status');
          if (existingHeader) {
            const originalCell = existingHeader.Cell;
            existingHeader.Cell = ({ row }: any) => (
              <div className="flex justify-between gap-2 mr-3">
                <div>
                <span className={`px-2 py-1 rounded-md text-slate-100 ${statusColor[row.original.status as keyof typeof statusColor]}`}>
                  {originalCell?.({ value: null, row, column: null })}
                </span>
                </div>
                  <EditDetailButton key={`edit-${row.original.id}`} onClick={() => handleEditDetail(row.original.user_id)}  label="Selengkapnya" />
              </div>
            );
          }

          if(!tableData.headers.find(header => header.accessor === 'quantity_items')) {
            tableData.headers.splice(3, 0,{
              Header: 'Quantity Items',
              accessor: 'quantity_items',  
              Cell: ({ row }: any) => {
                const value = row.values["requested_raw_materials"];
                const length_items = Object.entries(value).map(([key, value]) => {if(key  === "name" ) {
                  return value
                }}).length;
                return (
                 <div>{length_items}</div>
                )
              }
            })
          }
          setPrData(tableData);
        } catch (error) {
          if (error instanceof Error) {
            setError({message: error.message || 'An error occurred while fetching data.'});
          }
        }
        setIsFetching(false);
      }

      async function handleFetchSearch() {
        try { 
            console.log("Fetch search PR");
            const data = await fetchSearchPurchaseRequests()
            setPrList(data);

            // console.log("Fetch search PR", prList);
        } catch (error) {
          if (error instanceof Error) {
            setError({message: error.message || 'An error occurred while fetching data.'});
          }
        }
      }

      handleFetch();
      handleFetchSearch();
      

      
    }, [fetchTrigger]);
    const username = localStorage.getItem("username");
    function handleShowForm() {
        setShowForm((prev) => !prev);   
    }
    // const tableData = generateTableData(addedMaterials);

    

    async function handleSubmit(data: any) {
      
      
      try {
        console.log("process create");
        await CreatePurchaseRequests(data);
      } catch (error) {
        if (error instanceof Error) {
          setError({message: error.message || 'An error occurred while fetching data.'});
        }
      }
      setShowForm(!showForm);
      setFetchTrigger(!fetchTrigger);
      
    }
    function handleEditDetail(id: number) {
      console.log("id", id);
      const item = prData.rows.find((item) => item.user_id === id);
      console.log(item);
      if (item) {
        setShowEditDetail((prev) => !prev);
        setitemEditId(item.user_id ?? 0);
      }
    }
    const closeForm = () => {setShowForm(false); setShowEditDetail(false)};
  return (
    <>
         <div className="w-full mr-8 text-slate-800 relative overflow-x-hidden flex flex-col gap-5">
      <section className="flex justify-end  items-center">
        <div>
        <CreateFormButton onClick={handleShowForm} label="Create Order" />
        {showForm && 
          <ReusableAddListItemForm 
            // fields={MaterialFormFields} 
            onSubmit={handleSubmit} 
            onClose={closeForm} 
            buttonLabel="Submit" 
            isSelected={showForm}
            division={division}
            username= {username}
            />

            }
        {showEditDetail && 
          <ReusablePrDetailPopOut 
            fields={prData.headers.filter((header) => header.accessor !== 'actions')} 
            values={prData.rows.find((item) => item.user_id === itemEditId)?? {brand: '', name: '', type: '', purchase_unit: '', quantity: 0, quantity_unit: ''}}
            onSubmit={handleSubmit} 
            onClose={closeForm} 
            username={username ?? ''}
            division={division}
            buttonLabel="Submit" 
            isSelected={showEditDetail}/>}
        </div>
      </section>
      <section>
        {isFetching ? <p>Sedang Mengambil Data Tabel.....</p> : <ReusableTable tableFields={prData.headers} data={prData.rows}/>}

      </section>
    </div>
    </>
  )
}
