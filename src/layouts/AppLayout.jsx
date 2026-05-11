import { useState } from "react";
import { Outlet } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import AppNavbar from "../components/AppNavbar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import Footer from "../components/Footer.jsx";

export default function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-app flex flex-col">
      <AppNavbar onOpenSidebar={() => setMobileOpen(true)} />

      <div className="flex-1 flex">
        <div className="hidden md:block w-72 shrink-0 border-r border-white/10">
          <Sidebar />
        </div>

        <AnimatePresence>
          {mobileOpen ? (
            <motion.div
              className="md:hidden fixed inset-0 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
              <motion.div
                initial={{ x: -280 }}
                animate={{ x: 0 }}
                exit={{ x: -280 }}
                transition={{ type: "spring", stiffness: 260, damping: 26 }}
                className="absolute inset-y-0 left-0 w-72 border-r border-white/10 bg-slate-950/60"
              >
                <Sidebar onNavigate={() => setMobileOpen(false)} />
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <main className="flex-1 p-4 sm:p-6">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
}

