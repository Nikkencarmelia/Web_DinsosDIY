import React, { useState, useEffect } from 'react'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "../page/Landing.css";
import { useNavigate } from "react-router-dom";

// Gambar carousel
import slide1 from '../assets/images/slide1.jpg';
import slide2 from '../assets/images/slide2.jpg';
import slide3 from '../assets/images/slide3.jpg';

// Gambar card info pelayanan
import jangka_waktu from '../assets/images/card_jangka_waktu_pelayanan.jpg';
import persyaratan from '../assets/images/card_persyaratan_pelayanan.jpg';
import prosedur from '../assets/images/card_prosedur_pelayanan.jpg';
import standar_pelayanan from '../assets/images/standar_pelayanan.jpg';

const LandingPage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const status = localStorage.getItem("isLoggedIn") === "true";
        setIsLoggedIn(status);
    }, []);

    const handleLogin = () => {
        if (isLoggedIn) {
            navigate("/user/form");
        } else {
            alert("Silakan login terlebih dahulu untuk mendaftar.");
            navigate("/login");
        }
    };

    return (
        <div>
            {/* Carousel Section */}
            <div id="carouselExampleCaptions" className="carousel slide carousel-container" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src={slide1} className="d-block w-100 carousel-img" alt="Slide 1" />
                    </div>
                    <div className="carousel-item">
                        <img src={slide2} className="d-block w-100 carousel-img" alt="Slide 2" />
                    </div>
                    <div className="carousel-item">
                        <img src={slide3} className="d-block w-100 carousel-img" alt="Slide 3" />
                    </div>
                </div>
                <div className="carousel-caption position-absolute start-0 top-50 text-start ms-4 p-3">
                    <h2 className="text-white fw-bold">Layanan PKL/magang & Penelitian</h2>
                    <h4 className="text-white fw-semibold">Dinas Sosial Daerah Istimewa Yogyakarta</h4>
                    <p className="carousel-text">
                        Raih pengalaman nyata dan kembangkan potensimu melalui program magang dan penelitian di Dinas Sosial Daerah Istimewa Yogyakarta untuk mendukung pembelajaran langsung di dunia kerja!
                    </p>
                    <button className="btn-transparent" onClick={handleLogin}>
                        Daftar Sekarang
                    </button>
                </div>
            </div>

            {/* Informasi Pelayanan */}
            <div className="container mt-5 informasi-pelayanan">
                <h1 className="text-center">Informasi Pelayanan</h1>
                <p className="text-center">
                    Berikut ini panduan lengkap untuk memastikan proses pengajuan PKL, magang, atau penelitianmu berjalan lancar!
                </p>

                <div className="d-flex justify-content-center gap-4 mt-4 mb-5 flex-wrap">
                    <div className="card" style={{ width: "23rem" }}>
                        <img src={persyaratan} className="card-img-top" alt="Persyaratan" />
                        <div className="card-body">
                            <h5 className="card-title">Persyaratan Pelayanan</h5>
                            <p className="card-text">
                                1. Warga negara Indonesia <br />
                                2. Menyerahkan surat permohonan dari sekolah, universitas 
                                atau instansi resmi yang ditujukan ke Dinas Sosial DIY.
                            </p>
                        </div>
                    </div>

                    <div className="card" style={{ width: "23rem" }}>
                        <img src={prosedur} className="card-img-top" alt="Prosedur" />
                        <div className="card-body">
                            <h5 className="card-title">Prosedur Pelayanan</h5>
                            <p className="card-text">
                                1. Pemohon menyerahkan surat pengantar dari instansi <br />
                                2. Petugas memproses permohonan dan UPTD terkait <br />
                                3. Petugas menerbitkan surat pengantar izin penelitian ke UPTD terkait <br />
                                4. Layanan ini tidak dikenakan biaya / GRATIS
                            </p>
                        </div>
                    </div>

                    <div className="card" style={{ width: "23rem" }}>
                        <img src={jangka_waktu} className="card-img-top" alt="Jangka Waktu" />
                        <div className="card-body">
                            <h5 className="card-title">Jangka Waktu Penyelesaian</h5>
                            <p className="card-text">
                                Proses penyelesaian akan dilakukan dalam jangka waktu 1-3 hari kerja 
                                sejak surat diterima oleh bagian persuratan, dengan memastikan setiap permohonan 
                                diproses secara teliti dan sesuai prosedur yang berlaku.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Standar pelayanan */}
            <div className="container my-5 standar-pelayanan">
    <div className="row align-items-center">
        <div className="col-md-5">
            <img src={standar_pelayanan} className="img-fluid rounded shadow" alt="Standar Pelayanan" />
        </div>
        <div className="col-md-7">
            <h1 className="fw-bold text-start">Standar Pelayanan</h1>
            <h5 className="fw-bold mb-4 text-start">Komponen Manufacturing Delivery</h5>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title fw-bold">Sarana, Prasarana, dan Fasilitas</h5>
                            <p className="card-text">
                                Dalam memberikan layanan informasi publik, menyediakan ruang layanan berupa ruang Layanan Informasi Publik,
                                yang dilengkapi fasilitas 1 unit PC terkoneksi dengan internet; Meja; Kursi; Telepon.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 mb-3">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title fw-bold">Jaminan Keamanan dan Keselamatan Pelayanan</h5>
                            <p className="card-text">
                                Dinas Sosial menjamin kerahasiaan data pemohon.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 mb-3">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title fw-bold">Pengawasan Internal</h5>
                            <p className="card-text">
                                Dilaksanakan oleh atasan langsung.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 mb-3">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title fw-bold">Waktu Pelayanan</h5>
                            <p className="card-text">
                                Senin - Kamis (08.00 - 15.00)
                            </p>
                            <p className="card-text">
                                Jumat (08.00 - 14.00)
                            </p>
                            <p className="card-text">
                                (kecuali bulan puasa 08.00 - 11.00)
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title fw-bold">Evaluasi Kinerja Pelaksana</h5>
                            <p className="card-text">
                                Dilakukan setiap 6 bulan.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

        </div>
    );
};

export default LandingPage;
