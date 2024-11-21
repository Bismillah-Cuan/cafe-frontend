import { useState } from "react";

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
    buttonLabel?: string;
  };

  const ReusableForm: React.FC<ReusableFormProps> = ({ fields, onSubmit, buttonLabel = "Submit",
  }) => {
    const [formData, setFormData] = useState<Record<string, string>>(
      fields.reduce((acc, field) => {
        acc[field.name] = field.defaultValue || "";
        return acc;
      }, {} as Record<string, string>)
    );

    const handleChange: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void = (event) => {
     const { name , value} = event.target;
     setFormData({ ...formData, [name]: value }); 
    }
    const handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void = (event) => {
      event.preventDefault();
      onSubmit(formData);
    }
  return (
    <>
    <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-[10]"></div>
      <section className="fixed top-1/2 left-1/2 bg-slate-100 p-5 rounded-md w-[25rem] h-[18rem] z-[20] transform -translate-x-1/2 -translate-y-1/2" role="dialog">
          <div className="p-5 z-[20]">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5" action="/">
                {fields.map((field, index) => (
                <div key={index}>
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
                    <input
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
                  <button type="submit">{buttonLabel}</button>
              </form>
            </div>

            
        </section>
                     
    </>
  )
}

export default ReusableForm