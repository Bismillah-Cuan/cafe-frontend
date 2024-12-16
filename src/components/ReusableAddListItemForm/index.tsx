import { useState } from "react";
import AddListItem from "./AddListItem";
const bgClass = "fixed top-0 left-0 w-full h-full bg-black opacity-50 z-[10]";
type ReusableFormProps = {
    // fields: Field[];
    onSubmit: (formData: Record<string, string | number>) => void;
    onClose?: () => void;
    buttonLabel?: string;
    isSelected?: boolean
  };

  const buttonStyle ="text-slate-900 font-light text-center bg-slate-400 w-40 hover:bg-slate-300 px-2 py-1 rounded-lg transition-all"
const ReusableAddListItemForm: React.FC<ReusableFormProps> = ( {onClose, isSelected}) => {
    const division = localStorage.getItem("division");
    const username = localStorage.getItem("username");

    function handleSubmit(formData: Record<string, string | number>) {
      console.log(formData);
    }
  return (
    <>
    {isSelected &&  <div onClick={onClose} className={bgClass}></div>}
    {isSelected && <section className="fixed top-1/2 left-1/2 bg-slate-100 p-5 rounded-3xl w-[60rem] min-h-[30rem] z-[20] transform -translate-x-1/2 -translate-y-1/2" role="dialog">
    <div className="flex flex-col gap-5 p-5 z-[20]">
      <div className="flex justify-between">
        <button 
          onClick={onClose} 
          className={buttonStyle}>
            Back
        </button>
        <button 
          onClick={onClose} 
          className={buttonStyle}>
            Submit
        </button>
      </div>  
        <h2 className="text-2xl font-bold mb-2">Create Purchase Request</h2>
        <div className="flex justify-between">
            <h3 className="text-md text-slate-600 mb-5 opacity-50">Pr Code: 000000</h3>
            <h3 className="text-md text-slate-600 mb-5 opacity-50">{username} - {division}</h3>
        </div>
        <div className="flex flex-col gap-4 w-full">
            <div className="flex justify-between">
                <label className="flex-1 text-md font-light" htmlFor="material">Bahan Baku</label>
                <div className="flex justify-evenly flex-auto">
                  <label className="   text-md font-light" htmlFor="quantity">Kuantitas</label>
                  <label className="text-md font-light" htmlFor="purchaseUnit">Satuan Beli</label>
                  <label className=" text-md font-light" htmlFor="type">Tipe</label>
                  <label className=" text-md font-light" htmlFor="note">Catatan</label>
                </div>
            </div>
            <AddListItem />
        </div>
    </div>
    </section>}
    </>
  )
}

export default ReusableAddListItemForm