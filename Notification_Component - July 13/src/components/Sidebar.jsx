import { useState } from 'react';
import { removeNotificationForUser, clearAllForUser } from '../utils/store';
import ConfirmDialog from './ConfirmDialog';

function Sidebar({ isOpen, onClose, notifications, currentUser }) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  if (!isOpen) return null;

  const handleConfirmClear = () => {
    clearAllForUser(currentUser);
    setConfirmOpen(false);

    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 2500);
  };

  return (
    <>
      {showSuccess && (
        <div style={{
          position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          backgroundColor: '#4ade80', color: '#064e3b', padding: '20px 40px',
          borderRadius: '12px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)',
          zIndex: 9999, fontSize: '18px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px',
          animation: 'slideIn 0.3s ease-out'
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
          All Notifications Cleared!
        </div>
      )}

      <div className="sidebar-overlay active" onClick={onClose}></div>
      <aside className="sidebar open">
        <div className="sidebar-header">
          <h2>Notifications</h2>
          <div className="sidebar-actions">
            {notifications.length > 0 && (
              <button 
                className="btn small text" 
                onClick={() => setConfirmOpen(true)}
              >
                Clear all
              </button>
            )}
            <button className="close-sidebar-btn" onClick={onClose}>&times;</button>
          </div>
        </div>
        
        <div className="sidebar-content">
          {notifications.length === 0 ? (
            <div className="empty-state">No new notifications</div>
          ) : (
            notifications.map(notif => (
              <div key={notif.id} className="notification-item unread">
                <button 
                  className="notification-close" 
                  aria-label="Clear"
                  onClick={() => removeNotificationForUser(notif.id, currentUser)}
                >
                  &times;
                </button>
                <div className="notification-header">
                  <span className="notification-title">{notif.title}</span>
                </div>
                <div className="notification-time">{notif.time}</div>
                <div className="notification-body">{notif.message}</div>
              </div>
            ))
          )}
        </div>
      </aside>

      <ConfirmDialog
        open={confirmOpen}
        title="Clear all notifications?"
        message="This will remove every notification from your list. This can't be undone."
        onConfirm={handleConfirmClear}
        onCancel={() => setConfirmOpen(false)}
      />
    </>
  );
}

export default Sidebar;