import Header from "../../../components/Header"
import PurchaseOrderDetail from "../../../components/PurchaseOrder/PurchaseOrderDetail"
const index = () => {
  return (
    <>

        <div className='flex flex-col w-full mr-8'>
        <header className='flex justify-between items-center mt-5'>
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