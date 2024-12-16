import ReusableAddListItemForm from "../ReusableAddListItemForm"
import { PurchaseRequestsResponse, Data, TableData } from "./types"
import ReusableTable from "../ReusableTable"
import CreateFormButton from "../CreateFormButton"
import EditDetailButton from "../EditDetailButton"
import generateTableData from "../../util/generateTableData"
import ReusableDetailPopOut from "../ReusableDetailPopOut"
import { dummyPR } from "./DummyPR"
import { useState } from "react"

const statusColor = {
  Pending: "bg-yellow-400",
  Approved: "bg-green-400",
  Rejected: "bg-red-400"
}
const PurchaseRequest = () => {
    // const [purchaseRequests, setPurchaseRequests] = useState<PurchaseRequestsResponse>({})
    const [showForm, setShowForm] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const [showEditDetail, setShowEditDetail] = useState(false);
    const [itemEditId, setitemEditId] = useState(0);
    const [error, setError] = useState();

    function handleShowForm() {
        setShowForm((prev) => !prev);   
    }
    const tableData = generateTableData(dummyPR);

    const existingHeader = tableData.headers.find(header => header.accessor === 'status__action');
    if (existingHeader) {
      const originalCell = existingHeader.Cell;
      existingHeader.Cell = ({ row }: any) => (
        <div className="flex justify-between gap-2 mr-3">
          <div>
          <span className={`px-2 py-1 rounded-md text-slate-100 ${statusColor[row.original.status__action as keyof typeof statusColor]}`}>
            {originalCell?.({ value: null, row, column: null })}
          </span>
          </div>

            <EditDetailButton key={`edit-${row.original.id}`} onClick={() => handleEditDetail(row.original.id)}  label="Selengkapnya" />
        </div>
      );
    }

    function handleSubmit(data: any) {
      console.log(data);
    }
    function handleEditDetail(id: number) {
      const item = tableData.rows.find((item) => item.id === id);
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
            isSelected={showForm}/>}
        {showEditDetail && 
          <ReusableDetailPopOut 
            fields={tableData.headers.filter((header) => header.accessor !== 'actions')} 
            values={tableData.rows.find((item) => item.id === itemEditId)?? {brand: '', name: '', type: '', purchase_unit: '', quantity: 0, quantity_unit: ''}}
            onSubmit={handleSubmit} 
            onClose={closeForm} 
            buttonLabel="Submit" 
            isSelected={showEditDetail}/>}
        </div>
      </section>
      <section>
        {isFetching && <p>Sedang Mengambil Data Tabel.....</p>}
       <ReusableTable tableFields={tableData.headers} data={tableData.rows}/>
      </section>
    </div>
    </>
  )
}

export default PurchaseRequest