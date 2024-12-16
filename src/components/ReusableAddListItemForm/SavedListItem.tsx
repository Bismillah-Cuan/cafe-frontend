import AddableInput from "./AddableInput";
interface SavedListItemProps {
    listItem: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const rawMaterialsTypes=[
  {value: "dry", label: "dry"},
  {value: "fresh", label: "fresh"},
  {value: "dairy", label: "dairy"},
  {value: "atk", label: "atk"},
]

const listStyle = "text-sm font-bold"
const SavedListItem: React.FC<SavedListItemProps> = ({listItem, onChange}) => {

  
  return (
        <div className="flex items-center justify-between w-full">
            <label className={`flex-1 ${listStyle}`}>{listItem}</label>
            <div className="flex flex-1 justify-between gap-3 items-center ">
                <AddableInput placeholder="Kuantitas" onChange={onChange} inputType="number"/>
                <AddableInput placeholder="e.g. kg, liter" onChange={onChange}  inputType="text"/>
                <AddableInput placeholder="e.g. dry," onChange={onChange} inputType="select" options={rawMaterialsTypes}/>
                <AddableInput placeholder="catatan" onChange={onChange} inputType="textarea"/>
            </div>
        </div>

  )
}

export default SavedListItem