import generateTableData  from "../../util/generateTableData"
import ReusableTable from "../ReusableTable"
import { fetchSuppliers } from "./DataFetch"
import { useEffect, useState } from "react"
import { UseDataContext } from "../../util/context"


const SupplierPage = () => {
    const {suppliersData, setSuppliersData} = UseDataContext()
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        async function handleFetch() {
            try {
                setIsFetching(true);
                const suppData = await fetchSuppliers()

                const tableData = generateTableData(suppData!);

                setSuppliersData(tableData);
                sessionStorage.setItem("suppliersData", JSON.stringify(tableData));
            } catch (error) {
                console.error("Error fetching suppliers:", error);
            }
                setIsFetching(false);
        }

        handleFetch()
    }, [])
    return (
        <>
        {isFetching ? <p>Sedang mengambil data supplier...</p> : (
            suppliersData && (
            <div className="w-full mt-5">
                <ReusableTable tableFields={suppliersData.headers} data={suppliersData.rows} />
            </div>  
            ))}
            
        </>
        
    )
}

export default SupplierPage