import ReusableAddListItemForm from "../ReusableAddListItemForm"
import { TableData, Data } from "../../util/generateTableData"
import ReusableTable from "../ReusableTable"
import CreateFormButton from "../CreateFormButton"
import EditDetailButton from "../EditDetailButton"
import {ReusablePrDetailPopOut} from "../ReusablePrDetailPopOut"
import { useEffect, useState } from "react"
import { 
  FetchPurchaseRequests, 
  FetchSearchPurchaseRequests, 
  CreatePurchaseRequests, 
  UpdatePurchaseRequests,
  DeletePurchaseRequests 
} from "./DataFetch"
import { CreatePurchaseOrder } from "../PurchaseOrder/DataFetch"
import { UsePrContext, UseDataContext } from "../../util/context"
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import ConfrimPrompt from "../ConfirmPrompt"
import CustomPrompt from "../CustomPrompt"
import LoadingPrompt from "../LoadingPrompt"


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
    const [itemEditId, setitemEditId] = useState({
      id: "",
      name: "",
      materials: ""
    });
    const [isUpdated, setIsUpdated] = useState(Boolean)
    const [isConfirm, setIsConfirm] = useState(false);
    const [showPrompt, setShowPrompt] = useState({
      isShow: false,
      isSuccess: false
    })
    const [showLoading, setShowLoading] = useState(false);
 
    // const [error, setError] = useState( {} as any);
    const currentDivision = localStorage.getItem("username");
    sessionStorage.setItem("prList", JSON.stringify(prList));

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
                <div className="flex gap-2">
                {currentDivision !== "admin" && currentDivision !== "super_admin" ? (
                   console.log("division", currentDivision), 
                  <span 
                    className={`px-2 py-1 rounded-md text-slate-100 
                      ${statusColor[row.original.status as keyof typeof statusColor]}`}>
                  {originalCell?.({ value: null, row, column: null })}
                </span>
                ) : (
                  <>
                  {/* /* <select 
                    onChange={({ target: { value } }) => 
                      handleSelectStatus ({statusValue: value, itemEditId: row.original.pr_code})
                  } 
                    className={`px-2 py-1 rounded-md font-semibold text-white ${"bg-[" + statusColor[row.original.status as keyof typeof statusColor] + "]"} `}
                    value={row.original.status}
                    >
                    <option style={{ backgroundColor: statusColor[row.original.status as keyof typeof statusColor] }} key={row.original.status} value={row.original.status}>
                      {originalCell?.({ value: null, row, column: null })}
                    </option>
                    {Object.keys(statusColor).filter((status) => status !== row.original.status).map((status) => (
                      <option style={{ backgroundColor: statusColor[status as keyof typeof statusColor] }} key={status} value={status}>
                        {status}
                      </option>
                    ))}
                    
                  </select> */ }
                  
                  {row.original.status === "requested" ? (
                  <>
                    <EditDetailButton 
                      key={`edit-${row.original.pr_code}-rejected`} 
                      onClick={() => handleSelectStatus({ statusValue: "rejected", itemEditId: row.original.pr_code })}  
                      label="Rejected" 
                      className="bg-red-400"
                    /> 
                    <EditDetailButton 
                      key={`edit-${row.original.pr_code}-approved`} 
                      onClick={() => handleSelectStatus({ statusValue: "approved", itemEditId: row.original.pr_code })}  
                      label="Approved" 
                      className="bg-green-400"
                    />
                  </>
                ) : (
                  <span 
                    className={`px-2 py-1 rounded-md text-slate-100 
                      ${statusColor[row.original.status as keyof typeof statusColor]}`}>
                    {originalCell?.({ value: null, row, column: null })}
                  </span>
                )}
                  <div>
                    <DeleteRoundedIcon 
                      htmlColor="#F44336" 
                      className="cursor-pointer"
                      onClick={() => handleConfirmPrompt
                      (row.original.pr_code, row.original.division, row.original.requested_raw_materials)} />
                  </div>
                  </>
                )}
                
                </div>
                  <EditDetailButton 
                    key={`edit-${row.original.pr_code}`} 
                    onClick={() => handleEditDetail(row.original.pr_code)}  
                    label="Selengkapnya" />
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
          setPrData( prev => ({...prev, ...tableData}));
          sessionStorage.setItem("prData", JSON.stringify(tableData))
        } catch (error) {
          if (error instanceof Error) {
            throw new Error("An error occurred while fetching data");
          }
        }
        setIsFetching(false);
      }

      

      async function handleFetchSearch() {
        try { 
            console.log("Fetch search PR");
            const data = await FetchSearchPurchaseRequests()
            
            setPrList(prev => ({ ...prev, ...data }));
            sessionStorage.setItem("prList", JSON.stringify(data));
            // console.log("Fetch search PR", prList);
        } catch (error) {
          if (error instanceof Error) {
            throw new Error("An error occurred while fetching data");
          }
        }
      }

      handleFetch();
      handleFetchSearch();
      

      
    }, [fetchTrigger]);

    useEffect(() => {
      console.log("Triggered UseEffect 2");
   
      sessionStorage.setItem("prData", JSON.stringify(prData))

      // setPrData(prev => ({...prev, rows: JSON.parse(updatedData!)}));
      
    }, [prData])

    const username = localStorage.getItem("username");
  function handleShowForm() {
      setShowForm((prev) => !prev);
      setIsUpdated(false)   
  }
    // const tableData = generateTableData(addedMaterials);

  async function handleSelectStatus({ statusValue, itemEditId }: { statusValue: string; itemEditId: string }) {
    const selectedStatus = statusValue;
    const getPrRequestData = sessionStorage.getItem("prData");
    const prRequestData: TableData<Data> = JSON.parse(getPrRequestData!);
    const updatedStatus = prRequestData.rows.find((item) => item.pr_code === itemEditId)?.status;
    console.log(updatedStatus);
    if (updatedStatus) {
      setShowLoading(true);
      try {
        const updateType = "status"
        await UpdatePurchaseRequests(itemEditId, selectedStatus, updateType)

        if(selectedStatus === "approved") {
          await CreatePurchaseOrder(itemEditId)
        }
        const updatedRows = prData.rows.map((item) => {
          if (item.pr_code === itemEditId) {
            return { ...item, status: selectedStatus };
          }
          return item;
        });
        setPrData({ ...prData, rows: updatedRows });
        setShowPrompt({isSuccess: true, isShow: true});
        setFetchTrigger(!fetchTrigger);
      } catch (error) {
        if (error instanceof Error) {
          setShowPrompt({isSuccess: false, isShow: true});
          setShowLoading(false);
          throw new Error("An error occurred while fetching data");
        }
      }
      }
      setShowLoading(false);
  }

  async function handleSubmit(data: any) {
    setShowLoading(true);
    try {
      console.log("process create");
      await CreatePurchaseRequests(data)
      // setPrData((prev) => {
      //   const updatedPrData = { ...prev, rows: [...prev.rows, data] };
      //   return updatedPrData;
      // });
      setShowPrompt({isSuccess: true, isShow: true});
      // localStorage.setItem("prData", JSON.stringify(prData));
    } catch (error) {
      if (error instanceof Error) {
        setShowPrompt({isSuccess: false, isShow: true});
        throw new Error("An error occurred while fetching data");
        
      }
    }
    setShowLoading(false);
    setShowForm(!showForm);
    setFetchTrigger(!fetchTrigger);
    
  }

  async function handleUpdate(data: any) {
    setShowLoading(true);
    try {
      console.log("process update");
      await UpdatePurchaseRequests(data.pr_code, data.status, "raw_materials", data.requested_raw_materials)
      // setPrData((prev) => {
      //   const updatedPrData = { ...prev, rows: [...prev.rows, data] };
      //   return updatedPrData;
      // })
      setShowPrompt({isSuccess: true, isShow: true});
    }
    catch (error) {
    if (error instanceof Error) {
      setShowPrompt({isSuccess: false, isShow: true});
      throw new Error("An error occurred while fetching data");
    }

  }
  setShowLoading(false);
  setShowEditDetail(!showEditDetail);
  setFetchTrigger(!fetchTrigger);
}

async function handleDelete(pr_code: string) {
  setShowLoading(true);
  try {
    await DeletePurchaseRequests(pr_code)
    setPrData((prev) => {
      const updatedPrData = { ...prev, rows: prev.rows.filter((item) => item.pr_code !== pr_code) };
      return updatedPrData;
    });
    setShowPrompt({isSuccess: true, isShow: true});
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("An error occurred while fetching data");
      setShowPrompt({isSuccess: false, isShow: true});
  }
    }
    setShowLoading(false);
    setFetchTrigger(!fetchTrigger);
    setShowPrompt({isSuccess: false, isShow: false});
  }

 function handleConfirmPrompt (id: string, name: string, brand: string)  {
    setitemEditId({
      id: id,
      name: name,
      materials: brand
    })
    setIsConfirm(true);
  }

    function handleEditDetail(pr_code: string) {
      const getPrRequestData = sessionStorage.getItem("prData");
    
      const prRequestData: TableData<Data> = JSON.parse(getPrRequestData!);
      const item = prRequestData.rows.find((item) => item.pr_code === pr_code );
      console.log(item);
      if (item) {
        setShowEditDetail((prev) => !prev);
        setitemEditId({
          id: item.pr_code!,
          name: "",
          materials: ""});
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
          UpdatedData= {prData!.rows.find((item) => item.pr_code === itemEditId.id)?? {brand: '', name: '', type: '', purchase_unit: '', quantity: 0, quantity_unit: '', notes: ''}}
          isUpdated={isUpdated}
          pr_code={itemEditId.id}
          />
        ) : 
        
        <ReusablePrDetailPopOut 
          
          values={prData!.rows.find((item) => item.pr_code === itemEditId.id)?? {brand: '', name: '', type: '', purchase_unit: '', quantity: 0, quantity_unit: '', notes: ''}}
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

    {isConfirm && (
      <ConfrimPrompt
        title="Konfirmasi Hapus"
        message={`Are you sure you want to delete this item?`}
        OnConfirm={() => handleDelete(itemEditId.id)}
        OnClose={() => setIsConfirm(false)}
      />
    )}

    {showPrompt.isShow && (
      <CustomPrompt
        title=""
        message=""
        isSuccess={showPrompt.isSuccess}
        OnConfirm={() => setShowPrompt({isShow: false, isSuccess: false})}
      />
    )}
    {showLoading && (
      <LoadingPrompt />
    )}
    </>
  )
}
