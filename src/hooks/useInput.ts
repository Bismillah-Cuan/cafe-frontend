import { useState } from "react";

export function useInput(defaultValue: any, validationFn: any) {
    const [enteredValues, setEnteredValues] = useState(defaultValue);
    const [didEdit, setDidEdit] = useState(false);

    const valueIsValid = validationFn(enteredValues)

    function handleInputChange(event : any) {
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