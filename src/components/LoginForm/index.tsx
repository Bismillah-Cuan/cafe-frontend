import Input from "./Input"
import logoCuan from "../../assets/CoffeeNCouple.png"
import { Link } from "react-router-dom"
import { useState } from "react"

const LoginForm = () => {
  const [enteredValues, setEnteredValues] = useState({
    email: '',
    password: ''
  });

  function handleSubmit(event : React.FormEvent<HTMLFormElement>){
    event.preventDefault();
    console.log(enteredValues)
  }

  function handleInputChange(identifier: string, value : string) {
    setEnteredValues(preValues => ({
      ...preValues,
      [identifier] : value
    }))
  }


  return (
    <div className="flex w-full flex-column flex-col gap-4 px-6 items-center">
        <img src={logoCuan} alt="cafeCuanLogo" className="w-[10rem] h-auto object-contain mx-auto"/>
        <form onSubmit={handleSubmit} className="w-full" action="/">
          <div className="flex flex-col gap-4 items-center">
            <Input 
              label="Username" 
              htmlFor="username" 
              onChange={(event) => handleInputChange('email', event.target.value)} 
              value={enteredValues.email} 
              required/>
            <Input 
              label="Password" 
              type="password" 
              htmlFor="password"
              onChange={(event) => handleInputChange('password', event.target.value)}
              value={enteredValues.password}  
              required/>
            <button className="bg-slate-600 px-3 py-2 rounded-md text-slate-100 w-2/4 hover:bg-slate-800 font-bold text-lg">Login</button>
          </div>
        </form>
    </div>
  )
}

export default LoginForm