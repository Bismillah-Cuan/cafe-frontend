export interface TableHeaders<T> {
    Header: string;
    accessor: keyof T | string; // Allow string for custom columns
    Cell?: (props: { value: any; row: any; column: any }) => JSX.Element | null;
    type?: string;
    disableFilters?: boolean;
  }