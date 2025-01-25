import Header from "../../../components/Header"
import PurchaseOrderDetail from "../../../components/PurchaseOrder/PurchaseOrderDetail"
import { useNavigate } from "react-router-dom"
const index = () => {
  const navigate = useNavigate();

  function handleClickBack() {
    navigate("/purchase-order");
  }
  return (
    <>
        <div className='flex flex-col w-full pr-8 gap-3 overflow-y-auto'>
          <button 
            onClick={handleClickBack}
            className='text-slate-200 mt-5 font-light text-center bg-slate-400 w-20 hover:bg-slate-300 px-2 py-1 rounded-lg transition-all'
            >
              Back
          </button>
        <header className='flex justify-between items-center'>
          <Header title='Purchase Order Detail' />
        </header>
        <section className="text-slate-950">
          <PurchaseOrderDetail />
        </section>
      </div>
    </>
  )
}

export default index