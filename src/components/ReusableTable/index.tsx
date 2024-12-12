import { Link } from "react-router-dom";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { ArrowUpDown } from "../CustomIcon";
import { useState, useMemo } from "react";
import {useTable, useSortBy, useGlobalFilter, useFilters, usePagination, SortingRule, Column } from 'react-table';
import { GlobalFilter } from "../GlobalFilter";
import { ColumnFilter } from "../ColumnFilter";
import { TableHeaders } from "../../pages/reports/types";
import { set } from "date-fns";


interface ReusableTableProps <T>  {
  tableFields: TableHeaders<T>[];
  data: T[];
}

const classTableRow= "py-3 pl-2 border-b border-gray-200";
const classTableHead= "py-3 pl-2 border-b border-gray-200";

const filterRows = <T extends object> (rows: T[], filterValue: string) => {
  if (!filterValue) {
    return rows;
  }
  return rows.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(filterValue.toLowerCase())
    )
  );
}
const ReusableTable = <T extends object,>({tableFields, data}: ReusableTableProps<T>) => {

  // const [sortBy, setSortBy] = useState<({ id: any; desc: boolean } | null)[]>([]);
  const [sortBy, setSortBy] = useState<SortingRule<T>[]>([]);
  const [filter, setFilter] = useState<string | undefined>('');
  const tableFieldsMemo = useMemo(
    () => tableFields,
    [tableFields]
  );
  const dataMemo = useMemo(() => filterRows(data, filter ?? ''), [data, filter]);
  const defaultColumn = useMemo(() => ({
    Filter: ColumnFilter,
    sortable: true
  }), []);



  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    prepareRow,
    setPageSize,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns: tableFieldsMemo,
      data: dataMemo,
      manualSortBy: false,
      // defaultColumn,
      initialState: {
        pageSize: 9,
        // sortBy
      },
    }, 
    
    useFilters,  useGlobalFilter, useSortBy,  usePagination, // Add this line to enable sorting
  );

  const { globalFilter, pageIndex, pageSize } = state; 
  

  return (
    <>
      {/* External Sort Controls */}
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
    <table 
      {...getTableProps()} 
      className="w-full text-sm text-left text-gray-500 border-separate border-spacing-0 mt-2 mr-5 rounded-xl border-slate-300 border-4">
        <thead className=" text-gray-700 uppercase bg-gray-300 rounded-t-lg border">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())} className={classTableHead} key={column.id}>
                <div className="flex items-center gap-2">
                  {column.render('Header')}
                  {/* <div>{column.canFilter ? column.render('Filter') : null}</div> */}
                  <span className="relative">
                  {column.render('Header') !== "Action" && (column.isSorted ? 
                    (column.isSortedDesc ? <ArrowDropDownIcon className="absolute -right-4 -top-3" /> 
                    : <ArrowDropUpIcon className="absolute -right-4 -bottom-3" />) : <ArrowUpDown />)}
                    </span>
                    </div>
                </th>
              ))}
              </tr>
          ))}
          
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr  {...row.getRowProps()} key={row.id}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()} key={cell.column.id} className={classTableRow}>
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
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          className={`px-3 py-1 border rounded-md ${!canPreviousPage === true ? 'opacity-50 cursor-not-allowed' : 'bg-gray-300 hover:bg-gray-400'}`}>
            Previous
        </button>
          
         <span>
            Page{''}
            <strong>{`${pageIndex + 1} of ${pageOptions.length}`}</strong>{''}
          </span> 
        {Array.from({ length: pageCount }, (_, index) => index + 1).map((page) => (
          <button 
            key={page}
            onClick={() =>gotoPage(page - 1)}
            className={`px-3 py-1 border rounded-md ${page === pageIndex + 1 ? 'bg-gray-500' : 'bg-gray-300 hover:bg-gray-400'}`}>
              {page}
          </button>
        ))}

        <button 
          onClick={() => nextPage()}
          disabled={!canNextPage}
          className={`px-3 py-1 border rounded-md ${!canNextPage === true ? 'opacity-50 cursor-not-allowed' : 'bg-gray-300 hover:bg-gray-400'}`}>
            Next
        </button>
      </div>
      </>
  )
}

export default ReusableTable