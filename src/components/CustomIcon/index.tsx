
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export const ArrowUpDown = () => {
  return (
    <span className='relative flex flex-col items-center w-1'>
      <ArrowDropUpIcon  className="absolute -top-4"/>
      <ArrowDropDownIcon className="absolute -bottom-4 "/>
    </span>
  )
}
