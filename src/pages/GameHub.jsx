import { useEffect, useMemo, useState } from "react";
import { Check, Copy, Gamepad2, Search, Sparkles, Gift, ShieldCheck } from "lucide-react";
import { fallbackCommands } from "../data/fallbackCommands";
import { useAuth } from "../context/AuthContext";
import { claimWebDaily, fetchGameMe } from "../lib/gameApi";

const hidden=new Set(["/dev","/admin"]);
export default function GameHub(){
  const {session,user,signInDiscord}=useAuth();
  const [q,setQ]=useState(""); const [copied,setCopied]=useState("");
  const [game,setGame]=useState(null); const [guilds,setGuilds]=useState([]); const [guildId,setGuildId]=useState(localStorage.getItem("ci-game-guild")||"");
  const [busy,setBusy]=useState(false); const [notice,setNotice]=useState("");
  const rows=useMemo(()=>fallbackCommands.filter(x=>!hidden.has(x.name)&&(`${x.name} ${x.description} ${x.category}`).toLowerCase().includes(q.toLowerCase())),[q]);
  const groups=Object.entries(rows.reduce((a,x)=>((a[x.category]??=[]).push(x),a),{}));
  async function copy(cmd){await navigator.clipboard.writeText(cmd);setCopied(cmd);setTimeout(()=>setCopied(""),1500)}
  async function load(selected=guildId){
    if(!session?.access_token)return; setBusy(true); setNotice("");
    try{const r=await fetchGameMe(session.access_token,selected);setGame(r);setGuilds([])}
    catch(e){if(e.status===409&&e.data?.guilds){setGuilds(e.data.guilds);setGame(null)}else{setNotice(e.message==="player_not_found"?"Chưa tìm thấy nhân vật Discord. Hãy dùng /start trong server trước.":`Không thể tải nhân vật: ${e.message}`)}}finally{setBusy(false)}
  }
  useEffect(()=>{if(session?.access_token)load()},[session?.access_token]);
  async function chooseGuild(id){setGuildId(id);localStorage.setItem("ci-game-guild",id);await load(id)}
  async function daily(){setBusy(true);setNotice("");try{const r=await claimWebDaily(session.access_token,game?.player?.guildId||guildId);setGame(g=>({...g,player:r.player}));setNotice(`🎁 Nhận ${r.reward.stones} Linh Thạch${r.reward.newcomerBonus?` + ${r.reward.newcomerBonus} quà tân thủ`:""}.`)}catch(e){setNotice(e.status===429?`⏳ Daily còn ${e.data?.cooldown||"cooldown"}.`:`Daily lỗi: ${e.message}`)}finally{setBusy(false)}}
  return <section className="section game-hub-page">
    <div className="game-hub-hero"><span className="eyebrow"><Sparkles size={16}/> TIÊN PHỦ</span><h1>Trung Tâm Tu Tiên</h1><p>Web và Discord dùng chung nhân vật. Các thao tác có phần thưởng được API xác thực bằng phiên Discord hiện tại và vẫn dùng cooldown/transaction của bot.</p></div>
    <div className="web-game-panel">
      {!user?<><ShieldCheck size={22}/><div><b>Kết nối nhân vật Discord</b><p>Đăng nhập để đọc đúng nhân vật của bạn và sử dụng gameplay web.</p></div><button className="primary-btn" onClick={signInDiscord}>Đăng nhập Discord</button></>:
      guilds.length?<><div><b>Chọn server nhân vật</b><p>Tài khoản này có nhân vật ở nhiều server.</p></div><select value={guildId} onChange={e=>chooseGuild(e.target.value)}><option value="">Chọn server…</option>{guilds.map(g=><option key={g.guildId} value={g.guildId}>{g.name}</option>)}</select></>:
      game?.player?<><div className="web-player"><span>Nhân vật</span><b>{game.player.name}</b><small>{game.guild?.name} • {game.player.realm}</small></div><div className="web-player-stat"><span>Chiến lực</span><b>{game.player.power.toLocaleString()}</b></div><div className="web-player-stat"><span>Linh Thạch</span><b>{game.player.spiritStones.toLocaleString()}</b></div><button className="primary-btn" disabled={busy} onClick={daily}><Gift size={16}/>{busy?"Đang xử lý…":"Nhận Daily"}</button></>:<div>{busy?"Đang tải nhân vật…":"Đăng nhập đã xác thực. Đang chờ dữ liệu nhân vật."}</div>}
    </div>
    {notice&&<div className="game-api-notice">{notice}</div>}
    <div className="command-search"><Search size={18}/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Tìm tu luyện, boss, đấu giá, season…"/></div>
    {groups.map(([name,items])=><section className="hub-command-section" key={name}><h2><Gamepad2 size={19}/>{name}<small>{items.length}</small></h2><div className="hub-command-grid">{items.map(x=><article className="hub-command-card" key={x.id}><div><b>{x.name}</b><p>{x.description}</p></div><button onClick={()=>copy(x.usage||x.name)}>{copied===(x.usage||x.name)?<><Check size={15}/>Đã sao chép</>:<><Copy size={15}/>Dùng lệnh</>}</button></article>)}</div></section>)}
  </section>
}
