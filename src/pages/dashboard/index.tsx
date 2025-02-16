import { Link } from 'react-router-dom'
import Header from '../../components/Header'
import PurchaseOrder from '../../components/PurchaseOrder'
import { PurchaseRequest } from '../../components/PurchaseRequest'

const index = () => {
  return (
    <>
      <div className='flex flex-col gap-5 w-full pr-8'>
        <header className='flex justify-between items-center mt-5'>
          <Header title='Dashboard' />
        </header>

        <section className="flex flex-col relative text-slate-950 w-full gap-[4rem]">
        <div className='group'>
          <Link to="/purchase-request">
            <div className='max-h-[16rem] relative overflow-hidden group-hover:blur-md hover:cursor-pointer'>
              <h2 className='text-2xl'>Purchase Request</h2>
              <div>
                <PurchaseRequest disabled={true}/>
              </div>
            </div>
            {/* Overlay to block interactions behind the blur */}
            <div className="absolute inset-0 max-h-[16rem] pointer-events-none group-hover:pointer-events-auto transition duration-300" />
            <h3 
                className='absolute text-xl font-bold  opacity-0 group-hover:opacity-100 z-[20] left-[35%] top-[25%]'
              >
                  Pencet untuk melihat selengkapnya
              </h3>
          </Link>

        </div>
            <div className='group'>
              <Link to="/purchase-order">
                <div className='max-h-[15rem] relative overflow-hidden group-hover:blur-md hover:cursor-pointer'>
                  <h2 className='text-2xl mb-5'>Purchase Order</h2>
                  <div>
                    <PurchaseOrder />
                  </div>
                </div>

                {/* Overlay to block interactions behind the blur */}
              <div className="absolute inset-0 max-h-[16rem] top-[55%] pointer-events-none group-hover:pointer-events-auto transition duration-300" />
              <h3 
                  className='absolute text-xl font-bold opacity-0 group-hover:opacity-100 z-[20] left-[35%] top-[75%]'
                >
                  Pencet untuk melihat selengkapnya
              </h3>
              </Link>
            </div>
        </section>
      </div>
    </>
  )
}

export default index