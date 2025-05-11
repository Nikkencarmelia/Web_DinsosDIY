<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Detail_Pemohon;

class Lainnya extends Model
{
    use HasFactory;

    protected $table = 'lainnyas';

    protected $fillable = [
        'id_detail_pemohon',
        'pekerjaan',
        'instansi',
    ];

    /**
     * Relasi ke pemohon
     */
    public function pemohon()
    {
        return $this->belongsTo(Pemohon::class, 'id_detail_pemohon');
    }
}
