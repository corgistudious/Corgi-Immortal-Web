import { Link } from "react-router-dom";
import { Activity, ArrowRight, BookOpen, Bot, MessageCircle, Newspaper, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { fmtDate } from "../lib/utils";

export default function Home() {
  const [latest, setLatest] = useState([]);

  useEffect(() => {
    if (!supabase) return;
    supabase
      .from("articles")
      .select("id,title,slug,excerpt,created_at")
      .eq("published", true)
      .order("created_at", { ascending: false })
      .limit(3)
      .then(({ data }) => setLatest(data || []));
  }, []);

  return (
    <>
      <section className="hero">
        <div className="hero-glow"/>
        <div className="hero-copy">
          <span className="eyebrow"><Sparkles size={16}/> CỔNG THÔNG TIN CHÍNH THỨC</span>
          <h1>Corgi Immortal</h1>
          <p>
            Một không gian dành cho cộng đồng: khám phá bot, tra cứu lệnh, đọc tin tức,
            thảo luận tại diễn đàn và gửi hỗ trợ trực tiếp đến đội ngũ phát triển.
          </p>
          <div className="hero-actions">
            <a className="primary-btn" href={import.meta.env.VITE_DISCORD_INVITE_URL || "#"}>Thêm bot vào Discord <ArrowRight size={17}/></a>
            <Link className="ghost-btn" to="/gioi-thieu">Khám phá thêm</Link>
          </div>
          <div className="status-strip">
            <span><i className="dot online"/> Website Online</span>
            <span><Activity size={15}/> Community Portal</span>
            <span><Bot size={15}/> Discord Bot</span>
          </div>
        </div>
        <div className="hero-panel">
          <div className="sigil"><Bot size={60}/></div>
          <h3>Immortal Realm</h3>
          <p>Thông tin • Cộng đồng • Tin tức • Hỗ trợ</p>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <span>KHÁM PHÁ</span>
          <h2>Mọi thứ trong một nơi</h2>
        </div>
        <div className="feature-grid">
          <Link className="feature-card" to="/lenh"><BookOpen/><h3>Tra cứu lệnh</h3><p>Tìm kiếm nhanh cú pháp, quyền và ví dụ sử dụng.</p></Link>
          <Link className="feature-card" to="/tin-tuc"><Newspaper/><h3>Tin tức</h3><p>Bài viết, changelog và thông báo với reaction & bình luận.</p></Link>
          <Link className="feature-card" to="/dien-dan"><MessageCircle/><h3>Diễn đàn</h3><p>Đăng chủ đề, trả lời và cùng xây dựng cộng đồng.</p></Link>
        </div>
      </section>

      <section className="section">
        <div className="section-heading row-heading">
          <div><span>CẬP NHẬT</span><h2>Tin mới nhất</h2></div>
          <Link to="/tin-tuc">Xem tất cả →</Link>
        </div>
        <div className="news-grid">
          {latest.length ? latest.map(a => (
            <Link className="news-card" to={`/tin-tuc/${a.slug}`} key={a.id}>
              <span className="news-tag">Corgi Immortal</span>
              <h3>{a.title}</h3>
              <p>{a.excerpt}</p>
              <small>{fmtDate(a.created_at)}</small>
            </Link>
          )) : (
            <div className="empty-card">Chưa có bài viết. Admin có thể đăng bài đầu tiên trong trang Quản trị.</div>
          )}
        </div>
      </section>
    </>
  );
}
