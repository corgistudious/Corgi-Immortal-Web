import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  BookOpenText, Bot, Command, House, Menu, MessageCircleMore,
  Newspaper, Send, ShieldCheck, X
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { avatarFromUser } from "../lib/utils";

const nav = [
  ["/", "Trang Chủ", House],
  ["/gioi-thieu", "Giới thiệu", BookOpenText],
  ["/lenh", "Lệnh", Command],
  ["/tin-tuc", "Tin tức", Newspaper],
  ["/dien-dan", "Diễn đàn", MessageCircleMore],
  ["/lien-he", "Liên hệ", Send]
];

export default function Layout({ children }) {
  const [open, setOpen] = useState(false);
  const { user, profile, isAdmin, signInDiscord, signOut } = useAuth();

  return (
    <div className="site-shell">
      <header className="topbar">
        <Link className="brand" to="/" onClick={() => setOpen(false)}>
          <span className="brand-mark"><Bot size={24}/></span>
          <span><strong>Corgi Immortal</strong><small>Official Community</small></span>
        </Link>

        <nav className={`nav ${open ? "open" : ""}`}>
          {nav.map(([to, label, Icon]) => (
            <NavLink key={to} to={to} onClick={() => setOpen(false)}>
              <Icon size={16}/>{label}
            </NavLink>
          ))}
          {isAdmin && (
            <NavLink to="/admin" onClick={() => setOpen(false)}>
              <ShieldCheck size={16}/>Quản trị
            </NavLink>
          )}
        </nav>

        <div className="account">
          {user ? (
            <div className="user-chip">
              <img src={avatarFromUser(user)} alt="" />
              <div>
                <b>{profile?.display_name || user.user_metadata?.full_name || "Member"}</b>
                <button onClick={signOut}>Đăng xuất</button>
              </div>
            </div>
          ) : (
            <button className="discord-btn" onClick={signInDiscord}>Đăng nhập Discord</button>
          )}
          <button className="menu-btn" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X/> : <Menu/>}
          </button>
        </div>
      </header>

      <main>{children}</main>

      <footer className="footer">
        <div>
          <strong>Corgi Immortal</strong>
          <p>Cổng thông tin, cộng đồng và hỗ trợ chính thức.</p>
        </div>
        <div className="footer-links">
          <Link to="/gioi-thieu">Giới thiệu</Link>
          <Link to="/lien-he">Hỗ trợ</Link>
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
        </div>
        <small>© {new Date().getFullYear()} Corgi Immortal. All rights reserved.</small>
      </footer>
    </div>
  );
}
