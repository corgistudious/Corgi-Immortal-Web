import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { supabase } from "../lib/supabase";
import { fallbackCommands } from "../data/fallbackCommands";

export default function Commands() {
  const [commands, setCommands] = useState(fallbackCommands);
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("Tất cả");

  useEffect(() => {
    if (!supabase) return;
    supabase.from("bot_commands").select("*").eq("active", true).order("sort_order")
      .then(({ data }) => data?.length && setCommands(data));
  }, []);

  const categories = ["Tất cả", ...new Set(commands.map(c => c.category))];
  const filtered = useMemo(() => commands.filter(c =>
    (cat === "Tất cả" || c.category === cat) &&
    `${c.name} ${c.description} ${c.usage}`.toLowerCase().includes(query.toLowerCase())
  ), [commands, query, cat]);

  return (
    <section className="page section">
      <div className="page-hero compact">
        <span className="eyebrow">TRUNG TÂM LỆNH</span>
        <h1>Tra cứu lệnh Corgi Immortal</h1>
        <p>Tìm cú pháp, ví dụ và quyền cần thiết cho từng command.</p>
      </div>

      <div className="command-tools">
        <label className="search-box"><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Tìm /help, /dev, RPG..."/></label>
        <div className="chips">{categories.map(c=><button className={cat===c?"active":""} onClick={()=>setCat(c)} key={c}>{c}</button>)}</div>
      </div>

      <div className="command-list">
        {filtered.map(c => (
          <article className="command-card" key={c.id || c.name}>
            <div><span className="command-name">{c.name}</span><span className="badge">{c.category}</span></div>
            <p>{c.description}</p>
            <dl>
              <div><dt>Cú pháp</dt><dd><code>{c.usage}</code></dd></div>
              <div><dt>Ví dụ</dt><dd><code>{c.example || "—"}</code></dd></div>
              <div><dt>Quyền</dt><dd>{c.permissions || "Mọi thành viên"}</dd></div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
}
