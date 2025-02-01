import Header from '../../components/Header'
import SupplierPage from '../../components/Supplier'

const index = () => {
  return (
    <>
      <div className='flex flex-col gap-5 w-full  mr-8'>
        <header className='flex justify-between items-center mt-5'>
        <Header title='Supplier' />
        </header>
        <section className="text-slate-950 w-full">
          <SupplierPage />
        </section>
      </div>
    </>
  )
}

export default index