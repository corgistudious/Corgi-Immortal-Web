const leaderboardEndpoint = import.meta.env.VITE_LEADERBOARD_API_URL;
const explicitEndpoint = import.meta.env.VITE_GAME_API_URL;
function root(){
  const raw=explicitEndpoint||leaderboardEndpoint;
  if(!raw)return null;
  const u=new URL(raw,window.location.origin);
  u.pathname=u.pathname.replace(/\/api\/(leaderboard|leaderboards)\/?$/,"");
  u.search=""; return u;
}
async function call(path,{token,guildId,method="GET"}={}){
  const u=root(); if(!u)return {configured:false};
  u.pathname=`${u.pathname.replace(/\/$/,"")}${path}`;
  if(guildId)u.searchParams.set("guildId",guildId);
  const res=await fetch(u.toString(),{method,headers:{Accept:"application/json",Authorization:`Bearer ${token}`,...(method!=="GET"?{"X-Request-Id":crypto.randomUUID()}: {})},cache:"no-store"});
  const data=await res.json().catch(()=>({}));
  if(!res.ok){const e=new Error(data.error||`Game API ${res.status}`);e.status=res.status;e.data=data;throw e}
  return {configured:true,...data};
}
export const fetchGameMe=(token,guildId)=>call("/api/game/me",{token,guildId});
export const claimWebDaily=(token,guildId)=>call("/api/game/daily",{token,guildId,method:"POST"});
