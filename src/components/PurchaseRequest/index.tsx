import ReusableAddListItemForm from "../ReusableAddListItemForm"
import { PurchaseRequestsResponse, DataPurchaseRequest, TableData } from "./types"
import { Data } from "../../util/generateTableData"
import ReusableTable from "../ReusableTable"
import CreateFormButton from "../CreateFormButton"
import EditDetailButton from "../EditDetailButton"
import {ReusablePrDetailPopOut} from "../ReusablePrDetailPopOut"
import { dummyPR } from "./DummyPR"
import { useEffect, useState, useContext } from "react"
import { FetchPurchaseRequests, FetchSearchPurchaseRequests, CreatePurchaseRequests, UpdatePurchaseRequests } from "./DataFetch"
import { UsePrContext, UseDataContext } from "../../util/context"
import { prRequestPost } from "../ReusableAddListItemForm/AddListItem"
import { Select } from "@mui/material"
import { TryTwoTone } from "@mui/icons-material"
import { stat } from "fs"


const statusColor = {
  requested: "text-yellow-400",
  approved: "text-green-400",
  rejected: "text-red-400"
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
    const [itemEditId, setitemEditId] = useState("");
    const [isUpdated, setIsUpdated] = useState(Boolean)
 
    const [error, setError] = useState( {} as any);

    const getPrRequestData = localStorage.getItem("prData");
    const currentDivision = localStorage.getItem("username");
    const prRequestData: TableData<Data> = JSON.parse(getPrRequestData!);

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
                {currentDivision !== "admin" && currentDivision !== "super_admin" ? (
                  <span className={`px-2 py-1 rounded-md text-slate-100 ${statusColor[row.original.status as keyof typeof statusColor]}`}>
                  {originalCell?.({ value: null, row, column: null })}
                </span>
                ) : (
                  <select 
                    onChange={({ target: { value } }) => 
                      handleSelectStatus ({statusValue: value, itemEditId: row.original.pr_code})
                  } 
                    className={`px-2 py-1 rounded-md font-semibold black ${statusColor[row.original.status as keyof typeof statusColor]}`}
                    value={row.original.status}
                    >
                    <option key={row.original.status} value={row.original.status}>{originalCell?.({ value: null, row, column: null })}</option>
                    {Object.keys(statusColor).filter((status) => status !== row.original.status).map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                )}
                
                </div>
                  <EditDetailButton key={`edit-${row.original.pr_code}`} onClick={() => handleEditDetail(row.original.pr_code)}  label="Selengkapnya" />
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
          localStorage.setItem("prData", JSON.stringify(tableData))
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
            const data = await FetchSearchPurchaseRequests()
            
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

    useEffect(() => {
      console.log("Triggered UseEffect 2");
      localStorage.setItem("prData", JSON.stringify(prData))
    }, [prData])

    const username = localStorage.getItem("username");
    function handleShowForm() {
        setShowForm((prev) => !prev);
        setIsUpdated(false)   
    }
    // const tableData = generateTableData(addedMaterials);

    async function handleSelectStatus({ statusValue, itemEditId }: { statusValue: string; itemEditId: string }) {
      const selectedStatus = statusValue;

      const updatedStatus = prData.rows.find((item) => item.pr_code === itemEditId)?.status;
      console.log(selectedStatus);
      if (updatedStatus) {
        try {
          const updateType = "status"
          await UpdatePurchaseRequests(itemEditId, selectedStatus, updateType)
          const updatedRows = prData.rows.map((item) => {
            if (item.pr_code === itemEditId) {
              return { ...item, status: selectedStatus };
            }
            return item;
          });
          setPrData({ ...prData, rows: updatedRows });
          setFetchTrigger(!fetchTrigger);
        } catch (error) {
          if (error instanceof Error) {
            setError({message: error.message || 'An error occurred while Updating Status.'});
          }
        }
        }
        
    }
    

    async function handleSubmit(data: any) {
      try {
        console.log("process create");
        await CreatePurchaseRequests(data)
        setPrData((prev) => {
          const updatedPrData = { ...prev, rows: [...prev.rows, data] };
          return updatedPrData;
        });
        // localStorage.setItem("prData", JSON.stringify(prData));
      } catch (error) {
        if (error instanceof Error) {
          setError({message: error.message || 'An error occurred while fetching data.'});
        }
      }
      setShowForm(!showForm);
      setFetchTrigger(!fetchTrigger);
      
    }

    async function handleUpdate(data: any) {
      try {
        console.log("process update");
        await UpdatePurchaseRequests(data.pr_code, data.status, "raw materials", data.requested_raw_materials)
        setPrData((prev) => {
          const updatedPrData = { ...prev, rows: [...prev.rows, data] };
          return updatedPrData;
        })
      }
     catch (error) {
      if (error instanceof Error) {
        setError({message: error.message || 'An error occurred while fetching data.'});
      }
    }
  }
    function handleEditDetail(pr_code: string) {
      console.log("prRequestData", prData);
      const item = prRequestData.rows.find((item) => item.pr_code === pr_code );
      console.log(item);
      if (item) {
        setShowEditDetail((prev) => !prev);
        setitemEditId(item.pr_code ?? "");
        setIsUpdated(true)
      }
    }
    const closeForm = () => {setShowForm(false); setShowEditDetail(false); setIsUpdated(Boolean)};
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
            isUpdated={isUpdated}
            />

            }
        {showEditDetail && (currentDivision === "admin" || currentDivision === "super_admin" ? ( 
          <ReusableAddListItemForm 
          // fields={MaterialFormFields} 
          onSubmit={handleSubmit}
          onUpdate={handleUpdate} 
          onClose={closeForm} 
          buttonLabel="Submit" 
          isSelected={showEditDetail}
          division={division}
          username= {username}
          UpdatedData= {prData!.rows.find((item) => item.pr_code === itemEditId)?? {brand: '', name: '', type: '', purchase_unit: '', quantity: 0, quantity_unit: ''}}
          isUpdated={isUpdated}
          />
        ) : 
        
        <ReusablePrDetailPopOut 
          fields={prData!.headers.filter((header) => header.accessor !== 'actions')} 
          values={prData!.rows.find((item) => item.pr_code === itemEditId)?? {brand: '', name: '', type: '', purchase_unit: '', quantity: 0, quantity_unit: ''}}
          onSubmit={handleSubmit} 
          onClose={closeForm} 
          username={username ?? ''}
          division={division}
          buttonLabel="Submit" 
          isSelected={showEditDetail}/>

        
        )}   
        
        </div>
      </section>
      <section>
        {isFetching ? <p>Sedang Mengambil Data Tabel.....</p> : <ReusableTable tableFields={prData.headers} data={prData.rows}/>}

      </section>
    </div>
    </>
  )
}
