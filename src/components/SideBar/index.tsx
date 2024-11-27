import { useContext } from 'react'
import { NavLink, Link } from 'react-router-dom'
import logoCuan from '../../assets/CoffeeNCouple.png'
import classes from './MainNavigation.module.css'
import { UserContext } from '../store/user-context'

const SideBar = () => {
  const {user, updateCurrentUser} = useContext(UserContext);

  function handleLogout() {
    updateCurrentUser('');
  }

  return (
<aside className="flex flex-col items-center bg-slate-800 max-w-[15rem] h-screen py-5 gap-4 shadow-[rgba(0,0,10,0.2)_10px_5px_8px_0px]">
        <img src={logoCuan} alt="CoffeeNCoupleLogo" className='mb-5 px-6' />
        <nav className='w-full flex-1 '>
            <ul className={`flex flex-col gap-1 w-full ${classes.list}`}>
                <li>
                    <NavLink to="dashboard" className={({ isActive }) => 
                    (isActive ? classes.active : undefined)
                    } end>
                      Dashboard
                      </NavLink>
                </li>
                <li>
                    <NavLink to="reports" className={({ isActive }) => 
                    (isActive ? classes.active : undefined)
                    }>Reports
                    </NavLink>
                </li>
                <li>
                    <NavLink to="Materials" className={({ isActive }) =>
                    (isActive ? classes.active : undefined)
                    }>Materials
                    </NavLink>
                </li>
            </ul>
        </nav>
        <Link onClick={handleLogout} to="/" className='w-[10rem] items-center text-slate-50 text-center bg-slate-400 hover:bg-slate-500 mb-10 px-2 py-1 rounded-md'>Logout</Link>
</aside>
  )
}

export default SideBar