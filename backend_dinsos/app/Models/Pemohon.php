<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pemohon extends Model
{
    use HasFactory;

    protected $table = 'pemohons';

    protected $fillable = [
        'id_user',
        'jenis_pemohon',
        'jenis_pengajuan',
        'jumlah_orang',
        'total_orang',
        'perihal',
        'keperluan',
        'tgl_permohonan',
        'tgl_pelaksanaan',
        'tgl_selesai',
        'unit_kerja',
        'judul_penelitian',
        'lampiran',
        'surat_pengantar',
        'status_permohonan',
    ];

    // Relasi ke user
    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }

    // Relasi ke banyak detail pemohon (1 pemohon bisa punya 1-5+ anggota)
    public function detail_pemohon()
    {
        return $this->hasMany(Detail_Pemohon::class, 'id_pemohon');
    }

}
