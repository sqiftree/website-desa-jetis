# Website Desa Jetis

> Portal Resmi Informasi Publik dan Pelayanan Administrasi Terpadu  
> **Desa Jetis, Kecamatan Jaten, Kabupaten Karanganyar, Jawa Tengah 57771**

[![Live Demo](https://img.shields.io/badge/Demo-GitHub%20Pages-234E3F?style=flat-square)](https://sqiftree.github.io/website-desa-jetis/)
[![Stack](https://img.shields.io/badge/Stack-HTML5%20%7C%20CSS3%20%7C%20Vanilla%20JS-1B2A41?style=flat-square)](https://github.com/sqiftree/website-desa-jetis)
[![Dependencies](https://img.shields.io/badge/Dependencies-Zero-B8892B?style=flat-square)](https://github.com/sqiftree/website-desa-jetis)
[![License](https://img.shields.io/badge/License-MIT-gray?style=flat-square)](LICENSE)

**Tautan Website:** [https://sqiftree.github.io/website-desa-jetis/](https://sqiftree.github.io/website-desa-jetis/)

---

## Ringkasan Proyek

Website ini dibangun sebagai portal digital resmi untuk menghadirkan transparansi informasi publik, pengenalan profil wilayah, serta panduan layanan administrasi terpadu bagi warga **Desa Jetis**, Kecamatan Jaten, Kabupaten Karanganyar.

Dikembangkan dengan arsitektur **Zero-Dependency Vanilla Web** murni (HTML5, CSS3 kustom, dan Vanilla JavaScript ES6+) sehingga memiliki performa beban halaman yang sangat ringan (*ultra-fast load time*), ramah aksesibilitas, serta tidak memerlukan konfigurasi server yang rumit. Desain antarmuka mengadopsi estetika tipografi bersih terinspirasi *Last.fm* (font reguler bersih, micro-kickers kapital, dan garis pembatas minimalis) yang dipadukan dengan palet warna resmi pedesaan Karanganyar (*padi, emas, dan navy*).

---

## Fitur Utama

- **Beranda dan Ringkasan Wilayah:**
  - Banner informasi dan ringkasan metrik demografi desa (6.253 jiwa, 1.850 KK, 14 RW, 64 RT, luas 262,61 Ha).
  - Sekilas sejarah, visi desa, dan galeri pendopo balai desa di Dusun Gempol Rejo.
  - Kartu akses cepat layanan kependudukan dan daftar penghargaan resmi.

- **Profil Wilayah dan Sejarah Otentik:**
  - Catatan sejarah asal mula Dusun Nilorejo (era kolonial Belanda) dan Dusun Jetis Kulon sebagai sentra penggilingan padi masa Mbah Demang.
  - Sejarah pemindahan pusat Balai Desa ke Dusun Gempol Rejo pada tahun 1970-an oleh Kades Taryoko.
  - Visi, misi pembangunan, tugas pokok, fungsi, dan lembaga kemasyarakatan (BPD, LPMD, PKK, Karang Taruna, Linmas).

- **Struktur Organisasi Pemerintahan:**
  - Bagan hierarki kepemimpinan Pemerintah Desa Jetis mulai dari Kepala Desa (Nur Wibowo, S.T.), Sekretaris Desa (Triyanto, S.E.), jajaran Kepala Seksi (Kasi), Kepala Urusan (Kaur), hingga para Kepala Dusun (Kadus).

- **Data Wilayah dan Monografi Kependudukan:**
  - Tabel batas wilayah geografis (Desa Brujul, Desa Dagen, Desa Ngringo, Kec. Tasikmadu) dan 12 dusun.
  - Visualisasi batang distribusi penggunaan lahan, komposisi agama, jenjang pendidikan, serta mata pencaharian penduduk.
  - Direktori sarana dan prasarana pendidikan, kesehatan, peribadatan, dan fasilitas umum desa.

- **Layanan Administrasi Kependudukan:**
  - Panduan persyaratan berkas dan estimasi waktu penyelesaian (Akta Kelahiran 3–6 hari, Pengantar KTP-el & KK, Pengantar Nikah Model N ke KUA, Surat Keterangan Kematian, Pindah-Datang SKPWNI, dan SKU/SKTM).
  - Jadwal operasional loket pelayanan kantor desa.

- **Publikasi, Berita dan Pengumuman:**
  - Portal artikel kegiatan resmi dengan fitur pencarian teks instan (*live search*) dan filter kategori dinamis.
  - Halaman baca detail artikel berita dan papan pengumuman resmi berkala.

- **Galeri Dokumentasi dan Media:**
  - Album foto dokumentasi kegiatan fisik, musyawarah, dan pelayanan posyandu yang dilengkapi fitur tampilan *lightbox* interaktif.

- **Kontak dan Lokasi Terintegrasi:**
  - Informasi kontak resmi, alamat balai desa, kanal email, WhatsApp, formulir aspirasi warga terpadu, serta peta Google Maps interaktif.

---

## Teknologi yang Digunakan

| Komponen | Teknologi | Keterangan |
| :--- | :--- | :--- |
| **Struktur** | Semantic HTML5 | Mengutamakan A11y, heading hierarkis, dan struktur SEO |
| **Gaya & Layout** | Vanilla CSS3 | CSS Variables, CSS Grid, Flexbox, clamp typography, tanpa framework CSS |
| **Tipografi** | Google Fonts | *Barlow* (Headings & Display) & *Inter* (Body Copy) |
| **Logika & Router** | Vanilla JavaScript (ES6+) | Single-Page Application (SPA) berbasis Hash Router (`#/`) |
| **Penyimpanan Data** | JavaScript Object (`data.js`) | Pemisahan data konten yang modular dan mudah dimutakhirkan |
| **Hosting** | GitHub Pages | Hosting statis otomatis berkecepatan tinggi dengan sertifikat SSL/HTTPS |

---

## Struktur Direktori

```text
website-desa-jetis/
├── assets/
│   ├── hero.jpg          # Foto lanskap persawahan & wilayah
│   ├── kantor.jpg        # Foto otentik Kantor Kepala Desa Jetis
│   ├── kerjabakti.jpg    # Dokumentasi program kebersihan & TPST 3R
│   ├── logo-karanganyar.png # Lambang resmi Kabupaten Karanganyar
│   ├── musyawarah.jpg    # Dokumentasi rapat perangkat desa & sosialisasi
│   └── posyandu.jpg      # Dokumentasi posyandu lansia & balita
├── data.js               # Berkas konfigurasi data, profil, monografi, & berita
├── app.js                # Router SPA, komponen rendering, dan event handling
├── index.html            # Berkas HTML utama
├── style.css             # Sistem desain dan styling antarmuka
├── .gitignore            # Berkas filter git
└── README.md             # Dokumentasi proyek
```

---

## Panduan Menjalankan Secara Lokal

Website ini bersifat statis murni sehingga **tidak memerlukan tahapan instalasi (`npm install`) maupun kompilasi build**.

### Opsi 1: Buka Langsung di Browser
Klik dua kali berkas `index.html` pada File Explorer Anda, atau seret berkas tersebut ke peramban (Chrome, Edge, Firefox).

### Opsi 2: Menggunakan Server Lokal (Disarankan)
Buka terminal pada direktori proyek, lalu jalankan salah satu perintah berikut:

**Menggunakan Python:**
```bash
python -m http.server 8000
```
Buka peramban di: `http://localhost:8000`

**Menggunakan Node.js:**
```bash
npx serve
```
Buka URL lokal yang muncul pada terminal (biasanya `http://localhost:3000`).

---

## Sumber Data dan Referensi

Data dan monografi yang disajikan pada website ini disadur dari catatan publik resmi:
1. **Wikipedia Indonesia:** [Jetis, Jaten, Karanganyar](https://id.wikipedia.org/wiki/Jetis,_Jaten,_Karanganyar)
2. **Portal Informasi Resmi Desa Jetis:** [jetisjaten.blogspot.com](https://jetisjaten.blogspot.com/)
3. **Pemerintah Kabupaten Karanganyar:** [karanganyarkab.go.id](https://www.karanganyarkab.go.id)

---

## Hak Cipta dan Pengembang

Proyek ini disusun untuk tugas pembuatan website profil kelurahan/desa oleh:
- **Wilayah:** Desa Jetis, Kecamatan Jaten, Kabupaten Karanganyar
- **Kelompok:** Kelompok 8
- **Pengembang:** [@sqiftree](https://github.com/sqiftree)
