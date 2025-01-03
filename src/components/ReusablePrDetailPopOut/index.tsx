import { request } from "http";


type Field = {
    Header: string;
    accessor: string;

  };

  type requested_raw_materials = [{
    details: {
      brand: string;
      id: number;
      name: string;
      purchase_unit: string;
      quantity_unit: string;
      type: string;
    };
    quantity: number;
    raw_material_id: number;
  }]

  type Metadata = {
    created_at: string;
    is_deleted: boolean;
    updated_at: string | null;
  }
  
  type Data = {
    date?: string;
    id?: number;
    user?: string;
    requested_raw_materials?: requested_raw_materials;
    pr_code?: string; 
    status?: string;
    division?: string;
    user_id?: number; 
    metadata?: Metadata; 
    [key: string]: any;
  }
  
  type ReusableEditProps = {
    fields: Field[];
    username: string;
    division: string;
    values: Data;
    onSubmit: (formData: Record<string, string>) => void;
    onClose?: () => void;
    buttonLabel?: string;
    isSelected?: boolean
  };


  const bgClass = "fixed top-0 left-0 w-full h-full bg-black opacity-50 z-[10]";
  const buttonStyle ="text-slate-900 font-light text-center bg-slate-400 w-40 hover:bg-slate-300 px-2 py-1 rounded-lg transition-all"
  const statusColor = {
    requested: "bg-yellow-400",
    approved: "bg-green-400",
    rejected: "bg-red-400"
  }
const ReusablePrDetailPopOut: React.FC<ReusableEditProps> = ({ fields, values, username, division, onSubmit, onClose, buttonLabel = "Submit", isSelected
  }) => {

    const allKeys = new Set<string>();

    values.requested_raw_materials && values.requested_raw_materials.forEach((item) => {
        Object.keys(item).forEach((key) => {
            if (key === "details") {
              // Collect keys from the `details` object
              Object.keys(item.details).forEach((detailKey) => {
                if (detailKey !== "id" ) {
                  allKeys.add(detailKey);
                }
              });
            } else if (key !== "raw_material_id") {
              allKeys.add(key);
            }
          });
    })
  return (
    <>
    {isSelected &&  <div onClick={onClose} className={bgClass}></div>}
    {isSelected && <section className="fixed top-1/2 left-1/2 bg-slate-100 p-5 rounded-3xl w-[60rem] min-h-[30rem] z-[20] transform -translate-x-1/2 -translate-y-1/2" role="dialog">
    <div className="flex flex-col gap-5 p-5 z-[20]">
      <div className="flex justify-between">
        <button 
          onClick={onClose} 
          className={buttonStyle}>
            Back
        </button>
      </div>  
        <h2 className="text-2xl font-bold mb-2">Purchase Request Detail</h2>
        <div className="flex justify-between">
            <h3 className="text-md text-slate-600 mb-5 opacity-50">Pr Code: {values.pr_code}</h3>
            <h3 className="text-md text-slate-600 mb-5 opacity-50">Division - {values.division}</h3>
        </div>
        <div className="flex flex-col gap-4 w-full">
            {/* Header */}
            <div className="flex justify-between w-full">
                {
                    [...allKeys].map((key) => (
                        <div className="flex-1  font-light text-md">
                            {key}
                        </div>
                    ))
                }
            </div>
            <ol className=" w-full list-outside text-black list-decimal"> 
            {/* flex flex-col gap-4 */}
                {/* Rows */}
             
                {
                    values.requested_raw_materials && values.requested_raw_materials.map((item) =>  (
                        <li className="mt-2">
                          <div className="flex w-full">
                        {Object.entries(item).map(([key, value]) => key === "details" ? (
                           Object.entries(value).map(([detailKey, detailValue]) => (
                            detailKey !== "id" && (
                                   <div key={detailKey} className="flex-1 w-full">
                                       <label className="text-sm font-semibold" htmlFor={detailKey}>
                                           {detailValue}
                                       </label> 
                                   </div>
                               ) 
                           ))
                        ) : (key !== "raw_material_id" && 
                        (<div className="flex-1 w-full">
                            <label className="text-sm font-semibold">
                                {value.toString()}
                            </label> 
                            </div>
                            
                            ))
                    ) 
                    
                }</div>
                </li> 
                    ))
                }
         
            </ol>
            
        </div>
        <div className="mt-5">
          <span className="text-md font-semibold mr-3">Status :</span>
          <span 
            className={`px-2 py-1 rounded-md w-32 text-center text-slate-100 ${statusColor[values.status as keyof typeof statusColor]}`}>
              {values.status}
          </span>
        </div>
    </div>
    </section>}
    </>
  )
}

export default ReusablePrDetailPopOut