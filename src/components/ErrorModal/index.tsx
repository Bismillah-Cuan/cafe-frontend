type ErrorProps = {
    title: string;
    message: string;
    onConfirm?: () => void;
}

export default function ErrorModal({ title, message, onConfirm }: ErrorProps) {
    return (
      <div className="flex flex-col items-center max-w[10rem] my-10 mx-auto p-5 bg-slate-600 text-slate-100">
        <h2>{title}</h2>
        <p>{message}</p>
        {onConfirm && (
          <div className="flex mt-5 justify-end gap-4">
            <button onClick={onConfirm} className="text-slate-900 font-light text-center bg-slate-400 hover:bg-slate-500 px-2 py-1 rounded-md">
              Okay
            </button>
          </div>
        )}
      </div>
    );
  }