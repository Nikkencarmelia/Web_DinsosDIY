import React from "react";
import "../components/Usercomponents.css";  // Path yang benar karena berada di folder 'components'
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { AiFillInstagram } from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        <h4>Dinas Sosial Daerah Istimewa Yogyakarta</h4>
        <p>
          Raih pengalaman nyata dan kembangkan potensimu melalui program magang 
          dan penelitian di Dinas Sosial Daerah Istimewa Yogyakarta untuk 
          mendukung pembelajaran langsung di dunia kerja!
        </p>
        <p className="copyright">
          © {new Date().getFullYear()} Dinas Sosial Daerah Istimewa Yogyakarta. All Rights Reserved.
        </p>
      </div>

      <div className="footer-right">
        <h4>Kontak Kami</h4>
        <p><FaLocationDot /> Jalan Janti, Kecamatan Banguntapan, Bantul, DIY</p>
        <p><FaPhoneAlt /> +6289676571252 (Hanya melayani informasi magang dan penelitian)</p>
        <p><MdEmail /> <a href="mailto:dinsos@jogjaprov.go.id">dinsos@jogjaprov.go.id</a></p>
        <p><AiFillInstagram /> <a href="https://www.instagram.com/dinassosialdiy">@dinassosialdiy</a></p>
      </div>
    </footer>
  );
};

export default Footer;
