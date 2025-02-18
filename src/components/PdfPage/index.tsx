import PdfConverter from "../PdfConverter"
// import { htmlContent } from "../../util/receiving_form_POAD-0113-0001"
import { htmlContent } from "../../util/receiving_form_POAD-0114-0001"
const PdfPage = () => {
  return (
    <div className="ml-[10rem] flex flex-col justify-center overflow-y-auto">
        <PdfConverter htmlContent={htmlContent}/>
    </div>
  )
}

export default PdfPage