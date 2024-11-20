import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/SideBar'


const index = () => {
  return (
    <main className='flex gap-10 bg-slate-100 h-screen'>
      <Sidebar />
      <Outlet />
    </main>
  )
}

export default index