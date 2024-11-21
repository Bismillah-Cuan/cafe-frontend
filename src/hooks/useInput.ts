import { ReactElement, ReactEventHandler, useState } from "react";

export function useInput(defaultValue: string, validationFn: any) {
    const [enteredValues, setEnteredValues] = useState(defaultValue);
    const [didEdit, setDidEdit] = useState(false);

    const valueIsValid = validationFn(enteredValues)

    function handleInputChange(event : React.ChangeEvent<HTMLInputElement>) {
        setEnteredValues(event.target.value);
        setDidEdit(false);
      }
    
      function handleInputBlur() {
        setDidEdit(true);
      }

      return {
        value: enteredValues,
        handleInputChange,
        handleInputBlur,
        hasError: didEdit && !valueIsValid
      };
}   