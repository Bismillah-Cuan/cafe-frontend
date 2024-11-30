import { Link } from "react-router-dom";
import { useState } from "react";

type Data = {
  // id: number;
  date: string;
  user: string;
  materials: string;
  quantities: string;
  unit: string;
  [key: string]: any;
}

type TableFields = {
  label: string;
  accessor: string;
  cell: any
}

type ReusableTableProps = {
  data: Data[];
  tableFields: TableFields[];
}

const classTableRow= "py-3 pl-2 border-b border-gray-200";
const classTableHead= "py-3 pl-2 border-b border-gray-200";
const ReusableTable: React.FC<ReusableTableProps> = ({tableFields, data}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // Calculate total pages
  const totalPages = Math.ceil(data.length / rowsPerPage);

  // Get current page data
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentData = data.slice(startIndex, startIndex + rowsPerPage);



  function handlePreviousPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function handleNextPage() {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }

  function handlePageChange(page: number) {
    setCurrentPage(page);
  }

  return (
    <>
    <table className="w-full text-sm text-left text-gray-500 border-separate border-spacing-0 mt-2 mr-5 rounded-xl border-slate-300 border-4">
        <thead className=" text-gray-700 uppercase bg-gray-300 rounded-t-lg border">
          <tr>
            {tableFields.map((column) => (
              <th key={column.accessor} className={`${classTableRow} `}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentData.map((row) => (
            <tr key={row.id} className="bg-white border-b last:border-none">
                {tableFields.map((column) => (
                  <td key={column.accessor} className={classTableRow}>
                    {column.cell ? column.cell({row}) : row[column.accessor]}
                    </td>
                ))}
            </tr>
            
          ))}
        </tbody>
      </table>

      {/* //Pagination COntrols */}

      <div className="flex items-center border-t fixed bottom-0 right-0 border-gray-200 bg-white px-4 py-3 mr-10 mb-5 sm:px-6">
                  <button 
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className={`px-3 py-1 border rounded-md ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'bg-gray-300 hover:bg-gray-400'}`}>
                      Previous
                  </button>

                  {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                    <button 
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-3 py-1 border rounded-md ${page === currentPage ? 'bg-gray-500' : 'bg-gray-300 hover:bg-gray-400'}`}>
                        {page}
                    </button>
                  ))}

                  <button 
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-1 border rounded-md ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'bg-gray-300 hover:bg-gray-400'}`}>
                      Next
                  </button>
      </div>
      </>
  )
}

export default ReusableTable