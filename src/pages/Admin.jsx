import { useEffect, useState } from "react";
import { Newspaper, TerminalSquare, TicketCheck, Trash2 } from "lucide-react";
import { supabase } from "../lib/supabase";
import { slugify } from "../lib/utils";
import { useAuth } from "../context/AuthContext";

export default function Admin(){
  const {user}=useAuth();
  const [articles,setArticles]=useState([]);
  const [commands,setCommands]=useState([]);
  const [tickets,setTickets]=useState([]);
  const [feedback,setFeedback]=useState(null);
  const [article,setArticle]=useState({title:"",excerpt:"",content:"",cover_url:"",published:true});
  const [cmd,setCmd]=useState({category:"Hệ thống",name:"",description:"",usage:"",example:"",permissions:"Mọi thành viên",active:true,sort_order:100});

  async function load(){
    const [{data:a},{data:c},{data:t}]=await Promise.all([
      supabase.from("articles").select("*").order("created_at",{ascending:false}),
      supabase.from("bot_commands").select("*").order("sort_order"),
      supabase.from("contact_tickets").select("*,profiles:user_id(display_name)").order("created_at",{ascending:false})
    ]);
    setArticles(a||[]);setCommands(c||[]);setTickets(t||[]);
  }
  useEffect(()=>{load()},[]);

  async function addArticle(e){
    e.preventDefault(); if(!article.title||!article.content)return;
    let slug=slugify(article.title);
    const exists=articles.some(a=>a.slug===slug); if(exists)slug+=`-${Date.now().toString().slice(-5)}`;
    setFeedback({type:"ok",text:"Đang đăng bài…"});
    const {error}=await supabase.from("articles").insert({...article,slug,author_id:user.id});
    if(error)return setFeedback({type:"error",text:`Đăng bài thất bại: ${error.message}`});
    setArticle({title:"",excerpt:"",content:"",cover_url:"",published:true}); await load(); setFeedback({type:"ok",text:"✓ Bài viết đã được đăng thành công."});
  }
  async function addCommand(e){
    e.preventDefault(); if(!cmd.name||!cmd.description)return;
    setFeedback({type:"ok",text:"Đang thêm lệnh…"}); const {error}=await supabase.from("bot_commands").insert(cmd);
    if(error)return setFeedback({type:"error",text:`Thêm lệnh thất bại: ${error.message}`});
    setCmd({category:"Hệ thống",name:"",description:"",usage:"",example:"",permissions:"Mọi thành viên",active:true,sort_order:100}); await load(); setFeedback({type:"ok",text:"✓ Đã thêm lệnh."});
  }
  async function del(table,id){if(confirm("Xóa mục này?")){await supabase.from(table).delete().eq("id",id);load();}}
  async function ticketStatus(id,status){await supabase.from("contact_tickets").update({status}).eq("id",id);load();}

  return <section className="page section admin-page">
    <div className="page-hero compact"><span className="eyebrow">CONTROL PANEL</span><h1>Quản trị Corgi Immortal</h1><p>Quản lý nội dung website từ một nơi.</p></div>

    {feedback&&<div className={`action-feedback ${feedback.type}`}>{feedback.text}</div>}

    <div className="admin-grid">
      <section className="panel">
        <h2><Newspaper size={20}/> Đăng tin</h2>
        <form className="stack-form" onSubmit={addArticle}>
          <input placeholder="Tiêu đề" value={article.title} onChange={e=>setArticle({...article,title:e.target.value})}/>
          <input placeholder="Mô tả ngắn" value={article.excerpt} onChange={e=>setArticle({...article,excerpt:e.target.value})}/>
          <input placeholder="URL ảnh bìa (tùy chọn)" value={article.cover_url} onChange={e=>setArticle({...article,cover_url:e.target.value})}/>
          <textarea placeholder="Nội dung bài viết" value={article.content} onChange={e=>setArticle({...article,content:e.target.value})}/>
          <label><input type="checkbox" checked={article.published} onChange={e=>setArticle({...article,published:e.target.checked})}/> Xuất bản ngay</label>
          <button className="primary-btn">Đăng bài</button>
        </form>
        <div className="admin-list">{articles.map(a=><div key={a.id}><span>{a.title}</span><button onClick={()=>del("articles",a.id)}><Trash2 size={15}/></button></div>)}</div>
      </section>

      <section className="panel">
        <h2><TerminalSquare size={20}/> Quản lý lệnh</h2>
        <form className="stack-form" onSubmit={addCommand}>
          <input placeholder="Nhóm lệnh" value={cmd.category} onChange={e=>setCmd({...cmd,category:e.target.value})}/>
          <input placeholder="/command" value={cmd.name} onChange={e=>setCmd({...cmd,name:e.target.value})}/>
          <input placeholder="Mô tả" value={cmd.description} onChange={e=>setCmd({...cmd,description:e.target.value})}/>
          <input placeholder="Cú pháp" value={cmd.usage} onChange={e=>setCmd({...cmd,usage:e.target.value})}/>
          <input placeholder="Ví dụ" value={cmd.example} onChange={e=>setCmd({...cmd,example:e.target.value})}/>
          <input placeholder="Quyền" value={cmd.permissions} onChange={e=>setCmd({...cmd,permissions:e.target.value})}/>
          <button className="primary-btn">Thêm lệnh</button>
        </form>
        <div className="admin-list">{commands.map(c=><div key={c.id}><span>{c.name} <small>{c.category}</small></span><button onClick={()=>del("bot_commands",c.id)}><Trash2 size={15}/></button></div>)}</div>
      </section>
    </div>

    <section className="panel admin-tickets">
      <h2><TicketCheck size={20}/> Hỗ trợ</h2>
      {tickets.map(t=><div className="admin-ticket" key={t.id}>
        <div><b>{t.subject}</b><small>{t.profiles?.display_name||"Member"} • {t.type}</small><p>{t.message}</p></div>
        <select value={t.status} onChange={e=>ticketStatus(t.id,e.target.value)}><option value="open">open</option><option value="processing">processing</option><option value="resolved">resolved</option></select>
      </div>)}
    </section>
  </section>
}
