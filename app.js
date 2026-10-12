(function () {
  const D = DATA;
  const $ = (s, r = document) => r.querySelector(s);
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const nm = `${D.jenis} ${D.nama}`;
  const fmt = (n) => Number(n).toLocaleString("id-ID");
  const tgl = (s) => new Date(s + "T00:00:00").toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
  const inisial = (s) => (s.replace(/[\[\]]/g, "").replace(/^ISI\s*/i, "").trim()[0] || "J").toUpperCase();
  const lokasi = `Kecamatan ${D.kecamatan}, Kabupaten ${D.kabupaten}, ${D.provinsi}`;

  const MENU = [
    ["/", "Beranda"], ["/profil", "Profil"], ["/struktur", "Struktur"],
    ["/data", "Data Wilayah"], ["/layanan", "Layanan"], ["/berita", "Berita"],
    ["/galeri", "Galeri"], ["/kontak", "Kontak"]
  ];

  /* ---------- komponen kecil ---------- */
  const judulHalaman = (judul, sub) => `
    <div class="page-title"><div class="wrap">
      <div class="crumb"><a href="#/">Beranda</a> / ${esc(judul)}</div>
      <h1>${esc(judul)}</h1>
      ${sub ? `<p>${esc(sub)}</p>` : ""}
    </div></div>`;

  const bars = (arr) => {
    const max = Math.max(1, ...arr.map(a => a.nilai));
    return `<ul class="bars">${arr.map(a => `
      <li><span>${esc(a.label)}</span><span class="t"><i style="width:${(a.nilai / max) * 100}%"></i></span><em>${fmt(a.nilai)}</em></li>`).join("")}</ul>`;
  };
  const gambar = (src, alt) => src ? `<img src="${esc(src)}" alt="${esc(alt)}" loading="lazy">` : "";

  /* ---------- halaman ---------- */
  const pages = {
    "/"() {
      const dm = D.demografi, w = D.wilayah;
      const terbaru = [...D.berita].sort((a, b) => b.tanggal.localeCompare(a.tanggal)).slice(0, 3);
      return `
      <section class="hero"${D.hero ? ` style="background-image:linear-gradient(rgba(20,45,36,.75),rgba(20,45,36,.75)),url('${esc(D.hero)}');background-size:cover;background-position:center"` : ""}><div class="wrap">
        <p class="lokasi">${esc(lokasi)}</p>
        <h1>${esc(nm)}</h1>
        <p>${esc(D.tagline)}</p>
        <a class="btn" href="#/layanan">Lihat layanan</a>
        <a class="btn ghost" href="#/profil">Profil ${esc(D.jenis.toLowerCase())}</a>
      </div></section>

      <div class="statline"><div class="wrap statgrid">
        <div class="stat"><b>${fmt(dm.total)}</b><span>Jumlah penduduk</span></div>
        <div class="stat"><b>${fmt(dm.kepalaKeluarga)}</b><span>Kepala keluarga</span></div>
        <div class="stat"><b>${esc(w.jumlahRW)}</b><span>RW</span></div>
        <div class="stat"><b>${esc(w.jumlahRT)}</b><span>RT</span></div>
        <div class="stat"><b>${esc(w.luas)}</b><span>Luas wilayah</span></div>
      </div></div>

      <section class="blok"><div class="wrap grid g2">
        <div><h2>Tentang ${esc(nm)}</h2>
          <p>${esc(D.sejarah[0])}</p>
          <a href="#/profil" style="font-weight:600;font-size:.95rem">Baca profil lengkap →</a></div>
        <div>${D.fotoKantor ? `<figure style="margin:0 0 1rem 0">${gambar(D.fotoKantor, "Kantor Kepala Desa " + D.nama)}<figcaption style="font-size:0.84rem;color:var(--redup);margin-top:0.4rem;font-style:italic">Kantor Kepala Desa ${esc(D.nama)}, Dusun Gempol Rejo</figcaption></figure>` : ""}<div class="card"><h3>Visi desa</h3><p>${esc(D.visi)}</p></div></div>
      </div></section>

      <section class="blok putih"><div class="wrap">
        <div class="head"><h2>Layanan administrasi</h2><a href="#/layanan">Semua layanan</a></div>
        <div class="grid g4">${D.layanan.map((l, i) => `
          <a class="card layanan-card" href="#/layanan">
            <span class="num">${esc(l.kode || String(i + 1).padStart(2, "0"))}</span>
            <h3>${esc(l.nama)}</h3>
            <span class="meta">Estimasi ${esc(l.waktu)}</span></a>`).join("")}</div>
      </div></section>

      <section class="blok"><div class="wrap">
        <div class="head"><h2>Penghargaan dan prestasi</h2></div>
        <div class="grid g3">${D.penghargaan.map(p => `
          <div class="card award-card">
            <span class="badge-tag">${esc(p.tahun)}</span>
            <h3>${esc(p.judul)}</h3>
            <p class="meta">${esc(p.pemberi)}</p>
          </div>`).join("")}</div>
      </div></section>

      <section class="blok putih"><div class="wrap">
        <div class="head"><h2>Publikasi dan transparansi</h2></div>
        <div class="grid g3">${D.dokumen.map(d => d.file
          ? `<a class="card doc-card" href="${esc(d.file)}" download><span class="badge-tag">PDF</span><h3>${esc(d.judul)}</h3><span class="meta">Unduh dokumen</span></a>`
          : `<div class="card doc-card"><span class="badge-tag">Dokumen Resmi</span><h3>${esc(d.judul)}</h3><span class="meta">Tersedia di loket kantor desa</span></div>`).join("")}</div>
      </div></section>

      <section class="blok"><div class="wrap grid g-news">
        <div><div class="head"><h2>Berita terkini</h2><a href="#/berita">Semua berita</a></div>
          <div class="grid g2">${terbaru.map(beritaCard).join("")}</div></div>
        <div><div class="head"><h2>Pengumuman</h2></div><ul class="pengumuman">${D.pengumuman.map(p =>
          `<li><time>${tgl(p.tanggal)}</time><span>${esc(p.judul)}</span></li>`).join("")}</ul></div>
      </div></section>

      <section class="blok putih"><div class="wrap grid g2" style="align-items:center">
        <div>
          ${D.video.youtubeId
            ? `<div class="video-preview" onclick="this.innerHTML='<iframe class=\\'video-frame\\' src=\\'https://www.youtube.com/embed/${esc(D.video.youtubeId)}?autoplay=1\\' allow=\\'autoplay; encrypted-media; picture-in-picture\\' allowfullscreen></iframe>'" title="Klik untuk memutar video">
                <img src="${esc(D.video.thumbnail || D.hero || 'assets/hero.jpg')}" alt="${esc(D.video.judul)}">
                <div class="play-btn-wrap">
                  <span class="play-circle"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 3 20 12 6 21 6 3"/></svg></span>
                  <span class="play-label">Tonton Video Profil</span>
                </div>
              </div>`
            : `<figure style="margin:0">${gambar(D.fotoKantor || D.hero, D.video.judul)}<figcaption style="font-size:0.84rem;color:var(--redup);margin-top:0.4rem;font-style:italic">Dokumentasi ${esc(nm)}</figcaption></figure>`}
        </div>
        <div>
          <h2>Informasi publik</h2>
          <h3>${esc(D.video.judul)}</h3>
          <p>${esc(D.video.deskripsi)}</p>
          ${D.video.youtubeId ? `<p style="margin-top:1.1rem"><a class="btn dark" href="https://www.youtube.com/watch?v=${esc(D.video.youtubeId)}" target="_blank" rel="noopener">Buka di YouTube ↗</a></p>` : ""}
        </div>
      </div></section>`;
    },

    "/profil"() {
      return judulHalaman("Profil", `Sejarah, visi, misi, serta tugas dan fungsi ${nm}`) + `
      <section class="blok"><div class="wrap grid g2" style="align-items:start">
        <div><h2>Sejarah desa</h2>${D.sejarah.map(p => `<p>${esc(p)}</p>`).join("")}</div>
        <div>
          ${D.fotoKantor ? `<figure style="margin:0 0 1.25rem 0">${gambar(D.fotoKantor, "Kantor Kepala Desa " + D.nama)}<figcaption style="font-size:0.84rem;color:var(--redup);margin-top:0.4rem;font-style:italic">Kantor Kepala Desa ${esc(D.nama)}, Dusun Gempol Rejo</figcaption></figure>` : ""}
          <div class="card"><h3>Letak geografis</h3><p>${esc(nm)} berada di ${esc(lokasi)}. Wilayah ini memiliki posisi strategis di wilayah perlintasan timur laut Surakarta dengan aksesibilitas tinggi serta perpaduan antara kawasan industri manufaktur terkemuka dan area persawahan produktif.</p></div>
        </div>
      </div></section>
      <section class="blok putih"><div class="wrap grid g2" style="align-items:start">
        <div><h2>Visi desa</h2><p>${esc(D.visi)}</p></div>
        <div><h2>Misi pembangunan</h2><ol style="margin:0;padding-left:1.25rem">${D.misi.map(m => `<li style="margin-bottom:.5rem">${esc(m)}</li>`).join("")}</ol></div>
      </div></section>
      <section class="blok"><div class="wrap grid g2" style="align-items:start">
        <div><h2>Tugas pokok</h2><p>${esc(D.tugasFungsi.tugas)}</p></div>
        <div><h2>Fungsi</h2><ul style="margin:0;padding-left:1.25rem">${D.tugasFungsi.fungsi.map(f => `<li style="margin-bottom:.4rem">${esc(f)}</li>`).join("")}</ul></div>
      </div></section>
      <section class="blok putih"><div class="wrap"><h2>Lembaga kemasyarakatan</h2>
        <div class="grid g3">${D.lembaga.map(l => `<div class="card"><h3>${esc(l.nama)}</h3><p>${esc(l.isi)}</p></div>`).join("")}</div>
      </div></section>`;
    },

    "/struktur"() {
      const lv = n => D.struktur.filter(s => s.level === n);
      const p = s => `<div class="person l${s.level}">
        <div class="avatar">${s.foto ? gambar(s.foto, s.nama) : esc(inisial(s.nama))}</div>
        <b>${esc(s.nama)}</b><small>${esc(s.jabatan)}</small></div>`;
      return judulHalaman("Struktur organisasi", `Pemerintah ${nm}`) + `
      <section class="blok"><div class="wrap"><div class="org">
        <div class="row">${lv(1).map(p).join("")}</div><div class="stem"></div>
        <div class="row">${lv(2).map(p).join("")}</div><div class="stem"></div>
        <div class="row">${lv(3).map(p).join("")}</div><div class="stem"></div>
        <div class="row">${lv(4).map(p).join("")}</div>
      </div></div></section>`;
    },

    "/data"() {
      const w = D.wilayah, dm = D.demografi;
      const row = (a, b) => `<tr><th scope="row">${a}</th><td>${esc(b)}</td></tr>`;
      return judulHalaman("Data wilayah dan monografi", `Tahun data ${dm.tahunData}`) + `
      <section class="blok"><div class="wrap grid g2" style="align-items:start">
        <div><h2>Batas dan luas wilayah</h2><div class="scroll"><table>
          ${row("Luas wilayah", w.luas)}${row("Ketinggian tanah", w.ketinggian)}
          ${row("Jumlah dusun/kebayanan", w.jumlahDusun)}${row("Jumlah RW", w.jumlahRW)}${row("Jumlah RT", w.jumlahRT)}
          ${row("Batas utara", w.batas.utara)}${row("Batas selatan", w.batas.selatan)}
          ${row("Batas timur", w.batas.timur)}${row("Batas barat", w.batas.barat)}
        </table></div></div>
        <div><h2>Kependudukan</h2><div class="scroll"><table>
          ${row("Jumlah penduduk", fmt(dm.total) + " jiwa")}${row("Laki-laki", fmt(dm.lakiLaki) + " jiwa")}
          ${row("Perempuan", fmt(dm.perempuan) + " jiwa")}${row("Kepala keluarga", fmt(dm.kepalaKeluarga) + " KK")}
        </table></div>
        <h3 style="margin-top:1.5rem">Penggunaan lahan (Ha)</h3>${bars(w.penggunaanLahan)}</div>
      </div></section>
      <section class="blok putih"><div class="wrap grid g3" style="align-items:start">
        <div><h2>Komposisi agama</h2>${bars(dm.agama)}</div>
        <div><h2>Tingkat pendidikan</h2>${bars(dm.pendidikan)}</div>
        <div><h2>Mata pencaharian</h2>${bars(dm.pekerjaan)}</div>
      </div></section>
      <section class="blok"><div class="wrap"><h2>Potensi unggulan wilayah</h2>
        <div class="grid g3">${D.potensi.map(p => `<div class="card"><h3>${esc(p.judul)}</h3><p>${esc(p.isi)}</p></div>`).join("")}</div>
      </div></section>
      <section class="blok putih"><div class="wrap"><h2>Sarana dan prasarana</h2>
        <div class="grid g4">${D.fasilitas.map(f => `<div class="card"><h3>${esc(f.kategori)}</h3><ul style="margin:0;padding-left:1.1rem">${f.daftar.map(x => `<li style="margin-bottom:.3rem">${esc(x)}</li>`).join("")}</ul></div>`).join("")}</div>
      </div></section>`;
    },

    "/layanan"() {
      return judulHalaman("Layanan administrasi", "Persyaratan berkas dan estimasi waktu penyelesaian") + `
      <section class="blok"><div class="wrap">
        <p>Bawa dokumen asli dan fotokopi ke loket pelayanan Kantor ${esc(nm)} pada jam kerja pelayanan. Untuk informasi lebih lanjut, silakan hubungi kontak resmi kantor desa.</p>
        ${D.layanan.map((l, i) => `
        <details class="syarat"><summary><span class="badge-tag">${esc(l.kode || String(i + 1).padStart(2, "0"))}</span>${esc(l.nama)}<span class="waktu">Estimasi ${esc(l.waktu)}</span></summary>
          <div class="isi"><p>${esc(l.deskripsi)}</p><h3>Persyaratan administrasi</h3><ul style="margin:0;padding-left:1.25rem">${l.syarat.map(s => `<li style="margin-bottom:.35rem">${esc(s)}</li>`).join("")}</ul></div>
        </details>`).join("")}
        <h3 style="margin-top:2.2rem;margin-bottom:.75rem">Jadwal operasional pelayanan kantor</h3>
        <div class="scroll" style="max-width:440px"><table>${D.kontak.jamLayanan.map(j => `<tr><th scope="row">${esc(j[0])}</th><td>${esc(j[1])}</td></tr>`).join("")}</table></div>
      </div></section>`;
    },

    "/berita"() {
      const kat = [...new Set(D.berita.map(b => b.kategori))];
      return judulHalaman("Berita dan pengumuman", `Publikasi kegiatan resmi ${nm}`) + `
      <section class="blok"><div class="wrap">
        <div class="tools">
          <input type="search" id="cari" placeholder="Cari berita..." aria-label="Cari berita">
          <select id="kat" aria-label="Filter kategori"><option value="">Semua kategori</option>${kat.map(k => `<option>${esc(k)}</option>`).join("")}</select>
        </div>
        <div class="grid g3" id="daftarBerita"></div>
        <div class="head" style="margin-top:3.5rem"><h2>Pengumuman resmi</h2></div>
        <ul class="pengumuman">${D.pengumuman.map(p => `<li><time>${tgl(p.tanggal)}</time><span>${esc(p.judul)}</span></li>`).join("")}</ul>
      </div></section>`;
    },

    "/galeri"() {
      return judulHalaman("Galeri dokumentasi", `Dokumentasi kegiatan dan pembangunan ${nm}`) + `
      <section class="blok"><div class="wrap"><div class="grid g2" style="grid-template-columns:repeat(auto-fit,minmax(280px,1fr))">
        ${D.galeri.map((g, i) => `<button class="foto" data-i="${i}" aria-label="Lihat foto: ${esc(g.keterangan)}">${gambar(g.src, g.keterangan)}<span>${esc(g.keterangan)}</span></button>`).join("")}
      </div></div></section>`;
    },

    "/kontak"() {
      const k = D.kontak;
      return judulHalaman("Kontak dan lokasi", "Saluran komunikasi dan lokasi kantor pelayanan") + `
      <section class="blok"><div class="wrap grid g2" style="align-items:start">
        <div>
          <h2>Kantor ${esc(D.jenis.toLowerCase())}</h2>
          <div class="scroll"><table>
            <tr><th scope="row">Alamat</th><td>${esc(k.alamat)}</td></tr>
            <tr><th scope="row">Telepon</th><td>${esc(k.telepon)}</td></tr>
            <tr><th scope="row">Email</th><td>${esc(k.email)}</td></tr>
            <tr><th scope="row">Kode pos</th><td>${esc(D.kodePos)}</td></tr>
            ${k.whatsapp ? `<tr><th scope="row">WhatsApp</th><td><a href="https://wa.me/${esc(k.whatsapp)}" target="_blank" rel="noopener">+${esc(k.whatsapp)}</a></td></tr>` : ""}
          </table></div>
          <h3 style="margin-top:1.75rem;margin-bottom:.75rem">Peta lokasi kantor</h3>
          ${k.petaEmbed ? `<iframe class="map" src="${esc(k.petaEmbed)}" loading="lazy" title="Peta lokasi kantor desa"></iframe>`
            : `<div class="map mapkosong">Peta lokasi kantor desa</div>`}
        </div>
        <div class="card"><h2>Kirim pesan</h2>
          <p style="color:var(--redup);font-size:.92rem;margin-bottom:1.2rem">Sampaikan pertanyaan, masukan, atau aspirasi Anda langsung kepada pengelola website desa.</p>
          <form class="kontak" id="formKontak">
            <label>Nama Lengkap<input name="nama" required placeholder="Nama Anda"></label>
            <label>Email atau Nomor Telepon<input name="kontak" required placeholder="email@contoh.com atau 08..."></label>
            <label>Isi Pesan<textarea name="pesan" rows="5" required placeholder="Tuliskan pesan Anda..."></textarea></label>
            <button class="btn dark" type="submit">Kirim pesan</button>
          </form>
          <div id="terkirim" class="ok" hidden>Pesan Anda berhasil dicatat. Terima kasih atas partisipasi dan masukan Anda.</div>
        </div>
      </div></section>`;
    }
  };

  function beritaCard(b) {
    return `<article class="card berita">
      <div class="img">${b.gambar ? gambar(b.gambar, b.judul) : `<div style="padding:2rem;text-align:center;color:var(--redup)">${esc(b.kategori)}</div>`}</div>
      <div class="body"><div class="meta">${tgl(b.tanggal)}<span class="tag">${esc(b.kategori)}</span></div>
      <h3><a class="judul" href="#/berita/${b.id}">${esc(b.judul)}</a></h3><p>${esc(b.ringkas)}</p></div></article>`;
  }

  function detailBerita(id) {
    const b = D.berita.find(x => String(x.id) === String(id));
    if (!b) return judulHalaman("Berita tidak ditemukan") + `<section class="blok"><div class="wrap"><p>Berita yang dicari tidak ada. <a href="#/berita">Kembali ke daftar berita</a>.</p></div></section>`;
    return judulHalaman(b.judul, `${tgl(b.tanggal)} · ${b.kategori}`) + `
      <section class="blok"><div class="wrap artikel">
        ${b.gambar ? `<p>${gambar(b.gambar, b.judul)}</p>` : ""}
        ${b.isi.map(p => `<p>${esc(p)}</p>`).join("")}
        <p style="margin-top:2rem"><a href="#/berita" style="font-weight:600">← Kembali ke daftar berita</a></p></div></section>`;
  }

  /* ---------- shell ---------- */
  function renderShell() {
    document.title = `${nm} — Kecamatan ${D.kecamatan}, Kabupaten ${D.kabupaten}`;
    $("#brand").innerHTML = `<span class="logo${D.lambang ? " has-img" : ""}">${D.lambang ? gambar(D.lambang, "Lambang Kabupaten " + D.kabupaten) : esc(inisial(D.nama))}</span>
      <span>${esc(nm)}<small>Pemerintah Kab. ${esc(D.kabupaten)} · Kec. ${esc(D.kecamatan)}</small></span>`;
    $("#nav").innerHTML = MENU.map(([h, t]) => `<a href="#${h}" data-h="${h}">${t}</a>`).join("");
    const s = D.kontak.sosmed, sm = Object.entries(s).filter(([, v]) => v).map(([k, v]) => `<li><a href="${esc(v)}" target="_blank" rel="noopener">${k}</a></li>`).join("");
    $("#footer").innerHTML = `<div class="wrap grid g3">
      <div>
        <div class="footer-brand">
          ${D.lambang ? `<img src="${esc(D.lambang)}" alt="Lambang Kabupaten ${esc(D.kabupaten)}" class="footer-logo">` : ""}
          <div>
            <h3>${esc(nm)}</h3>
            <small>Pemerintah Kab. ${esc(D.kabupaten)}</small>
          </div>
        </div>
        <p>${esc(D.kontak.alamat)}<br>Kec. ${esc(D.kecamatan)}, Kab. ${esc(D.kabupaten)}</p>
      </div>
      <div><h3>Navigasi</h3><ul>${MENU.map(([h, t]) => `<li><a href="#${h}">${t}</a></li>`).join("")}</ul></div>
      <div><h3>Referensi Resmi</h3><ul>${D.acuan.map(a => `<li><a href="${esc(a.url)}" target="_blank" rel="noopener">${esc(a.nama)}</a></li>`).join("")}${sm}</ul></div>
    </div><div class="wrap copy">© ${new Date().getFullYear()} Pemerintah ${esc(nm)}. Tugas Pembuatan Website Kelurahan/Desa, Kelompok ${esc(D.kelompok)}.</div>`;
    if (JSON.stringify(D).includes("[ISI")) $("#notice").hidden = false;
    $("#menuBtn").onclick = () => {
      const o = $("#nav").classList.toggle("open"); $("#menuBtn").setAttribute("aria-expanded", o);
    };
  }

  /* ---------- router ---------- */
  function route() {
    const path = (location.hash.replace(/^#/, "") || "/");
    const m = path.match(/^\/berita\/(.+)$/);
    const html = m ? detailBerita(m[1]) : (pages[path] || pages["/"])();
    $("#main").innerHTML = html;
    const aktif = m ? "/berita" : (pages[path] ? path : "/");
    document.querySelectorAll("nav a").forEach(a => { if (a.dataset.h === aktif) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current"); });
    $("#nav").classList.remove("open"); $("#menuBtn").setAttribute("aria-expanded", "false");
    window.scrollTo(0, 0);
    if (path === "/berita") bindBerita();
    if (path === "/galeri") bindGaleri();
    if (path === "/kontak") $("#formKontak").onsubmit = e => { e.preventDefault(); e.target.hidden = true; $("#terkirim").hidden = false; };
  }

  function bindBerita() {
    const draw = () => {
      const q = $("#cari").value.toLowerCase(), k = $("#kat").value;
      const list = [...D.berita].sort((a, b) => b.tanggal.localeCompare(a.tanggal))
        .filter(b => (!k || b.kategori === k) && (b.judul + b.ringkas).toLowerCase().includes(q));
      $("#daftarBerita").innerHTML = list.length ? list.map(beritaCard).join("") : `<p>Tidak ada berita yang cocok. Ubah kata kunci atau kategori.</p>`;
    };
    $("#cari").oninput = draw; $("#kat").onchange = draw; draw();
  }

  function bindGaleri() {
    const lb = $("#lightbox");
    const tutup = () => { lb.hidden = true; lb.innerHTML = ""; };
    document.querySelectorAll(".foto").forEach(btn => btn.onclick = () => {
      const g = D.galeri[btn.dataset.i];
      lb.innerHTML = `<figure>${g.src ? `<img src="${esc(g.src)}" alt="${esc(g.keterangan)}">` : `<div class="ph">Foto belum diunggah</div>`}
        <figcaption>${esc(g.keterangan)}</figcaption><p><button class="btn" id="tutupLb">Tutup</button></p></figure>`;
      lb.hidden = false; $("#tutupLb").focus(); $("#tutupLb").onclick = tutup;
    });
    lb.onclick = e => { if (e.target === lb) tutup(); };
    document.onkeydown = e => { if (e.key === "Escape") tutup(); };
  }

  renderShell();
  window.addEventListener("hashchange", route);
  route();
})();
