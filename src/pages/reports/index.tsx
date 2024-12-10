import ReusableTable from "../../components/ReusableTable"
import Header from "../../components/Header"
import ReusableForm from "../../components/ReusableForm"
import CreateFormButton from "../../components/CreateFormButton"
import ReusableDetailPopOut from "../../components/ReusableDetailPopOut"
import EditDetailButton from "../../components/EditDetailButton"
import { useState } from "react"
import { tableData, RowData } from "../../util/tableDummyData"
import {format} from "date-fns"
import { TableHeaders } from "./types"



const buttonClass = "text-slate-900 font-light text-center bg-slate-400 hover:bg-slate-500 px-2 py-1 rounded-md";

const Reports= () => {
  const [showForm, setShowForm] = useState(false);
  const [showEditDetail, setShowEditDetail] = useState(false);
  const [itemEditId, setitemEditId] = useState(0);

  const [data, setData] = useState(tableData);


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
  // Cell: ({value}: any) => <span>{format(new Date(value), "dd-MM-yyyy")}</span>,
  //Dummy Data For Table
  const columns: TableHeaders<RowData>[] = [
    { Header: "Date", accessor: "date",  disableFilters: true},
    { Header: "User", accessor: "user"},
    { Header: "Materials", accessor: "materials", },
    { Header: "Quantities", accessor: "quantities",},
    { Header: "Unit", accessor: "unit", },
    {
      Header: "Action",
      accessor: "action",
      Cell: ({row}: any) => (
        <div className="flex gap-2 mr-3">
          <EditDetailButton key={`edit-${row.original.id}`} onClick={() => handleEditDetail(row.original.id)} label="Edit"/>
          <EditDetailButton key={`delete-${row.original.id}`} onClick={() => handleDelete(row.original.id)} label="Delete"/>
        </div>
      ),
      disableFilters: true
    }
  ]

  function handleDelete(id: number) {
    setData((prev) => prev.filter((item) => item.id !== id));

    console.log(`Deleted item with id ${id}`);
  }
  function handleEditDetail(id: number) {
    const item = data.find((item) => item.id === id);
    if (item) {
      setShowEditDetail((prev) => !prev);
      setitemEditId(item.id);
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
  const closeForm = () => {setShowForm(false); setShowEditDetail(false)};

  return (
    <div className="w-full mr-8 text-slate-800 relative overflow-x-hidden flex flex-col gap-5 mt-5">
      <header className="flex justify-between items-center">
        <Header title="Reports" />
        <div>
        <CreateFormButton onClick={handleShowForm} label="Create Order" />
        {showForm && 
          <ReusableForm 
            fields={fields} 
            onSubmit={handleSubmit} 
            onClose={closeForm} 
            buttonLabel="Submit" 
            isSelected={showForm}/>}
        {showEditDetail && 
          <ReusableDetailPopOut 
            fields={columns} 
            values={data.find((item) => item.id === itemEditId)?? {id: 0, date: "", user: "", materials: "", quantities: "", unit: ""}}
            onSubmit={handleSubmit} 
            onClose={closeForm} 
            buttonLabel="Submit" 
            isSelected={showEditDetail}/>}
        </div>
      </header>
      <section>
        <ReusableTable tableFields={columns} data={data} />
      </section>
    </div>
  )
}

export default Reports