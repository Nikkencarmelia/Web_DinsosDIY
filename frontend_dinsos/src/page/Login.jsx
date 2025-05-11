import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../page/Login.css";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const registeredEmail = localStorage.getItem("registeredEmail");
    const registeredPassword = localStorage.getItem("registeredPassword");

    if (!registeredEmail || !registeredPassword) {
      alert("Akun belum terdaftar. Silakan daftar dulu.");
      navigate("/Register");
      return;
    }

    if (email === registeredEmail && password === registeredPassword) {
      localStorage.setItem("isLoggedIn", "true");
      alert("Berhasil login!");
      navigate('/');
    } else {
      alert("Email atau password salah!");
    }
  };

  return (
    <div className="container-fluid">
      <div className="row login-container">
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <div className="login-form w-75">
            <h3 className="text-center mb-4">Masuk</h3>
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input 
                  type="email" 
                  className="form-control" 
                  id="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="Masukkan email"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input 
                  type="password" 
                  className="form-control" 
                  id="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder="Masukkan password"
                />
              </div>

              <div className="d-flex justify-content-end mb-3">
                <Link to="/lupa-password" className="small">Lupa Password?</Link>
              </div>

              <button type="submit" className="btn btn-primary w-100">Masuk</button>
            </form>

            <p className="text-center mt-3">
              Belum punya akun? <Link to="/Register">Daftar</Link>
            </p>
          </div>
        </div>

        <div className="col-md-6 d-none d-md-block login-image"></div>
      </div>
    </div>
  );
};

export default Login;
