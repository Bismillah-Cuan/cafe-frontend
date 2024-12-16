import Header from '../../components/Header'
import PurchaseRequest from '../../components/PurchaseRequest'

const index = () => {
  return (
    <>
      <div className='flex flex-col w-full mr-8'>
        <header className='flex justify-between items-center mt-5'>
        <Header title='Purchase Request' />
        </header>
        <section className="text-slate-950">
          <PurchaseRequest />
        </section>
      </div>
    </>
  )
}

export default index