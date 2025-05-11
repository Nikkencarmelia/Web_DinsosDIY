import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Form() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isEdit, setIsEdit] = useState(false);
  const [isView, setIsView] = useState(false);
  const [id, setId] = useState(null);
  const [pemohon, setPemohon] = useState("");
  const [jenisPengajuan, setJenisPengajuan] = useState("");
  const [jumlahOrang, setJumlahOrang] = useState("1 Orang");
  const [jenjang, setJenjang] = useState("");
  const [totalOrangLebih, setTotalOrangLebih] = useState("");
  const [perwakilan, setPerwakilan] = useState({ nama: "", nimNisPekerjaan: "", hp: "" });
  const [anggota, setAnggota] = useState([]);
  const [suratPengantar, setSuratPengantar] = useState(null);
  const [perihal, setPerihal] = useState("");
  const [keperluan, setKeperluan] = useState("");
  const [tanggalPermohonan, setTanggalPermohonan] = useState("");
  const [noSurat, setNoSurat] = useState("");
  const [unitKerja, setUnitKerja] = useState("");
  const [lampiran, setLampiran] = useState(null);
  const [tanggalMulai, setTanggalMulai] = useState("");
  const [tanggalSelesai, setTanggalSelesai] = useState("");
  const [judulPenelitian, setJudulPenelitian] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const formData = location.state?.formData || null;
    const viewMode = location.state?.isView || false;

    if (formData) {
      setIsEdit(true);
      setId(formData.id);
      setIsView(viewMode);
      setPemohon(formData.pemohon);
      setJenisPengajuan(formData.jenisPengajuan);
      setJumlahOrang(formData.jumlahOrang);
      setJenjang(formData.jenjang);
      setTotalOrangLebih(formData.totalOrangLebih || "");
      setPerwakilan(formData.perwakilan || { nama: "", nimNisPekerjaan: "", hp: "" });
      setPerihal(formData.perihal);
      setKeperluan(formData.keperluan);
      setTanggalPermohonan(formData.tanggalPermohonan);
      setNoSurat(formData.noSurat);
      setUnitKerja(formData.unitKerja);
      setTanggalMulai(formData.tanggalMulai || "");
      setTanggalSelesai(formData.tanggalSelesai || "");
      setJudulPenelitian(formData.judulPenelitian || "");
      setAnggota(formData.anggota || []);
    }
  }, [location.state]);

  useEffect(() => {
    if (jumlahOrang !== "lebih") {
      const jumlah = parseInt(jumlahOrang);
      const newAnggota = Array.from({ length: jumlah }, () => ({ nama: "", nimNisPekerjaan: "", hp: "" }));
      setAnggota(newAnggota);
    }
  }, [jumlahOrang]);

  const handlePerwakilanChange = e => {
    const { name, value } = e.target;
    setPerwakilan(prev => ({ ...prev, [name]: value }));
  };

  const handleAnggotaChange = (index, e) => {
    const { name, value } = e.target;
    setAnggota(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [name]: value };
      return updated;
    });
  };

  const renderNamaInputs = () => {
    if (jumlahOrang === "lebih") {
      return (
        <>
          <div className="row mb-3">
            <div className="col-md-4">
              <label className="form-label fw-bold">Nama Perwakilan</label>
              <input name="nama" type="text" className="form-control" value={perwakilan.nama} onChange={handlePerwakilanChange} disabled={isView} />
            </div>
            <div className="col-md-4">
              {pemohon === "Mahasiswa" && (
                <>
                  <label className="form-label fw-bold">NIM</label>
                  <input name="nimNisPekerjaan" type="number" className="form-control" value={perwakilan.nimNisPekerjaan} onChange={handlePerwakilanChange} disabled={isView} />
                </>
              )}
              {pemohon === "Siswa" && (
                <>
                  <label className="form-label fw-bold">NISN</label>
                  <input name="nimNisPekerjaan" type="number" className="form-control" value={perwakilan.nimNisPekerjaan} onChange={handlePerwakilanChange} disabled={isView} />
                </>
              )}
              {pemohon === "Lainnya" && (
                <>
                  <label className="form-label fw-bold">Pekerjaan</label>
                  <input name="nimNisPekerjaan" type="text" className="form-control" value={perwakilan.nimNisPekerjaan} onChange={handlePerwakilanChange} disabled={isView} />
                </>
              )}
            </div>
            <div className="col-md-4">
              <label className="form-label fw-bold">No HP</label>
              <input name="hp" type="tel" className="form-control" value={perwakilan.hp} onChange={handlePerwakilanChange} disabled={isView} />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label fw-bold">Total Orang</label>
              <input name="totalOrangLebih" type="number" className="form-control" value={totalOrangLebih} onChange={e => setTotalOrangLebih(e.target.value)} disabled={isView} />
            </div>
          </div>
        </>
      );
    }

    return anggota.map((anggotaItem, i) => (
      <div key={i} className="row mb-3">
        <div className="col-md-4">
          <label className="form-label fw-bold">Nama {jumlahOrang > 1 ? i + 1 : ""}</label>
          <input name="nama" type="text" className="form-control" value={anggotaItem.nama} onChange={(e) => handleAnggotaChange(i, e)} disabled={isView} />
        </div>
        <div className="col-md-4">
          {pemohon === "Mahasiswa" && (
            <>
              <label className="form-label fw-bold">NIM</label>
              <input name="nimNisPekerjaan" type="number" className="form-control" value={anggotaItem.nimNisPekerjaan} onChange={(e) => handleAnggotaChange(i, e)} disabled={isView} />
            </>
          )}
          {pemohon === "Siswa" && (
            <>
              <label className="form-label fw-bold">NISN</label>
              <input name="nimNisPekerjaan" type="number" className="form-control" value={anggotaItem.nimNisPekerjaan} onChange={(e) => handleAnggotaChange(i, e)} disabled={isView} />
            </>
          )}
          {pemohon === "Lainnya" && (
            <>
              <label className="form-label fw-bold">Pekerjaan</label>
              <input name="nimNisPekerjaan" type="text" className="form-control" value={anggotaItem.nimNisPekerjaan} onChange={(e) => handleAnggotaChange(i, e)} disabled={isView} />
            </>
          )}
        </div>
        <div className="col-md-4">
          <label className="form-label fw-bold">No HP</label>
          <input name="hp" type="tel" className="form-control" value={anggotaItem.hp} onChange={(e) => handleAnggotaChange(i, e)} disabled={isView} />
        </div>
      </div>
    ));
  };

  const validate = () => {
    const e = {};
    if (jenisPengajuan === "Magang") {
      if (!tanggalMulai) e.tanggalMulai = "Tanggal Mulai wajib";
      if (!tanggalSelesai) e.tanggalSelesai = "Tanggal Selesai wajib";
    }
    if (jenisPengajuan === "Penelitian" && !judulPenelitian) {
      e.judulPenelitian = "Judul Penelitian wajib";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = e => {
    e.preventDefault();
    if (!validate()) return;

    const formData = new FormData(e.target);
    formData.append("pemohon", pemohon);
    formData.append("jenisPengajuan", jenisPengajuan);
    formData.append("jumlahOrang", jumlahOrang);
    formData.append("jenjang", jenjang);
    formData.append("perihal", perihal);
    formData.append("keperluan", keperluan);
    formData.append("tanggalPermohonan", tanggalPermohonan);
    formData.append("noSurat", noSurat);
    formData.append("unitKerja", unitKerja);
    formData.append("tanggalMulai", tanggalMulai);
    formData.append("tanggalSelesai", tanggalSelesai);
    formData.append("judulPenelitian", judulPenelitian);
    if (suratPengantar) formData.append("suratPengantar", suratPengantar);
    if (lampiran) formData.append("lampiran", lampiran);

    const newEntry = Object.fromEntries(formData.entries());

    if (jumlahOrang === "lebih") {
      newEntry.perwakilan = perwakilan;
      newEntry.totalOrangLebih = totalOrangLebih;
    } else {
      newEntry.anggota = anggota;
    }

    if (isEdit) {
      // mode edit
      console.log("Edit data:", { id, ...newEntry });
      // kamu bisa pakai fetch/axios POST/PUT ke API-mu di sini
    } else {
      // mode tambah
      console.log("Tambah data:", newEntry);
      // kamu juga bisa simpan ke server di sini
    }

    navigate("/Informasi"); // balik ke halaman utama setelah submit
  };

  

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Ajukan Permohonan PKL / Magang / Penelitian</h1>
      <form className="row g-3" onSubmit={onSubmit}>
  {/* --- Data Pemohon --- */}
  <h5 className="fw-bold mt-4">Data Pemohon</h5>
  <div className="col-md-4">
    <label className="form-label fw-bold">Pemohon</label>
    <select name="pemohon" className="form-select" value={pemohon} onChange={e => setPemohon(e.target.value)} required disabled={isView}>
      <option value="">Pilih Pemohon...</option>
      <option>Mahasiswa</option>
      <option>Siswa</option>
      <option>Lainnya</option>
    </select>
  </div>

  <div className="col-md-4">
    <label className="form-label fw-bold">Jenis Pengajuan</label>
    <select name="jenisPengajuan" className="form-select" value={jenisPengajuan} onChange={e => setJenisPengajuan(e.target.value)} required disabled={isView}>
      <option value="">Pilih Jenis...</option>
      <option>Magang</option>
      <option>Penelitian</option>
    </select>
  </div>

  <div className="col-md-4">
    <label className="form-label fw-bold">Jumlah Orang</label>
    <select name="jumlahOrang" className="form-select" value={jumlahOrang} onChange={e => setJumlahOrang(e.target.value)} required disabled={isView}>
      <option>1 Orang</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
      <option value="lebih">Lebih dari 5 Orang</option>
    </select>
  </div>

  {renderNamaInputs()}

  {pemohon === "Mahasiswa" && (
    <>
      <div className="col-md-4">
        <label className="form-label fw-bold">Universitas</label>
        <input name="universitas" className="form-control" required disabled={isView} />
      </div>
      <div className="col-md-4">
        <label className="form-label fw-bold">Jurusan</label>
        <input name="jurusan" className="form-control" required disabled={isView} />
      </div>
      <div className="col-md-2">
        <label className="form-label fw-bold">Jenjang Studi</label>
        <select name="jenjang" className="form-select" value={jenjang} onChange={e => setJenjang(e.target.value)} required disabled={isView}>
          <option value="">Pilih...</option>
          <option>D3</option>
          <option>S1</option>
          <option>S2</option>
          <option>S3</option>
          <option>Lainnya</option>
        </select>
      </div>

      {jenjang === "Lainnya" && (
        <div className="col-md-2">
          <label className="form-label fw-bold">Tulis Jenjang</label>
          <input
            type="text"
            className="form-control"
            placeholder="Contoh: D4"
            onChange={e => setJenjang(e.target.value)}
            required
            disabled={isView}
          />
        </div>
      )}
    </>
  )}

  {pemohon === "Siswa" && (
    <div className="col-md-4">
      <label className="form-label fw-bold">Nama Sekolah</label>
      <input name="sekolah" className="form-control" required disabled={isView} />
    </div>
  )}

  {pemohon === "Lainnya" && (
    <div className="col-md-4">
      <label className="form-label fw-bold">Instansi</label>
      <input name="instansi" className="form-control" required disabled={isView} />
    </div>
  )}

  {/* --- Detail Pengajuan --- */}
  <h5 className="fw-bold mt-4">Detail Pengajuan</h5>
  <div className="col-md-6">
    <label className="form-label fw-bold">Perihal</label>
    <input name="perihal" className="form-control" value={perihal} onChange={e => setPerihal(e.target.value)} required disabled={isView} />
  </div>
  <div className="col-md-6">
    <label className="form-label fw-bold">Keperluan</label>
    <input name="keperluan" className="form-control" value={keperluan} onChange={e => setKeperluan(e.target.value)} required disabled={isView} />
  </div>
  <div className="col-md-4">
    <label className="form-label fw-bold">Tanggal Permohonan</label>
    <input type="date" className="form-control" value={tanggalPermohonan} onChange={e => setTanggalPermohonan(e.target.value)} required disabled={isView} />
  </div>
  <div className="col-md-4">
    <label className="form-label fw-bold">No. Surat</label>
    <input className="form-control" value={noSurat} onChange={e => setNoSurat(e.target.value)} required disabled={isView} />
  </div>
  <div className="col-md-4">
    <label className="form-label fw-bold">Unit Kerja Tujuan</label>
    <input className="form-control" value={unitKerja} onChange={e => setUnitKerja(e.target.value)} required disabled={isView} />
  </div>

  {jenisPengajuan === "Magang" && (
    <>
      <div className="col-md-4">
        <label className="form-label fw-bold">Tanggal Mulai</label>
        <input type="date" className="form-control" value={tanggalMulai} onChange={e => setTanggalMulai(e.target.value)} required disabled={isView} />
        {errors.tanggalMulai && <div className="text-danger">{errors.tanggalMulai}</div>}
      </div>
      <div className="col-md-4">
        <label className="form-label fw-bold">Tanggal Selesai</label>
        <input type="date" className="form-control" value={tanggalSelesai} onChange={e => setTanggalSelesai(e.target.value)} required disabled={isView} />
        {errors.tanggalSelesai && <div className="text-danger">{errors.tanggalSelesai}</div>}
      </div>
    </>
  )}

  {jenisPengajuan === "Penelitian" && (
    <>
      <div className="mb-3">
        <label className="form-label fw-bold" htmlFor="judulPenelitianTextarea">
          Judul Penelitian
        </label>
        <textarea
          className="form-control"
          id="judulPenelitianTextarea"
          rows="3"
          value={judulPenelitian}
          onChange={e => setJudulPenelitian(e.target.value)}
          required
          disabled={isView}
        />
        {errors.judulPenelitian && <div className="text-danger">{errors.judulPenelitian}</div>}
      </div>

      <div className="col-md-4">
        <label className="form-label fw-bold">Tanggal Mulai</label>
        <input
          type="date"
          className="form-control"
          value={tanggalMulai}
          onChange={e => setTanggalMulai(e.target.value)}
          disabled={isView}
        />
      </div>

      <div className="col-md-4">
        <label className="form-label fw-bold">Tanggal Selesai</label>
        <input
          type="date"
          className="form-control"
          value={tanggalSelesai}
          onChange={e => setTanggalSelesai(e.target.value)}
          disabled={isView}
        />
      </div>
    </>
  )}

  {/* --- Upload File --- */}
  <h5 className="fw-bold mt-4">Upload Dokumen</h5>
  <div className="col-md-6">
  <label className="form-label fw-bold">Upload Surat Pengantar</label>
  <input type="file" className="form-control" onChange={(e) => setSuratPengantar(e.target.files[0])} disabled={isView} />
</div>
<div className="col-md-6">
  <label className="form-label fw-bold">Upload Lampiran (jika ada)</label>
  <input type="file" className="form-control" onChange={(e) => setLampiran(e.target.files[0])} disabled={isView} />
</div>


  {/* --- Submit & Batal --- */}
<div className="col-12 mt-4 d-flex justify-content-end gap-2">
  <button
    type="button"
    className="btn btn-secondary"
    onClick={() => navigate("/")}
  >
    Batal
  </button>
  {!isView && (
    <button type="submit" className="btn btn-primary">
      Kirim Permohonan
    </button>
  )}
</div>


</form>


      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
}
