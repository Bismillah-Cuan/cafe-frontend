import { useState,  } from "react";
import AddListItem from "./AddListItem";
import { DataPurchaseRequest,  } from "../PurchaseRequest/types";
import { TableData, Data } from "../../util/generateTableData"
const bgClass = "fixed top-0 left-0 w-full h-full bg-black opacity-50 z-[10]";

type ReusableFormProps = {
    // fields: Field[];
    onSubmit: (formData: { requested_raw_materials: any}) => void;
    onUpdate?: (formData: { pr_code: string | undefined, status: string | undefined, requested_raw_materials: any }) => void;
    onClose?: () => void;
    buttonLabel?: string;
    isSelected?: boolean 
    UpdatedData?: any
    isUpdated: Boolean;
    division?: string | null
    username?: string | null
    pr_code?: string
  };

const buttonStyle ="text-slate-900 font-light text-center bg-slate-400 w-40 hover:bg-slate-300 px-2 py-1 rounded-lg transition-all"
const statusColor = {
  requested: "bg-yellow-400",
  approved: "bg-green-400",
  rejected: "bg-red-400"
}
const ReusableAddListItemForm: React.FC<ReusableFormProps> = ( 
  {onSubmit, onUpdate, onClose, isSelected, pr_code, isUpdated, UpdatedData}) => {

  const [formData, setFormData] = useState<TableData<Data>["rows"][number]>(() => 
    isUpdated ? UpdatedData : [] as Record<string, string>[]
  );
    

  
  const transformedData = transformedFormData(UpdatedData);

    function transformedFormData(data:  DataPurchaseRequest['pr_list'][number]) {
      console.log(isUpdated)
      if (!isUpdated){
        return data
      }else{
      const filteredData =  data.requested_raw_materials
      // return filteredData
      return filteredData.map((item) => {
    
          const { name, purchase_unit, type } = item.details;
          const { quantity, raw_material_id, notes } = item;
          return { raw_material_id, name, purchase_unit, type, quantity, notes };
      });
    }
    }
    function handleSubmit() {
      const requested_raw_materials = formData!.map((item: any) => {
        const {raw_material_id, quantity, notes} = item;
        return {raw_material_id, quantity, notes};
      })
      const filteredData = 
        {
          requested_raw_materials : requested_raw_materials
        }
      
      console.log("Form submitted with data:", filteredData);
      onSubmit(filteredData);
    }

    function handleUpdate() {
      
      const requested_raw_materials = formData!.map((item: any) => {
        const {raw_material_id, quantity, notes} = item;
        return {raw_material_id, quantity, notes};
      })
      const filteredData = 
        {
          pr_code : pr_code,
          status : formData.status,
          requested_raw_materials : requested_raw_materials
        }
      
      console.log("Form updated with data:", filteredData);
      onUpdate?.(filteredData);
    }
  return (
    <>
    {isSelected &&  <div onClick={onClose} className={bgClass}></div>}
    {isSelected && 
    <section 
      className="fixed top-1/2 left-1/2 bg-slate-100 px-5 py-8 rounded-3xl w-[60rem] min-h-[30rem] z-[20] transform -translate-x-1/2 -translate-y-1/2" role="dialog">
    <div className="relative flex flex-col gap-5 p-5 z-[20]">
      <div className="flex justify-between">
        <button 
          onClick={onClose} 
          className={buttonStyle}>
            Back
        </button>
        <button 
          onClick={isUpdated ? () => handleUpdate() : () => handleSubmit()}
          className={buttonStyle}>
            {isUpdated ? "Update" : "Submit"}
        </button>
      </div>  
        <h2 className="text-2xl font-bold mb-2">{isUpdated ? "Update Purchase Request" : "Create Purchase Request"}</h2>
        <div className="flex justify-between">
            <h3 className="text-md text-slate-600 mb-5 opacity-50">Pr Code: {pr_code}</h3>
            <h3 className="text-md text-slate-600 mb-5 opacity-50">division - {formData.division}</h3>
        </div>
        <div className="relative flex flex-col gap-4 w-full">
            <div className="flex  justify-between">
                <label className=" flex-1 text-md font-light" htmlFor="material">Bahan Baku</label>
                <div className="flex justify-between gap-[6rem] flex-auto">
                  <label className="   text-md font-light" htmlFor="quantity">Kuantitas</label>
                  <label className="text-md font-light" htmlFor="purchaseUnit">Satuan Beli</label>
                  <label className=" text-md font-light" htmlFor="type">Tipe</label>
                  <label className=" flex-1 text-md font-light" htmlFor="note">Catatan</label>
                </div>
            </div>
            <AddListItem onAddItem={(formData) => setFormData(formData)} dataUpdate={transformedData} isUpdated={isUpdated}/>
        </div>
    </div>
    {isUpdated && (
          <div className="mt-5 ml-5 flex gap-2 items-center">
          <span className="text-md font-semibold mr-3">Status :</span>
            <span  className={`px-2 py-1 rounded-md w-32 text-center text-slate-100 ${statusColor[UpdatedData.status as keyof typeof statusColor]}`}>{UpdatedData.status}</span>
        </div>
        )}
    </section>}
    </>
  )
}

export default ReusableAddListItemForm