import { useEffect,useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { Send, Trash2 } from "lucide-react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";
import { fmtDate } from "../lib/utils";

export default function TopicDetail(){
  const {id}=useParams(); const nav=useNavigate();
  const {user,isAdmin,signInDiscord}=useAuth();
  const [topic,setTopic]=useState(null); const [replies,setReplies]=useState([]); const [text,setText]=useState("");

  async function load(){
    if(!supabase)return;
    const [{data:t},{data:r}]=await Promise.all([
      supabase.from("forum_topics").select("*,profiles:author_id(display_name)").eq("id",id).single(),
      supabase.from("forum_replies").select("*,profiles:author_id(display_name)").eq("topic_id",id).order("created_at")
    ]);
    setTopic(t);setReplies(r||[]);
  }
  useEffect(()=>{load()},[id]);

  async function reply(e){
    e.preventDefault(); if(!user)return signInDiscord(); if(!text.trim()||topic.locked)return;
    await supabase.from("forum_replies").insert({topic_id:id,author_id:user.id,body:text.trim()});
    setText("");load();
  }
  async function removeTopic(){
    if(!isAdmin||!confirm("Xóa chủ đề này?"))return;
    await supabase.from("forum_topics").delete().eq("id",id); nav("/dien-dan");
  }

  if(!topic)return <div className="center-loader">Đang tải chủ đề…</div>;
  return <section className="page section narrow">
    <article className="panel topic-detail">
      <div><span className="badge">{topic.category}</span>{topic.locked&&<span className="badge">Đã khóa</span>}</div>
      <h1>{topic.title}</h1><small>{topic.profiles?.display_name||"Member"} • {fmtDate(topic.created_at)}</small>
      <p>{topic.body}</p>
      {isAdmin&&<button className="danger-btn" onClick={removeTopic}><Trash2 size={15}/> Xóa chủ đề</button>}
    </article>
    <div className="reply-list">{replies.map(r=><article className="comment" key={r.id}><b>{r.profiles?.display_name||"Member"}</b><small>{fmtDate(r.created_at)}</small><p>{r.body}</p></article>)}</div>
    {!topic.locked&&<form className="comment-form" onSubmit={reply}><textarea value={text} onChange={e=>setText(e.target.value)} placeholder={user?"Viết câu trả lời…":"Đăng nhập Discord để trả lời"}/><button className="primary-btn"><Send size={16}/> Trả lời</button></form>}
  </section>
}
