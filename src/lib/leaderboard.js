const endpoint = import.meta.env.VITE_LEADERBOARD_API_URL;
function baseEndpoint(){ if(!endpoint)return null; return new URL(endpoint, window.location.origin); }
export async function fetchLeaderboard(limit = 100, fresh = false) {
  const url=baseEndpoint(); if(!url)return {entries:[],configured:false};
  url.searchParams.set("limit",String(Math.min(100,limit))); if(fresh){url.searchParams.set("fresh","1");url.searchParams.set("_ts",String(Date.now()))}
  const res=await fetch(url.toString(),{headers:{Accept:"application/json"},cache:fresh?"no-store":"default"}); if(!res.ok)throw new Error(`Leaderboard API ${res.status}`);
  const payload=await res.json(); const raw=Array.isArray(payload)?payload:(payload.entries||[]);
  return {configured:true,entries:raw.map((item,index)=>({rank:Number(item.rank??index+1),userId:String(item.userId||""),displayName:item.displayName||"Ẩn danh",avatarUrl:item.avatarUrl||"",realm:item.realm||"—",totalCultivation:Number(item.totalCultivation||0),power:Number(item.power||0)})).sort((a,b)=>a.rank-b.rank)};
}
export async function fetchExtendedLeaderboard(type,limit=100){
  const url=baseEndpoint(); if(!url)return {entries:[],configured:false};
  url.pathname=url.pathname.replace(/\/api\/leaderboard\/?$/, "/api/leaderboards"); url.searchParams.set("type",type);url.searchParams.set("limit",String(Math.min(100,limit)));
  const res=await fetch(url.toString(),{headers:{Accept:"application/json"}});if(!res.ok)throw new Error(`Leaderboard API ${res.status}`);const payload=await res.json();return {configured:true,entries:payload.entries||[]};
}
