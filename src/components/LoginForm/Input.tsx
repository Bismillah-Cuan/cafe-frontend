import * as React from "react";
import { forwardRef } from "react";



interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    id: string;
    error: any;
  }

const Input = ({label, id, error, ...props}: InputProps) => {
    return(
        <div className="w-full flex flex-col gap-2 text-slate-600">
            <label className="text-lg font-bold" htmlFor={id}>{label}</label>
            <input className="text-md px-2 h-10 rounded-md bg-slate-200" id={id} {...props} />
            <div className="text-sm text-red-500 font-light">{error && <p>{error}</p>}</div>
        </div>
    )
}

export default Input