// Ringkasan kontribusi yang telah dicocokkan dengan author dan diff Git.
// Periode berikut adalah jejak kontribusi kode, bukan tanggal masa kerja.
export const experiences = [
  {
    id: "odoo",
    platform: "Odoo / Equip3",
    period: "Kontribusi kode · 2025–2026",
    title: "IT Inventory dan integrasi CEISA.",
    summary:
      "Saya mengembangkan dan memperbaiki modul Python/Odoo, terutama IT Inventory dan integrasi CEISA.",
    contributions: [
      {
        area: "IT Inventory & reporting",
        description:
          "Saya memperbaiki laporan mutasi bahan baku, WIP, dan barang jadi, termasuk perhitungan saldo dan penanganan stock opname.",
      },
      {
        area: "Integrasi CEISA",
        description:
          "Saya menyesuaikan payload dokumen kepabeanan, relasi bahan baku, serta tarif dan pungutan per barang.",
      },
      {
        area: "Manufacturing & approval",
        description:
          "Kontribusi saya mencakup production plan, validasi reservasi material, proses cutting dan assembly, serta approval matrix dan dashboard persetujuan.",
      },
    ],
    tools: ["Python", "Odoo", "JavaScript", "XML"],
  },
  {
    id: "hmx",
    platform: "HMX",
    period: "Kontribusi kode · 2026",
    title: "Fitur produksi, inventory, dan costing di HMX.",
    summary:
      "Saya mengerjakan fitur HMX dengan Python/Django dan JavaScript/Vue. Kontribusi saya terutama pada manufacturing, perencanaan material, dan inventory.",
    contributions: [
      {
        area: "Perencanaan produksi",
        description:
          "Saya menyesuaikan MPS/MRP, hierarki BoM, penjadwalan, dan batas gudang sumber material. Saya juga memperbaiki alur quality control.",
      },
      {
        area: "Inventory & kepabeanan",
        description:
          "Saya menyesuaikan status dan hak akses dokumen, pengiriman data ke middleware CEISA, serta tampilan relasi dokumen masuk dan keluar.",
      },
      {
        area: "Costing & antarmuka",
        description:
          "Saya menambahkan detail biaya subcontracting dan menyesuaikan laporan biaya produksi beserta antarmukanya.",
      },
      {
        area: "Pengujian",
        description:
          "Saya menambah dan memperbaiki unit test, regression test, serta skenario E2E/BDD untuk alur subcontracting dan detail biaya.",
      },
    ],
    tools: ["Python", "Django", "JavaScript", "Vue", "SQL", "BDD"],
  },
] as const;
