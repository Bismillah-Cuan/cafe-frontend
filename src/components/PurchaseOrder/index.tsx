import { useState, useEffect } from 'react'
import { FetchPurchaseOrders } from './DataFetch'
import { DataPurchaseOrder } from './types';
import { UseDataContext } from '../../util/context';
import { Link } from 'react-router-dom';


const statusColor = {
    on_process: "bg-yellow-400",
    new: "bg-green-700",
    received: "bg-red-400",
    issue_requested: "bg-orange-400",
    issue_accepted: "bg-yellow-400",
    done : "bg-green-400"
}
const PurchaseOrder = () => {
    const {poData, setPoData} = UseDataContext();
    const [fetchTrigger, setFetchTrigger] = useState(false);
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        console.log('Fetching data...');
        async function handleFetch() {
            try {
                console.log('Fetching data...');
                setIsFetching(true);
                const { PurhcaseOrderData } = await FetchPurchaseOrders();
                console.log(PurhcaseOrderData);
                setPoData(PurhcaseOrderData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        handleFetch();
        setIsFetching(false);
    }, [])

  return (
    <>
        <div className='flex flex-col gap-3 w-full'>
            {isFetching ? <p>Sedang mengambil data purchase order</p> : poData && poData!.map((item, index: number) => (
                
                <Link to={`/purchase-order/${item.status}/${item.po_code}`}>
                    <div 
                        className='flex flex-col bg-slate-500 rounded-lg items-center justify-center w-full py-4 hover:bg-slate-300 hover:cursor-pointer transition-all'
                        key={index}
                    >   
                    <h3 className='text-center font-bold text-slate-100'>PO {item.division} - {item.po_code}</h3>
                    <span className={`text-slate-100 ${statusColor[item.status as keyof typeof statusColor]} px-2 py-1 rounded-md`}>{item.status}</span>

                    </div>
                </Link>
                
            ))}
        </div>
    </>
  )
}

export default PurchaseOrder