import { createPortal } from "react-dom"
import { ClipLoader } from "react-spinners"

const LoadingPrompt = () => {

  return (createPortal(
    <>
       <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <ClipLoader 
                color="#36d7b7"
                loading={true}
                size={80}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    </>, document.body
  ))
    
}

export default LoadingPrompt