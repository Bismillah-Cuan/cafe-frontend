import AddableInput from "./AddableInput";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
type prValue = {
  name: string,
  value: string | number
}
interface SavedListItemProps {
    materialId: number | undefined,
    listItem: string | undefined,
    formFields: any
    onChange: (name: string, value: string | number) => void;
    onDelete: (materialId: number) => void
    prValue:  prValue[]
}

// const rawMaterialsTypes=[
//   {value: "dry", label: "dry"},
//   {value: "fresh", label: "fresh"},
//   {value: "dairy", label: "dairy"},
//   {value: "atk", label: "atk"},
// ]

const listStyle = "text-sm font-bold"
const SavedListItem: React.FC<SavedListItemProps> = ({materialId, formFields, listItem, onChange, onDelete, prValue}) => {

  // console.log("prValue", prValue);
  // console.log("formFields", formFields);

  return (
        <div className="flex items-center  w-full">
            <div className="flex w-[10rem]  gap-3 items-center">
              <label className={` max-w-[5rem] ${listStyle}`}>{listItem}</label>
              {/* <button onClick={() => onDelete(materialId!)} className="text-slate-900 font-light text-center bg-slate-400 hover:bg-slate-500 px-2 py-1 rounded-md">delete</button> */}
              <div>
              <DeleteRoundedIcon 
                      htmlColor="#F44336" 
                      className="cursor-pointer"
                      onClick={() => onDelete(materialId!)} />
              </div>
            </div>
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