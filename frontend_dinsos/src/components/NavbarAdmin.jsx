import React, { useState } from 'react';
import './Admincomponents.css';

const NavbarAdmin = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="admin-container">
      <div className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={() => setSidebarOpen(false)}>×</button>
        <h5>Admin Menu</h5>
        <ul className="nav flex-column">
          <li><a href="/Dashboard">Dashboard</a></li>
          <li><a href="/Divisi">Divisi PKL/Magang</a></li>
          <li>
            <details>
              <summary>Penerimaan & Persuratan</summary>
              <ul>
                <li><a href="/Pkl_Magang">PKL/Magang</a></li>
                <li><a href="/Penelitian">Penelitian</a></li>
              </ul>
            </details>
          </li>
          <li><a href="#">Keluar</a></li>
        </ul>
      </div>

      <div className={`admin-main ${sidebarOpen ? 'shifted' : ''}`}>
        <nav className="admin-topbar">
          <button className="admin-menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>☰</button>
          <h4 className="ms-3">Dashboard Admin</h4>
        </nav>

        <div className="admin-body-content">{children}</div>
      </div>
    </div>
  );
};

export default NavbarAdmin;
