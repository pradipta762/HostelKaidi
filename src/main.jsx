import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate
} from "react-router-dom";
import Home from "./Components/Home/Home";
import ScanEntry from "./Components/QRCode/ScanEntry";
import VisitForm from "./Components/QRCode/VisitForm";
import { StudentProvider } from "./context/StudentContext.jsx";
import VisitQRPage from "./Components/QRCode/VisitQRPage.jsx";
import SecurityScanner from "./Components/SecurityGuard/SecurityScanner.jsx";
import QRScanner from "./Components/QRCode/QRScanner.jsx";
import Signup from "./Auth/SignUp.jsx";
import Login from "./Auth/Login";

// Router setup
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Navigate to="/login" replace />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="home" element={<Home />} />
      <Route path="student-scan" element={<QRScanner />} />
      <Route path="scan-entry" element={<ScanEntry />} />
      <Route path="visit-form" element={<VisitForm />} />
      <Route path="qr-display" element={<VisitQRPage />} />
      <Route path="security-scan" element={<SecurityScanner />} />
    </Route>
  )
);

// Mount
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <StudentProvider>
      <RouterProvider router={router} />
    </StudentProvider>
  </StrictMode>
);
