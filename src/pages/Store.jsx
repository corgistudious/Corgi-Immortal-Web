import { ExternalLink, Gem, ShieldCheck, ShoppingBag, Sparkles, Ticket } from "lucide-react";

const APP_ID = "1547462791579963443";
const DISCORD_STORE = `https://discord.com/application-directory/${APP_ID}/store`;

const products = [
  { amount: 60, price: "$0.99", sku: "1550928340633001984" },
  { amount: 300, price: "$4.99", sku: "1550928450867560590" },
  { amount: 680, price: "$9.99", sku: "1550928515220635748" },
  { amount: 1280, price: "$19.99", sku: "1550928573307687113" },
  { amount: 1980, price: "$29.99", sku: "1550928633730826331" },
  { amount: 3280, price: "$49.99", sku: "1550928685635215501" },
  { amount: 6480, price: "$99.99", sku: "1550928769852776558", featured: true },
];

const skuUrl = (sku) => `https://discord.com/application-directory/${APP_ID}/store/${sku}`;

export default function Store() {
  return (
    <section className="section page store-page">
      <div className="store-hero">
        <div>
          <span className="eyebrow"><ShoppingBag size={15}/> DISCORD STORE</span>
          <h1>Tiên Các</h1>
          <p>
            Mua Linh Thạch Cực Phẩm và Season Pass chính thức qua Discord. Website không thu thập
            thông tin thẻ — toàn bộ thanh toán và xác nhận giao dịch do Discord xử lý.
          </p>
          <div className="store-hero-actions">
            <a className="primary-btn" href={DISCORD_STORE} target="_blank" rel="noreferrer">
              Mở Corgi Immortal Store <ExternalLink size={16}/>
            </a>
            <span><ShieldCheck size={16}/> Giao dịch qua Discord</span>
          </div>
        </div>
        <div className="store-orb" aria-hidden="true"><Gem size={70}/><span>仙</span></div>
      </div>

      <div className="store-notice">
        <Sparkles size={18}/>
        <div><b>Lưu ý thiết bị</b><p>Discord Premium Apps hiện hỗ trợ thanh toán trên Desktop và trình duyệt. Nếu điện thoại báo “Sản Phẩm Không Khả Dụng”, hãy mở liên kết bằng trình duyệt/Discord trên máy tính.</p></div>
      </div>

      <div className="section-heading store-heading">
        <span>LINH THẠCH CỰC PHẨM</span>
        <h2>Chọn gói phù hợp</h2>
        <p>Mỗi giao dịch hợp lệ được bot đồng bộ vào nhân vật Corgi Immortal theo entitlement của Discord.</p>
      </div>

      <div className="store-grid">
        {products.map((p) => (
          <article className={`store-card ${p.featured ? "featured" : ""}`} key={p.sku}>
            {p.featured && <span className="store-ribbon">ĐẠI PHÚC TIÊN DUYÊN</span>}
            <div className="store-card-art"><Gem size={34}/><span>×{p.amount.toLocaleString()}</span></div>
            <div className="store-card-body">
              <small>LINH THẠCH CỰC PHẨM</small>
              <h3>Gói ×{p.amount.toLocaleString()}</h3>
              <p>Nạp trực tiếp qua Discord Premium Apps.</p>
              <div className="store-buy-row"><strong>{p.price}</strong><a href={skuUrl(p.sku)} target="_blank" rel="noreferrer">Mua trên Discord <ExternalLink size={14}/></a></div>
            </div>
          </article>
        ))}
      </div>

      <article className="season-store-card">
        <div className="season-store-icon"><Ticket size={42}/></div>
        <div className="season-store-copy"><small>SEASON PASS</small><h2>Season Pass Premium</h2><p>Mở Premium Track của Season đang hoạt động cho nhân vật nhận entitlement.</p></div>
        <div className="season-store-buy"><strong>$4.99</strong><a className="primary-btn" href={skuUrl("1550929463041335399")} target="_blank" rel="noreferrer">Mua trên Discord <ExternalLink size={16}/></a></div>
      </article>

      <div className="store-footnote">
        <ShieldCheck size={18}/><p>Giá hiển thị trên website là giá USD cấu hình cho SKU. Discord có thể hiển thị giá được bản địa hóa và thuế áp dụng tại bước thanh toán.</p>
      </div>
    </section>
  );
}
