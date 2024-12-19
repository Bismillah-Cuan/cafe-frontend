import { useState, useRef } from "react"
import SavedListItem from "./SavedListItem"
import { string } from "yup"
import { Field } from "./typeAddList"

const listStyle = "text-sm font-bold"
const isSelectedStyle = "hover:bg-slate-200 w[80rem]"

const rawMaterialsTypes=[
  {value: "dry", label: "dry"},
  {value: "fresh", label: "fresh"},
  {value: "dairy", label: "dairy"},
  {value: "atk", label: "atk"},
]


type addFormField = {
  name: string, 
  placeholder: string, 
  type: "text" | "textarea" | "select" | "number" | "checkbox" | "radio";
  options?: 
  {value: string, label: string}[]}



const addFormField: addFormField[] = [
  {name: "quantity", placeholder: "kuantitas", type: "number"},
  {name: "quantity_unit", placeholder: "satuan kuantitas", type: "text"},
  {name: "type", placeholder: "tipe", type: "select", options: rawMaterialsTypes},
  {name: "note", placeholder: "catatan", type: "textarea"},
]

type prValue = {

  name: string,
  value: string | number
}

const prValue : prValue[] = [{
  name: "quantity", value: 10,
},
{
  name: "quantity_unit", value: "pcs",
}, 
{
  name: "type", value: "dry",
},
{
  name: "note", value: "catatan",
}]

const initialFormData = [
  {
    id: 1,
    item: "bahan mentah",
    data: prValue,
  },
  {
    id: 2,
    item: "bahan mentah",
    data: prValue,
  },
];
const AddListItem = () => {
    const [isSelected, setIsSelected] = useState(false);
    const [dataSaved, setDataSaved] = useState(initialFormData);

    const inputRef = useRef<HTMLInputElement>(null);

    function handleClick() {
      setIsSelected(!isSelected);

      setTimeout(() => {
        inputRef.current?.focus(); // Focus the input field
      }, 0);
    }

    function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
      if (event.key === "Enter") {
        handleAddItem(event);
        setIsSelected(false);
      }
    }

    function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
      
      if(e.target.value !== '')
        {
            setIsSelected(false);
        } else {
            setIsSelected(false);
        }
    }

    const handleAddItem = (event: React.FocusEvent<HTMLInputElement> | React.KeyboardEvent<HTMLInputElement>) => {
      const { name, value } = (event.target as HTMLInputElement); // Extract input name and value
    
      // Skip if input is empty
      if (!value.trim()) {
        setIsSelected(false);
      }
    
      // Calculate new ID (use 1 if dataSaved is empty)
      const id = dataSaved[dataSaved.length - 1]?.id + 1 || 1;
    
      // Add the new item to the state
      setDataSaved((prevState) => [...prevState, { id, item: value, data: [] }]);
    
      // Clear the input field
      setIsSelected(false);
    };

    const handleChange = (id: number, fieldName: string, value: string) => {
      setDataSaved((prevState) => {
        const itemExists = prevState.some((item) => item.id === id);
    
        if (itemExists) {
          // Update existing item
          return prevState.map((item) =>
            item.id === id
              ? {
                  ...item,
                  data: item.data.map((field) =>
                    field.name === fieldName
                      ? { ...field, value }
                      : field
                  ),
                  item: item.item, // Add this line to ensure the item property is present
                }
              : item
          );
        } else {
          // Add a new item
          return [
            ...prevState,
            {
              id,
              item: '', // Add this line to ensure the item property is present
              data: [
                {
                  name: fieldName,
                  value,
                },
              ],
            },
          ];
        }
      });
    };
    function handleSubmit(e: React.FormEvent) {
      e.preventDefault();

    }
  return (
    <section>
        <ol className="flex flex-col gap-2 list-disc w-full">
            {dataSaved.map((item, index) => (
            <li
              key={index}
              className={`list-disc py-1 rounded-md w-full border-b-2 ${!isSelected ? isSelectedStyle : ''}`}
            >
              <SavedListItem
                formFields = {addFormField}
                listItem= {item.item}
                prValue= {item.data}
                onChange= {(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
                  const { name, value } = event.target;
                  handleChange(item.id, name, value);
                }}
              />
            </li>
          ))}
           
            <li className={`list-disc px-2 py-1 rounded-md ${!isSelected ? isSelectedStyle : ''}`}>
            {isSelected ? 
            <input
            className={`border-none bg-slate-100 focus:outline-none placeholder:font-light ${listStyle}`}
            type="text"
            name="item"
            onBlur={(event) => handleAddItem(event)}
            onKeyDown={(event) => handleKeyPress(event)}
            // onChange={(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {

            // }}
            ref={inputRef}
            placeholder="Nama bahan baku"
          />
            : <span onClick={handleClick} className={`hover:cursor-pointer opacity-50 font-light text-sm`}>
                + Tambahkan Item Request
            </span>}
            </li>
        </ol>
    </section>
  )
}

export default AddListItem