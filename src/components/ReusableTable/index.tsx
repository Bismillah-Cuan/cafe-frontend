import { Link } from "react-router-dom";

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

const classTableRow= "py-3 pl-2";
const ReusableTable: React.FC<ReusableTableProps> = ({tableFields, data}) => {
  return (
    <table className="w-full text-sm text-left text-gray-500 sm:rounded-lg mt-2 mr-5 py-10">
        <thead className="text- text-gray-700 uppercase bg-gray-300">
          <tr>
            {tableFields.map((column) => (
              <th key={column.accessor} className={classTableRow}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id} className="bg-white border-b">
                {tableFields.map((column) => (
                  <td key={column.accessor} className={classTableRow}>
                    {column.cell ? column.cell({row}) : row[column.accessor]}
                    </td>
                ))}
            </tr>
            
          ))}
        </tbody>
      </table>
  )
}

export default ReusableTable