import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/Layout";
import { AdminGuard } from "./components/Guard";
import Home from "./pages/Home";
import About from "./pages/About";
import Commands from "./pages/Commands";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import Forum from "./pages/Forum";
import TopicDetail from "./pages/TopicDetail";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import Legal from "./pages/Legal";
import Leaderboard from "./pages/Leaderboard";
import Store from "./pages/Store";

export default function App() {
  return (
    <AuthProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/gioi-thieu" element={<About/>}/>
          <Route path="/lenh" element={<Commands/>}/>
          <Route path="/tin-tuc" element={<News/>}/>
          <Route path="/thien-bang" element={<Leaderboard/>}/>
          <Route path="/store" element={<Store/>}/>
          <Route path="/tin-tuc/:slug" element={<NewsDetail/>}/>
          <Route path="/dien-dan" element={<Forum/>}/>
          <Route path="/dien-dan/:id" element={<TopicDetail/>}/>
          <Route path="/lien-he" element={<Contact/>}/>
          <Route path="/admin" element={<AdminGuard><Admin/></AdminGuard>}/>
          <Route path="/privacy" element={<Legal type="privacy"/>}/>
          <Route path="/terms" element={<Legal type="terms"/>}/>
        </Routes>
      </Layout>
    </AuthProvider>
  );
}
