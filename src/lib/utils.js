export const fmtDate = (value) =>
  new Intl.DateTimeFormat("vi-VN", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(value));

export const slugify = (text = "") =>
  text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const excerpt = (text = "", len = 180) =>
  text.length > len ? `${text.slice(0, len).trim()}…` : text;

export const avatarFromUser = (user) =>
  user?.user_metadata?.avatar_url ||
  user?.user_metadata?.picture ||
  `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(
    user?.user_metadata?.full_name || "Corgi"
  )}`;
