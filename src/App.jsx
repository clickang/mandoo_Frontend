import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Mypage from './pages/Mypage';
import Login from './pages/Login/Login';
import Write from './pages/Sellpost/WriteComponent'
import SearchLogic from './components/SearchLogic'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// QueryClient 생성
const queryClient = new QueryClient();

function App() {
  return (
    // React Query Provider 설정
    <QueryClientProvider client={queryClient}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sellpost/write" element={<Write />} />
          <Route path="/sellpost/search" element={<SearchLogic />} />
        </Routes>
      </Router>
      {/* React Query Devtools */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
