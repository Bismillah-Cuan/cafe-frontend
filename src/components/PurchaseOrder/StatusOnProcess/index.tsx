import { useEffect, useState } from "react";
import { UseDataContext } from "../../../util/context"
import generateTableData, {TableData, Data} from "../../../util/generateTableData";
import { DataPurchaseOrder, DataPurchaseOrderFiltered } from ".././types";
import { useParams, useNavigate } from "react-router-dom";
import ReusableTable from "../../ReusableTable";
import { UpdatePurchaseOrder } from "../DataFetch";
import CustomPrompt from "../../CustomPrompt";

const PO_Color = {
  on_process: "bg-yellow-400",
  new: "bg-green-700",
  received: "bg-red-400",
  issue_requested: "bg-orange-400",
  issue_accepted: "bg-yellow-400",
  done : "bg-green-400"
}

const StatusOnProcessPage = () => {
  const { poData, setPoData } = UseDataContext();
  const [filteredPoData, setFilteredPoData] = useState<DataPurchaseOrderFiltered>();

  const {tablePoData, setTablePoData} = UseDataContext()
    const {purchaseOrderId} = useParams();
    const [isFetching, setIsFetching] = useState(true);
    const [showPrompt, setShowPrompt] = useState({
        isShow: false,
        isSuccess: false
    });

  
  useEffect(() => {
    function transformData(data: DataPurchaseOrder['purchase_orders']) {
      const filteredData = data.filter((item) => item.po_code === purchaseOrderId).map((item) => {
          console.log("Po_Code", item.po_code);
          return {
              po_code: item.po_code,
              status: item.status,
              division: item.division,
              requested_raw_materials: item.requested_raw_materials,
      }})

      const inputTableData = filteredData[0].requested_raw_materials.map((item) => {
          return {
              name: item.raw_material_details.name,
              brand: item.raw_material_details.brand,
              id: item.raw_material_details.id,
              quantity: item.requested_quantity,
              type: item.raw_material_details.type,
              purchase_unit: item.raw_material_details.purchase_unit,
              notes: item.requested_notes,
              supplier_name: item.supplier_name,
          };
      });
      
      setFilteredPoData(filteredData[0]);
      const tableData = generateTableData(inputTableData);

      
      setTablePoData((prev) => prev = tableData);
      console.log("tableData",tableData);
  
      
  }

  transformData(poData);

  console.log("",filteredPoData);
  setIsFetching(false);
}, [setTablePoData]);


  return (
    <>
    {isFetching ? <div>Loading...</div> : (
        <div className="flex flex-col gap-5 mt-5">
                <div className="flex justify-between text-slate-400">
                    <h3 className="text-lg">PO Code {purchaseOrderId}</h3>
                    <h3 className="text-lg">PO Division {filteredPoData?.division}</h3>
                </div>
                <h3 className="text-lg">
                    PO Status <span className={` ${filteredPoData && PO_Color[filteredPoData!.status as keyof typeof PO_Color]} py-2 px-2 rounded-md text-white`}>{filteredPoData?.status}</span> 
                </h3> 

                <div className="flex flex-col gap-5">
                  {tablePoData.rows.map((item, index) => {
                    const { supplier_name, ...restItem } = item as { [key: string]: string };
                    return (
                    
                    <div key={index} className="flex flex-col gap-5">
                      <div className="flex flex-col gap-2">
                          <h3 className="text-md">NO: PO/{index + 1}</h3>
                          <h3 className="text-md">Supplier: {supplier_name}</h3>
                      </div>
                        

                        <ReusableTable tableFields={tablePoData.headers} data={[restItem]} enabledFilters={false} enabledPagination={false}/>
                    </div>
                  )})}
                    
                </div>
                <div className="flex justify-end w-full">
                    <div className="">
                        <button 
                            className="bg-slate-600 px-2 py-2 rounded-md hover:bg-slate-400 hover:cursor-pointer text-white"
                            // onClick={() => handleUpdate(tablePoData.rows)}
                        >
                            Submit
                        </button>
                    </div>
                </div>
        </div>       
    )}
    {showPrompt.isShow && 
            <CustomPrompt 
                title={"Succesfull"} 
                message={"Aksi Berhasil"}
                OnConfirm={() => setShowPrompt({isShow: false, isSuccess: false})}
                isSuccess={showPrompt.isSuccess}                
             />
        }
    </>
  )
}

export default StatusOnProcessPage