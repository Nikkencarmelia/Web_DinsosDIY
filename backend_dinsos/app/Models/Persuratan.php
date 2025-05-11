<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Persuratan extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_pemohon',
        'status_persuratan',
        'no_surat',
        'tujuan_surat',
        'asal_daerah',
        'sifat',
        'jumlah_lampiran',
        'jenis_lampiran',
        'tgl_surat'
    ];

    // Relasi ke tabel Pemohon
    public function pemohon()
    {
        return $this->belongsTo(Pemohon::class, 'id_pemohon');
    }
}
