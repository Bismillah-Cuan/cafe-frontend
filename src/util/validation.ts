interface FormValues {
    username: string;
    password: string;
  }

export const validate = (values: FormValues): Partial<FormValues> => {
    const errors: Partial<FormValues> = {};
  
    if (!values.username) {
      errors.username = 'Required';
    } else if (values.username.length > 15) {
      errors.username = 'Must be 15 characters or less';
    }
  
    if (!values.password) {
      errors.password = 'Required';
    } else if (values.password.length < 5) {
      errors.password = 'Must be 5 characters or more';
    }
  
    return errors;
  };


export function Required(value : any) {
    return value.trim() !== '';
}