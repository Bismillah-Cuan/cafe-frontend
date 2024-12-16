import { useState, useRef } from "react"
import SavedListItem from "./SavedListItem"
import { string } from "yup"

const listStyle = "text-sm font-bold"
const isSelectedStyle = "hover:bg-slate-200"
const AddListItem = () => {
    const [isSelected, setIsSelected] = useState(false);
    const [dataSaved, setDataSaved] = useState([] as string[]);

    const inputRef = useRef<HTMLInputElement>(null);

    function handleClick() {
      setIsSelected(!isSelected);

      setTimeout(() => {
        inputRef.current?.focus(); // Focus the input field
      }, 0);
    }

    function handleKeyPress(e: any) {
      if (e.key === "Enter") {
        handleChange(e);
        setIsSelected(false);
      }
    }

    function handleBlur(e: any) {
      
      if(e.target.value !== '')
        {
          handleChange(e);
            setIsSelected(false);
        } else {
            setIsSelected(false);
        }
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
      setDataSaved([...dataSaved, event.target.value]);
    }
    function handleSubmit(e: React.FormEvent) {
      e.preventDefault();
      

    }
  return (
    <section>
        <ol className="flex flex-col gap-2 list-disc w-full">
            {dataSaved.length > 0 && dataSaved.map((item, index) => (
              <li key={index} className={`list-disc py-1 rounded-md w-full border-b-2  ${!isSelected ? isSelectedStyle : ''}`}>
                <SavedListItem listItem={item} onChange={() => handleChange}/>
              </li>
            ))}
           
            <li className={`list-disc px-2 py-1 rounded-md ${!isSelected ? isSelectedStyle : ''}`}>
            {isSelected ? 
            <input 
              className={`border-none bg-slate-100 focus:outline-none placeholder:font-light ${listStyle}` } 
              type="text" 
              onBlur={handleBlur}
              onKeyDown={handleKeyPress}
              ref={inputRef} 
              placeholder="Nama bahan baku" />
            : <span onClick={handleClick} className={`hover:cursor-pointer opacity-50 font-light text-sm`}>
                + Tambahkan Item Request
            </span>}
            </li>
        </ol>
    </section>
  )
}

export default AddListItem