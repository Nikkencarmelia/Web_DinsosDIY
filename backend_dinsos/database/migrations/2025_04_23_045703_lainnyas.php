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
        Schema::create('lainnyas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_detail_pemohon')->constrained('detail_pemohons')->onDelete('cascade');
            $table->string('pekerjaan');
            $table->string('instansi');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lainnyas');
    }
};
