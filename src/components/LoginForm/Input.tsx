
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    htmlFor: string;
  }

const Input: React.FC<InputProps> = ({label, htmlFor, ...props}) => {

    return (
        <div className="w-full flex flex-col gap-2 text-slate-600">
            <label className="text-lg font-bold" htmlFor={htmlFor}>{label}</label>
            <input className="text-md px-2 h-10 rounded-md bg-slate-200" {...props} />
        </div>
    )
}

export default Input