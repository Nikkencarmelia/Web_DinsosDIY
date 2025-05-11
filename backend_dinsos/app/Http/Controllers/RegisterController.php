<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use App\Models\User;
use App\Mail\MailSend;

class RegisterController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|email|unique:users,email',
            'password' => 'required|min:6',
        ]);

        // Membuat verifikasi key
        $verifyKey = Str::random(100);

        // Membuat user baru dengan status belum aktif
        $user = User::create([
            'name'       => $request->name,
            'email'      => $request->email,
            'password'   => Hash::make($request->password),
            'verify_key' => $verifyKey,
        ]);

        // Mengirim email verifikasi
        $details = [
            'name'     => $user->name,
            'website'  => 'Layanan PKL/Magang dan Penelitian Dinas Sosial DIY',
            'datetime' => now()->toDateTimeString(),
            'url'      => request()->getSchemeAndHttpHost() . '/register/verify/' . $verifyKey
        ];

        Mail::to($user->email)->send(new MailSend($details));

        return response()->json([
            'message' => 'Link verifikasi telah dikirim ke email Anda. Silakan cek email untuk mengaktifkan akun.'
        ], 200);
    }

    public function verify($verify_key)
    {
        // Mencari user berdasarkan verify_key
        $user = User::where('verify_key', $verify_key)->first();

        if ($user) {
            // Update status akun menjadi aktif
            $user->email_verified_at = now();
            $user->verify_key = null; // Hapus key agar tidak bisa dipakai lagi
            $user->active = true;
            $user->save();

            // Buat token setelah akun berhasil diverifikasi
            $token = $user->createToken('auth_token')->plainTextToken;

            // Kirim token ke user
            return response()->json([
                'message' => 'Verifikasi berhasil. Akun Anda sudah aktif.',
                'token'   => $token,  // Kirim token yang telah dibuat
            ], 200);
        }

        return response()->json([
            'message' => 'Key tidak valid atau sudah digunakan.'
        ], 404);
    }
}
