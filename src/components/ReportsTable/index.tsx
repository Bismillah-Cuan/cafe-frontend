import { Link } from "react-router-dom";

const REPORTS = [
    {
        id: 1,
        date: "2023-01-01",
        title: "Report 1",
        pic: "John Doe",
        description: "This is a report description.",
        status: "Open",
    },
    {
        id: 2,
        date: "2023-01-02",
        title: "Report 2",
        pic: "Jane Doe",
        description: "This is another report description.",
        status: "Closed",
    },
]
const classTableRow= "py-3";
const ReportsTable = () => {
  return (
    <table className="w-full text-sm text-left text-gray-500 sm:rounded-lg mt-2 mr-5 py-10">
        <thead className="text- text-gray-700 uppercase bg-gray-300">
          <tr>
            <th className={classTableRow}>Date</th>
            <th className={classTableRow}>Report Title</th>
            <th className={classTableRow}>PIC</th>
            <th className={classTableRow}>Description</th>
            <th className={classTableRow}>Status</th>
          </tr>
        </thead>
        <tbody>
          {REPORTS.map((report) => (
            
            <tr key={report.id} className="bg-white border-b">
                  
                  <td className={classTableRow}><Link to={`${report.id}`}>{report.date}</Link></td>
                  <td className={classTableRow}><Link to={`${report.id}`}>{report.title}</Link></td>
                  <td className={classTableRow}><Link to={`${report.id}`}>{report.pic}</Link></td>
                  <td className={classTableRow}><Link to={`${report.id}`}>{report.description}</Link></td>
                  <td className={classTableRow}><Link to={`${report.id}`}>{report.status}</Link></td>
                
            </tr>
            
          ))}
        </tbody>
      </table>
  )
}

export default ReportsTable