import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
const ReportDetailPage = () => {
    const params = useParams();
  return (
    <div className="flex flex-col gap-5 text-slate-900">
        <h1>Report Detail</h1>
        <Link to=".." relative="path" className="text-slate-900 text-center bg-slate-400 hover:bg-slate-500 px-2 py-1 rounded-md">Back</Link>
        <Link to="edit" relative="path" className="text-slate-900 text-center bg-slate-400 hover:bg-slate-500 px-2 py-1 rounded-md">Edit</Link>
        <p>Report ID: {params.reportsId}</p>
    </div>
  )
}

export default ReportDetailPage