import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginPage from './pages/login'
import DashboardPage from './pages/dashboard'
import Reports from './pages/reports'
import ErrorPage from './pages/error'
import ReportDetailPage from './pages/reportDetails'
import InitialPages from './pages/initial'
import ReportsEditPage from './pages/reportsEdit'
import MaterialPage from './pages/MaterialPage'
import { UserContext } from './components/Store/user-context'
import RegisterPage from './pages/register'
import MarketListPage from './pages/marketList'
import PurchaseOrderPage from './pages/poPage'
import PurchaseRequestPage from './pages/prPage'
import SupplierPage from './pages/supplier'
import ListUserPage from './pages/listUser'


const router = createBrowserRouter([
  { path: '/', 
    element: <InitialPages />,
    errorElement: <ErrorPage />,
  },
  { path: '/login', element: <LoginPage />},
  { path: '/register', element: <RegisterPage />},
  { 
    path: '/', 
    element: <InitialPages/>,
    children: [
      {path: "dashboard", element: <DashboardPage />},
      {path: "reports", element: <Reports />},
      {path: "reports/:reportsId", element: <ReportDetailPage />},
      {path: "reports/:reportsId/edit", element: <ReportsEditPage />},
      {path: "materials", element: <MaterialPage />},
      {path: "market-list", element: <MarketListPage />},
      {path: "purchase-order", element: <PurchaseOrderPage />},
      {path: "purchase-request", element: <PurchaseRequestPage />},
      {path: "supplier", element: <SupplierPage />},
      {path: "list-user", element: <ListUserPage />}
    ]
  },

])

const App = () => {
  const [currentUser, setCurrentUser] = useState({
    user:"" ,
  })

  const ctxValue = {
    user: currentUser.user,
    updateCurrentUser: (user: string) => setCurrentUser({ user })
  }

  
  return (
    <UserContext.Provider value={ctxValue}>
      <RouterProvider router={router}/>
    </UserContext.Provider>
  )
}

export default App
