type Field = {
  Header: string;
  accessor: string;
};

type Data = {
  date?: string;
  id?: number;
  name?: string;
  brand?: string;
  type?: string;
  purchase_unit?: string;
  quantity?: number;
  quantity_unit?: string;
  user?: string;
  materials?: string;
  quantities?: string;
  unit?: string;
  [key: string]: any;
}

type ReusableEditProps = {
  fields: Field[];
  values: Data;
  onSubmit: (formData: Record<string, string>) => void;
  onClose?: () => void;
  buttonLabel?: string;
  isSelected?: boolean
};
const bgClass = "fixed top-0 left-0 w-full h-full bg-black opacity-50 z-[10]";
const ReusableDetailPopOut: React.FC<ReusableEditProps> = ({ fields, values, onSubmit, onClose, buttonLabel = "Submit", isSelected
  }) => {
  return (
    <>
    <div>
    {isSelected &&  <div onClick={onClose} className={bgClass}></div>}
    {isSelected && 
    <section className="fixed top-1/2 left-1/2 bg-slate-100 p-5 rounded-3xl w-[25rem] h-auto z-[20] transform -translate-x-1/2 -translate-y-1/2" role="dialog">
      <div className="p-5 z-[20]">
        <h2 className="text-2xl font-bold mb-2">Detail Order</h2>
        <h3 className="text-sm text-slate-600 italic mb-5">Click any of the field to edit</h3>
        <div className="flex flex-col gap-4">
          {fields.map((field) => ( 
            field.Header === "Action" || field.Header === "id" ? null :(
            <div key={field.Header}>
              <label className="text-md font-semibold" htmlFor={field.Header}>
                {field.Header} : <span className="font-light">{values[field.accessor] ? values[field.accessor] : "No Data"} </span> 
              </label> 
            </div>)))}
        </div>
      </div>
    </section>}
      
    </div>         
    </>
  )
}

export default ReusableDetailPopOut