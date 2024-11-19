import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginPage from './pages/login'
import DashboardPage from './pages/dashboard'

const router = createBrowserRouter([
  { path: '/', element: <LoginPage />},
  { path: '/login', element: <LoginPage />},
  { path: '/dashboard', element: <DashboardPage/>},

])

const App = () => {
  return (
    <RouterProvider router={router}/>
  )
}

export default App
