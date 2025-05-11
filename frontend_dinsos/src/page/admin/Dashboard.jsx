import React from 'react';

const Dashboard = () => {
  return (
    <div className="p-4 content-with-navbar">
      <h1 className="dashboard-title">Dashboard</h1>
      <p className="welcome-text">Selamat Datang Admin!</p>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mt-4">
        <div className="col">
          <div className="card shadow-lg rounded-3">
            <div className="card-body">
              <h5 className="card-title">Total Pengajuan PKL/Magang</h5>
              <h2 className="fw-bold text-primary text-center total-number">10</h2>
              <div className="d-flex justify-content-between mt-3 px-3">
                <span><strong>Mahasiswa:</strong> 8</span>
                <span><strong>Siswa:</strong> 2</span>
                <span><strong>Lainnya:</strong> 0</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card shadow-lg rounded-3">
            <div className="card-body">
              <h5 className="card-title">Total Pengajuan Penelitian</h5>
              <h2 className="fw-bold text-primary text-center total-number">5</h2>
              <div className="d-flex justify-content-between mt-3 px-3">
                <span><strong>Mahasiswa:</strong> 2</span>
                <span><strong>Siswa:</strong> 0</span>
                <span><strong>Lainnya:</strong> 3</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
