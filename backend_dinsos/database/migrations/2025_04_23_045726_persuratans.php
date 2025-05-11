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
        Schema::create('persuratans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_pemohon')->constrained('pemohons')->onDelete('cascade');
            $table->enum('status_persuratan', ['diproses', 'selesai', 'diterima']);
            $table->string('no_surat');
            $table->text('tujuan_surat');
            $table->string('asal_daerah');
            $table->string('sifat');
            $table->integer('jumlah_lampiran');
            $table->string('jenis_lampiran');
            $table->date('tgl_surat');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('persuratans');
    }
};
