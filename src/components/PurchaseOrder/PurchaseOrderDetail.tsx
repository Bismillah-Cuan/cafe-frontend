import { useParams } from "react-router-dom";
import StatusNewPage from "./StatusNew"
import StatusOnProcessPage from "./StatusOnProcess"

const PurchaseOrderDetail = () => {
    const { status } = useParams();


  return (
    <>
    {status === "on_process" &&
        <StatusNewPage /> ||
        status === "on_process1" &&
        <StatusOnProcessPage />
        }
        
    </>
    
  )
}

export default PurchaseOrderDetail