import { Bot, Compass, Shield, Sparkles, Users } from "lucide-react";

export default function About() {
  return (
    <section className="page section">
      <div className="page-hero">
        <span className="eyebrow"><Sparkles size={16}/> GIỚI THIỆU</span>
        <h1>Không chỉ là một Discord bot.</h1>
        <p>Corgi Immortal được xây dựng như một hệ sinh thái cộng đồng: bot, nội dung, trò chơi, trợ giúp và tương tác đều có thể phát triển chung trong một thương hiệu duy nhất.</p>
      </div>

      <div className="about-grid">
        <article><Bot/><h3>Bot Discord</h3><p>Trung tâm trải nghiệm chính với hệ thống lệnh, tính năng cộng đồng và các module gameplay.</p></article>
        <article><Users/><h3>Cộng đồng</h3><p>Website tạo thêm không gian trao đổi dài hạn ngoài Discord thông qua tin tức và diễn đàn.</p></article>
        <article><Shield/><h3>Quản trị rõ ràng</h3><p>Nội dung, phản hồi và quyền quản trị được tách riêng, giúp vận hành an toàn và dễ mở rộng.</p></article>
        <article><Compass/><h3>Phát triển lâu dài</h3><p>Kiến trúc website có thể mở rộng thêm wiki, bảng xếp hạng, hồ sơ người chơi, sự kiện và nhiều module khác.</p></article>
      </div>

      <div className="timeline">
        <div><b>01</b><span><strong>Khám phá</strong><p>Tìm hiểu bot và tính năng.</p></span></div>
        <div><b>02</b><span><strong>Tham gia</strong><p>Đăng nhập Discord và vào cộng đồng.</p></span></div>
        <div><b>03</b><span><strong>Đóng góp</strong><p>Thảo luận, báo lỗi, góp ý và giúp dự án tốt hơn.</p></span></div>
      </div>
    </section>
  );
}
