
import ReportsTable from "../../components/ReportsTable"
import Header from "../../components/Header"
import ReusableFormfrom from "../../components/ReusableForm"
import CreateFormButton from "../../components/CreateFormButton"
import { useState } from "react"


const Reports= () => {
  const [showForm, setShowForm] = useState(false);

  const fields = [
    {
      name: "materials",
      label: "materials",
      type: "text",
      placeholder: "Enter a Material",
    },
    {
      name: "quantity",
      label: "quantity",
      type: "number",
      placeholder: "Enter a Quantity",
    },
    {
      name: "unit",
      label: "unit",
      type: "text",
      placeholder: "Enter a Unit",
    },
  ];

  function handleShowForm() {
    setShowForm(!showForm);
  }
  

  return (
    <div className="w-full mr-8 text-slate-800 relative overflow-x-auto flex flex-col gap-5 mt-5">
      <header className="flex justify-between items-center">
        <Header title="Reports" />
        <CreateFormButton onClick={handleShowForm} label="Create Order" />
        {showForm && <ReusableFormfrom fields={fields} onSubmit={handleShowForm} buttonLabel="Submit" />}
      </header>
      <ReportsTable />
    </div>
  )
}

export default Reports