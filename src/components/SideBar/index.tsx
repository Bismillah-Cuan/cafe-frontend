import { NavLink, Link } from 'react-router-dom'
import logoCuan from '../../assets/CoffeeNCouple.png'
import classes from './MainNavigation.module.css'

const SideBar = () => {
  return (
<aside className="flex flex-col bg-slate-800 max-w-[15rem] h-screen py-5 gap-4 shadow-[rgba(0,0,10,0.2)_10px_5px_8px_0px]">
        <img src={logoCuan} alt="CoffeeNCoupleLogo" className='mb-5 px-6' />
        <nav className='w-full'>
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
</aside>
  )
}

export default SideBar