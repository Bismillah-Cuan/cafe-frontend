import Input from "./Input"
import logoCuan from "../../assets/CoffeeNCouple.png"
import { Link, useNavigate } from "react-router-dom"
import { isNotEmpty } from '../../util/validation.js'
import { useInput } from "../../hooks/useInput"
import { useContext } from "react"
import { UserContext } from "../store/user-context"


interface LoginData {
  username: string
  password: string
}

const LoginForm:React.FC = () => {
  let useCtx = useContext(UserContext)
  const navigate = useNavigate()

  
  const {
    value: username, 
    handleInputChange: handleUsernameChange, 
    handleInputBlur: handleUsernameBlur,
    hasError: usernameHasError
  } = useInput('', (value: string) => isNotEmpty(value));

  const {
    value: password, 
    handleInputChange: handlePasswordChange, 
    handleInputBlur: handlePasswordBlur, 
    hasError: passwordHasError
  } = useInput('', (value: string) => isNotEmpty(value));

  
  function handleSubmit(event : any){
    event.preventDefault();

    // const fd = new FormData(event.target as HTMLFormElement);
    // const data = Object.fromEntries(fd.entries())
    if(usernameHasError || passwordHasError){
      return;
    }
    
    useCtx = {user : username}
    console.log(username, password);
    navigate('/dashboard')
    handleLogin({username, password})
  }

  const handleLogin = (values: LoginData) => {
    fetch('http://127.0.0.1:5000/api/v1/users/login',{
        method:'POST',
        body:JSON.stringify({
            username: values.username,
            password: values.password
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(async response => {
            if (!response.ok)
               return navigate('/login')

            const token = await response.json()
            localStorage.setItem("access_token", token.access_token)
            navigate('/dashboard')
    })
  }

  return (
    <div className="flex w-full flex-column flex-col gap-4 px-6 items-center">
        <img src={logoCuan} alt="cafeCuanLogo" className="w-[10rem] h-auto object-contain mx-auto"/>
        <form onSubmit={handleSubmit} className="w-full" action="/">
          <div className="flex flex-col gap-4 items-center">
            <Input 
              label="Username" 
              id="username" 
              name="username"
              onChange={handleUsernameChange}
              onBlur={handleUsernameBlur}
              value={username}
              error= {usernameHasError && 'Please enter a username'}
              required/>
            <Input 
              label="Password" 
              type="password" 
              id="password"
              name="password"
              onChange={handlePasswordChange}
              onBlur={handlePasswordBlur}
              value={password}
              error= {passwordHasError && 'Please enter a password'}
              required/>
            <button 
              className="bg-slate-600 px-3 py-2 rounded-md text-slate-100 w-2/4 hover:bg-slate-800 font-bold text-lg">
              Login
            </button>
          </div>
        </form>
    </div>
  )
}

export default LoginForm