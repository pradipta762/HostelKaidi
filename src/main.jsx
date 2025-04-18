import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Home from './Components/Home/Home'
import ScanEntry from './Components/QRCode/ScanEntry'
import VisitForm from './Components/QRCode/VisitForm'
import { StudentProvider } from './context/StudentContext.jsx'
import VisitQRPage from './Components/QRCode/VisitQRPage.jsx'
import SecurityScanner from './Components/SecurityGuard/SecurityScanner.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="scan-entry" element={<ScanEntry />} />
      <Route path="visit-form" element={<VisitForm /> } />
      <Route path="qr-display" element={<VisitQRPage />} />
      <Route path="security-scan" element={<SecurityScanner />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StudentProvider>
      <RouterProvider router={router} />
    </StudentProvider>
  </StrictMode>,
)