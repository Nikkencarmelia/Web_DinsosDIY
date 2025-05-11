<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pemohons', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_user')->constrained('users')->onDelete('cascade');
            $table->enum('jenis_pemohon', ['mahasiswa', 'siswa', 'lainnya']);
            $table->enum('jenis_pengajuan', ['magang', 'penelitian']);
            $table->enum('jumlah_orang', ['1', '2', '3', '4', '5', 'lebih_dari_5']);
            $table->integer('total_orang')->nullable();
            $table->string('perihal');
            $table->string('keperluan');
            $table->date('tgl_permohonan');
            $table->date('tgl_pelaksanaan');
            $table->date('tgl_selesai');
            $table->enum('unit_kerja', [
                'Dinas Sosial Daerah Istimewa Yogyakarta',
                'Balai Rehabilitasi Terpadu Penyandang Disabilitas',
                'Balai Rehabilitasi Sosial Bina Karya dan Laras',
                'Balai Perlindungan dan Rehabilitasi Sosial Remaja',
                'Balai Rehabilitasi Sosial dan Pengasuhan Anak',
                'Balai Perlindungan dan Rehabilitasi Sosial Wanita',
                'Balai pelayanan Sosial Tresna Werdha'
            ]);
            $table->text('judul_penelitian')->nullable();
            $table->string('lampiran')->nullable();
            $table->string('surat_pengantar')->nullable();
            $table->enum('status_permohonan', ['diproses', 'diterima', 'ditolak']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pemohons');
    }
};
