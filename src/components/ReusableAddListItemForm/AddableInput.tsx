interface AddableInputProps {
  onChange:
    (name: string, value: string) => void;
  inputType: "text" | "textarea" | "select" | "number" | "checkbox" | "radio" | "span";
  options?: { value: string; label: string }[]; // For select, radio
  name?: string; // Name for input, radio
  placeholder?: string; // For text, textarea
  value?: string | number
  label?: string; // Optional label
}


const inputStyle = "text-sm font-bold h-full rounded-md h-full  flex-none px-2 py-1" 
const AddableInput: React.FC<AddableInputProps> = ({placeholder, onChange, inputType, options, name, value}) => {

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement| HTMLSelectElement>) {
    const { name, value } = e.target;

      // Trigger the parent's onChange with the name and value
    onChange(name, value);
  }
 

  return (
    <>
      {inputType === "textarea" && ( //Textarea
        <textarea 
              className={`border-none bg-slate-100 outline-none  flex-1 placeholder:font-light ${inputStyle}` }
              name={name} 
              onChange={handleChange}
              value={value}
              placeholder={placeholder} />
      )}
      {inputType === "text" && ( // Text
        <input 
              className={`border-none bg-slate-100 focus:outline-none max-w-[5rem] placeholder:font-light ${inputStyle}` }
              name={name} 
              type="text" 
              onChange={handleChange}
              value={value}
              placeholder={placeholder} />
      )}
      {inputType === "number" && ( // Number
        <input 
              className={`border-none bg-slate-100 focus:outline-none max-w-[5rem] placeholder:font-light ${inputStyle}` }
              name={name} 
              type="number" 
              onChange={handleChange}
              value={value}
              placeholder={placeholder} />
      )}
      {inputType === "select" && ( // Select
        <select 
              className={`border-none bg-slate-100 focus:outline-none placeholder:font-light ${inputStyle}` }
              name={name} 
              onChange={handleChange}
              value={value}
              required
              >
            <option value="" disabled>Tipe</option>
          {options?.map((option, index) => (
            <option key={index} value={option.value}>{option.label}</option>
          ))}
        </select>
      )}
      {inputType === "checkbox" || inputType === "radio" && ( // Checkbox
          options?.map((option) => ( 
            <label key={option.value} className="flex items-center gap-2">
              <input 
                  className={`border-none bg-slate-100 focus:outline-none placeholder:font-light ${inputStyle}` }
                  name={name} 
                  type={inputType} 
                  onChange={handleChange}
                  value={value}
                  placeholder={placeholder} />
              <span>{option.label}</span>
            </label>
          ))
      )}
      {inputType === "span" && ( // Span
        <span className="font-bold max-w-[4rem] w-[3rem] text-sm">{value}</span>
      )}
    </>
  )
}

export default AddableInput