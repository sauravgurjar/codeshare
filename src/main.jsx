import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { SnippetsProvider } from "./context/SnippetsContext.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <SnippetsProvider>
            <BrowserRouter>
              <App />
              <Toaster
                position="top-right"
                toastOptions={{
                  style: { background: "rgba(15,23,42,0.9)", color: "#e2e8f0", border: "1px solid rgba(255,255,255,0.08)" },
                }}
              />
            </BrowserRouter>
          </SnippetsProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  </StrictMode>,
)
