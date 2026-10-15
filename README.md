# Dio Rahman Alfateh — Full-Stack Developer Portfolio

Portofolio berbahasa Indonesia dengan Next.js App Router, TypeScript, konten MDX, tema gelap dan aksen lime, serta font DM Sans dan Space Grotesk. Menampilkan IT Inventory, MUA Ranni, dan pengembangan Odoo.

## Menjalankan

```bash
npm install
npm run dev -- --port 3001
# http://localhost:3001

npm run build
npm start
```

## Mengubah konten

| Konten                                               | Lokasi                               |
| ---------------------------------------------------- | ------------------------------------ |
| Nama, peran, intro, URL, email, GitHub, LinkedIn, CV | `lib/site.ts`                        |
| Metadata, fitur, dan studi kasus proyek              | `content/projects/*.mdx`             |
| Profil dan keahlian beserta contoh penerapannya      | `components/About.tsx`               |
| Hero dan arsitektur 3D                               | `components/Hero/Hero.tsx`           |
| Screenshot dan fallback ilustrasi                    | `components/Works/ProjectVisual.tsx` |
| Ilustrasi antarmuka                                  | `components/Works/ProjectArt.tsx`    |
| Token warna, layout, dan responsivitas               | `app/globals.css`                    |

Bagian pengalaman memakai `lib/experience.ts` dan `components/Experience.tsx`. Dasar penulisan dan batasan pembacaan riwayat Git dicatat di [docs/experience-evidence.md](docs/experience-evidence.md). Periode kontribusi kode tidak mewakili tanggal masa kerja.

Kartu menyediakan ringkasan dalam dialog serta tautan **Baca Studi Kasus** ke `/karya/[slug]`. Setiap studi kasus memuat ringkasan, kebutuhan, peran dan kontribusi, implementasi, tantangan teknis, dan hasil.

### Kontak dan CV

Kontak berasal dari `lib/site.ts`. GitHub aktif; `email` dan `linkedin` kosong karena belum ada kontak pribadi terverifikasi dalam repo. Kanal kosong disembunyikan. Tidak ada formulir demo atau penyimpanan kontak pengunjung.

`public/cv.pdf` telah diperiksa: isinya masih placeholder. Karena itu `site.cv` bernilai `null` dan tombol **Download CV** tidak ditampilkan. Ganti PDF dengan CV asli, periksa isi dan data publiknya, lalu isi `cv: "/cv.pdf"` untuk mengaktifkan tombol.

### Foto profil

`public/images/dio-rahman.png` adalah foto transparan yang diberikan pemilik portfolio. Foto ditampilkan dari kepala hingga dada dalam bingkai 4:5 pada bagian Tentang, memakai `next/image` dengan ukuran responsif dan placeholder blur. Crop diatur melalui CSS tanpa mengubah PNG asli atau transparansinya. Foto mengikuti reveal bagian Tentang yang sudah menghormati reduced motion.

### Screenshot, demo, dan source

Belum ada screenshot asli dalam repo. Ilustrasi diberi caption yang jelas pada setiap proyek. Untuk memakai screenshot yang sudah disiapkan, simpan aset PNG, JPEG, WebP, atau AVIF di `public/projects/`, lalu tambahkan frontmatter:

```yaml
screenshot: /projects/nama-proyek.webp
screenshotAlt: Deskripsi tampilan dan fungsi yang terlihat pada screenshot asli
```

Model juga mendukung `link` untuk demo dan `repo` untuk source (URL HTTPS). Hanya tambahkan alamat yang sudah diperiksa dan memang tersedia bagi pengunjung. Demo MUA Ranni telah diverifikasi. Source IT Inventory dan MUA Ranni belum dapat diakses publik, sehingga tautannya tidak ditampilkan.

Screenshot ditampilkan dengan `next/image`, rasio 16:10, dan `sizes` responsif. Path lokal, keberadaan file, dan alt text diperiksa saat konten dibaca. Field kosong, file hilang, atau alt yang belum diisi memakai ilustrasi. Kegagalan pemuatan di browser juga kembali ke ilustrasi.

Konten IT Inventory dan MUA Ranni dicocokkan dengan source proyek yang tersedia di folder PRJ. Materi Odoo mengikuti dokumentasi fitur yang sudah ada dalam repo. Jangan menambahkan angka dampak, riwayat produksi, atau kontribusi yang belum didukung data.

### Hero 3D

Hero menampilkan alur **Frontend → Backend → Database** menggunakan Three.js dan React Three Fiber. Tidak menggunakan model, tekstur, atau font 3D dari layanan eksternal. `@types/three` hanya digunakan untuk pengembangan TypeScript.

- `components/Hero/ArchitectureHero.tsx`: pemuatan client, deteksi kemampuan, tautan keyboard, dan fallback.
- `components/Hero/ArchitectureScene.tsx`: geometri, pencahayaan, interaksi pointer, dan render on demand.
- `components/Hero/ArchitectureFallback.tsx`: diagram SVG untuk tampilan awal, layar kecil, reduced motion, atau WebGL yang tidak tersedia.
- `components/Hero/architecture.ts`: nama lapisan, deskripsi, dan tujuan tautan studi kasus/pengalaman.

Scene dimuat terpisah saat area hero masuk layar pada viewport minimal 768px. Di bawah ukuran itu, saat reduced motion aktif, atau saat browser mengaktifkan penghematan data, diagram statis tetap menyediakan tautan yang sama. Kegagalan WebGL atau hilangnya context juga mengembalikan tampilan ke diagram.

Gerakan pointer memberi kemiringan kecil, sedangkan perubahan lapisan memicu satu lintasan paket data. Tidak ada putaran animasi permanen. Render berhenti saat idle dan dijeda ketika hero keluar layar atau tab disembunyikan. Resolusi renderer dibatasi hingga DPR 1.5.

### Animasi scroll

`components/ScrollEffects.tsx` memuat GSAP dan ScrollTrigger secara terpisah untuk reveal sekali per kunjungan halaman, stagger kartu/keahlian, parallax tipis pada ilustrasi, serta garis progres pengalaman. Screenshot asli tidak digerakkan atau dipotong untuk efek parallax.

Hero 3D menambahkan sedikit rotasi dan pergeseran berdasarkan posisi scroll. Interaksi pointer tetap tersedia dan renderer tetap berhenti saat idle atau di luar layar. Navigasi memakai scroll native dengan penanda menu yang mengikuti posisi section.

Halaman studi kasus memakai reveal singkat pada judul, visual, dan blok konten; daftar isi tetap sticky. Effect dibersihkan ketika route berganti. Konten terlihat secara default tanpa JavaScript, fokus keyboard langsung menampilkan blok terkait, dan perubahan prefers-reduced-motion mengembalikan seluruh konten ke tampilan statis.

## Verifikasi

```bash
npx tsc --noEmit
npm run build
```

Periksa beranda dan detail proyek pada lebar 360px, 768px, serta desktop. Cakupan browser mencakup navigasi keyboard, dialog (Escape, fokus, backdrop), tautan studi kasus, kontak, ketiadaan tautan CV placeholder, dan reduced motion.
