import { useEffect, useState } from "react";
import { UseDataContext } from "../../../util/context"
import generateTableData, { Data} from "../../../util/generateTableData";
import { DataPurchaseOrder, DataPurchaseOrderFiltered } from ".././types";
import { useParams } from "react-router-dom";
import ReusableTable from "../../ReusableTable";
import CustomPrompt from "../../CustomPrompt";

const PO_Color = {
  on_process: "bg-yellow-400",
  new: "bg-green-700",
  received: "bg-red-400",
  issue_requested: "bg-orange-400",
  issue_accepted: "bg-yellow-400",
  done : "bg-green-400"
}

const StatusIssuesPage = () => {
    const { poData } = UseDataContext();
    const [filteredPoData, setFilteredPoData] = useState<DataPurchaseOrderFiltered>();

    const {tablePoData, setTablePoData} = UseDataContext()
    const {purchaseOrderId} = useParams();
    const [isFetching, setIsFetching] = useState(true);
    const [showPrompt, setShowPrompt] = useState({
        isShow: false,
        isSuccess: false
    });

    const [groupData, setGroupData] = useState<Record<string, { supplier_name: string; supplier_notes: string; rows: any[]; }>>({});
  
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
              supplier_notes: item.supplier_notes,
              received_quantity: item.received_quantity,
              received_notes: item.received_notes,
          };
      });
      
      setFilteredPoData(filteredData[0]);
      const tableData = generateTableData(inputTableData);
      

      tableData.headers = tableData.headers.map((header) =>
        header.accessor === 'received_quantity'
            ? {
                ...header,
                Cell: ({ row }: any) => (
                <div className="flex items-center justify-center gap-2">
                    <button 
                        className=
                        {`
                          px-1 text-white bg-slate-600 rounded-lg hover:bg-slate-500 
                          ${row.original.received_quantity === 0 ? 'opacity-50' : ''}
                        `}
                        onClick= {() => handleDecrementQuantity(row.original.id)}
                        disabled={row.original.received_quantity === 0}
                    > 
                        - 
                    </button>
                    <div>
                        <input
                            id={row.original.id}
                            type="number"
                            name="received_quantity"
                            value={row.original.received_quantity || ''}
                            className="bg-slate-100 outline-none no-spinners w-[2rem] p-0"
                            placeholder="0"
                            onChange={handleChange}
                        />
                        <label>/{row.original.quantity}</label>
                    </div>
                    <button 
                        className=
                        {`
                          px-1 text-white bg-slate-600 rounded-lg hover:bg-slate-500 
                          ${row.original.received_quantity === row.original.quantity ? 'opacity-50' : ''}
                        `}
                        onClick={() => handleIncrementQuantity(row.original.id)}
                        disabled={row.original.received_quantity === row.original.quantity}
                    > 
                        + 
                    </button>
                </div>
                ),
            }
            : header
    );

    tableData.headers = tableData.headers.map((header) =>
        header.accessor === 'received_notes'
            ? {
                ...header,
                Cell: ({ row }: any) => (
                    <input
                        id={row.original.id}
                        type="text"
                        name="received_notes"
                        value={row.original.received_notes || ''}
                        className="bg-slate-100 px-2 outline-none"
                        onChange={handleChange}
                        placeholder="isi kondisi barang"
                        autoComplete="off"
                    />
                ),
            }
            : header
    );
      
      setTablePoData(tableData);
      sessionStorage.setItem("tablePoData", JSON.stringify(tablePoData));
      console.log("tableData",tableData);
      setGroupData(generateGroupdata());
  }

  transformData(poData);

  console.log("",filteredPoData);
  setIsFetching(false);
}, []);

//Update Current Value to Table
useEffect(() => {
    if(isFetching === false) {
        setTablePoData(tablePoData);
        setGroupData(generateGroupdata());
    }
}, [tablePoData, setTablePoData]);

// GroupData by supplier
  function generateGroupdata() {
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
    
    return groupDataBySupplier
  }

function handleDecrementQuantity(id: number) {
  setTablePoData((prevTableData) => ({
      ...prevTableData,
      rows: prevTableData.rows.map((row) => {
          if (row.id === id) {
              return {
                  ...row,
                  received_quantity: row.received_quantity - 1,
              };
          }
          return row;
      }),
  }))
}

function handleIncrementQuantity(id: number) {
    setTablePoData((prevTableData) => ({
        ...prevTableData,
        rows: prevTableData.rows.map((row) => {
            if (row.id === id) {
                return {
                    ...row,
                    received_quantity: row.received_quantity + 1,
                };
            }
            return row;
        }),
        
    }))
    // console.log(tablePoData.rows.filter((row) => row.id === id));
  }
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    let { name, value, id } = e.target;
    let parsedValue: string | number = value.trim() === "" ? "" : Number(value);

    setTablePoData((prevTableData) => ({
        ...prevTableData,
        rows: prevTableData.rows.map((row) => {
            if (row.id === parseInt(id, 10)) {
                // Ensure we only parse numbers when it's a valid input
                if (!isNaN(Number(value))) {
                    parsedValue = Number(value);

                    // Prevent values from exceeding `quantity` or going below `0`
                    if (parsedValue > row.quantity!) {
                        parsedValue = row.quantity!;
                    } else if (parsedValue < 0) {
                        parsedValue = 0;
                    }
                } else {
                    parsedValue = value; // Keep as string if it's not a number
                }

                return {
                    ...row,
                    [name]: parsedValue,
                };
            }
            return row;
        }),
    }));
}

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
  // try {
  //   console.log("process update");
  //   UpdatePurchaseOrder( filteredPoData!.po_code, data, "on_process", "status");
  //   setShowPrompt({isSuccess: true, isShow: true});
  // }
  // catch (error) {
  //   if (error instanceof Error) {
      
  //     setShowPrompt({isSuccess: false, isShow: true});
  //   }
  // }
  // setShowEditDetail(!showEditDetail);
  // setFetchTrigger(!fetchTrigger);
  console.log(data);
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
                  {Object.values(groupData).map((group, index) => {
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
    </>
  )
}

export default StatusIssuesPage