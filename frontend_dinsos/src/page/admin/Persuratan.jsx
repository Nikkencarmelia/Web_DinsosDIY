import React, { useState } from "react";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import aksaraJawa from "../../assets/images/aksara_jawa.png";
import "./Persuratan.css";

const Persuratan = () => {
  const [noSurat, setNoSurat] = useState("123/DS-PKL/2025");
  const [tanggal, setTanggal] = useState("29 April 2025");
  const [sifat, setSifat] = useState("Penting");
  const [jenisSurat, setJenisSurat] = useState("observasi");
  const [previewUrl, setPreviewUrl] = useState("");

  const wrapText = (font, text, maxWidth, fontSize) => {
    const words = text.split(" ");
    const lines = [];
    let line = "";
    for (let word of words) {
      const testLine = line + word + " ";
      if (font.widthOfTextAtSize(testLine, fontSize) > maxWidth) {
        lines.push(line.trim());
        line = word + " ";
      } else {
        line = testLine;
      }
    }
    if (line) lines.push(line.trim());
    return lines;
  };

  const generatePDF = async () => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595, 842]);
    const { width, height } = page.getSize();
    const margin = 50;
    let y = height - margin;
    const font = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    const lineHeight = 18;
    const contentWidth = width - margin * 2;

    // — Kop Surat (spasi dipadatkan) —
    const title = "PEMERINTAH DAERAH DAERAH ISTIMEWA YOGYAKARTA";
    const subtitle = "DINAS SOSIAL";
    page.drawText(title, {
      x: (width - font.widthOfTextAtSize(title, 16)) / 2,
      y,
      size: 16,
      font,
      color: rgb(0, 0, 0),
    });
    y -= 16; // padat
    page.drawText(subtitle, {
      x: (width - font.widthOfTextAtSize(subtitle, 14)) / 2,
      y,
      size: 14,
      font,
      color: rgb(0, 0, 0),
    });
    y -= 16; // padat

    // — Gambar Aksara Jawa —
    const imageBytes = await fetch(aksaraJawa).then((r) => r.arrayBuffer());
    const image = await pdfDoc.embedPng(imageBytes);
    const imgWidth = 200;
    const imgHeight = (image.height / image.width) * imgWidth;
    page.drawImage(image, {
      x: (width - imgWidth) / 2,
      y: y - imgHeight,
      width: imgWidth,
      height: imgHeight,
    });
    y -= imgHeight + 8; // sedikit jarak saja

    // — Alamat & Kontak —
    const alamatBaris1 =
      "Jln. Janti Banguntapan, 55198 Yogyakarta Telepon (0274) 514932 Fak. (0274) 587060";
    const alamatBaris2 =
      "Laman: dinsos.jogjaprov.go.id Pos-el: dinsos@jogjaprov.go.id";
    [alamatBaris1, alamatBaris2].forEach((line) => {
      const tw = font.widthOfTextAtSize(line, 10);
      page.drawText(line, {
        x: (width - tw) / 2,
        y,
        size: 10,
        font,
      });
      y -= 12; // rapat antar baris
    });

    // — Garis Pemisah —
    y -= 8;
    page.drawLine({
      start: { x: margin, y },
      end: { x: width - margin, y },
      thickness: 1,
      color: rgb(0, 0, 0),
    });

    // — Spasi sebelum isi surat —
    y -= 36;

    // — Tanggal kanan atas —
    const tanggalSurat = `Yogyakarta, ${tanggal}`;
    const tanggalWidth = font.widthOfTextAtSize(tanggalSurat, 11);
    page.drawText(tanggalSurat, {
      x: width - margin - tanggalWidth,
      y,
      size: 11,
      font,
    });
    y -= lineHeight * 2;

    // — Kolom Kiri & Kanan sejajar —
    const kolomKiri = [
      `Nomor    : ${noSurat}`,
      `Lampiran : -`,
      `Sifat    : ${sifat}`,
      `Perihal  : ${
        jenisSurat === "observasi"
          ? "Jawaban Permohonan Ijin Observasi"
          : "Jawaban Permohonan Ijin Magang"
      }`,
    ];
    const kolomKanan = [
      "Kepada Yth.",
      "[Pejabat Tujuan Surat]",
      "di [Nama Instansi Tujuan]",
      "di [Kota/Kabupaten]",
    ];
    kolomKiri.forEach((textKiri, i) => {
      page.drawText(textKiri, { x: margin, y, size: 11, font });
      const textKanan = kolomKanan[i] || "";
      const tw2 = font.widthOfTextAtSize(textKanan, 11);
      page.drawText(textKanan, {
        x: width - margin - tw2,
        y,
        size: 11,
        font,
      });
      y -= lineHeight;
    });

    y -= lineHeight;

    // — Isi Surat —
    let isi1 = "";
    let isi2 = "";
    if (jenisSurat === "observasi") {
      isi1 =
        "Menanggapi surat dari [Asal Instansi] nomor: [Nomor Surat Permohonan] tanggal [Tanggal Surat Permohonan] perihal permohonan Ijin Observasi di [Lokasi Observasi], kami sampaikan bahwa permohonan tersebut dapat diterima dengan rincian sebagai berikut:";
      isi2 =
        "Adapun pelaksanaan observasi wajib mengikuti ketentuan yang berlaku di [Lokasi Observasi] serta mematuhi Standar Operasional Prosedur (SOP) yang berlaku.";
    } else {
      isi1 =
        "Menanggapi surat dari [Asal Instansi] nomor: [Nomor Surat Permohonan] tanggal [Tanggal Surat Permohonan] perihal permohonan Ijin Magang di [Lokasi Magang], kami sampaikan bahwa permohonan tersebut dapat diterima dengan rincian sebagai berikut:";
      isi2 =
        "Adapun pelaksanaan magang wajib mengikuti peraturan yang berlaku di [Lokasi Magang] serta menjaga nama baik institusi masing-masing.";
    }
    const linesIsi = [
      ...wrapText(font, isi1, contentWidth, 11),
      "",
      ...wrapText(font, isi2, contentWidth, 11),
      "",
      "Demikian, atas perhatian dan kerjasamanya kami ucapkan terima kasih.",
    ];
    linesIsi.forEach((line) => {
      page.drawText(line, { x: margin, y, size: 11, font });
      y -= lineHeight;
    });

    y -= lineHeight;

    // — Penutup & Tanda Tangan —
    const penutup = [
      "Hormat Kami,",
      "a.n. KEPALA DINAS SOSIAL DIY",
      "( Nama Kepala Dinas )",
    ];
    penutup.forEach((line) => {
      const tw = font.widthOfTextAtSize(line, 11);
      page.drawText(line, { x: width - margin - tw, y, size: 11, font });
      y -= lineHeight;
    });

    const pdfBytes = await pdfDoc.save();
    const url = URL.createObjectURL(
      new Blob([pdfBytes], { type: "application/pdf" })
    );
    setPreviewUrl(url);
  };

  return (
    <div className="persuratan-wrapper">
      <div className="form-container">
        <h2>Form Surat</h2>
        <label>Nomor Surat</label>
        <input value={noSurat} onChange={(e) => setNoSurat(e.target.value)} />
        <label>Tanggal Surat</label>
        <input value={tanggal} onChange={(e) => setTanggal(e.target.value)} />
        <label>Sifat Surat</label>
        <input value={sifat} onChange={(e) => setSifat(e.target.value)} />
        <label>Jenis Surat</label>
        <select
          value={jenisSurat}
          onChange={(e) => setJenisSurat(e.target.value)}
        >
          <option value="observasi">Jawaban Observasi</option>
          <option value="magang">Jawaban Magang</option>
        </select>
        <button onClick={generatePDF}>Generate Surat PDF</button>
      </div>
      <div className="preview-container">
        <h2>Preview Surat</h2>
        {previewUrl ? (
          <iframe
            src={previewUrl}
            title="Preview Surat"
            width="100%"
            height="600px"
          />
        ) : (
          <p>Silakan isi form lalu klik Generate Surat PDF.</p>
        )}
      </div>
    </div>
  );
};

export default Persuratan;
