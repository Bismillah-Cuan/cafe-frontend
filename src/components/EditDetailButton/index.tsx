type EditDetailButtonProps = {
    label: string;
    onClick?: () => void
  };


const EditDetailButton: React.FC<EditDetailButtonProps> = ({ label, onClick }) => {
  return (
    <>
    <button onClick={onClick}
    className="text-slate-900 font-light text-center bg-slate-400 hover:bg-slate-500 px-2 py-1 rounded-md">
    {label}
    </button>
    </>
  )
}

export default EditDetailButton