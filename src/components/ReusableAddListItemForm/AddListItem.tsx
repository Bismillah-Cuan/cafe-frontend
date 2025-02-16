import { useState, useRef, useCallback } from "react"
import SavedListItem from "./SavedListItem"
import { SearchMaterialPopOut } from "./SearchMaterialPopOut"


const listStyle = "text-sm font-bold"
const isSelectedStyle = "hover:bg-slate-200 w[80rem]"

// const rawMaterialsTypes=[
//   {value: "dry", label: "dry"},
//   {value: "fresh", label: "fresh"},
//   {value: "dairy", label: "dairy"},
//   {value: "atk", label: "atk"},
//   {value: "packaging", label: "packaging"},
//   {value: "support", label: "support"},
// ]

interface AddListItemProps {
  onAddItem: (data: any) => void;
  dataUpdate?: any
  isUpdated: Boolean
  statusPr?: string
}

type addFormField = {
  name: string, 
  placeholder: string, 
  type: "text" | "textarea" | "select" | "number" | "checkbox" | "radio" | "span",
  options?: 
  {value: string, label: string}[]
}



const addFormField: addFormField[] = [
  {name: "quantity", placeholder: "kuantitas", type: "number"},
  {name: "purchase_unit", placeholder: "satuan pembelian", type: "span"},
  {name: "type", placeholder: "tipe", type: "span"},
  {name: "notes", placeholder: "catatan", type: "textarea"},
]
export type prRequestPost = {
  raw_material_id?: number,
  name?: string,
  quantity?: number,
  purchase_unit?: string,
  type?: string,
  notes?: string,
}[]



const AddListItem: React.FC<AddListItemProps> = ({ onAddItem, dataUpdate, isUpdated,  }) => {
    const [isSelected, setIsSelected] = useState(false);
    const [dataSaved2, setDataSaved2] = useState(() => isUpdated ? dataUpdate as prRequestPost : [] as prRequestPost);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isPrAvailabe, setIsPrAvailabe] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [referenceElement, setReferenceElement] = useState< null | HTMLDivElement>(null);


    const setReference = useCallback((node: HTMLDivElement | null) => {
      setReferenceElement(node);
    }, []);
    // const referenceElement = useRef<HTMLDivElement>(null);
    console.log("datasaved2", dataSaved2)
    const inputRef = useRef<HTMLInputElement>(null);

    function handleClick() {
      setIsSelected(!isSelected);

      setTimeout(() => {
        inputRef.current?.focus(); // Focus the input field
      }, 0);
    }


    function handleBlur() {
      
      setIsSearchOpen(false);
      setIsPrAvailabe(false);
      // console.log("isOpen", isSearchOpen);
    }

    function handleInputBlur(event: React.FocusEvent<HTMLInputElement>) {
      if (event.target.value.length === 0) {
        setIsSelected(false);
      }
    }

    

    //Handle Add parent Item object
    

    const addItemToData = ({name, materialId, purchaseUnit, type} : {name: string, materialId: number, purchaseUnit: string, type: string}) => {
      // console.log(name, materialId, purchaseUnit);
      if(dataSaved2!.some((item) => item.raw_material_id === materialId)) {
        setIsPrAvailabe(true);
        return
      }
      setDataSaved2((prevState) => [
        ...prevState!,
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
        // console.log("datasaved", dataSaved2);
      }, 0);
      setIsSelected(false);
      // console.log("datasave Valuies",dataSaved2.map((item) => Object.entries(item).map(([name, value]) => ({ name, value }))));
      onAddItem(dataSaved2)
    };

    const updateItemInData = ({
      id,
      updatedFields,
    }: {
      id: string | undefined | number;
      updatedFields: Partial<prRequestPost[number]>;
    }) => {
      setDataSaved2((prevState) =>
        prevState!.map((item) => (item.raw_material_id === id ? { ...item, ...updatedFields } : item))
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
     setDataSaved2(dataSaved2!.filter((item) => item.raw_material_id !== materialId));
    }

  return (
    <section className={`relative max-h-[20rem] z-30 overflow-clip-margin-xl h-[10rem] overflow-y-auto`}>
        <ol className="relative flex flex-col gap-2 list-disc w-full">
            {dataSaved2!.length > 0 && (
              dataSaved2!.map((item) => (<li key={item.name} className="list-disc py-1 rounded-md w-full border-b-2">
             
                <SavedListItem
                  materialId={item.raw_material_id}
                  formFields = {addFormField}
                  listItem= {item.name}
                  prValue= { Object.entries(item).map(([name, value]) => ({ name, value }))}
                  onChange= {(name, value) => name === 'quantity' ? updateItemInData({ id: item.raw_material_id, updatedFields: { [name]: Number(value)} }) :
                     updateItemInData({ id: item.raw_material_id, updatedFields: { [name]: value } })}
                  onDelete= {(event) => handleDelete(event)}
                />
              </li>)
              
            ))}
            <li 
              className={`relative list-disc px-2 py-1 rounded-md ${!isSelected ? isSelectedStyle : ''}`} 
            >
            {isSelected ? 
              <div className="relative flex flex-col gap-1" ref={setReference}>
                <input
                className={`border-none bg-slate-100 focus:outline-none placeholder:font-light ${listStyle}`}
                type="text"
                name="item"
                onBlur={handleInputBlur}
                onChange={(event) => handleChange(event)}
                ref={inputRef}
                placeholder="Nama bahan baku"
                autoComplete="off"
                />
                {isPrAvailabe && 
                  <span 
                    className="flex items-center justify-center w-full text-sm font-light text-red-500"
                  >
                      Tidak Bisa Menambahkan Material Yang Sama
                    </span>}
                <SearchMaterialPopOut 
                  isSearchOpen={isSearchOpen} 
                  searchMaterial={searchTerm} 
                  OnBlur={handleBlur} 
                  OnSelected={(event) => addItemToData(event)}
                  anchorEl={referenceElement}
                  />
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