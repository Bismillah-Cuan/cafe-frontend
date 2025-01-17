import "./customPrompt.css"
import { useState } from "react"

interface promptPros {
    title: string,
    message: string,
    isSuccess: boolean
    OnOpen?: boolean
    OnConfirm?: () => void
}


const CustomPrompt: React.FC<promptPros> = ({ title, message, isSuccess, OnOpen = true, OnConfirm}) => {

    const [isOpen, setIsOpen] = useState(true)


  return (
    <>
    {isOpen && isSuccess ? (
        <div className="prompt flex flex-col gap-5 w-[20rem] bg-green-400 text-white rounded-lg px-5 py-3">
            <h2 className="text-center text-lg">{title}</h2>
            <p className="text-center text-sm">{message}</p>
            <button 
            className="self-center bg-white text-black rounded-md px-2 py-1"
            onClick={OnConfirm}
            >
                    Confirm
            </button>
        </div>
    ) : (
        <div className="prompt flex flex-col w-[20rem] bg-red-400 text-white rounded-lg px-5 py-2">
            <h2 className="text-center text-lg">{title}</h2>
            <p className="text-center text-sm">{message}</p>
            <button 
            className="self-center bg-white rounded-md px-2 py-1"
            onClick={OnConfirm}
           
            >
                    Confirm
            </button>
        </div>    
    )}
    </>
  )
}

export default CustomPrompt