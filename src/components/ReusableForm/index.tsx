import { useState, useContext } from "react";
// import { UserContext } from "../store/user-context";

interface Metadata {
  created_at: string;
  is_deleted: boolean;
  updated_at: string | null;
}

type Field = {
    
    name: string;
    label: string;
    type: string;
    id?: number;
    placeholder?: string;
    defaultValue?: string;
    options?: { value: string; label: string }[]; // Only for "select" type
    validate?: (value: string) => string | null; // Validation function
  };
  
  type ReusableFormProps = {
    fields: Field[];
    onSubmit: (formData: Record<string, string | number>) => void;
    onClose?: () => void;
    buttonLabel?: string;
    isSelected?: boolean
  };

  const bgClass = "fixed top-0 left-0 w-full h-full bg-black opacity-50 z-[10]";

  const ReusableForm: React.FC<ReusableFormProps> = ({ fields, onSubmit, onClose, buttonLabel = "Submit", isSelected
  }) => {
    const token = localStorage.getItem("access_token");
    const [formData, setFormData] = useState(
      Object.fromEntries(fields.map(field => [field.name, field.defaultValue || ''])) as { [key: string]: string | number }
    );
    
  
    const handleChange: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) => void = (event) => {
     const { name , value, type} = event.target;
     console.log(value);
     // Convert value to a number if the input type is "number"
      const processedValue = type === "number" ? Number(value) : value;

     setFormData({ ...formData, [name]: processedValue }); 
    }
    function handleSubmit (event: React.FormEvent<HTMLFormElement>)  {
      event.preventDefault();

        onSubmit(formData)
      
    }

  return (
    
    <>
    <div>
    {isSelected &&  <div onClick={onClose} className={bgClass}></div>}
    {isSelected && <section className="fixed top-1/2 left-1/2 bg-slate-100 p-5 rounded-3xl w-auto h-auto z-[20] transform -translate-x-1/2 -translate-y-1/2" role="dialog">
      <div className="p-5 z-[20]">
        <h2 className="text-2xl font-bold mb-5">Create Materials</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 items-center">
          <div className="flex flex-wrap justify-center gap-4">
            {fields.map((field, index) => (
            <div className="flex flex-col gap-2 w-[20rem]" key={index}>
              <label className="text-sm font-semibold" htmlFor={field.name}>{field.label}</label>
              {field.type === "textarea" && (
                <textarea
                  id={field.name}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                />
              )}
              {field.type === "text" && (
                <input className="text-sm  px-2 h-10 rounded-md bg-slate-200"
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  required
                />
              )}
              {field.type === "number" && (
                <input className="text-sm  px-2 h-10 rounded-md bg-slate-200"
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  required
                />
              )}
              {field.type === "select" && (
                <select
                  id={field.name}
                  className="text-sm px-2 h-10 rounded-md bg-slate-200"
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>{field.placeholder}</option>
                  {field.options?.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              )}
              </div>
            ))}

            </div>
              <button className="flex-grow text-slate-900 text-center mt-2 font-semibold w-[20rem] bg-slate-400 hover:bg-slate-500 px-2 py-1 rounded-md" type="submit">{buttonLabel}</button>
          </form>
        </div>
        
        
    </section>}
      
    </div>
      
      
             
    </>
  )
}

export default ReusableForm