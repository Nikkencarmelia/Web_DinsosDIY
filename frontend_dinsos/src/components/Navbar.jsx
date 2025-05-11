import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const MyNavbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isScrolledTop, setIsScrolledTop] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Hanya transparan kalau di "/" dan scroll masih di atas 50px
  const isLandingPage = location.pathname === "/";
  const navbarTransparent = isLandingPage && isScrolledTop;

  // Cek login status & pasang listener storage
  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    const handleStorage = () =>
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // Pasang listener scroll untuk update isScrolledTop
  useEffect(() => {
    const handleScroll = () => setIsScrolledTop(window.scrollY < 50);
    // Set initial
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/");
  };
  const handleLogin = () => navigate("/Login");

  return (
    <nav
      className={`navbar navbar-expand-lg fixed-top my-navbar ${
        navbarTransparent ? "navbar-transparent" : "navbar-solid"
      }`}
    >
      <div className="container">
        <a className="navbar-brand fw-bold" href="/">
          Dinas Sosial DIY
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link" href="/">
                Beranda
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/Informasi">
                Informasi
              </a>
            </li>
            <li className="nav-item ms-3">
              {isLoggedIn ? (
                <button className="btn btn-danger" onClick={handleLogout}>
                  Logout
                </button>
              ) : (
                <button
                  className="btn btn-outline-primary"
                  onClick={handleLogin}
                >
                  Login
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default MyNavbar;
