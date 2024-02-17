import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Login } from './pages/login.jsx'
import { Register } from './pages/register.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Dashboard } from './pages/dashboards/dashboard.jsx'
import { DashboardLayout } from './layouts/dashboard/dashboardLayout.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/dashboard',
    element: <DashboardLayout/>,
    children: [
      {
      path: ":type",
      element: <Dashboard/>
      }
    ]
  },
  {

  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
