import './App.css';
import { BrowserRouter as Router, Routes, Route,useLocation } from "react-router-dom";
import Navbar from './components/Navbar';

import Home from "./pages/Home";
import Login from "./pages/Login/Login";
import Write from "./pages/Sellpost/WriteComponent";
import SearchLogic from "./components/SearchLogic";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import MemberPage from "./pages/Manage/Member";
import ReportPage from "./pages/Manage/Report";
import DashBoardPage from "./pages/Manage/DashBoard";
import MyPage from "./pages/MyPage/MyPage";
import { Fragment } from "react";
import Write from './pages/Sellpost/WriteComponent'
import Read from "./pages/SellpostView/ReadComponent"; // 게시물 세부 정보


// QueryClient 생성
const queryClient = new QueryClient();

function App() {
  return (
    <Fragment>
      <QueryClientProvider client={queryClient}>
        <Router>
          <AppWithRouter />
        </Router>
        {/* React Query Devtools */}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Fragment>
  );
}

function AppWithRouter() {
  const location = useLocation();

  return (
    <>
      {/* 경로가 /manage로 시작하지 않는 경우에만 Navbar 렌더링 */}
      {location.pathname && !location.pathname.startsWith("/manage") && (
        <Navbar />
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sellpost/write" element={<Write />} />
        <Route path="/sellpost/search" element={<SearchLogic />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/manage" element={<DashBoardPage />} />
        <Route path="/manage/dashboard" element={<DashBoardPage />} />
        <Route path="/manage/member" element={<MemberPage />} />
        <Route path="/manage/report" element={<ReportPage />} />
          <Route path="/sellpost/write" element={<Write />} />
          <Route path="/sellpost/read/:sellPostId" element={<Read />} />
      </Routes>
    </>


  );
}

export default App;

