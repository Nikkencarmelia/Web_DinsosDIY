// Informasi.jsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Informasi.css";
import batik from "../../assets/images/batik.jpeg";

const mockData = [
  {
    id: 1,
    pemohon: "Mahasiswa",
    nama: "Putri Andini",
    nim: "210001234",
    prodi: "Informatika",
    universitas: "UGM",
    jenisPengajuan: "Magang",
    tanggalMulai: "2025-06-01",
    tanggalSelesai: "2025-08-30",
  }
];



const PengajuanCard = ({
  nama,
  programStudi,
  jenjangStudi,
  universitas,
  sekolah,
  nisn,
  pekerjaan,
  instansi,
  tanggalMulai,
  tanggalSelesai,
  statusPengajuan,
  statusPersuratan,
  onDownloadSurat,
  onLihatDetail,
  onEdit,
  onBatalkan,
}) => {
  const badgeClass = (status, type) => {
    const value = (status || "").toLowerCase();
    const map = {
      pengajuan: {
        disetujui: "badge-success",
        ditolak: "badge-danger",
        menunggu: "badge-warning",
      },
      persuratan: {
        selesai: "badge-primary",
        diproses: "badge-warning",
      },
    };
    return map[type][value] || "badge-secondary";
  };

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <div>
            <h5 className="card-title">{nama}</h5>
            {programStudi && (
              <>
                <p><strong>Program Studi:</strong> {programStudi}</p>
                <p><strong>Jenjang Studi:</strong> {jenjangStudi}</p>
                <p><strong>Universitas:</strong> {universitas}</p>
              </>
            )}
            {sekolah && (
              <>
                <p><strong>Nama Sekolah:</strong> {sekolah}</p>
                <p><strong>NISN:</strong> {nisn}</p>
              </>
            )}
            {pekerjaan && (
              <>
                <p><strong>Pekerjaan:</strong> {pekerjaan}</p>
                <p><strong>Instansi:</strong> {instansi}</p>
              </>
            )}
            {tanggalMulai && (
              <>
                <p><strong>Tanggal Mulai:</strong> {tanggalMulai}</p>
                <p><strong>Tanggal Selesai:</strong> {tanggalSelesai}</p>
              </>
            )}
          </div>
          <div className="text-end">
            <p>
              <strong>Status Pengajuan:</strong>{" "}
              <span className={`badge ${badgeClass(statusPengajuan, "pengajuan")}`}>
                {statusPengajuan || "-"}
              </span>
            </p>
            <p>
              <strong>Status Persuratan:</strong>{" "}
              <span className={`badge ${badgeClass(statusPersuratan, "persuratan")}`}>
                {statusPersuratan || "-"}
              </span>
            </p>
            <p>
              <strong>Keterangan:</strong>{" "}
              {statusPersuratan === "Selesai"
                ? "Surat sudah selesai diproses"
                : "Surat sedang diproses"}
            </p>
          </div>
        </div>
        <div className="mt-3">
          <button
            className="btn btn-primary me-2"
            onClick={onDownloadSurat}
            disabled={statusPersuratan !== "Selesai"}
          >
            {statusPersuratan === "Selesai" ? "Download Surat" : "Surat Belum Selesai"}
          </button>
          <button className="btn btn-secondary me-2" onClick={onLihatDetail}>
            Lihat Detail
          </button>
          <button className="btn btn-warning me-2" onClick={onEdit}>
            Edit
          </button>
          <button className="btn btn-danger" onClick={onBatalkan}>
            Batalkan Ajuan
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Informasi() {
  const location = useLocation();
  const navigate = useNavigate();
  const [pengajuanData, setPengajuanData] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("submissions") || "[]");
    setPengajuanData(stored);
    if (location.state?.showToast) toast.success("🎉 Pengajuan berhasil dibuat!");
  }, [location]);

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const handleDownloadSurat = () => console.log("Download Surat");

  const handleLihatDetail = (data) => {
    navigate("/user/form", { state: { formData: data, isEdit: false, isView: true } });

  };

  const handleEdit = (data) => {
    navigate("/user/form", { state: { formData: data, isEdit: true, isView: false } });
  };

  const handleBatalkanAjuan = (index) => {
    if (!window.confirm("Yakin mau batalkan ajuan ini?")) return;
    const updated = [...pengajuanData];
    updated.splice(index, 1);
    setPengajuanData(updated);
    localStorage.setItem("submissions", JSON.stringify(updated));
    toast.info("❌ Pengajuan berhasil dibatalkan!");
  };

  const handleUseMockData = () => setPengajuanData(mockData);

  return (
    <div className="informasi-container">
      <ToastContainer />
      {isLoggedIn && (
        <>
          <h2 className="subjudul">Informasi Pengajuan</h2>
          {pengajuanData.length === 0 && (
            <button className="btn btn-outline-primary mb-3" onClick={handleUseMockData}>
              Gunakan Data Contoh
            </button>
          )}
          <div className="pengajuan-card-container">
            {pengajuanData.map((data, index) => (
              <PengajuanCard
                key={index}
                {...data}
                onDownloadSurat={handleDownloadSurat}
                onLihatDetail={() => handleLihatDetail(data)}
                onEdit={() => handleEdit(data)}
                onBatalkan={() => handleBatalkanAjuan(index)}
              />
            ))}
          </div>
        </>
      )}

      <h1 className="judul">Divisi PKL/Magang</h1>
      <div className="divisi-card">
        <p>Daftar divisi akan ditampilkan di sini (versi frontend dulu ya 😉)</p>
      </div>

      <h2 className="subjudul">Kebiasaan Warna Baju ASN (Senin - Jumat)</h2>
      <div className="palet-container">
        <div className="palet-item putih">Putih</div>
        <div className="palet-item biru">Biru</div>
        <div className="palet-item putih">Putih</div>
        <div className="palet-item batik" style={{ backgroundImage: `url(${batik})` }}>Batik</div>
        <div className="palet-item batik" style={{ backgroundImage: `url(${batik})` }}>Batik</div>
      </div>

      <h2 className="subjudul">Kebiasaan Apel ASN (Selasa - Kamis)</h2>
      <div className="info-apel">
        <p>
          Setiap hari <strong>Selasa sampai Kamis</strong>, ASN di Dinas Sosial wajib mengikuti apel pagi pukul 08.00 WIB. Pastikan hadir tepat waktu dan mengenakan pakaian yang sesuai!
        </p>
      </div>
    </div>
  );
}
