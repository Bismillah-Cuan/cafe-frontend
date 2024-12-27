import AddableInput from "./AddableInput";

type prValue = {
  name: string,
  value: string | number
}
interface SavedListItemProps {
    listItem: string,
    formFields: any
    onChange: (name: string, value: string) => void;
    onDelete: () => void
    prValue: prValue[] 
}

const rawMaterialsTypes=[
  {value: "dry", label: "dry"},
  {value: "fresh", label: "fresh"},
  {value: "dairy", label: "dairy"},
  {value: "atk", label: "atk"},
]

const listStyle = "text-sm font-bold"
const SavedListItem: React.FC<SavedListItemProps> = ({formFields, listItem, onChange, onDelete, prValue}) => {

  
  return (
        <div className="flex items-center justify-between w-full">
            <label className={`flex-1 ${listStyle}`}>{listItem}</label>
            <button onClick={onDelete} className="text-slate-900 font-light text-center bg-slate-400 hover:bg-slate-500 px-2 py-1 rounded-md">delete</button>
            <div className="flex flex-1 justify-between gap-3 items-center ">
              {formFields.map((item: any) => {
                return (
                  <AddableInput
                    key={item.name}
                    name={item.name}
                    placeholder={item.placeholder}
                    onChange={onChange}
                    inputType={item.type}
                    options={item.options}
                    value={prValue.find((value) => value.name === item.name)?.value}

                    />

              )})}
            </div>
        </div>

  )
}

export default SavedListItem