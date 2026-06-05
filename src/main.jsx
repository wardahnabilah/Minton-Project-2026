import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './index.css'
import { RootLayout } from './pages/RootLayout.jsx'
import { RegisterPage } from './pages/Auth/RegisterPage.jsx'
import { LoginPage } from './pages/Auth/LoginPage.jsx'
import { Homepage } from './pages/Home/Homepage.jsx'
import { AdminPage } from './pages/Admin/AdminPage.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { ProtectedRoute } from './components/others/ProtectedRoute.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AuthProvider />}>
      <Route element={ <RootLayout /> }>
        <Route path="/" element={ <Homepage /> }/>
        <Route path="register" element={ <RegisterPage /> }/>
        <Route path="login" element={ <LoginPage /> }/>

        <Route path="admin" element={<ProtectedRoute />}>
          <Route path="" element={<AdminPage />} />
        </Route>
      </Route>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
