import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginPage from './pages/login'
import DashboardPage from './pages/dashboard'
import Reports from './pages/reports'
import ErrorPage from './pages/error'
import ReportDetailPage from './pages/reportDetails'
import InitialPages from './pages/initial'
import ReportsEditPage from './pages/reportsEdit'

const router = createBrowserRouter([
  { path: '/', 
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  { path: '/login', element: <LoginPage />},
  { 
    path: '/', 
    element: <InitialPages/>,
    children: [
      {path: "dashboard", element: <DashboardPage />},
      {path: "reports", element: <Reports />},
      {path: "reports/:reportsId", element: <ReportDetailPage />},
      {path: "reports/:reportsId/edit", element: <ReportsEditPage />},
    ]
  },

])

const App = () => {
  return (
    <RouterProvider router={router}/>
  )
}

export default App
