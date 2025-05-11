import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";

// Navbar & Footer
import MyNavbar from './components/Navbar';
import NavbarAdmin from "./components/NavbarAdmin";
import Footer from './components/Footer';

// Admin pages
import Dashboard from "./page/admin/Dashboard";
import Divisi from "./page/admin/Divisi_Pkl_Magang";
import Pkl_Magang from "./page/admin/penerimaan_persuratan/Pkl_Magang";
import Penelitian from "./page/admin/penerimaan_persuratan/Penelitian";
import Persuratan from "./page/admin/Persuratan";

// User pages
import LandingPage from "./page/LandingPage";
import Informasi from "./page/user/Informasi";
import Form from "./page/user/Form";

// Auth pages
import Login from "./page/Login";
import Register from "./page/Register";

function AppContent() {
  const location = useLocation();
  const path = location.pathname.toLowerCase(); // semua ke lowercase

  // Daftar path semua huruf kecil
  const hideFooterPaths = ["/dashboard", "/divisi", "/pkl_magang", "/penelitian", "/persuratan", "/login", "/register", "/user/form"];
  const adminPaths = ["/dashboard", "/divisi", "/pkl_magang", "/penelitian", "/persuratan"];
  const hideNavbarPaths = ["/login", "/register"];

  // Cek pakai startsWith
  const matchPath = (paths) => paths.some(p => path.startsWith(p));

  const isAdminPage = matchPath(adminPaths);
  const hideFooter = matchPath(hideFooterPaths);
  const hideNavbar = matchPath(hideNavbarPaths);

  return (
    <div className="app-container">
      {/* Navbar */}
      {!hideNavbar && (isAdminPage ? <NavbarAdmin /> : <MyNavbar />)}

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/divisi" element={<Divisi />} />
        <Route path="/pkl_magang" element={<Pkl_Magang />} />
        <Route path="/penelitian" element={<Penelitian />} />
        <Route path="/persuratan" element={<Persuratan />} />
        <Route path="/informasi" element={<Informasi />} />
        <Route path="/user/form" element={<Form />} />
      </Routes>

      {/* Footer */}
      {!hideFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
