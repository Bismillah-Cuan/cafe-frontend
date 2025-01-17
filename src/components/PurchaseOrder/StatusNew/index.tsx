import { useEffect, useState } from "react";
import { UseDataContext } from "../../../util/context"
import generateTableData, {TableData, Data} from "../../../util/generateTableData";
import { DataPurchaseOrder, DataPurchaseOrderFiltered } from ".././types";
import { useParams } from "react-router-dom";
import ReusableTable from "../../ReusableTable";
const PO_Color = {
    on_process: "bg-yellow-400",
    new: "bg-green-700",
    received: "bg-red-400",
    issue_requested: "bg-orange-400",
    issue_accepted: "bg-yellow-400",
    done : "bg-green-400"
}

const index = () => {
    const { poData, setPoData } = UseDataContext();
    const [filteredPoData, setFilteredPoData] = useState<DataPurchaseOrderFiltered>();
    const [tablePoData, setTablePoData] = useState<TableData<Data>>({
        headers : [],
        rows: []
    })
    const {purchaseOrderId} = useParams();
    const [isFetching, setIsFetching] = useState(true);

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

            const TablePoData = filteredData[0].requested_raw_materials.map((item) => {
                return {
                    name: item.raw_material_details.name,
                    brand: item.raw_material_details.brand,
                    id: item.raw_material_details.id,
                    quantity: item.requested_quantity,
                    type: item.raw_material_details.type,
                    purchase_unit: item.raw_material_details.purchase_unit,
                    notes: item.requested_notes
                };
            });

            setFilteredPoData(filteredData[0]);
            const tableData = generateTableData(TablePoData);

            if (!tableData.headers.find(header => header.accessor === 'supplier')) {
                tableData.headers.push({
                  Header: 'Supplier',
                  accessor: 'supplier',
                  Cell: ({ row }: any) => (
                    <div>
                        <input key={row.original.id} type="text" className="bg-slate-100 px-2" placeholder="isi Supplier">
                        
                        </input>
                    </div>
                  )
                })
              }

            setTablePoData(tableData)
            
        }

        transformData(poData);

        console.log("filteredPOdata",filteredPoData);

    }, [])
  return (
    <>
    {isFetching && 
        <div className="flex flex-col gap-5 mt-5">
                <div className="flex justify-between text-slate-400">
                    <h3 className="text-lg">PO Code {purchaseOrderId}</h3>
                    <h3 className="text-lg">PO Division {filteredPoData?.division}</h3>
                </div>
                <h3 className="text-lg">
                    PO Status <span className={` ${filteredPoData && PO_Color[filteredPoData!.status as keyof typeof PO_Color]} py-2 px-2 rounded-md text-white`}>{filteredPoData?.status}</span> 
                </h3> 

                <div>
                    <ReusableTable tableFields={tablePoData.headers} data={tablePoData.rows}/>
                </div>
                <div className="flex justify-end w-full">
                    <div className="">
                        <button 
                            className="bg-slate-600 px-2 py-2 rounded-md hover:bg-slate-400 hover:cursor-pointer text-white"
                        >
                            Submit
                        </button>
                    </div>
                </div>
        </div>
        
        
        }
        
    </>
  )
}

export default index