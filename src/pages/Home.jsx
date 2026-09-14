import { Link } from "react-router-dom";
import {
  Activity, ArrowRight, BookOpen, Bot, CircleHelp, MessageCircle,
  Newspaper, ScrollText, Sparkles, Trophy
} from "lucide-react";
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
      <section className="hero hero-portal">
        <div className="immortal-sky" aria-hidden="true">
          <i className="moon-disc"/>
          <i className="mountain mountain-far"/>
          <i className="mountain mountain-near"/>
          <i className="mist mist-a"/>
          <i className="mist mist-b"/>
        </div>

        <div className="hero-copy">
          <span className="eyebrow"><Sparkles size={16}/> OFFICIAL COMMUNITY PORTAL</span>
          <h1>Corgi <em>Immortal</em></h1>
          <p>
            Cổng thông tin chính thức dành cho cộng đồng Corgi Immortal — nơi cập nhật tin tức,
            tra cứu lệnh, thảo luận, gửi hỗ trợ và theo dõi những thay đổi mới nhất của bot.
          </p>
          <div className="hero-actions">
            <a className="primary-btn" href={import.meta.env.VITE_DISCORD_INVITE_URL || "#"}>
              Thêm bot vào Discord <ArrowRight size={17}/>
            </a>
            <Link className="ghost-btn" to="/gioi-thieu">Tìm hiểu dự án</Link>
          </div>
          <div className="status-strip">
            <span><i className="dot online"/> Website Online</span>
            <span><Activity size={15}/> Community Portal</span>
            <span><Bot size={15}/> Discord Bot</span>
          </div>
        </div>

        <aside className="hero-panel portal-card">
          <div className="portal-card-top">
            <span>TRUY CẬP NHANH</span>
            <small>Official Portal</small>
          </div>
          <div className="portal-emblem"><Bot size={42}/></div>
          <h3>Một nơi cho cả cộng đồng</h3>
          <p>Thông tin rõ ràng, cập nhật tập trung và hỗ trợ thuận tiện trên mọi thiết bị.</p>
          <div className="portal-links">
            <Link to="/lenh"><BookOpen size={17}/><span><b>Kho lệnh</b><small>Tra cứu hướng dẫn</small></span><ArrowRight size={15}/></Link>
            <Link to="/tin-tuc"><Newspaper size={17}/><span><b>Bản tin</b><small>Cập nhật mới nhất</small></span><ArrowRight size={15}/></Link>
            <Link to="/dien-dan"><MessageCircle size={17}/><span><b>Diễn đàn</b><small>Thảo luận cộng đồng</small></span><ArrowRight size={15}/></Link>
          </div>
        </aside>
      </section>

      <section className="section compact-section">
        <div className="section-heading">
          <span>KHÁM PHÁ</span>
          <h2>Mọi thứ bạn cần, trong một nơi</h2>
          <p className="section-lead">Giữ trải nghiệm website hiện đại, nhưng mang không khí tu tiên vừa đủ để nhận diện thế giới của Corgi Immortal.</p>
        </div>
        <div className="feature-grid">
          <Link className="feature-card" to="/lenh"><BookOpen/><h3>Tra cứu lệnh</h3><p>Tìm kiếm nhanh cú pháp, quyền và ví dụ sử dụng.</p><span className="card-more">Mở kho lệnh <ArrowRight size={14}/></span></Link>
          <Link className="feature-card" to="/tin-tuc"><Newspaper/><h3>Tin tức</h3><p>Bài viết, changelog và thông báo với reaction & bình luận.</p><span className="card-more">Đọc bản tin <ArrowRight size={14}/></span></Link>
          <Link className="feature-card" to="/dien-dan"><MessageCircle/><h3>Diễn đàn</h3><p>Đăng chủ đề, trả lời và cùng xây dựng cộng đồng.</p><span className="card-more">Tham gia thảo luận <ArrowRight size={14}/></span></Link>
          <Link className="feature-card feature-rank" to="/thien-bang"><Trophy/><h3>Thiên Bảng</h3><p>Xem Thiên Bảng theo Cảnh Giới, Tu Vi và Chiến Lực của người chơi.</p><span className="card-more">Xem xếp hạng <ArrowRight size={14}/></span></Link>
        </div>
      </section>

      <section className="section split-highlight">
        <div className="highlight-copy">
          <span className="eyebrow"><ScrollText size={16}/> DÀNH CHO THÀNH VIÊN</span>
          <h2>Kết nối Discord, trải nghiệm liền mạch hơn.</h2>
          <p>Đăng nhập bằng Discord để bình luận bài viết, tham gia diễn đàn, gửi yêu cầu hỗ trợ và theo dõi các tương tác của bạn trên website.</p>
          <Link className="ghost-btn" to="/lien-he"><CircleHelp size={17}/> Trung tâm hỗ trợ</Link>
        </div>
        <div className="highlight-orbit" aria-hidden="true"><span/><span/><span/></div>
      </section>

      <section className="section">
        <div className="section-heading row-heading">
          <div><span>CẬP NHẬT</span><h2>Tin mới nhất</h2></div>
          <Link to="/tin-tuc">Xem tất cả <ArrowRight size={15}/></Link>
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
