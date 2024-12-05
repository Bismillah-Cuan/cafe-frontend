type ColumnFilterProps = {
    column: {
        filterValue: string | null;
        setFilter: (value: string) => void;
      };
}

export const ColumnFilter: React.FC<ColumnFilterProps> = ({column}) => {
    const { filterValue, setFilter } = column
  return (
    <div>
        Search: {' '}
        <input className="w-[5rem] bg-slate-100" value={filterValue || ' '}
        onChange={(e) => setFilter(e.target.value)} />
    </div>
  )
}
