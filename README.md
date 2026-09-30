# Dio Rahman Alfateh — portofolio eksperimental

Situs portofolio pribadi yang dibangun dengan Next.js (App Router) dan Motion, berdasarkan PRD "Portofolio Eksperimental".

## Menjalankan

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build produksi (webpack, bundle lebih kecil dari Turbopack)
npm start
```

## Mengubah konten

| Apa | Di mana |
| --- | --- |
| Nama, intro, email, link sosial, URL situs | `lib/site.ts` |
| Proyek (satu file per proyek) | `content/projects/*.mdx` |
| CV | `public/cv.pdf` |
| Manifesto dan daftar tools | `components/Manifesto.tsx`, `components/About.tsx` |
| Warna dan token | `app/globals.css`, `lib/motion.ts` |

Menambah proyek tidak perlu menyentuh kode animasi. Buat file MDX baru dengan frontmatter:

```yaml
title: Pasar Senin
slug: pasar-senin
year: 2026
role: Creative developer
tools: [Next.js, Motion]
summary: Identitas dan situs untuk pasar kuliner malam.
pattern: orbit          # orbit | grid | wave | stripes — sampul animasi bawaan
cover: /projects/x.jpg  # opsional; kalau diisi, gambar menggantikan pola
featured: true          # tampil di galeri beranda (maks. 6)
order: 1
link: https://contoh.com
repo: https://github.com/...
```

## Struktur

```
app/
  layout.tsx            font, bar atas, kursor, LazyMotion
  page.tsx              beranda
  karya/[slug]/page.tsx detail proyek
components/
  Hero/                 SplitName, ReactiveLetter
  Works/                HorizontalGallery, WorkCard, Cover
  Manifesto.tsx  About.tsx  Contact.tsx  MagneticButton.tsx  Cursor.tsx  Nav.tsx
lib/
  motion.ts             token spring & variants
  projects.ts           baca dan urutkan MDX
content/projects/       *.mdx
```
