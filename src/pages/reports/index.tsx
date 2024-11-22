
import ReusableTable from "../../components/ReusableTable"
import Header from "../../components/Header"
import ReusableFormfrom from "../../components/ReusableForm"
import CreateFormButton from "../../components/CreateFormButton"
import { useState } from "react"



const Reports= () => {
  const [showForm, setShowForm] = useState(false);

  //Dummy Fields for input
  const fields = [
    {
      name: "materials",
      label: "Materials",
      type: "text",
      placeholder: "Enter the material name",
    },
    {
      name: "quantity",
      label: "Quantity",
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

  //Dummy Data
  const columns = [
    {label : "Date", accessor : "date"},
    {label : "User", accessor : "user"},
    {label : "Material", accessor : "materials"},
    {label : "Quantity", accessor : "quantity"},
    {label : "Unit", accessor : "unit"},
  ];
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
  function handleShowForm() {
    setShowForm((prev) => !prev);
  }

  function handleSubmit(data: any) {
    console.log(data);
  }
  const closeForm = () => setShowForm(false);

  return (
    <div className="w-full mr-8 text-slate-800 relative overflow-x-auto flex flex-col gap-5 mt-5">
      <header className="flex justify-between items-center">
        <Header title="Reports" />
        <div>
        <CreateFormButton onClick={handleShowForm} label="Create Order" />
        {showForm && <ReusableFormfrom fields={fields} onSubmit={handleSubmit} onClose={closeForm} buttonLabel="Submit" isSelected={showForm}/>}
        </div>
      </header>
      <ReusableTable  tableFields={columns} data={REPORTS}/>
    </div>
  )
}

export default Reports