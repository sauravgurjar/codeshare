import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import PublicNavbar from "../components/PublicNavbar.jsx";
import Footer from "../components/Footer.jsx";

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-app flex flex-col">
      <PublicNavbar />
      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          <Outlet />
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}

