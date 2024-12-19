import AddableInput from "./AddableInput";

type prValue = {
  name: string,
  value: string | number
}
interface SavedListItemProps {
    listItem: string,
    formFields: any
    onChange: (event: React.ChangeEvent<HTMLInputElement> | 
      React.ChangeEvent<HTMLTextAreaElement> | 
      React.ChangeEvent<HTMLSelectElement> | 
      React.ChangeEvent<HTMLInputElement>) => void;
    prValue: prValue[] 
}

const rawMaterialsTypes=[
  {value: "dry", label: "dry"},
  {value: "fresh", label: "fresh"},
  {value: "dairy", label: "dairy"},
  {value: "atk", label: "atk"},
]

const listStyle = "text-sm font-bold"
const SavedListItem: React.FC<SavedListItemProps> = ({formFields, listItem, onChange, prValue}) => {

  
  return (
        <div className="flex items-center justify-between w-full">
            <label className={`flex-1 ${listStyle}`}>{listItem}</label>
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