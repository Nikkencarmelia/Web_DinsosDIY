<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Detail_Pemohon extends Model
{
    use HasFactory;

    protected $table = 'detail_pemohons';

    protected $fillable = [
        'id_pemohon',
        'nama',
        'no_hp'
    ];

     // Relasi ke tabel pemohon (many-to-one)
     public function pemohon()
{
    return $this->belongsTo(Pemohon::class, 'id_pemohon');
}


     public function mahasiswa()
{
    return $this->hasMany(Mahasiswa::class, 'id_detail_pemohon'); // Gunakan hasMany jika 1 Detail_Pemohon bisa memiliki banyak Mahasiswa
}

public function siswa()
{
    return $this->hasMany(Siswa::class, 'id_detail_pemohon'); // Gunakan hasMany jika 1 Detail_Pemohon bisa memiliki banyak Siswa
}

public function lainnya()
{
    return $this->hasMany(Lainnya::class, 'id_detail_pemohon'); // Gunakan hasMany jika 1 Detail_Pemohon bisa memiliki banyak Lainnya
}


}
