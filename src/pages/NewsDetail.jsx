import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Heart, MessageCircle, Send } from "lucide-react";
import { supabase } from "../lib/supabase";
import { fmtDate } from "../lib/utils";
import { useAuth } from "../context/AuthContext";

export default function NewsDetail() {
  const { slug } = useParams();
  const { user, signInDiscord } = useAuth();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState("");

  async function load() {
    if (!supabase) return;
    const { data: a } = await supabase.from("articles")
      .select("*,profiles:author_id(display_name,avatar_url)")
      .eq("slug", slug).eq("published", true).single();
    setArticle(a);
    if (!a) return;
    const [{ count }, { data: cs }, likeCheck] = await Promise.all([
      supabase.from("article_likes").select("*", {count:"exact", head:true}).eq("article_id", a.id),
      supabase.from("article_comments").select("*,profiles:user_id(display_name,avatar_url)").eq("article_id", a.id).order("created_at"),
      user ? supabase.from("article_likes").select("article_id").eq("article_id", a.id).eq("user_id", user.id).maybeSingle() : Promise.resolve({data:null})
    ]);
    setLikes(count || 0);
    setComments(cs || []);
    setLiked(Boolean(likeCheck.data));
  }

  useEffect(()=>{ load(); }, [slug, user?.id]);

  async function toggleLike() {
    if (!user) return signInDiscord();
    if (liked) await supabase.from("article_likes").delete().eq("article_id", article.id).eq("user_id", user.id);
    else await supabase.from("article_likes").insert({article_id:article.id,user_id:user.id});
    load();
  }

  async function sendComment(e) {
    e.preventDefault();
    if (!user) return signInDiscord();
    if (!comment.trim()) return;
    await supabase.from("article_comments").insert({article_id:article.id,user_id:user.id,content:comment.trim()});
    setComment(""); load();
  }

  if (!supabase) return <section className="page section"><div className="empty-card">Hãy kết nối Supabase để sử dụng Tin tức.</div></section>;
  if (!article) return <div className="center-loader">Đang tải bài viết…</div>;

  return (
    <section className="page section narrow">
      {article.cover_url && <img className="detail-cover" src={article.cover_url} alt=""/>}
      <article className="news-detail">
        <span className="eyebrow">TIN TỨC</span>
        <h1>{article.title}</h1>
        <div className="byline">Bởi <b>{article.profiles?.display_name || "Corgi Immortal"}</b> • {fmtDate(article.created_at)}</div>
        <div className="article-content">{article.content.split(/\n+/).map((p,i)=><p key={i}>{p}</p>)}</div>
        <button className={`like-btn ${liked?"liked":""}`} onClick={toggleLike}><Heart size={19} fill={liked?"currentColor":"none"}/> {likes} lượt thích</button>
      </article>

      <section className="comments">
        <h2><MessageCircle size={21}/> Bình luận ({comments.length})</h2>
        <form onSubmit={sendComment} className="comment-form">
          <textarea value={comment} onChange={e=>setComment(e.target.value)} placeholder={user?"Viết bình luận…":"Đăng nhập Discord để bình luận"}/>
          <button className="primary-btn" type="submit"><Send size={16}/> Gửi</button>
        </form>
        {comments.map(c=><div className="comment" key={c.id}><b>{c.profiles?.display_name || "Member"}</b><small>{fmtDate(c.created_at)}</small><p>{c.content}</p></div>)}
      </section>
    </section>
  );
}
