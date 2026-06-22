import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './index.css'
import { RootLayout } from './pages/RootLayout.jsx'
import { RegisterPage } from './pages/Auth/RegisterPage.jsx'
import { LoginPage } from './pages/Auth/LoginPage.jsx'
import { Homepage } from './pages/Home/Homepage.jsx'
import { AdminPage } from './pages/Admin/AdminPage.jsx'
import { SettingsCourtPage } from './pages/Admin/SettingsCourtPage.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { ProtectedRoute } from './components/others/ProtectedRoute.jsx'
import { CourtSchedulesPage } from './pages/CourtSchedulesPage.jsx'
import { CreateBookingPage } from './pages/Booking/CreateBookingPage.jsx'
import { HistoryBookingPage } from './pages/Booking/HistoryBookingPage.jsx'
import { ToastContainer } from 'react-toastify'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AuthProvider />}>
      <Route element={ <RootLayout /> }>
        <Route path="/" element={ <Homepage /> }/>
        <Route path="register" element={ <RegisterPage /> }/>
        <Route path="login" element={ <LoginPage /> }/>
        <Route path="court-schedules" element={ <CourtSchedulesPage /> }/>
        <Route path="create-booking" element={ <CreateBookingPage /> }/>
        <Route path="booking-history" element={ <HistoryBookingPage /> }/>

        <Route path="admin" element={<ProtectedRoute />}>
          <Route path="" element={<AdminPage />} />
          <Route path="courts" element={<SettingsCourtPage />}/>
        </Route>
      </Route>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
    <ToastContainer />
  </StrictMode>,
)
