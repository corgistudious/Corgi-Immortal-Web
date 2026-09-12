const endpoint = import.meta.env.VITE_LEADERBOARD_API_URL;

export async function fetchLeaderboard(limit = 50) {
  if (!endpoint) return { entries: [], configured: false };
  const url = new URL(endpoint, window.location.origin);
  url.searchParams.set("limit", String(Math.min(50, limit)));
  const res = await fetch(url.toString(), { headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error(`Leaderboard API ${res.status}`);
  const payload = await res.json();
  const raw = Array.isArray(payload) ? payload : (payload.entries || []);
  return {
    configured: true,
    entries: raw.map((item, index) => ({
      rank: Number(item.rank ?? index + 1),
      userId: String(item.userId || ""),
      displayName: item.displayName || "Ẩn danh",
      avatarUrl: item.avatarUrl || "",
      realm: item.realm || "—",
      totalCultivation: Number(item.totalCultivation || 0),
      power: Number(item.power || 0)
    })).sort((a, b) => a.rank - b.rank)
  };
}
