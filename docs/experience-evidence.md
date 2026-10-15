# Dasar konten pengalaman

Ditinjau pada 15 Oktober 2026 dari checkout lokal `Equip3-moduleboard` dan `hmx-002`. Tujuannya memverifikasi bidang kontribusi untuk portfolio, bukan mengaudit performa kerja.

## Metode dan batasan

- Riwayat disaring menggunakan email author yang diberikan pengguna, dengan pencocokan email persis. Variasi nama author tetap dicocokkan melalui email tersebut.
- Periksa path yang berubah, subjek commit, serta diff dan berkas pada commit representatif. Identitas author dan subjek commit saja tidak digunakan sebagai bukti lengkap suatu fitur.
- Merge dan snapshot stash dikeluarkan dari pengelompokan. Ada cherry-pick lintas branch; jumlah commit tidak ditampilkan sebagai metrik kontribusi atau prestasi.
- Riwayat Equip3 lokal tidak shallow. Riwayat HMX lokal **shallow**, sehingga hasil HMX hanya mencakup commit yang tersedia, bukan seluruh riwayat kerja.
- Periode pada UI adalah tahun kontribusi kode yang ditemukan: Equip3 2025–2026 dan HMX 2026. Itu bukan tanggal mulai/akhir kerja atau bukti masih bekerja pada suatu jabatan.
- HashMicro adalah konteks organisasi dari repo dan identitas author. Tidak menetapkan jabatan formal, senioritas, kontribusi tunggal, pelanggan, angka dampak, atau status deployment.
- Tidak menyalin source perusahaan, nama pelanggan, URL internal, atau email author ke konten publik. Identitas yang dipakai untuk pencarian tidak dijadikan kanal kontak portfolio.

## Equip3 / Odoo

Area paling menonjol dalam path perubahan: IT Inventory dan CEISA, diikuti manufacturing, cutting, assembly, serta workflow approval. Kontribusi juga ditemukan pada modul agriculture dan mining, tetapi tidak dirinci pada UI agar fokus pada area terkuat.

| Commit representatif | Bukti yang diperiksa                                          | Ringkasan untuk portfolio                                 |
| -------------------- | ------------------------------------------------------------- | --------------------------------------------------------- |
| `94b2e5bf111c`       | Diff laporan mutasi bahan baku dan stock opname               | Penanganan saldo, selisih, dan kondisi tanpa stock opname |
| `e08ddf0e85a7`       | Perubahan laporan inventory gabungan                          | Perbaikan sumber nilai pada laporan inventory             |
| `6e0f43f6bf`         | Diff pemetaan dokumen CEISA                                   | Relasi bahan baku dan tarif/pungutan per produk           |
| `3b35b666e2b0`       | Diff wizard reservasi material                                | Validasi reservasi dan pembulatan satuan                  |
| `729b81522591`       | Berkas dashboard, controller, konfigurasi, dan model approval | Modularisasi dashboard persetujuan lintas modul           |
| `572829dce43f`       | Perubahan laporan Python dan list-view JavaScript             | Penyesuaian UI laporan inventory                          |

## HMX

Area paling menonjol: manufacturing; berikutnya IT Inventory dan integrasi modul purchase, sale, serta accounting. Beberapa commit mencakup model Python/Django, XML, JavaScript/Vue, unit/regression test, dan skenario E2E/BDD.

| Commit representatif | Bukti yang diperiksa                                         | Ringkasan untuk portfolio                                   |
| -------------------- | ------------------------------------------------------------ | ----------------------------------------------------------- |
| `17c85b3b74cc`       | Diff model MRP dan daftar berkas widget                      | Batas gudang sumber material dan validasi perusahaan/cabang |
| `20ceadbada71`       | Perubahan planning, pemilihan BoM, integrasi sales, dan test | Hierarki BoM serta konteks planning dan referensi sales     |
| `6abac89db7`         | Diff submit dokumen ke middleware                            | Validasi sebelum pengiriman dokumen CEISA                   |
| `b92fb22e1353`       | Perubahan security, lifecycle, serta unit test               | Akses peran/domain dan lifecycle dokumen                    |
| `3d7a48bb2bd0`       | Berkas JavaScript/Vue/CSS serta isi test relasi              | Visualisasi alur dokumen IN–OUT                             |
| `6a8be4512d76`       | Model, widget Vue, unit test, dan isi feature BDD            | Detail biaya subcontracting dan pengujian alur bisnis       |
| `12a24127e457`       | Perubahan model dan antarmuka QC                             | Penyesuaian alur quality control produksi                   |
| `93b9773afa02`       | Perubahan laporan biaya serta test                           | Akses dan tampilan laporan biaya produksi                   |

Referensi ini dapat diperiksa dengan `git show <commit>` di repo sumber terkait. Tidak menautkan repo perusahaan dari website karena akses publiknya tidak diasumsikan.
