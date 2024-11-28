import { useState, useContext } from "react";
import { UserContext } from "../store/user-context";

type Field = {
    
    name: string;
    label: string;
    type: string;
    placeholder?: string;
    defaultValue?: string;
    options?: { value: string; label: string }[]; // Only for "select" type
    validate?: (value: string) => string | null; // Validation function
  };
  
  type ReusableFormProps = {
    fields: Field[];
    onSubmit: (formData: Record<string, string>) => void;
    onClose?: () => void;
    buttonLabel?: string;
    isSelected?: boolean
  };

  const bgClass = "fixed top-0 left-0 w-full h-full bg-black opacity-50 z-[10]";

  const ReusableForm: React.FC<ReusableFormProps> = ({ fields, onSubmit, onClose, buttonLabel = "Submit", isSelected
  }) => {

    const userCtx = useContext(UserContext);
    const [formData, setFormData] = useState(
      Object.fromEntries(fields.map(field => [field.name, field.defaultValue || ""]))
    );
    
    const currentUser = userCtx.user;

    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split("T")[0];

    const handleChange: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void = (event) => {
     const { name , value} = event.target;
     
     setFormData({ ...formData, [name]: value, date: formattedDate, user: currentUser, id: Math.floor(Math.random()*1000).toString()  }); 
    }
    const handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void = (event) => {
      event.preventDefault();
      onSubmit(formData);
    }

  return (
    
    <>
    <div>
    {isSelected &&  <div onClick={onClose} className={bgClass}></div>}
    {isSelected && <section className="fixed top-1/2 left-1/2 bg-slate-100 p-5 rounded-3xl w-[25rem] h-auto z-[20] transform -translate-x-1/2 -translate-y-1/2" role="dialog">
      <div className="p-5 z-[20]">
        <h2 className="text-2xl font-bold mb-5">Create Order</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5" action="/">
            {fields.map((field, index) => (
            <div className="flex flex-col gap-2" key={index}>
              <label htmlFor={field.name}>{field.label}</label>
              {field.type === "textarea" ? (
                <textarea
                  id={field.name}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                />
              ) : (
                <input className="text-md px-2 h-10 rounded-md bg-slate-300"
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                />
              )}
              </div>
              ))}
              <button className="text-slate-900 text-center font-semibold bg-slate-400 hover:bg-slate-500 px-2 py-1 rounded-md" type="submit">{buttonLabel}</button>
          </form>
        </div>
        
        
    </section>}
      
    </div>
      
      
             
    </>
  )
}

export default ReusableForm