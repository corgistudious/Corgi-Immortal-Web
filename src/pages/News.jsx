import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Newspaper } from "lucide-react";
import { supabase } from "../lib/supabase";
import { fmtDate } from "../lib/utils";

export default function News() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(Boolean(supabase));

  useEffect(() => {
    if (!supabase) return;
    supabase.from("articles")
      .select("id,title,slug,excerpt,cover_url,created_at,profiles:author_id(display_name,avatar_url)")
      .eq("published", true).order("created_at", { ascending: false })
      .then(({ data }) => { setItems(data || []); setLoading(false); });
  }, []);

  return (
    <section className="page section">
      <div className="page-hero compact">
        <span className="eyebrow"><Newspaper size={16}/> TIN TỨC</span>
        <h1>Bản tin Corgi Immortal</h1>
        <p>Thông báo, cập nhật phiên bản, sự kiện và bài viết từ đội ngũ phát triển.</p>
      </div>
      {loading ? <div className="center-loader">Đang tải tin…</div> :
      <div className="article-grid">
        {items.map(a => (
          <Link className="article-card" to={`/tin-tuc/${a.slug}`} key={a.id}>
            <div className="article-cover" style={a.cover_url ? {backgroundImage:`url(${a.cover_url})`} : {}}>
              {!a.cover_url && <Newspaper size={42}/>}
            </div>
            <div className="article-body">
              <small>{fmtDate(a.created_at)}</small>
              <h2>{a.title}</h2>
              <p>{a.excerpt}</p>
              <span>Tác giả: {a.profiles?.display_name || "Corgi Immortal"}</span>
            </div>
          </Link>
        ))}
        {!items.length && <div className="empty-card">Chưa có bài viết nào được xuất bản.</div>}
      </div>}
    </section>
  );
}
