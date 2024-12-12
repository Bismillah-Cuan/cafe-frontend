import { PrFormFields } from "./PrFormField"
import { PurchaseRequestsResponse, Data, TableData } from "./types"
import ReusableTable from "../ReusableTable"
import CreateFormButton from "../CreateFormButton"
import EditDetailButton from "../EditDetailButton"
import generateTableData from "../../util/generateTableData"
import { dummyPR } from "./DummyPR"
import { useState } from "react"
const PurchaseRequest = () => {
    // const [purchaseRequests, setPurchaseRequests] = useState<PurchaseRequestsResponse>({})
    const [showForm, setShowForm] = useState(false);
    const [isFetching, setIsFetching] = useState(false);

    function handleShowForm() {
        setShowForm((prev) => !prev);   
    }
    const tableData = generateTableData(dummyPR);
  return (
    <>
         <div className="w-full mr-8 text-slate-800 relative overflow-x-hidden flex flex-col gap-5">
      <section className="flex justify-between items-center">
        <div>
        <CreateFormButton onClick={handleShowForm} label="Create Order" />
        {/* {showForm && 
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
            isSelected={showEditDetail}/>} */}
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