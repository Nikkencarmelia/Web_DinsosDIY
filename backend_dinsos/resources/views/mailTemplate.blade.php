<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verifikasi Akun</title>
</head>
<body>
    <p>
        Halo <strong>{{ $details['name'] }}</strong>!
    </p>
    <p>
        Anda telah melakukan registrasi akun menggunakan email ini.
    </p>
    <p>
        Berikut adalah data Anda:
    </p>

    <table cellpadding="4">
        <tr>
            <td><strong>Username</strong></td>
            <td>:</td>
            <td>{{ $details['name'] }}</td>
        </tr>
        <tr>
            <td><strong>Website</strong></td>
            <td>:</td>
            <td>{{ $details['website'] }}</td>
        </tr>
        <tr>
            <td><strong>Tanggal Registrasi</strong></td>
            <td>:</td>
            <td>{{ $details['datetime'] }}</td>
        </tr>
    </table>

    <br>

    <center>
        <h3>Silakan klik link di bawah ini untuk verifikasi akun Anda:</h3>
        <p>
            <a href="http://{{ $details['url'] }}" style="color: blue;">
                {{ $details['url'] }}
            </a>
        </p>
    </center>

    <br>

    <p>
        Terima kasih telah melakukan registrasi.
    </p>
</body>
</html>
