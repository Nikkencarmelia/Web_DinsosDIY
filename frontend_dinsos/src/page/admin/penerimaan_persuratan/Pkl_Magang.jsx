import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { FaSearch } from "react-icons/fa";

const Pkl_Magang = () => {
  const data = [
    {
      tanggal: '10/04/25',
      nama: 'Rani Oktaviani',
      instansi: 'Universitas Gadjah Mada',
      jurusan: 'Kedokteran',
      mulai: '01/05/25',
      selesai: '31/07/25',
      status: 'Diproses'
    },
    {
      tanggal: '11/04/25',
      nama: 'Arif Nugroho',
      instansi: 'Universitas Brawijaya',
      jurusan: 'Informatika',
      mulai: '01/05/25',
      selesai: '30/06/25',
      status: 'Diproses'
    },
    {
      tanggal: '12/04/25',
      nama: 'Siti Rahmawati',
      instansi: 'Universitas Indonesia',
      jurusan: 'Ilmu Komunikasi',
      mulai: '15/05/25',
      selesai: '15/07/25',
      status: 'Diproses'
    },
    {
      tanggal: '13/04/25',
      nama: 'Daniel Pratama',
      instansi: 'Universitas Airlangga',
      jurusan: 'Akuntansi',
      mulai: '01/06/25',
      selesai: '31/08/25',
      status: 'Diproses'
    },
    {
      tanggal: '14/04/25',
      nama: 'Lia Kartika',
      instansi: 'Universitas Negeri Yogyakarta',
      jurusan: 'Manajemen',
      mulai: '20/05/25',
      selesai: '20/08/25',
      status: 'Diproses'
    }
  ];

  const [selectedName, setSelectedName] = useState('');
  const [search, setSearch] = useState('');

  const handleOpenModal = (nama) => {
    setSelectedName(nama);
  };

  const handleAccept = (nama) => {
    alert(`Pengajuan ${nama} diterima.`);
  };

  const handleReject = (nama) => {
    alert(`Pengajuan ${nama} ditolak.`);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredData = data.filter(item => 
    item.nama.toLowerCase().includes(search.toLowerCase()) ||
    item.instansi.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h2 className="mb-4 d-flex justify-content-between">
        <span>Daftar Pengajuan PKL / Magang</span>
        <div className="input-group" style={{ width: '300px' }}>
          <span className="input-group-text"><FaSearch /></span>
          <input 
            type="text" 
            className="form-control" 
            placeholder="Cari nama atau instansi..." 
            value={search}
            onChange={handleSearch}
          />
        </div>
      </h2>

      {/* TABEL PENGAJUAN (Lihat Detail) */}
      <h4 className="mb-3">Tabel Pengajuan PKL / Magang</h4>
      <div className="table-responsive mb-5">
        <table className="table table-bordered align-middle text-center">
          <thead className="table-dark">
            <tr>
              <th>Tanggal</th>
              <th>Nama Pemohon</th>
              <th>Instansi</th>
              <th>Program Studi</th>
              <th>Tanggal Mulai</th>
              <th>Tanggal Selesai</th>
              <th>Status Permohonan</th>
              <th>Detail</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index}>
                <td>{item.tanggal}</td>
                <td>{item.nama}</td>
                <td>{item.instansi}</td>
                <td>{item.jurusan}</td>
                <td>{item.mulai}</td>
                <td>{item.selesai}</td>
                <td><span className="badge bg-warning text-dark">{item.status}</span></td>
                <td><a href={`/detail-data/${item.nama}`} className="text-primary text-decoration-underline">Lihat Detail</a></td>
                <td>
                  <button 
                    className="btn btn-success btn-sm me-2" 
                    onClick={() => handleAccept(item.nama)}
                  >
                    Terima
                  </button>
                  <button 
                    className="btn btn-danger btn-sm"
                    onClick={() => handleReject(item.nama)}
                  >
                    Tolak
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Pagination */}
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-end">
            <li className="page-item"><a className="page-link" href="#">Previous</a></li>
            <li className="page-item"><a className="page-link" href="#">1</a></li>
            <li className="page-item"><a className="page-link" href="#">2</a></li>
            <li className="page-item"><a className="page-link" href="#">Next</a></li>
          </ul>
        </nav>
      </div>

      {/* TABEL PEMBUATAN SURAT (Isi Surat & Upload) */}
      <h4 className="mb-3 d-flex justify-content-between">
        <span>Pembuatan Surat Balasan</span>
        <div className="input-group" style={{ width: '300px' }}>
          <span className="input-group-text"><FaSearch /></span>
          <input 
            type="text" 
            className="form-control" 
            placeholder="Cari nama atau instansi..." 
            value={search}
            onChange={handleSearch}
          />
        </div>
      </h4>
      <div className="table-responsive">
        <table className="table table-bordered align-middle text-center">
          <thead className="table-dark">
            <tr>
              <th>Tanggal</th>
              <th>Nama Pemohon</th>
              <th>Instansi</th>
              <th>Program Studi</th>
              <th>Tanggal Mulai</th>
              <th>Tanggal Selesai</th>
              <th>Status Permohonan</th>
              <th>Detail</th>
              <th>Upload</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index}>
                <td>{item.tanggal}</td>
                <td>{item.nama}</td>
                <td>{item.instansi}</td>
                <td>{item.jurusan}</td>
                <td>{item.mulai}</td>
                <td>{item.selesai}</td>
                <td><span className="badge bg-success">Disetujui</span></td>
                <td><a href={`/persuratan?nama=${encodeURIComponent(item.nama)}&instansi=${encodeURIComponent(item.instansi)}&jurusan=${encodeURIComponent(item.jurusan)}&mulai=${item.mulai}&selesai=${item.selesai}`} 
    className="text-primary text-decoration-underline">Isi Surat</a></td>
                <td>
                  <button 
                    type="button" 
                    className="btn btn-primary btn-sm" 
                    data-bs-toggle="modal" 
                    data-bs-target="#uploadModal"
                    onClick={() => handleOpenModal(item.nama)}
                  >
                    Upload
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-end">
            <li className="page-item"><a className="page-link" href="#">Previous</a></li>
            <li className="page-item"><a className="page-link" href="#">1</a></li>
            <li className="page-item"><a className="page-link" href="#">2</a></li>
            <li className="page-item"><a className="page-link" href="#">Next</a></li>
          </ul>
        </nav>
      </div>

      {/* MODAL UPLOAD */}
      <div className="modal fade" id="uploadModal" tabIndex="-1" aria-labelledby="uploadModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="uploadModalLabel">Upload Surat Balasan</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label className="form-label">Nama Pemohon:</label>
                  <input type="text" className="form-control" value={selectedName} readOnly />
                </div>
                <div className="mb-3">
                  <label htmlFor="formFile" className="form-label">Upload File Surat (PDF/DOC)</label>
                  <input className="form-control" type="file" id="formFile" />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
              <button type="button" className="btn btn-primary">Upload</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pkl_Magang;
