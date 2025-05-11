<?php

namespace App\Http\Controllers;

use App\Models\Pemohon;
use App\Models\Mahasiswa;
use App\Models\Siswa;
use App\Models\Lainnya;
use App\Models\Detail_Pemohon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;


class PengajuanController extends Controller
{
    // ============================
    // 🔍 GET semua pengajuan
    // ============================
    public function index(Request $request)
    {
        $user = $request->user();

        // Ambil semua pengajuan, kecuali kalau bukan admin
        $pengajuans = Pemohon::with(['user', 'mahasiswa', 'siswa', 'lainnya', 'detail_pemohon'])
            ->when($user->role !== 'admin', fn ($q) => $q->where('id_user', $user->id))
            ->get();

        return response()->json([
            'message' => $pengajuans->isEmpty() ? 'No data found' : 'Retrieve All Success',
            'data'    => $pengajuans,
        ], 200);
    }

    // ============================
    // 📝 CREATE pengajuan baru
    // ============================

    public function store(Request $request)
    {
        // Validasi input user
        $data = $request->validate([
            'jenis_pemohon'     => 'required|in:mahasiswa,siswa,lainnya',
            'jenis_pengajuan'   => 'required|in:magang,penelitian',
            'jumlah_orang'      => 'required|integer',
            'total_orang'       => 'nullable|integer',
            'perihal'           => 'required|string',
            'keperluan'         => 'required|string',
            'tgl_permohonan'    => 'required|date',
            'tgl_pelaksanaan'   => 'nullable|date',
            'tgl_selesai'       => 'nullable|date',
            'unit_kerja'        => 'required|string',
            'judul_penelitian'  => 'nullable|string',
            'lampiran'          => 'nullable|file|mimes:pdf,doc,docx|max:2048',
            'surat_pengantar'   => 'nullable|file|mimes:pdf,doc,docx|max:2048',
            'status_permohonan' => 'sometimes|string',
            'detail_pemohon'    => 'required|array|min:1',
        ]);

        $data['id_user'] = $request->user()->id;
        $data['status_permohonan'] = $data['status_permohonan'] ?? 'diproses';

        // Validasi nim jika jenis pemohon adalah mahasiswa
        if ($data['jenis_pemohon'] === 'mahasiswa' && empty($request->input('detail_pemohon.0.nim'))) {
            return response()->json([
                'message' => 'NIM harus diisi untuk mahasiswa.',
            ], 400);
        }

        // Upload file jika ada
        if ($request->hasFile('lampiran')) {
            $data['lampiran'] = $request->file('lampiran')->store('lampiran', 'public');
        }

        if ($request->hasFile('surat_pengantar')) {
            $data['surat_pengantar'] = $request->file('surat_pengantar')->store('surat_pengantar', 'public');
        }

        DB::beginTransaction();

        try {
            // Simpan ke tabel pemohon
            $pemohon = Pemohon::create($data);

            // Kalau > 5 orang → hanya simpan perwakilan
            $details = $data['jumlah_orang'] > 5 ? [$data['detail_pemohon'][0]] : $data['detail_pemohon'];

            // Simpan ke tabel Detail_Pemohon
            $detailPemohonIds = [];
            foreach ($details as $d) {
                $detailPemohon = Detail_Pemohon::create([
                    'id_pemohon' => $pemohon->id,
                    'nama'       => $d['nama'],
                    'no_hp'      => $d['no_hp'],
                ]);
                $detailPemohonIds[] = $detailPemohon->id; // Simpan ID Detail Pemohon
            }

            // Simpan ke tabel sesuai jenis pemohon
            switch ($data['jenis_pemohon']) {
                case 'mahasiswa':
                    foreach ($data['detail_pemohon'] as $key => $d) {
                        if (empty($d['nim']) || empty($d['prodi']) || empty($d['jenjang_studi']) || empty($d['universitas'])) {
                            return response()->json([
                                'message' => 'NIM, Prodi, Jenjang Studi, dan Universitas harus diisi untuk setiap mahasiswa.',
                            ], 400);
                        }

                        Mahasiswa::create([
                            'id_pemohon'    => $pemohon->id,
                            'id_detail_pemohon' => $detailPemohonIds[$key], // Hubungkan ke Detail_Pemohon
                            'nim'           => $d['nim'],
                            'prodi'         => $d['prodi'],
                            'jenjang_studi' => $d['jenjang_studi'],
                            'universitas'   => $d['universitas'],
                        ]);
                    }
                    break;

                case 'siswa':
                    foreach ($data['detail_pemohon'] as $d) {
                        Siswa::create([
                            'id_pemohon' => $pemohon->id,
                            'nis'        => $d['nis'],
                            'sekolah'    => $d['sekolah'],
                        ]);
                    }
                    break;

                case 'lainnya':
                    foreach ($data['detail_pemohon'] as $d) {
                        Lainnya::create([
                            'id_pemohon' => $pemohon->id,
                            'pekerjaan'  => $d['pekerjaan'],
                            'instansi'   => $d['instansi'],
                        ]);
                    }
                    break;

                default:
                    throw new \Exception('Jenis pemohon tidak dikenali');
            }

            // Set total orang kalau lebih dari 5
            if ($data['jumlah_orang'] > 5) {
                $pemohon->update(['total_orang' => $data['jumlah_orang']]);
            }

            DB::commit();

            return response()->json([
                'message' => 'Pengajuan berhasil disimpan',
                'data'    => $pemohon,
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'message' => 'Gagal menyimpan pengajuan',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }


    // ============================
    // ✏ UPDATE pengajuan
    // ============================
    // ============================
// ✏ UPDATE pengajuan
// ============================

public function update(Request $request, $id)
{
    // Cari pemohon
    $pemohon = Pemohon::find($id);
    if (!$pemohon) {
        return response(['message' => 'Pemohon tidak ditemukan'], 404);
    }

    $data = $request->all();
    $validator = Validator::make($data, [
        'jenis_pemohon' => 'required|in:mahasiswa,siswa,lainnya',
        'detail_pemohon' => 'required|array|min:1',
        'detail_pemohon.*.id' => 'nullable|integer',
        'detail_pemohon.*.nama' => 'required|string',
        'detail_pemohon.*.no_hp' => 'required|string',
        'detail_pemohon.*.nim' => 'required_if:jenis_pemohon,mahasiswa',
        'detail_pemohon.*.prodi' => 'required_if:jenis_pemohon,mahasiswa',
        'detail_pemohon.*.jenjang_studi' => 'required_if:jenis_pemohon,mahasiswa',
        'detail_pemohon.*.universitas' => 'required_if:jenis_pemohon,mahasiswa',
        'detail_pemohon.*.nis' => 'required_if:jenis_pemohon,siswa',
        'detail_pemohon.*.sekolah' => 'required_if:jenis_pemohon,siswa',
        'detail_pemohon.*.pekerjaan' => 'required_if:jenis_pemohon,lainnya',
        'detail_pemohon.*.instansi' => 'required_if:jenis_pemohon,lainnya',
    ]);

    if ($validator->fails()) {
        return response(['message' => $validator->errors()], 400);
    }

    DB::beginTransaction();
    try {
        // 🔁 Cek perubahan di data Pemohon
        if ($pemohon->jenis_pemohon !== $data['jenis_pemohon']) {
            $pemohon->jenis_pemohon = $data['jenis_pemohon'];
            $pemohon->save();
        }

        // 🚮 Hapus detail pemohon yang tidak ada di input
        $inputIds = collect($data['detail_pemohon'])->pluck('id')->filter()->toArray();
        $detailsToDelete = $pemohon->detail_pemohon()->whereNotIn('id', $inputIds)->get();

        foreach ($detailsToDelete as $detail) {
            switch ($data['jenis_pemohon']) {
                case 'mahasiswa':
                    Mahasiswa::where('id_detail_pemohon', $detail->id)->delete();
                    break;
                case 'siswa':
                    Siswa::where('id_detail_pemohon', $detail->id)->delete();
                    break;
                case 'lainnya':
                    Lainnya::where('id_detail_pemohon', $detail->id)->delete();
                    break;
            }
            $detail->delete();
        }

        // 🔄 Update atau tambah detail pemohon baru
        foreach ($data['detail_pemohon'] as $d) {
            $detail = isset($d['id']) ? Detail_Pemohon::find($d['id']) : new Detail_Pemohon(['id_pemohon' => $pemohon->id]);
            $isDetailChanged = ($detail->nama ?? null) !== $d['nama'] || ($detail->no_hp ?? null) !== $d['no_hp'];
            if ($isDetailChanged || !$detail->exists) {
                $detail->nama = $d['nama'];
                $detail->no_hp = $d['no_hp'];
                $detail->save();
            }

            switch ($data['jenis_pemohon']) {
                case 'mahasiswa':
                    $mhs = Mahasiswa::firstOrNew(['id_detail_pemohon' => $detail->id]);
                    if ($mhs->nim !== ($d['nim'] ?? null) || $mhs->prodi !== ($d['prodi'] ?? null) || $mhs->jenjang_studi !== ($d['jenjang_studi'] ?? null) || $mhs->universitas !== ($d['universitas'] ?? null)) {
                        $mhs->fill([
                            'nim' => $d['nim'],
                            'prodi' => $d['prodi'],
                            'jenjang_studi' => $d['jenjang_studi'],
                            'universitas' => $d['universitas'],
                        ])->save();
                    }
                    break;

                case 'siswa':
                    $sis = Siswa::firstOrNew(['id_detail_pemohon' => $detail->id]);
                    if ($sis->nis !== ($d['nis'] ?? null) || $sis->sekolah !== ($d['sekolah'] ?? null)) {
                        $sis->fill([
                            'nis' => $d['nis'],
                            'sekolah' => $d['sekolah'],
                        ])->save();
                    }
                    break;

                case 'lainnya':
                    $lain = Lainnya::firstOrNew(['id_detail_pemohon' => $detail->id]);
                    if ($lain->pekerjaan !== ($d['pekerjaan'] ?? null) || $lain->instansi !== ($d['instansi'] ?? null)) {
                        $lain->fill([
                            'pekerjaan' => $d['pekerjaan'],
                            'instansi' => $d['instansi'],
                        ])->save();
                    }
                    break;
            }
        }

        DB::commit();
        return response(['message' => 'Update berhasil'], 200);
    } catch (\Exception $e) {
        DB::rollback();
        return response(['message' => 'Gagal update: ' . $e->getMessage()], 500);
    }
}






}
