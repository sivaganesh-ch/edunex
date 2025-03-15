import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./context/auth-context/index.jsx";
import InstructorProvider from "./context/instructor-context/index.jsx";
import StudentProvider from "./context/student-context/index.jsx";
import { DarkModeProvider } from "./context/dark-mode-context/DarkModeContext.jsx";
import CertificateProvider, { CertificateContext } from "./context/certificate-setup-contex/index.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <CertificateProvider>
      <InstructorProvider>
        <StudentProvider>
        <DarkModeProvider>
          <App />
        </DarkModeProvider>
        </StudentProvider>
      </InstructorProvider>
      </CertificateProvider>
    </AuthProvider>
  </BrowserRouter>
);
