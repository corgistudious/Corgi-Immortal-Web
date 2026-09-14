import { useEffect, useState } from "react";
import { Crown, Medal, RefreshCw, Sparkles, Trophy } from "lucide-react";
import { fetchLeaderboard } from "../lib/leaderboard";

const fmt = new Intl.NumberFormat("vi-VN");

function Avatar({ entry }) {
  if (entry.avatarUrl) return <img className="rank-avatar" src={entry.avatarUrl} alt=""/>;
  return <span className="rank-avatar rank-avatar-fallback">{entry.displayName?.slice(0, 1)?.toUpperCase() || "?"}</span>;
}

function Podium({ entry, place }) {
  const icons = { 1: <Crown/>, 2: <Medal/>, 3: <Medal/> };
  return (
    <article className={`podium-card place-${place}`}>
      <div className="podium-badge">#{place}</div>
      <div className="podium-avatar"><Avatar entry={entry}/></div>
      <div className="podium-icon">{icons[place]}</div>
      <h3>{entry.displayName}</h3>
      <p>⚔️ {fmt.format(entry.power)} Chiến Lực</p>
      {entry.realm && <span className="realm-pill">{entry.realm}</span>}
      <strong>✨ {fmt.format(entry.totalCultivation)} Tu Vi</strong>
    </article>
  );
}

export default function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [configured, setConfigured] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async (fresh = false) => {
    setLoading(true); setError("");
    try {
      const result = await fetchLeaderboard(100, fresh);
      setEntries(result.entries);
      setConfigured(result.configured);
    } catch (e) {
      setError("Không thể tải dữ liệu Thiên Bảng lúc này.");
    } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const top3 = entries.slice(0, 3);
  const rest = entries.slice(3);

  return (
    <section className="section leaderboard-page">
      <div className="leaderboard-hero">
        <span className="eyebrow"><Sparkles size={16}/> THIÊN BẢNG DISCORD</span>
        <h1>Thiên Bảng</h1>
        <p>Thiên Bảng chính thức của Corgi Immortal, ưu tiên Cảnh Giới cao hơn, sau đó đến tầng, Tu Vi và Chiến Lực — đồng bộ với /leaderboard trong Discord.</p>
        <button className="ghost-btn rank-refresh" onClick={() => load(true)} disabled={loading}><RefreshCw size={16}/>{loading ? "Đang cập nhật" : "Cập nhật"}</button>
      </div>

      {!configured ? (
        <div className="empty-card leaderboard-empty">
          <Trophy size={28}/>
          <h3>Thiên Bảng đã sẵn sàng</h3>
          <p>Website chưa được kết nối với dữ liệu Thiên Bảng của bot. Thêm biến <code>VITE_LEADERBOARD_API_URL</code> trên Cloudflare để hiển thị dữ liệu thật.</p>
        </div>
      ) : error ? (
        <div className="empty-card leaderboard-empty"><p>{error}</p></div>
      ) : loading ? (
        <div className="empty-card">Đang tải Thiên Bảng…</div>
      ) : !entries.length ? (
        <div className="empty-card">Chưa có dữ liệu xếp hạng.</div>
      ) : (
        <>
          <div className="podium-grid">
            {top3.map((entry, i) => <Podium key={entry.userId || i} entry={entry} place={i + 1}/>) }
          </div>
          {rest.length > 0 && (
            <div className="ranking-table-wrap">
              <div className="ranking-table-head"><span>Hạng</span><span>Thành viên</span><span>Cảnh Giới</span><span>Chiến Lực</span><span>Tổng Tu Vi</span></div>
              <div className="ranking-list">
                {rest.map((entry, i) => (
                  <article className="ranking-row" key={entry.userId || i}>
                    <strong className="rank-number">#{entry.rank || i + 4}</strong>
                    <div className="rank-user"><Avatar entry={entry}/><div><b>{entry.displayName}</b>{entry.messages > 0 && <small>{fmt.format(entry.messages)} tin nhắn</small>}</div></div>
                    <span className="rank-realm">{entry.realm || "—"}</span>
                    <span className="rank-level">⚔️ {fmt.format(entry.power)}</span>
                    <span className="rank-xp">✨ {fmt.format(entry.totalCultivation)}</span>
                  </article>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
}
