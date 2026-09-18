# Deploy Our Story V7 Fix ke GitHub Pages

Project ini sudah diubah menjadi static Vite app khusus GitHub Pages tanpa mengubah isi cerita/foto yang kamu edit, kecuali penyesuaian path asset agar bekerja di subfolder repository GitHub Pages.

## Privasi yang perlu dipahami

- `robots.txt` dan meta `noindex` sudah dipasang agar search engine diminta untuk tidak mengindeks situs.
- Ini membuat situs lebih "unlisted", tetapi BUKAN autentikasi. Siapa pun yang mengetahui URL masih bisa membukanya.
- Kalau repository kamu public, source code dan foto juga bisa dilihat dari repository.
- Jika akun GitHub kamu mendukung Pages dari private repository, gunakan private repository agar source tidak mudah dilihat. Halaman Pages biasa tetap public kecuali kamu memakai GitHub Enterprise Cloud access control.

## Nama repository yang disarankan

Gunakan nama yang tidak mudah ditebak, misalnya:

`our-story-18sep-7f4c2a9e`

Maka link Pages akan kira-kira:

`https://USERNAME.github.io/our-story-18sep-7f4c2a9e/`

Jangan taruh password, token API, alamat pribadi, nomor identitas, atau data sensitif di source.

## Cara push termudah di Windows

1. Buat repository KOSONG di GitHub. Jangan centang README, .gitignore, atau License.
2. Extract ZIP project ini.
3. Double-click `PUSH-TO-GITHUB.bat`.
4. Paste URL HTTPS repository, misalnya:
   `https://github.com/USERNAME/our-story-18sep-7f4c2a9e.git`
5. Kalau Git meminta login, selesaikan login melalui browser/Git Credential Manager.
6. Setelah push sukses, buka repository di GitHub.
7. Buka `Settings` -> `Pages`.
8. Di `Build and deployment`, pilih `Source: GitHub Actions`.
9. Buka tab `Actions` dan lihat workflow `Deploy Our Story to GitHub Pages`.
10. Setelah hijau, link situs muncul di `Settings` -> `Pages`.

## Cara push manual

```powershell
git init
git add .
git commit -m "Deploy Our Story V7 fixed source"
git branch -M main
git remote add origin https://github.com/USERNAME/NAMA-REPO.git
git push -u origin main
```

Setelah itu aktifkan `Settings` -> `Pages` -> `GitHub Actions`.

## Update website berikutnya

```powershell
git add .
git commit -m "Update Our Story"
git push
```

Setiap push ke `main` akan men-deploy ulang otomatis.
