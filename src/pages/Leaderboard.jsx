import { useEffect,useState } from "react";
import { Crown,Medal,RefreshCw,Sparkles,Trophy } from "lucide-react";
import { fetchLeaderboard,fetchExtendedLeaderboard } from "../lib/leaderboard";
const fmt=new Intl.NumberFormat("vi-VN");
const boards=[['cultivation','Tu Vi'],['power','Chiến Lực'],['boss','Boss'],['beasttide','Thú Triều'],['pvp','PvP'],['season','Season'],['achievement','Thành Tựu'],['wealth','Tài Phú'],['fishing','Câu Linh'],['pet','Linh Thú'],['mount','Tọa Kỵ'],['sect','Tông Môn'],['sectwar','Tông Chiến']];
function Avatar({entry}){return entry.avatarUrl?<img className="rank-avatar" src={entry.avatarUrl} alt=""/>:<span className="rank-avatar rank-avatar-fallback">{entry.displayName?.slice(0,1)?.toUpperCase()||"?"}</span>}
export default function Leaderboard(){
 const [type,setType]=useState('cultivation'),[entries,setEntries]=useState([]),[configured,setConfigured]=useState(true),[loading,setLoading]=useState(true),[error,setError]=useState('');
 async function load(fresh=false){setLoading(true);setError('');try{const r=type==='cultivation'?await fetchLeaderboard(100,fresh):await fetchExtendedLeaderboard(type,100);setEntries(r.entries);setConfigured(r.configured)}catch{setError('Không thể tải bảng xếp hạng lúc này.')}finally{setLoading(false)}}
 useEffect(()=>{load()},[type]);
 return <section className="section leaderboard-page"><div className="leaderboard-hero"><span className="eyebrow"><Sparkles size={16}/> THIÊN BẢNG TOÀN CẦU</span><h1>Vạn Bảng Tiên Giới</h1><p>Mỗi hệ thống có bảng xếp hạng riêng và dùng dữ liệu thật từ Corgi Immortal.</p><button className="ghost-btn rank-refresh" onClick={()=>load(true)} disabled={loading}><RefreshCw size={16}/>{loading?'Đang cập nhật':'Cập nhật'}</button></div>
 <div className="leaderboard-tabs">{boards.map(([id,label])=><button key={id} className={type===id?'active':''} onClick={()=>setType(id)}>{label}</button>)}</div>
 {!configured?<div className="empty-card"><Trophy/><h3>Chưa kết nối API</h3></div>:error?<div className="empty-card">{error}</div>:loading?<div className="empty-card">Đang tải Thiên Bảng…</div>:!entries.length?<div className="empty-card">Chưa có dữ liệu cho bảng này.</div>:<div className="ranking-table-wrap"><div className="ranking-list">{entries.map((e,i)=><article className={`ranking-row extended ${i<3?'top-rank':''}`} key={`${e.userId||e.name}-${i}`}><strong className="rank-number">{i===0?<Crown size={18}/>:i<3?<Medal size={18}/>:null} #{e.rank||i+1}</strong><div className="rank-user"><Avatar entry={e}/><div><b>{e.displayName||e.name||'Ẩn danh'}</b><small>{e.detail||e.realm||''}</small></div></div><span className="rank-realm">{type==='cultivation'?(e.realm||'—'):(e.detail||'—')}</span><strong className="rank-score">{type==='cultivation'?`✨ ${fmt.format(e.totalCultivation||0)}`:`✦ ${fmt.format(e.score||0)}`}</strong></article>)}</div></div>}
 </section>
}
