import { useState } from 'react';
import AdminPanel from './AdminPanel';
import Sidebar from './Sidebar';
import ToastManager from './ToastManager';
import NotificationBell from './NotificationBell';
import { useNotifications, markAllRead } from '../utils/store';

function Dashboard({ currentUser, onLogout }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const notifications = useNotifications(currentUser);
  const unreadCount = notifications.filter(n => !n.read).length;

  const isAdmin = currentUser === 'admin';

  const handleBellClick = () => {
    setIsSidebarOpen(prev => {
      const next = !prev;
      if (next) markAllRead(currentUser);
      return next;
    });
  };

  return (
    <>
      <header className="app-header">
        <h1 className="logo">{isAdmin ? 'Admin Dashboard' : 'User Dashboard'}</h1>
        <div className="header-right">
          <span className="user-label">
            Logged in as: <strong style={{ color: '#1976d2', fontWeight: '700' }}>{isAdmin ? 'ADMIN' : currentUser.toUpperCase()}</strong>
          </span>
          {!isAdmin && (
            <NotificationBell count={unreadCount} onClick={handleBellClick} />
          )}

          <button className="btn logout-btn" onClick={onLogout}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            Logout
          </button>
        </div>
      </header>

      <main className="main-content">
        {isAdmin ? (
          <AdminPanel />
        ) : (
          <div className="user-dashboard">
            {/* Workspace Content */}
            <div className="workspace-grid">
              <div className="workspace-card">
                <div className="workspace-card-icon" style={{ background: '#e0f2fe' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                </div>
                <h3>My Schedule</h3>
                <p>3 meetings today</p>
              </div>
              <div className="workspace-card">
                <div className="workspace-card-icon" style={{ background: '#dcfce7' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                </div>
                <h3>Tasks Done</h3>
                <p>12 of 15 completed</p>
              </div>
              <div className="workspace-card">
                <div className="workspace-card-icon" style={{ background: '#fef3c7' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                </div>
                <h3>Pending</h3>
                <p>3 tasks remaining</p>
              </div>
              <div className="workspace-card">
                <div className="workspace-card-icon" style={{ background: '#fce7f3' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#db2777" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                </div>
                <h3>Team</h3>
                <p>8 members online</p>
              </div>
            </div>
          </div>
        )}
      </main>

      {!isAdmin && (
        <>
          <Sidebar 
            isOpen={isSidebarOpen} 
            onClose={() => setIsSidebarOpen(false)} 
            notifications={notifications}
            currentUser={currentUser}
          />
          <ToastManager notifications={notifications} />
        </>
      )}
    </>
  );
}

export default Dashboard;
