import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginPage from './pages/login'
import DashboardPage from './pages/dashboard'
import Reports from './pages/reports'


const router = createBrowserRouter([
  { path: '/', element: <LoginPage />},
  { path: '/login', element: <LoginPage />},
  { 
    path: '/dashboard', 
    element: <DashboardPage/>,
    children: [
      {path: "/dashboard/reports", element: <Reports />}
    ]
  },

])

const App = () => {
  return (
    <RouterProvider router={router}/>
  )
}

export default App
