import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import {useTable, useSortBy, useGlobalFilter } from 'react-table';
import { GlobalFilter } from "../GlobalFilter";


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
  Cell: any
}

type ReusableTableProps = {
  data: Data[];
  tableFields: TableFields[];
  onDelete: (id: number) => void
  onEdit: (id: number) => void
}

const classTableRow= "py-3 pl-2 border-b border-gray-200";
const classTableHead= "py-3 pl-2 border-b border-gray-200";
const ReusableTable: React.FC<ReusableTableProps> = ({tableFields, data, onDelete, onEdit}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const tableFieldsMemo = useMemo(() => tableFields, []);
  const dataMemo = useMemo(() => data, []);
  const rowsPerPage = 10;

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns: tableFieldsMemo,
      data,
    },
    useGlobalFilter, useSortBy,  // Add this line to enable sorting
  );

  const { globalFilter } = state;
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
      {/* External Sort Controls */}
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
    <table 
      {...getTableProps()} 
      className="w-full text-sm text-left text-gray-500 border-separate border-spacing-0 mt-2 mr-5 rounded-xl border-slate-300 border-4">
        <thead className=" text-gray-700 uppercase bg-gray-300 rounded-t-lg border">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())} className={classTableHead}>
                  {column.render('label')}
                  <span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
                </th>
              
              ))}
              </tr>
          ))}
          
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            const { key, ...rest } = row.getRowProps();
            return (
              <tr  key={key} {...rest}>
                {row.cells.map((cell) => {
                  const { key, ...rest} = cell.getCellProps();
                  return (
                    <td key={key} {...rest} className={classTableRow}>
                      { 
                      cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
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