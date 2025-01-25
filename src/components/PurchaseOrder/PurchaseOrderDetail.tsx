import { useParams } from "react-router-dom";
import StatusNewPage from "./StatusNew"
import StatusOnProcessPage from "./StatusOnProcess"

const PurchaseOrderDetail = () => {
    const { status } = useParams();


  return (
    <>
    {
      status === "new" &&
        <StatusNewPage /> ||
      status === "on_process" &&
        <StatusOnProcessPage />
    }
        
    </>
    
  )
}

export default PurchaseOrderDetail