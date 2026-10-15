import type { ProjectMeta } from "@/lib/projects";

const artwork = {
  "inventory-app": (
    <div className="project-art art-inventory-app" aria-hidden="true">
      <div className="mock">
        <div className="mockbar">
          <b>IT Inventory</b>
          <span>Gudang / Stok</span>
        </div>
        <div className="inventory-workspace">
          <div className="inventory-sidebar">
            <b>Workspace</b>
            <span>Beranda</span>
            <span className="inventory-selected">Inventory</span>
            <span>Master data</span>
            <span>Pengaturan</span>
          </div>
          <div className="inventory-content">
            <div className="mocklabel">INVENTORY / STOK</div>
            <div className="mockheading">
              Stok gudang <span className="tinybtn">Filter ↓</span>
            </div>
            <div className="stock-row stock-heading">
              <span>Produk</span>
              <span>Lokasi</span>
              <span>Qty</span>
            </div>
            <div className="stock-row">
              <span>Bahan baku A</span>
              <span>WH / A</span>
              <b>240</b>
            </div>
            <div className="stock-row">
              <span>Komponen B</span>
              <span>WH / B</span>
              <b>128</b>
            </div>
            <div className="stock-row">
              <span>Produk C</span>
              <span>WH / A</span>
              <b>56</b>
            </div>
            <div className="stock-row">
              <span>Material D</span>
              <span>WH / C</span>
              <b>320</b>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  "makeup-site": (
    <div className="project-art art-makeup-site" aria-hidden="true">
      <div className="mock">
        <div className="mockbar">
          <b>Ranni Makeup</b>
          <span>Portofolio · Jadwal · Kontak</span>
        </div>
        <div className="makeup-preview">
          <div>
            <div className="mocklabel">WISUDA · PESTA · PERNIKAHAN</div>
            <div className="makeup-heading">
              Hari istimewamu,
              <br />
              <em>tampilan</em>
              <br />
              terbaikmu.
            </div>
            <span className="makeup-cta">Chat WhatsApp ↗</span>
          </div>
          <div className="makeup-arch">
            <span>
              Home
              <br />
              <em>service</em>
            </span>
          </div>
        </div>
        <div className="makeup-services">
          <span>Portofolio pilihan</span>
          <span>Cek jadwal ↗</span>
        </div>
      </div>
    </div>
  ),
  booking: (
    <div className="project-art art-one" aria-hidden="true">
      <div className="mock">
        <div className="mockbar">
          <b>odoo / Sales</b>
          <span>Booking · Work Orders</span>
        </div>
        <div className="mockbody">
          <div className="mocklabel">OPERATIONS / WORK ORDERS</div>
          <div className="mockheading">
            Team workspace <span className="tinybtn">+ New order</span>
          </div>
          <div className="kanban">
            <div className="col">
              Pending · 02
              <div className="ticket">
                WO-00001<i></i>
                <em>Team Alpha</em>
              </div>
              <div className="ticket">
                WO-00003<i></i>
                <em>Team Beta</em>
              </div>
            </div>
            <div className="col">
              In progress · 01
              <div className="ticket">
                WO-00002<i></i>
                <em>Team Gamma</em>
              </div>
            </div>
            <div className="col">
              Done · 01
              <div className="ticket">
                WO-00004<i></i>
                <em>Completed ✓</em>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  manufacturing: (
    <div className="project-art art-two" aria-hidden="true">
      <div className="mock">
        <div className="mockbar">
          <b>odoo / Manufacturing</b>
          <span>Production overview</span>
        </div>
        <div className="mockbody">
          <div className="mocklabel">MANUFACTURING / PRODUCTION</div>
          <div className="mockheading">
            Production approval <span className="tinybtn">Review</span>
          </div>
          <div className="steps">
            <span>Draft</span>
            <span>Approval</span>
            <span>Confirmed</span>
          </div>
          <div className="production-row">
            <span>MO/2026/001</span>
            <b>Awaiting approval</b>
          </div>
          <div className="production-row">
            <span>MO/2026/002</span>
            <b>Draft</b>
          </div>
          <div className="production-row">
            <span>MO/2026/003</span>
            <b>Approved ✓</b>
          </div>
        </div>
      </div>
    </div>
  ),
  inventory: (
    <div className="project-art art-three" aria-hidden="true">
      <div className="mock">
        <div className="mockbar">
          <b>odoo / Inventory</b>
          <span>Warehouse report</span>
        </div>
        <div className="mockbody">
          <div className="mocklabel">REPORTING / RAW MATERIAL</div>
          <div className="mockheading">
            Stock movement <span className="tinybtn">This month ↓</span>
          </div>
          <div className="report-summary">
            <div>
              Opening stock<b>1,240</b>
            </div>
            <div>
              Stock in<b>420</b>
            </div>
            <div>
              Stock out<b>315</b>
            </div>
          </div>
          <div className="chart">
            <i style={{ height: "35%" }}></i>
            <i style={{ height: "60%" }}></i>
            <i style={{ height: "45%" }}></i>
            <i style={{ height: "85%" }}></i>
            <i style={{ height: "65%" }}></i>
            <i style={{ height: "95%" }}></i>
            <i style={{ height: "75%" }}></i>
          </div>
        </div>
      </div>
    </div>
  ),
};

export function ProjectArt({ kind }: { kind: ProjectMeta["kind"] }) {
  return artwork[kind];
}
