<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Detail_Pemohon;

class Mahasiswa extends Model
{
    use HasFactory;

    protected $table = 'mahasiswas';

    protected $fillable = [
        'id_detail_pemohon',
        'nim',
        'prodi',
        'jenjang_studi',
        'universitas',
    ];

    /**
     * Relasi ke pemohon
     */
    // Model Mahasiswa.php
public function detailPemohon()
{
    return $this->belongsTo(Detail_Pemohon::class, 'id_detail_pemohon');
}

}
