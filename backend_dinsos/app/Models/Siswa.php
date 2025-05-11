<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Detail_Pemohon;

class Siswa extends Model
{
    use HasFactory;

    protected $table = 'siswas';

    protected $fillable = [
        'id_detail_pemohon',
        'nis',
        'sekolah',
    ];

    /**
     * Relasi ke pemohon
     */
    public function pemohon()
    {
        return $this->belongsTo(Pemohon::class, 'id_detail_pemohon');
    }
}
