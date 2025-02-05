import { useEffect, useState } from "react";
import { UseDataContext } from "../../../util/context"
import generateTableData, {TableData, Data} from "../../../util/generateTableData";
import { DataPurchaseOrder, DataPurchaseOrderFiltered } from ".././types";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import ReusableTable from "../../ReusableTable";
import { UpdatePurchaseOrder } from "../DataFetch";
import CustomPrompt from "../../CustomPrompt";
import LoadingPrompt from "../../LoadingPrompt";

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
  const [showLoading, setShowLoading] = useState(false);  


  const navigate = useNavigate();
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
              supplier_notes: item.supplier_notes
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

// Group data by supplier
  const groupDataBySupplier = tablePoData.rows.reduce((acc, item) => {
  const {supplier_name, supplier_notes} = item as { supplier_name?: string, supplier_notes?: string };

  if(!supplier_name) return acc;

  if(!acc[supplier_name]) {
    acc[supplier_name] = {
      supplier_name,
      supplier_notes: supplier_notes!,
      rows: [],
    }
  }

  acc[supplier_name].rows.push(item);

  return acc
}, {} as Record<string, {supplier_name: string, supplier_notes: string, rows: any[]}>
);

function handleChangeSupplierNotes(supplier_name: string, supplier_notes: string) {
  setTablePoData((prev) => {
    const updatedRows = prev.rows.map((row : Data) => {
      if (row.supplier_name === supplier_name) {
        return {...row, supplier_notes};
      }
      return row;
    });
    return {...prev, rows: updatedRows};
  });
}

function handleUpdate(data: any) {
  setShowLoading(true);
  try {
    console.log("process update");
    data.forEach((item: any) => {
      const supplier_data = {supplier_name: item.supplier_name, supplier_notes: item.supplier_notes};
      UpdatePurchaseOrder( filteredPoData!.po_code, supplier_data, "", "supplier_notes");
    })
    
    UpdatePurchaseOrder( filteredPoData!.po_code, [], "received", "status");
    setShowPrompt({isSuccess: true, isShow: true});
    navigate("/purchase-order");
  }
  catch (error) {
    if (error instanceof Error) {
      
      setShowPrompt({isSuccess: false, isShow: true});
    }
  }
  console.log(data);
  setShowLoading(false);
}

  return (
    <>
    {isFetching ? <div>Loading...</div> : (
        <div className="flex flex-col gap-5 mt-5 mb-10">
                <div className="flex justify-between text-slate-400">
                    <h3 className="text-lg">PO Code {purchaseOrderId}</h3>
                    <h3 className="text-lg">PO Division {filteredPoData?.division}</h3>
                </div>
                <h3 className="text-lg">
                    PO Status <span className={` ${filteredPoData && PO_Color[filteredPoData!.status as keyof typeof PO_Color]} py-2 px-2 rounded-md text-white`}>{filteredPoData?.status}</span> 
                </h3> 

                <div className="flex flex-col gap-10">
                  {Object.values(groupDataBySupplier).map((group, index) => {
                      const { supplier_name, supplier_notes, rows } = group;

                      const filteredHeaders = tablePoData.headers.filter(
                        (header) => header.accessor !== "supplier_name" && header.accessor !== "supplier_notes"
                      );

                      return (
                        <div key={index} className="flex flex-col gap-5">
                          <div className="flex flex-col gap-2">
                            <h3 className="text-md font-semibold">No: PO/{index + 1}</h3>
                            <h3 className="text-md font-semibold">Supplier: {supplier_name}</h3>
                          </div>

                          <ReusableTable
                            tableFields={filteredHeaders}
                            data={rows} 
                            enabledFilters={false}
                            enabledPagination={false}
                          />

                          <div className="w-full border-4 border-gray-300 rounded-lg">
                            <div className="bg-gray-300 px-2 py-2">
                              <h3 className="text-md font-semibold">
                                Supplier Note's {supplier_name}
                              </h3>
                            </div>

                            <textarea
                              id={index.toString()}
                              name={supplier_name}
                              rows={4}
                              className="w-full h-20 p-2 bg-slate-50 border-none outline-none resize-none"
                              placeholder="Supplier Notes"
                              value={supplier_notes}
                              onChange={(e) => handleChangeSupplierNotes(supplier_name, e.target.value)}
                            >
                              {supplier_notes}
                            </textarea>
                          </div>
                        </div>
                      );
                    })}
                    
                </div>
                <div className="flex justify-end w-full">
                    <div className="flex gap-5">
                        <button 
                            className="bg-slate-600 px-2 py-2 rounded-md hover:bg-slate-400 hover:cursor-pointer text-white">
                              PDF
                            </button>
                        <button 
                            className="bg-slate-600 px-2 py-2 rounded-md hover:bg-slate-400 hover:cursor-pointer text-white"
                            onClick={() => handleUpdate(tablePoData.rows)}
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
    {showLoading && <LoadingPrompt/>}
    </>
  )
}

export default StatusOnProcessPage