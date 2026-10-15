# Dio Rahman Alfateh — Full-Stack Developer Portfolio

Portofolio Next.js App Router dan TypeScript dengan desain gelap, aksen lime, serta tipografi DM Sans dan Space Grotesk. Desain mengikuti referensi [Dio — Programmer Portfolio](https://dio-programmer-portfolio.duskyamber.chatgpt.site).

## Menjalankan

```bash
npm install
npm run dev
# http://localhost:3000

npm run build
npm start
```

## Konten

| Konten                                      | Lokasi                            |
| ------------------------------------------- | --------------------------------- |
| Nama, peran, intro, email publik, URL situs | `lib/site.ts`                     |
| Proyek, catatan detail, teknologi           | `content/projects/*.mdx`          |
| Profil dan daftar keahlian                  | `components/About.tsx`            |
| Hero dan ilustrasi terminal                 | `components/Hero/Hero.tsx`        |
| Ilustrasi antarmuka proyek                  | `components/Works/ProjectArt.tsx` |
| Warna, tipografi, layout responsif          | `app/globals.css`                 |

Kartu proyek membuka dialog detail. Halaman `/karya/[slug]` juga tersedia untuk setiap proyek dan disertakan dalam sitemap.

Isi `site.email` di `lib/site.ts` agar tombol kontak menampilkan alamat publik. Jika kosong, dialog kontak mengikuti demo referensi: pengunjung dapat mencoba menyimpan email di browser sendiri menggunakan localStorage. Email demo tidak tersimpan di server atau terlihat oleh pengunjung lain.

Karya pilihan menampilkan IT Inventory dan MUA Ranni berdasarkan kode proyek di folder PRJ, serta Booking & Work Order dari pengalaman Odoo. React, Next.js, TypeScript, Tailwind CSS, Python, PostgreSQL, Docker, Vite, dan Odoo ditampilkan sebagai toolkit.

Ilustrasi proyek dibuat dengan HTML dan CSS, bukan tangkapan layar aplikasi produksi. Catatan proyek Odoo berasal dari referensi awal; sesuaikan dengan pengalaman dan data proyek yang ingin dipublikasikan.

## Struktur

```text
app/                  Layout, beranda, halaman proyek, SEO
components/           Navigasi, hero, proyek, dialog, profil, kontak, footer
content/projects/     Konten proyek MDX
lib/                  Konfigurasi situs dan pembaca konten
```

## Verifikasi

```bash
npx tsc --noEmit
npm run build
```
