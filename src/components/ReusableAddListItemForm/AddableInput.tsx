interface AddableInputProps {
  onChange:
    (name: string, value: string) => void;
  inputType: "text" | "textarea" | "select" | "number" | "checkbox" | "radio";
  options?: { value: string; label: string }[]; // For select, radio
  name?: string; // Name for input, radio
  placeholder?: string; // For text, textarea
  value?: string | number
  label?: string; // Optional label
}

const listStyle = "text-sm font-bold"
const inputStyle = "text-sm font-bold h-full rounded-md h-full  flex-none px-2 py-1" 
const AddableInput: React.FC<AddableInputProps> = ({placeholder, onChange, inputType, options, name, value}) => {

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement| HTMLSelectElement>) {
    const { name, value } = e.target;

      // Trigger the parent's onChange with the name and value
    onChange(name, value);
  }
  function handleKeyPress(e: any) {
    if (e.key === "Enter") {
      handleChange(e);
    }
  }

  function handleBlur(e: any) {
    handleChange(e);
  }

  return (
    <>
      {inputType === "textarea" && ( //Textarea
        <textarea 
              className={`border-none bg-slate-100 outline-none w-[9.5rem] placeholder:font-light ${inputStyle}` }
              name={name} 
              onBlur={handleBlur}
              onKeyDown={handleKeyPress}
              onChange={handleChange}
              value={value}
              placeholder={placeholder} />
      )}
      {inputType === "text" && ( // Text
        <input 
              className={`border-none bg-slate-100 focus:outline-none w-[8rem] placeholder:font-light ${inputStyle}` }
              name={name} 
              type="text" 
              onBlur={handleBlur}
              onKeyDown={handleKeyPress}
              onChange={handleChange}
              value={value}
              placeholder={placeholder} />
      )}
      {inputType === "number" && ( // Number
        <input 
              className={`border-none bg-slate-100 focus:outline-none w-[8rem] placeholder:font-light ${inputStyle}` }
              name={name} 
              type="number" 
              onBlur={handleBlur}
              onKeyDown={handleKeyPress}
              onChange={handleChange}
              value={value}
              placeholder={placeholder} />
      )}
      {inputType === "select" && ( // Select
        <select 
              className={`border-none bg-slate-100 focus:outline-none placeholder:font-light ${inputStyle}` }
              name={name} 
              onChange={handleChange}
              value={value}>
            <option value="" className="text-slate-400 font-light" hidden disabled selected>Tipe</option>
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
                  onBlur={handleBlur}
                  onKeyDown={handleKeyPress}
                  onChange={handleChange}
                  value={value}
                  placeholder={placeholder} />
              <span>{option.label}</span>
            </label>
          ))

      )}
      
    </>
  )
}

export default AddableInput