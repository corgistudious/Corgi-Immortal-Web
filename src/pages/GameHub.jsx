import { useMemo, useState } from "react";
import { Check, Copy, Gamepad2, Search, Sparkles } from "lucide-react";
import { fallbackCommands } from "../data/fallbackCommands";

const hidden = new Set(["/dev", "/admin"]);
export default function GameHub(){
  const [q,setQ]=useState(""); const [copied,setCopied]=useState("");
  const rows=useMemo(()=>fallbackCommands.filter(x=>!hidden.has(x.name)&&(`${x.name} ${x.description} ${x.category}`).toLowerCase().includes(q.toLowerCase())),[q]);
  const groups=Object.entries(rows.reduce((a,x)=>((a[x.category]??=[]).push(x),a),{}));
  async function copy(cmd){await navigator.clipboard.writeText(cmd);setCopied(cmd);setTimeout(()=>setCopied(""),1500)}
  return <section className="section game-hub-page">
    <div className="game-hub-hero"><span className="eyebrow"><Sparkles size={16}/> TIÊN PHỦ</span><h1>Trung Tâm Tu Tiên</h1><p>Toàn bộ lệnh người chơi được gom thành giao diện nút để bạn không phải nhớ hoặc tự gõ tên lệnh. Những thao tác cần xử lý gameplay vẫn được bot Discord xác thực để bảo vệ dữ liệu nhân vật.</p></div>
    <div className="command-search"><Search size={18}/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Tìm tu luyện, boss, đấu giá, season…"/></div>
    {groups.map(([name,items])=><section className="hub-command-section" key={name}><h2><Gamepad2 size={19}/>{name}<small>{items.length}</small></h2><div className="hub-command-grid">{items.map(x=><article className="hub-command-card" key={x.id}><div><b>{x.name}</b><p>{x.description}</p></div><button onClick={()=>copy(x.usage||x.name)}>{copied===(x.usage||x.name)?<><Check size={15}/>Đã sao chép</>:<><Copy size={15}/>Dùng lệnh</>}</button></article>)}</div></section>)}
  </section>
}
