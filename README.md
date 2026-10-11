# Website Kelurahan (Tugas Kelompok)

Website statis (HTML + CSS + JavaScript), tanpa database dan tanpa install apa pun.

## Menjalankan di localhost
Pilih salah satu:
1. **Paling mudah:** klik dua kali `index.html`.
2. **Server lokal (disarankan):** buka terminal di folder ini, lalu
   - Python: `python -m http.server 8000`
   - Node: `npx serve`
   kemudian buka http://localhost:8000

## Cara mengisi data
Semua isi website ada di **`data.js`**. Cari teks `[ISI ...]` lalu ganti dengan data asli kelurahan.
- Kelompok 8 (genap) → Kecamatan Jaten, Kabupaten Karanganyar (sudah diatur). Kelompok ganjil → Mojolaban, Kabupaten Sukoharjo.
- Foto: taruh di folder `assets/`, lalu tulis path-nya, mis. `"assets/foto1.jpg"`.
- Peta: Google Maps → Bagikan → Sematkan peta → salin isi `src="..."` ke `petaEmbed`.
- Banner kuning di atas halaman hilang otomatis setelah semua `[ISI` terganti.

## Halaman
Beranda · Profil (sejarah, visi-misi, tugas-fungsi, lembaga) · Struktur organisasi ·
Data wilayah & monografi · Layanan · Berita (cari + filter + detail) · Galeri · Kontak.
