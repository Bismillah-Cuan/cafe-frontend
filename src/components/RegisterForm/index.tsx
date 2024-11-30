import { Formik, useFormik, useField, FieldConfig } from "formik"
import logoCuan from "../../assets/CoffeeNCouple.png"
import RegisterInput from "./RegisterInput"
import { validate } from "../../util/validation"
import { Link } from "react-router-dom"
import { HTMLProps } from "react"

interface MyFormValues {
    username: string
    password: string

}

interface MySelectProps extends FieldConfig<any> {
    label: string; // Label for the select field

  }

const MySelect: React.FC<MySelectProps & HTMLProps<HTMLSelectElement>> = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <div className="flex gap-5 items-center mt-2">
        <label className="text-lg font-bold text-slate-600" htmlFor={props.id || props.name}>{label}</label>
        <select className="text-md px-2 h-10 rounded-md bg-slate-200" {...(field as any)} {...(props as any)}/>
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </div>
    );
  };

const RegisterForm = () => {
    const initialValues: MyFormValues = { username: '', password: '',  }
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            roleType: ''
        },
        validate,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2))
        }
    })

  return (
    <div className="flex w-full flex-column flex-col gap-4 px-6 items-center">
        <img src={logoCuan} alt="cafeCuanLogo" className="w-[10rem] h-auto object-contain mx-auto"/>
        <h1 className="text-3xl font-extrabold text-slate-700">Register Form</h1>
        <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2))
                    setSubmitting(false)
                }, 400)
            }}
            >
        <form onSubmit={formik.handleSubmit} className="w-full">
            <div className="flex flex-col gap-2 mb-4">
                <RegisterInput 
                    id="username" 
                    label="Username" 
                    type="text" 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}    
                />
                {formik.touched.username && formik.errors.username ? 
                <p className="text-red-500">{formik.errors.username}</p> : null}

                <RegisterInput 
                    id="password" 
                    label="Password" 
                    type="password" 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}    
                />
                { formik.touched.password && formik.errors.password ? 
                <p className="text-red-500">{formik.errors.password}</p> : null}

                <MySelect 
                    label="Select Role :"
                    name="roleType"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.roleType}
                >
                    <option value="kitchen">Kitchen</option>
                    <option value="bar">Bar</option>
                    <option value="sosmed">Sosmed</option>
                    <option value="finance">Finance</option>
                </MySelect>
                { formik.touched.roleType && formik.errors.roleType ? 

                <p className="text-red-500">{formik.errors.roleType}</p> : null}

                <p className="text-slate-600 font-light">Sudah punya akun?  
                    <Link to="/login" className="text-slate-600 hover:text-slate-800 font-bold"> Yuk Login!</Link>
                </p>
            </div>
            <div className="w-full flex justify-center">
                <button className="bg-slate-600 px-3 py-2 rounded-md text-slate-100 w-2/4 hover:bg-slate-800 font-bold text-lg" type="submit">Submit</button>
            </div>
        </form>
        </Formik>
    </div>
        
  )
}

export default RegisterForm