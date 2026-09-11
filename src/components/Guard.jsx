import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function LoginGuard({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="center-loader">Đang tải…</div>;
  return user ? children : <Navigate to="/" replace />;
}

export function AdminGuard({ children }) {
  const { isAdmin, loading } = useAuth();
  if (loading) return <div className="center-loader">Đang tải…</div>;
  return isAdmin ? children : <Navigate to="/" replace />;
}
