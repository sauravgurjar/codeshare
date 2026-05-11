import { Outlet } from "react-router-dom";
import PublicNavbar from "../components/PublicNavbar.jsx";
import Footer from "../components/Footer.jsx";

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-app flex flex-col">
      <PublicNavbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

