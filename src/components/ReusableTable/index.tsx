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
}

type ReusableTableProps = {
  data: Data[];
  tableFields: TableFields[];
}

// const REPORTS = [
//     {
//         id: 1,
//         date: "2023-01-01",
//         title: "Report 1",
//         pic: "John Doe",
//         description: "This is a report description.",
//         status: "Open",
//     },
//     {
//         id: 2,
//         date: "2023-01-02",
//         title: "Report 2",
//         pic: "Jane Doe",
//         description: "This is another report description.",
//         status: "Closed",
//     },
// ]
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
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="bg-white border-b">
                {tableFields.map((column) => (
                  <td 
                  key={column.accessor} className={classTableRow}>
                    <Link to={`${rowIndex}`}>{row[column.accessor]}
                    </Link>
                  </td>
                ))}
                
            </tr>
            
          ))}
        </tbody>
      </table>
  )
}

export default ReusableTable