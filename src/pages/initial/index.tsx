import SideBar from "../../components/SideBar"
import { Outlet } from 'react-router-dom'


const InitialPages = () => {
  return (
    <main className="flex gap-10 bg-slate-100 h-screen">
        <SideBar />
        <Outlet />
    </main>
  )
}

export default InitialPages