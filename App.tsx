import React, { useState } from 'react';
import { HashRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { TaskHall } from './pages/TaskHall';
import { TaskDetail } from './pages/TaskDetail';
import { Workbench } from './pages/Workbench';
import { Progress } from './pages/Progress';
import { Wallet } from './pages/Wallet';
import { Profile } from './pages/Profile';
import { Login } from './pages/Login';
import { BottomNav } from './components/BottomNav';

const Layout = ({ children }: { children?: React.ReactNode }) => {
  const location = useLocation();
  const hideNavPaths = ['/login', '/workbench', '/task/'];

  const shouldHideNav = hideNavPaths.some(path => location.pathname.startsWith(path) || location.pathname === '/login');
  
  // Specific check for detail page which hides nav but has its own structure
  const isDetailPage = location.pathname.startsWith('/task/') && location.pathname !== '/task-hall';

  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark text-slate-900 dark:text-white overflow-hidden max-w-md mx-auto shadow-2xl relative">
      <div className="flex-1 overflow-hidden relative">
        {children}
      </div>
      {!shouldHideNav && !isDetailPage && <BottomNav />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/hall" element={<TaskHall />} />
          <Route path="/task/:id" element={<TaskDetail />} />
          <Route path="/workbench/:id" element={<Workbench />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;