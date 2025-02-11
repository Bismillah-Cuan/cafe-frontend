import { useParams } from "react-router-dom";
import StatusNewPage from "./StatusNew"
import StatusOnProcessPage from "./StatusOnProcess"
import StatusReceivedPage from "./StatusReceived"
import StatusIssuesPage from "./StatusIssues";
import StatusPurchasedPage from "./StatusPurchased";

const PurchaseOrderDetail = () => {
    const { status } = useParams();
    const username = localStorage.getItem('username');

  return (
    <>
    {
      status === "new" &&
        <StatusNewPage /> ||
      status === "on_process" &&
        <StatusOnProcessPage /> ||
      status === "received" &&
        <StatusReceivedPage /> ||
      status === "purchased" &&
      <StatusPurchasedPage /> ||
      status === "issues_requested" &&  username === "admin" &&
        <StatusIssuesPage />
    }
        
    </>
    
  )
}

export default PurchaseOrderDetail