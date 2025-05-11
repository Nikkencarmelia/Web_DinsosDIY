import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../page/Register.css";

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (!email || !password || !confirmPassword) {
      alert("Semua kolom wajib diisi!");
      return;
    }

    if (password !== confirmPassword) {
      alert("Konfirmasi password tidak cocok!");
      return;
    }

    localStorage.setItem("registeredEmail", email);
    localStorage.setItem("registeredPassword", password);
    alert("Berhasil daftar! Silakan login.");
    navigate("/Login");
  };

  return (
    <div className="container-fluid">
      <div className="row register-container">
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <div className="register-form w-75">
            <h3 className="text-center mb-4">Daftar</h3>
            <form onSubmit={handleRegister}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" placeholder="Masukkan email" />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" placeholder="Masukkan password" />
              </div>

              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">Konfirmasi Password</label>
                <input type="password" className="form-control" id="confirmPassword" placeholder="Masukkan kembali password" />
              </div>

              <button type="submit" className="btn btn-primary w-100">Daftar</button>
            </form>

            <p className="text-center mt-3">
              Sudah punya akun? <Link to="/Login">Masuk</Link>
            </p>
          </div>
        </div>

        <div className="col-md-6 d-none d-md-block register-image"></div>
      </div>
    </div>
  );
};

export default Register;
