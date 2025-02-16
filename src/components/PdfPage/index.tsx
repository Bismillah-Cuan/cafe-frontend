import PdfConverter from "../PdfConverter"
import { htmlContent } from "../../util/receiving_form_POAD-0113-0001"
const PdfPage = () => {
  return (
    <div className="mt-5">
        <PdfConverter htmlContent={htmlContent}/>
    </div>
  )
}

export default PdfPage