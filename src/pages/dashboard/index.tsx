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
            <div className='max-h-[16rem] relative overflow-hidden'>
              <div className='flex gap-5 w-full items-center'>
                <h2 className='text-2xl'>Purchase Request</h2>
                <Link 
                  to="/purchase-request" 
                  className='text-slate-200 font-light text-center bg-slate-400  hover:bg-slate-300 px-2 py-1 rounded-lg transition-all'
                >
                  Lihat Selengkapnya
                </Link>
              </div>
              <div>
                <PurchaseRequest disabled={true}/>
              </div>
            </div>
            {/* Overlay to block interactions behind the blur */}
            {/* <div className="absolute inset-0 max-h-[16rem] pointer-events-none group-hover:pointer-events-auto transition duration-300" />
            <h3 
                className='absolute text-xl font-bold  opacity-0 group-hover:opacity-100 z-[20] left-[35%] top-[25%]'
              >
                  Pencet untuk melihat selengkapnya
              </h3> */}

        </div>
            <div className='group'>
                <div className='max-h-[15rem] relative overflow-hidden hover:cursor-pointer'>
                  <div className='flex gap-5 w-full items-center mb-5'>
                    <h2 className='text-2xl '>Purchase Order</h2>
                    <Link 
                    to="/purchase-order" 
                    className='text-slate-200 font-light text-center bg-slate-400  hover:bg-slate-300 px-2 py-1 rounded-lg transition-all'
                    >
                    Lihat Selengkapnya
                    </Link>
                  </div>
                  <div>
                    <PurchaseOrder />
                  </div>
                </div>

                {/* Overlay to block interactions behind the blur */}
              {/* <div className="absolute inset-0 max-h-[16rem] top-[55%] pointer-events-none group-hover:pointer-events-auto transition duration-300" />
              <h3 
                  className='absolute text-xl font-bold opacity-0 group-hover:opacity-100 z-[20] left-[35%] top-[75%]'
                >
                  Pencet untuk melihat selengkapnya
              </h3> */}
            </div>
        </section>
      </div>
    </>
  )
}

export default index