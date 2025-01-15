import Header from '../../components/Header'
import PurchaseOrder from '../../components/PurchaseOrder'


const index = () => {
  return (
    <>
      <div className='flex flex-col gap-5 w-full'>
        <header className='flex justify-between items-center mt-5'>
        <Header title='Purchase Order' />
        </header>
        <section className="text-slate-950 w-full pr-10 mt-4">
          <PurchaseOrder />
        </section>
      </div>
    </>
  )
}

export default index