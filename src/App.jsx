import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Mypage from "./pages/Mypage";
import Login from "./pages/Login/Login";
import DashBoardPage from "./pages/Manage/DashBoard";
import MemberPage from "./pages/Manage/Member";

function App() {
  const location = useLocation();

  return (
    <>
      {/* 경로가 /manage로 시작하지 않는 경우에만 Navbar 렌더링 */}
      {location.pathname && !location.pathname.startsWith("/manage") && (
        <Navbar />
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/manage" element={<DashBoardPage />} />
        <Route path="/manage/dashboard" element={<DashBoardPage />} />
        <Route path="/manage/member" element={<MemberPage />} />
        <Route path="/manage/report" element={<DashBoardPage />} />
      </Routes>
    </>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
