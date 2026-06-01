import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './index.css'
import { RootLayout } from './pages/RootLayout.jsx'
import { Homepage } from './pages/Home/Homepage.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={ <RootLayout /> }>
      <Route path="/" element={ <Homepage /> }/>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
