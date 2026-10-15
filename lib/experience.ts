// Ringkasan kontribusi yang telah dicocokkan dengan author dan diff Git.
// Periode berikut adalah jejak kontribusi kode, bukan tanggal masa kerja.
export const experiences = [
  {
    id: "odoo",
    platform: "Odoo / Equip3",
    period: "Kontribusi kode · 2025–2026",
    title: "Inventory, kepabeanan, dan proses produksi.",
    summary:
      "Mengembangkan dan memperbaiki modul aplikasi bisnis berbasis Python/Odoo, dengan fokus terbesar pada IT Inventory dan integrasi CEISA.",
    contributions: [
      {
        area: "IT Inventory & reporting",
        description:
          "Laporan mutasi bahan baku, WIP, dan barang jadi; perhitungan saldo serta penanganan stock opname.",
      },
      {
        area: "Integrasi CEISA",
        description:
          "Pemetaan payload dokumen kepabeanan, data bahan baku, serta tarif dan pungutan per barang.",
      },
      {
        area: "Manufacturing & approval",
        description:
          "Production plan, reservasi material, proses cutting dan assembly, serta approval matrix dan dashboard persetujuan.",
      },
    ],
    tools: ["Python", "Odoo", "JavaScript", "XML"],
  },
  {
    id: "hmx",
    platform: "HMX",
    period: "Kontribusi kode · 2026",
    title: "Manufacturing dari backend sampai antarmuka.",
    summary:
      "Mengembangkan fitur HMX dengan Python/Django dan antarmuka JavaScript/Vue, terutama pada manufacturing, perencanaan material, dan inventory.",
    contributions: [
      {
        area: "Planning & produksi",
        description:
          "MPS/MRP, hierarki BoM, penjadwalan, pembatasan gudang sumber material, dan alur quality control.",
      },
      {
        area: "Inventory & kepabeanan",
        description:
          "Lifecycle dan hak akses dokumen, pengiriman data ke middleware CEISA, serta visualisasi relasi dokumen masuk–keluar.",
      },
      {
        area: "Costing & antarmuka",
        description:
          "Detail biaya subcontracting, laporan biaya produksi, serta widget dan tampilan interaktif untuk alur operasional.",
      },
      {
        area: "Pengujian",
        description:
          "Unit dan regression test untuk fitur bisnis, serta skenario E2E/BDD pada alur subcontracting dan detail biaya.",
      },
    ],
    tools: ["Python", "Django", "JavaScript", "Vue", "SQL", "BDD"],
  },
] as const;
