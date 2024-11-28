
import ReusableTable from "../../components/ReusableTable"
import Header from "../../components/Header"
import ReusableForm from "../../components/ReusableForm"
import CreateFormButton from "../../components/CreateFormButton"
import { useState } from "react"

type TableFields = {
  label: string;
  accessor: string;
  cell: any
}

const buttonClass = "text-slate-900 font-light text-center bg-slate-400 hover:bg-slate-500 px-2 py-1 rounded-md";

const Reports= () => {
  const [showForm, setShowForm] = useState(false);
  const [data, setData] = useState([{
    id: 1,
    date: "2023-01-01",
    user: "John Doe",
    materials: "Daging Ayam",
    quantities: "10",
    unit: "Kg",
},
{
    id: 2,
    date: "2023-01-01",
    user: "John Doe",
    materials: "Daging Sapi",
    quantities: "5",
    unit: "Kg",
},]);


  //Dummy Fields for input
  const fields = [
    {
      name: "materials",
      label: "Materials",
      type: "text",
      placeholder: "Enter the material name",
    },
    {
      name: "quantities",
      label: "Quantities",
      type: "number",
      placeholder: "Enter a Quantity",
    },
    {
      name: "unit",
      label: "Unit",
      type: "text",
      placeholder: "Enter a Unit e.g. kg, liter, box",
    },
  ];

  //Dummy Data For Table
  const columns = [
    {label : "Date", accessor : "date"},
    {label : "User", accessor : "user"},
    {label : "Materials", accessor : "materials"},
    {label : "Quantities", accessor : "quantities"},
    {label : "Unit", accessor : "unit"},
    {
      label: "Action",
      accessor: "action",
      cell: ({row}: any) => (
        <div className="flex gap-2">
          <button onClick={() => handleEdit(row.id)} className={buttonClass}>
            Edit
          </button>
          <button onClick={() => handleDelete(row.id)} className={buttonClass}>
            Delete
          </button>
        </div>
      ),
    }
  ];

  function handleDelete(id: number) {
    setData((prev) => prev.filter((item) => item.id !== id));
  }

  function handleEdit(id: number) {
    const item = data.find((item) => item.id === id);
    if (item) {
      console.log(item);
    }
  }
  function handleShowForm() {
    setShowForm((prev) => !prev);
  }

  function handleSubmit(data: any) {
    setShowForm(!showForm);
    console.log(data);
    setData((prev) => [...prev, ...[data]]);
  }
  const closeForm = () => setShowForm(false);

  return (
    <div className="w-full mr-8 text-slate-800 relative overflow-x-auto flex flex-col gap-5 mt-5">
      <header className="flex justify-between items-center">
        <Header title="Reports" />
        <div>
        <CreateFormButton onClick={handleShowForm} label="Create Order" />
        {showForm && <ReusableForm fields={fields} onSubmit={handleSubmit} onClose={closeForm} buttonLabel="Submit" isSelected={showForm}/>}
        </div>
      </header>
      <ReusableTable  tableFields={columns as TableFields[]} data={data}/>
    </div>
  )
}

export default Reports