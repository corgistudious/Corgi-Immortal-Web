import { useEffect, useState } from "react";
import { Send, TicketCheck } from "lucide-react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";
import { fmtDate } from "../lib/utils";

export default function Contact(){
  const {user,signInDiscord}=useAuth();
  const [form,setForm]=useState({type:"Góp ý",subject:"",message:""});
  const [tickets,setTickets]=useState([]);
  const [sent,setSent]=useState(false);

  async function load(){
    if(!supabase||!user)return;
    const {data}=await supabase.from("contact_tickets").select("*").eq("user_id",user.id).order("created_at",{ascending:false});
    setTickets(data||[]);
  }
  useEffect(()=>{load()},[user?.id]);

  async function submit(e){
    e.preventDefault(); if(!user)return signInDiscord();
    if(!form.subject.trim()||!form.message.trim())return;
    const {error}=await supabase.from("contact_tickets").insert({...form,user_id:user.id});
    if(!error){setForm({type:"Góp ý",subject:"",message:""});setSent(true);load();}
  }

  return <section className="page section">
    <div className="page-hero compact"><span className="eyebrow">LIÊN HỆ</span><h1>Hỗ trợ & phản hồi</h1><p>Gửi góp ý, báo lỗi hoặc yêu cầu hỗ trợ trực tiếp đến đội ngũ Corgi Immortal.</p></div>
    <div className="contact-layout">
      <form className="panel support-form" onSubmit={submit}>
        <select value={form.type} onChange={e=>setForm({...form,type:e.target.value})}><option>Góp ý</option><option>Báo lỗi</option><option>Hỗ trợ</option><option>Khác</option></select>
        <input placeholder="Tiêu đề" value={form.subject} onChange={e=>setForm({...form,subject:e.target.value})}/>
        <textarea placeholder="Mô tả chi tiết…" value={form.message} onChange={e=>setForm({...form,message:e.target.value})}/>
        <button className="primary-btn"><Send size={16}/> {user?"Gửi phản hồi":"Đăng nhập Discord để gửi"}</button>
        {sent&&<p className="success">✓ Đã gửi. Bạn có thể theo dõi trạng thái ở bên cạnh.</p>}
      </form>

      <aside className="panel tickets">
        <h2><TicketCheck size={21}/> Yêu cầu của bạn</h2>
        {!user?<p>Đăng nhập Discord để xem lịch sử hỗ trợ.</p>:tickets.length?tickets.map(t=><div className="ticket" key={t.id}><b>{t.subject}</b><span className={`status ${t.status}`}>{t.status}</span><small>{t.type} • {fmtDate(t.created_at)}</small></div>):<p>Chưa có yêu cầu nào.</p>}
      </aside>
    </div>
  </section>
}
