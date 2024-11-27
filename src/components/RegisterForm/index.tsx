import { Formik, useFormik } from "formik"
import logoCuan from "../../assets/CoffeeNCouple.png"
import RegisterInput from "./RegisterInput"
import { validate } from "../../util/validation"
import { Link } from "react-router-dom"

interface MyFormValues {
    username: string
    password: string
}

const RegisterForm = () => {
    const initialValues: MyFormValues = { username: '', password: '' }
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
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

                <p className="text-slate-600 font-light">Sudah punya akun?  
                    <Link to="/login" className="text-slate-600 hover:text-slate-800 font-bold"> Yuk Login!</Link>
                </p>
            </div>
            <div className="w-full flex justify-center">
                <button className="bg-slate-600 px-3 py-2 rounded-md text-slate-100 w-2/4 hover:bg-slate-800 font-bold text-lg" type="submit">Submit</button>
            </div>
        </form>
    </div>
        
  )
}

export default RegisterForm