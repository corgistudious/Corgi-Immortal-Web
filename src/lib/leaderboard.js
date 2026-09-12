const endpoint = import.meta.env.VITE_LEADERBOARD_API_URL;

export async function fetchLeaderboard(limit = 50) {
  if (!endpoint) return { entries: [], configured: false };
  const url = new URL(endpoint, window.location.origin);
  url.searchParams.set('limit', String(limit));
  const res = await fetch(url.toString(), { headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error(`Leaderboard API ${res.status}`);
  const payload = await res.json();
  const raw = Array.isArray(payload) ? payload : (payload.entries || payload.data || []);
  const entries = raw.map((item, index) => ({
    rank: Number(item.rank ?? index + 1),
    userId: String(item.userId ?? item.user_id ?? item.discordId ?? item.discord_id ?? ''),
    displayName: item.displayName ?? item.display_name ?? item.username ?? item.name ?? 'Ẩn danh',
    avatarUrl: item.avatarUrl ?? item.avatar_url ?? item.avatar ?? '',
    level: Number(item.level ?? 0),
    xp: Number(item.xp ?? item.experience ?? 0),
    totalXp: Number(item.totalXp ?? item.total_xp ?? item.xp ?? 0),
    messages: Number(item.messages ?? item.message_count ?? 0),
    realm: item.realm ?? item.realmName ?? item.realm_name ?? item.canhGioi ?? item.canh_gioi ?? item.cultivationRealm ?? item.cultivation_realm ?? '',
  })).sort((a, b) => a.rank - b.rank);
  return { entries, configured: true };
}
