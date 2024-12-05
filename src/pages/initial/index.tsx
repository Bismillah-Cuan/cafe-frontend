import SideBar from "../../components/SideBar"
import { useNavigate, Outlet } from 'react-router-dom'
import { useEffect } from "react";


const InitialPages = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("username")) {
      navigate("/login");
    }
  }, [navigate]);
  return (
    <main className="flex gap-10 bg-slate-100 h-screen ">
        <SideBar />
          <Outlet />

    </main>
  )
}

export default InitialPages