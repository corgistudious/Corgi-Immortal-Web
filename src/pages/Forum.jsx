import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MessageSquarePlus } from "lucide-react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";
import { fmtDate } from "../lib/utils";

const cats = ["Thảo luận chung","Hướng dẫn","RPG Tu Tiên","Góp ý","Báo lỗi"];

export default function Forum() {
  const { user, signInDiscord } = useAuth();
  const [topics,setTopics]=useState([]);
  const [show,setShow]=useState(false);
  const [form,setForm]=useState({title:"",category:cats[0],body:""});

  async function load(){
    if(!supabase)return;
    const {data}=await supabase.from("forum_topics")
      .select("*,profiles:author_id(display_name),forum_replies(count)")
      .order("pinned",{ascending:false}).order("created_at",{ascending:false});
    setTopics(data||[]);
  }
  useEffect(()=>{load()},[]);

  async function create(e){
    e.preventDefault();
    if(!user)return signInDiscord();
    if(!form.title.trim()||!form.body.trim())return;
    await supabase.from("forum_topics").insert({...form,author_id:user.id});
    setForm({title:"",category:cats[0],body:""});setShow(false);load();
  }

  return <section className="page section">
    <div className="page-hero compact row-heading">
      <div><span className="eyebrow">DIỄN ĐÀN</span><h1>Cộng đồng Corgi Immortal</h1><p>Thảo luận, chia sẻ hướng dẫn, góp ý và báo lỗi.</p></div>
      <button className="primary-btn" onClick={()=>user?setShow(!show):signInDiscord()}><MessageSquarePlus size={17}/> Chủ đề mới</button>
    </div>

    {show&&<form className="panel form-grid" onSubmit={create}>
      <input placeholder="Tiêu đề chủ đề" value={form.title} onChange={e=>setForm({...form,title:e.target.value})}/>
      <select value={form.category} onChange={e=>setForm({...form,category:e.target.value})}>{cats.map(c=><option key={c}>{c}</option>)}</select>
      <textarea className="full" placeholder="Nội dung…" value={form.body} onChange={e=>setForm({...form,body:e.target.value})}/>
      <button className="primary-btn" type="submit">Đăng chủ đề</button>
    </form>}

    <div className="forum-list">
      {topics.map(t=><Link className="topic-row" to={`/dien-dan/${t.id}`} key={t.id}>
        <div><span className="badge">{t.category}</span>{t.pinned&&<span className="badge gold">Ghim</span>}<h3>{t.title}</h3><small>{t.profiles?.display_name||"Member"} • {fmtDate(t.created_at)}</small></div>
        <b>{t.forum_replies?.[0]?.count||0}<small> trả lời</small></b>
      </Link>)}
      {!topics.length&&<div className="empty-card">Chưa có chủ đề. Hãy mở cuộc thảo luận đầu tiên.</div>}
    </div>
  </section>
}
