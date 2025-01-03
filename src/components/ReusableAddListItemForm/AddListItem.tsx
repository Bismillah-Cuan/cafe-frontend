import { useState, useRef } from "react"
import SavedListItem from "./SavedListItem"
import { string } from "yup"
import { Field } from "./typeAddList"
import { add } from "date-fns"
import { UsePrContext } from "../../util/context"
import { SearchMaterialPopOut } from "./SearchMaterialPopOut"
import { Note } from "@mui/icons-material"

const listStyle = "text-sm font-bold"
const isSelectedStyle = "hover:bg-slate-200 w[80rem]"

const rawMaterialsTypes=[
  {value: "dry", label: "dry"},
  {value: "fresh", label: "fresh"},
  {value: "dairy", label: "dairy"},
  {value: "atk", label: "atk"},
]

interface AddListItemProps {
  onAddItem: (data: any) => void;
}

type addFormField = {
  name: string, 
  placeholder: string, 
  type: "text" | "textarea" | "select" | "number" | "checkbox" | "radio";
  options?: 
  {value: string, label: string}[]}



const addFormField: addFormField[] = [
  {name: "quantity", placeholder: "kuantitas", type: "number"},
  {name: "purchase_unit", placeholder: "satuan pembelian", type: "text"},
  {name: "type", placeholder: "tipe", type: "select", options: rawMaterialsTypes},
  {name: "notes", placeholder: "catatan", type: "textarea"},
]

type prValue = {

  name: string,
  value: string | number
}

export type prRequestPost = {
  raw_material_id?: number,
  name?: string,
  quantity?: number,
  purchase_unit?: string,
  type?: string,
  notes?: string,
}[]

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
  name: "notes", value: "catatan",
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

const initialFormData2 = [
  {
    raw_material_id: "3, 4, 6", 
    quantity: "100, 200, 300",
    note: "catatan"
  },
  {
    raw_material_id: "3, 4, 6", 
    quantity: "100, 200, 300",
    note: "catatan",
  },
];
const AddListItem: React.FC<AddListItemProps> = ({ onAddItem }) => {
    const [isSelected, setIsSelected] = useState(false);
    const [dataSaved, setDataSaved] = useState(initialFormData);
    const [dataSaved2, setDataSaved2] = useState<prRequestPost>([]);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
   

    const inputRef = useRef<HTMLInputElement>(null);

    function handleClick() {
      setIsSelected(!isSelected);

      setTimeout(() => {
        inputRef.current?.focus(); // Focus the input field
      }, 0);
    }

    function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
      if (event.key === "Enter") {
        if (event.currentTarget.value === "") {
          setIsSelected(false);
          return
        }
        handleAddItem(event);
        setIsSelected(false);
      }
    }

    function handleBlur(event?: React.FocusEvent<HTMLInputElement>) {
      
      setIsSearchOpen(false);
    }

    function handleInputBlur(event: React.FocusEvent<HTMLInputElement>) {
      if (event.target.value.length === 0) {
        setIsSelected(false);
      }
    }

    

    //Handle Add parent Item object
    const handleAddItem = (event: React.FocusEvent<HTMLInputElement> | React.KeyboardEvent<HTMLInputElement>) => {
      const { name, value } = (event.target as HTMLInputElement); // Extract input name and value
      
      // Skip if input is empty
      if (!value) {
        setIsSelected(false);
        return;
      }
    
      // Calculate new ID (use 1 if dataSaved is empty)
      const id = dataSaved[dataSaved.length - 1]?.id + 1 || 1;
    
      // Add the new item to the state
      setDataSaved((prevState) => [...prevState, { id, item: value, data: [] }]);
      console.log(dataSaved);

      onAddItem(dataSaved)
      // // Clear the input field
      // inputRef.current!.value = event.currentTarget.value;
      setIsSearchOpen(false);
      setIsSelected(false);
    };


    const addItemToData = ({name, materialId, purchaseUnit, type} : {name: string, materialId: number, purchaseUnit: string, type: string}) => {
      console.log(name, materialId, purchaseUnit);
      setDataSaved2((prevState) => [
        ...prevState,
        {
          raw_material_id: materialId,
          name: name,
          purchase_unit: purchaseUnit,
          quantity: 0,
          type: type,
          notes: "",
        },
      ]);
    
      // Log the state after a delay to ensure the update is visible
      setTimeout(() => {
        console.log("datasaved", dataSaved2);
      }, 0);
      setIsSelected(false);
      // console.log("datasave Valuies",dataSaved2.map((item) => Object.entries(item).map(([name, value]) => ({ name, value }))));
      onAddItem(dataSaved2)
    };

    const updateItemInData = ({
      id,
      updatedFields,
    }: {
      id: string | undefined;
      updatedFields: Partial<prRequestPost[number]>;
    }) => {
      setDataSaved2((prevState) =>
        prevState.map((item) => (item.name === id ? { ...item, ...updatedFields } : item))
      );

      onAddItem(dataSaved2);
    };


    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      if (e.target.value.length >= 1) {
        setIsSearchOpen(true);
        setSearchTerm(e.target.value);
      }
      else if (e.target.value.length === 0) {
        setIsSearchOpen(false);
      }
      console.log(e.target.value);
    }

    function handleDelete(materialId: number) {
     setDataSaved2(dataSaved2.filter((item) => item.raw_material_id !== materialId));
    }

    function handleSubmit(e: React.FormEvent) {
      e.preventDefault();

    }
  return (
    <section className={`relative max-h-[20rem] z-30 overflow-clip-margin-xl h-[10rem] ${isSearchOpen ? 'overflow-y-visible' : 'overflow-y-auto'}`}>
        <ol className="relative flex flex-col gap-2 list-disc w-full">
            {dataSaved2.length > 0 && (
              dataSaved2.map((item) => (<li key={item.name} className="list-disc py-1 rounded-md w-full border-b-2">

                <SavedListItem
                  materialId={item.raw_material_id}
                  formFields = {addFormField}
                  listItem= {item.name}
                  prValue= { Object.entries(item).map(([name, value]) => ({ name, value }))}
                  onChange= {(name, value) => name === 'quantity' ? updateItemInData({ id: item.name, updatedFields: { [name]: Number(value)} }) :
                     updateItemInData({ id: item.name, updatedFields: { [name]: value } })}
                  onDelete= {(event) => handleDelete(event)}
                />
              </li>)
              
            ))}
            
           
            <li className={`relative list-disc px-2 py-1 rounded-md ${!isSelected ? isSelectedStyle : ''}`}>
            {isSelected ? 
            <div className="relative">
            <input
            className={`border-none bg-slate-100 focus:outline-none placeholder:font-light ${listStyle}`}
            type="text"
            name="item"
            onBlur={handleInputBlur}
            onKeyDown={(event) => handleKeyPress(event)}
            onChange={(event) => handleChange(event)}
            ref={inputRef}
            placeholder="Nama bahan baku"
          />
            <SearchMaterialPopOut 
              isSearchOpen={isSearchOpen} 
              searchMaterial={searchTerm} 
              OnBlur={handleBlur} 
              OnSelected={(event) => addItemToData(event)}/>
            </div>
            : <span onClick={handleClick} className={`hover:cursor-pointer opacity-50 font-light text-sm`}>
                + Tambahkan Item Request
            </span>}
            </li>
        </ol>
    </section>
  )
}

export default AddListItem