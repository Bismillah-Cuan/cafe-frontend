import ReusableAddListItemForm from "../ReusableAddListItemForm"
import { PurchaseRequestsResponse, DataPurchaseRequest, TableData } from "./types"
import { Data } from "../../util/generateTableData"
import ReusableTable from "../ReusableTable"
import CreateFormButton from "../CreateFormButton"
import EditDetailButton from "../EditDetailButton"
import ReusableDetailPopOut from "../ReusableDetailPopOut"
import { dummyPR } from "./DummyPR"
import { useEffect, useState } from "react"
import { fetchPurchaseRequests } from "./DataFetch"

const statusColor = {
  requested: "bg-yellow-400",
  approved: "bg-green-400",
  rejected: "bg-red-400"
}
const PurchaseRequest = () => {

    
    // const [purchaseRequests, setPurchaseRequests] = useState<PurchaseRequestsResponse>({})
    const [showForm, setShowForm] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const [showEditDetail, setShowEditDetail] = useState(false);
    const [itemEditId, setitemEditId] = useState(0);
    const [addedPurchaseRequests, setAddedPurchaseRequests] = useState<TableData<Data>>(
    {
      headers: [],
      rows: [],
      }
    );
    const [error, setError] = useState( {} as any);

    useEffect(() => {
      async function handleFetch() {
        try {
          
          setIsFetching(true);
          const {tableData, division, pr_code} = await fetchPurchaseRequests();

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
                  <EditDetailButton key={`edit-${row.original.id}`} onClick={() => handleEditDetail(row.original.id)}  label="Selengkapnya" />
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
          setAddedPurchaseRequests(tableData);
          console.log("Fetch PR", tableData, division, pr_code);
        } catch (error) {
          if (error instanceof Error) {
            setError({message: error.message || 'An error occurred while fetching data.'});
          }
        }
      }
      handleFetch();
      setIsFetching(false);
    }, [])
    const division = localStorage.getItem("division");
    const username = localStorage.getItem("username");
    function handleShowForm() {
        setShowForm((prev) => !prev);   
    }
    // const tableData = generateTableData(addedMaterials);

    

    function handleSubmit(data: any) {
      setShowForm(!showForm);
      console.log(data);
    }
    function handleEditDetail(id: number) {
      const item = addedPurchaseRequests.rows.find((item) => item.user_id === id);
      if (item) {
        setShowEditDetail((prev) => !prev);
        setitemEditId(item.id);
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
          <ReusableDetailPopOut 
            fields={addedPurchaseRequests.headers.filter((header) => header.accessor !== 'actions')} 
            values={addedPurchaseRequests.rows.find((item) => item.user_id === itemEditId)?? {brand: '', name: '', type: '', purchase_unit: '', quantity: 0, quantity_unit: ''}}
            onSubmit={handleSubmit} 
            onClose={closeForm} 
            buttonLabel="Submit" 
            isSelected={showEditDetail}/>}
        </div>
      </section>
      <section>
        {isFetching && <p>Sedang Mengambil Data Tabel.....</p>}
       <ReusableTable tableFields={addedPurchaseRequests.headers} data={addedPurchaseRequests.rows}/>
      </section>
    </div>
    </>
  )
}

export default PurchaseRequest