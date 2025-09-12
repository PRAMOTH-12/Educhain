import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CredentialProvider } from './context/CredentialContext';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';

import Dashboard from './employer/dashboard';
import RequestCredential from './employer/requestCredential';
import VerifyCredential from './employer/verifyCredential';
import History from './employer/history';
import Profile from './employer/profile';

export default function App() {
  return (
    <CredentialProvider>
      <Router>
        <div className="app-shell">
          <Sidebar />
          <div className="main-area">
            <Topbar />
            <main className="page-content">
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/request" element={<RequestCredential />} />
                <Route path="/verify" element={<VerifyCredential />} />
                <Route path="/history" element={<History />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </CredentialProvider>
  );
}
