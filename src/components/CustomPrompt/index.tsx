import "./customPrompt.css"
import { useState } from "react"

interface promptPros {
    title?: string,
    message?: string,
    isSuccess: boolean
    OnOpen?: boolean
    OnConfirm?: () => void
}


const CustomPrompt: React.FC<promptPros> = ({  isSuccess,  OnConfirm}) => {

    const [isOpen, ] = useState(true)


  return (
    <>
    {isOpen && isSuccess ? (
        <div className="prompt flex flex-col gap-5 w-[25rem] bg-green-400 text-white rounded-lg px-5 py-4">
            <h2 className="text-center text-lg">Berhasil !</h2>
            <p className="text-center text-sm">Aksi yang anda lakukan berhasil</p>
            <button 
            className="self-center bg-white text-black rounded-md px-2 py-1"
            onClick={OnConfirm}
            >
                    Confirm
            </button>
        </div>
    ) : (
        <div className="prompt flex flex-col gap-5 w-[20rem] bg-red-400 text-white rounded-lg px-5 py-4">
            <h2 className="text-center text-lg">Gagal !</h2>
            <p className="text-center text-sm">Aksi yang anda lakukan gagal, Silahkan Coba lagi</p>
            <button 
            className="self-center bg-white text-black rounded-md px-2 py-1"
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