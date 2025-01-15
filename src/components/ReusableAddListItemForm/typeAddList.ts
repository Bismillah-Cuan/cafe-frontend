export type Field = {
    name: string;
    type: "text" | "textarea" | "select" | "number" | "checkbox" | "radio";
    id?: number;
    placeholder?: string;
    defaultValue?: string;
    options?: { value: string; label: string }[];
    validate?: (value: string) => string | null;
  };