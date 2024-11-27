import RegisterForm from '../../components/RegisterForm'

interface MyFormValues {
    username: string
    password: string
}

const RegisterPage: React.FC<{}> = () => {

  return (
    <section className="flex justify-center items-center min-h-screen">
      <div className="flex w-3/4 md:w-2/4 lg:max-w-md flex-col gap-4 items-center justify-center rounded-2xl text-slate-800 bg-slate-300 px-5 py-10">
          <RegisterForm />
      </div>
    </section>
        
  )
}

export default RegisterPage