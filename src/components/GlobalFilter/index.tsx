import { useState } from "react"
import { useAsyncDebounce } from "react-table"
type GlobalFilterProps = {filter: string, setFilter: (filter: string) => void}


export const GlobalFilter: React.FC<GlobalFilterProps> = ({filter, setFilter}) => {
  const [value, setValue] = useState(filter)
  const onChange = useAsyncDebounce(value => {
    setFilter(value || undefined)
  }, 1000)
  return (
    <span>
        Search: {' '}
        <input className="w-[10rem] bg-slate-100 border-[2px] border-slate-500 rounded-md" value={value || ''}
        onChange={e => {setValue(e.target.value); onChange(e.target.value)}}/>
    </span>
  )
}
