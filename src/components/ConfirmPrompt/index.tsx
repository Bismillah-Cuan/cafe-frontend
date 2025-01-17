import "./confrimPrompt.css"
import { useState } from "react"

interface confirmPromptProps {
    title: string,
    message: string,
    OnOpen?: boolean
    OnConfirm?: () => void
    OnClose?: () => void
}
const ConfrimPrompt: React.FC<confirmPromptProps> = ({title, message, OnOpen = true, OnConfirm, OnClose}) => {

    // const [isOpen, setIsOpen] = useState(OnOpen)
  return (
    <>
        
            <div className="prompt flex flex-col w-[25rem] h-[10rem] bg-red-400 rounded-lg px-5 py-2 gap-5">
                <h2 className="text-center text-lg text-white">{title}</h2>
                <p className="text-center text-sm text-white">{message}</p>
                <div className=" flex justify-center gap-2">
                    <button 
                    className="self-end bg-white text-black rounded-md px-2 py-1"
                    onClick={OnConfirm}
                    >
                            Confirm
                    </button>
                    <button 
                    className="self-end bg-white rounded-md text-black px-2 py-1"
                    onClick={OnClose}
                    >
                            Cancel
                    </button>
                </div>
            
        </div>
      
        
    </>
    
  )
}

export default ConfrimPrompt