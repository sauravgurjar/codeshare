import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import PublicLayout from "./layouts/PublicLayout.jsx";
import AuthLayout from "./layouts/AuthLayout.jsx";
import AppLayout from "./layouts/AppLayout.jsx";
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import SnippetDetails from "./pages/SnippetDetails.jsx";
import CreateSnippet from "./pages/CreateSnippet.jsx";
import EditSnippet from "./pages/EditSnippet.jsx";
import Profile from "./pages/Profile.jsx";
import Settings from "./pages/Settings.jsx";
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import ForgotPassword from "./pages/auth/ForgotPassword.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/snippets/:id" element={<SnippetDetails />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/snippets/new" element={<CreateSnippet />} />
            <Route path="/snippets/:id/edit" element={<EditSnippet />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}
