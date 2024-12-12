type EditDetailButtonProps = {
    label: string;
    onClick?: () => void
  };


const EditDetailButton: React.FC<EditDetailButtonProps> = ({ label, onClick }) => {
  return (
    <>
    <button onClick={onClick}
    className="text-slate-900 font-light text-center bg-slate-400 w-1/2 hover:bg-slate-300 px-2 py-1 rounded-lg transition-all">
    {label}
    </button>
    </>
  )
}

export default EditDetailButton