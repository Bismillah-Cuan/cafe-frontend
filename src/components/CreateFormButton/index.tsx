type CreateFormButtonProps = {
    label: string;
    onClick?: () => void
  };

const CreateFormButton: React.FC<CreateFormButtonProps> = ({ label, onClick }) => {
    return (
        <>
            <button onClick={onClick}
            className="text-slate-800 font-medium text-center bg-slate-400 hover:bg-slate-300 px-2 py-1 rounded-lg transition-all">
            {label}
            </button>
        </>
    )
}

export default CreateFormButton