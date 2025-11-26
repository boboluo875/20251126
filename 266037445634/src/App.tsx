import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import HealthQuizPlanner from "@/pages/HealthQuizPlanner";
import Profile from "@/pages/Profile";
import GiftCenter from "@/pages/GiftCenter";
import Voucher from "@/pages/Voucher";
import QuizGame from "@/pages/QuizGame";
import { useState } from "react";
import { AuthContext } from '@/contexts/authContext';
import { ShareInfo } from "@/components/ShareInfo";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // 默认已登录，实际项目中应该检查登录状态

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <>
      <AuthContext.Provider
        value={{ isAuthenticated, setIsAuthenticated, logout }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/health-quiz-planner" element={<HealthQuizPlanner />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/quiz-game" element={<QuizGame />} />
          <Route path="/quiz-history" element={<div className="text-center text-xl p-8">答题记录 - 开发中</div>} />
          <Route path="/my-points" element={<div className="text-center text-xl p-8">我的积分 - 开发中</div>} />
          <Route path="/gift-center" element={<GiftCenter />} />
          <Route path="/voucher" element={<Voucher />} />
        </Routes>
      </AuthContext.Provider>
      <ShareInfo />
    </>
  );
}