import { useParams } from "react-router-dom";
import StatusNewPage from "./StatusNew"
import StatusOnProcessPage from "./StatusOnProcess"
import StatusReceivedPage from "./StatusReceived"

const PurchaseOrderDetail = () => {
    const { status } = useParams();


  return (
    <>
    {
      status === "new" &&
        <StatusNewPage /> ||
      status === "on_process" &&
        <StatusOnProcessPage /> ||
      status === "received" &&
        <StatusReceivedPage />
    }
        
    </>
    
  )
}

export default PurchaseOrderDetail