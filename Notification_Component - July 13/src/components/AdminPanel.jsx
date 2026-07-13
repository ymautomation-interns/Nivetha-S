import { useState, useEffect } from 'react';
import { addNotification, useAllNotifications, removeNotification, clearAllNotifications } from '../utils/store';

function AdminPanel() {
  const [targetUser, setTargetUser] = useState('all');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleHour, setScheduleHour] = useState('');
  const [scheduleMinute, setScheduleMinute] = useState('00');
  const [schedulePeriod, setSchedulePeriod] = useState('AM');
  const [previewTime, setPreviewTime] = useState('Just now');
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLogOpen, setIsLogOpen] = useState(true);
  const sentNotifications = useAllNotifications();

  useEffect(() => {
    if (scheduleDate && scheduleHour) {
      const date = new Date(scheduleDate);
      const monthName = date.toLocaleString('en-US', { month: 'short' });
      const day = date.getDate();
      setPreviewTime(`${monthName} ${day}, ${scheduleHour}:${scheduleMinute} ${schedulePeriod}`);
    } else {
      setPreviewTime('Just now');
    }
  }, [scheduleDate, scheduleHour, scheduleMinute, schedulePeriod]);

  const handleSubmit = (e) => {
    e.preventDefault();
    addNotification(targetUser, title || 'Meeting Reminder', message || 'No message provided', previewTime);
    
    // Show custom success UI instead of browser alert
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);

    setTitle('');
    setMessage('');
    setScheduleDate('');
    setScheduleHour('');
    setScheduleMinute('00');
    setSchedulePeriod('AM');
  };

  return (
    <div className="admin-dashboard-container">

      {/* Custom Success Overlay centered on screen */}
      {showSuccess && (
        <div style={{
          position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          backgroundColor: '#4ade80', color: '#064e3b', padding: '20px 40px',
          borderRadius: '12px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)',
          zIndex: 9999, fontSize: '18px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px',
          animation: 'slideIn 0.3s ease-out'
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
          Notification Broadcasted Successfully!
        </div>
      )}


      <div className="admin-grid">
        {/* Composer Form */}
        <div className="admin-panel composer-card">
          <h3 style={{ marginBottom: '20px', color: '#1a1a1a', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1976d2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
            Compose Message
          </h3>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Target Audience</label>
              <select className="form-control admin-input" value={targetUser} onChange={e => setTargetUser(e.target.value)} required>
                <option value="all">Broadcast to All Users</option>
                <option value="user1">User 1</option>
                <option value="user2">User 2</option>
              </select>
            </div>

            <div className="form-group">
              <label>Notification Title</label>
              <input 
                type="text" 
                className="form-control admin-input" 
                placeholder="e.g., Urgent Team Meeting" 
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Message Content</label>
              <textarea 
                className="form-control admin-input" 
                placeholder="e.g., The meeting will be at 2:30pm on July 13 in the main hall." 
                value={message}
                onChange={e => setMessage(e.target.value)}
                required
                style={{ minHeight: '100px' }}
              />
            </div>

            <div className="form-group">
              <label>Schedule Date</label>
              <input 
                type="date" 
                className="form-control admin-input" 
                value={scheduleDate}
                onChange={e => setScheduleDate(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Schedule Time</label>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <select className="form-control admin-input" value={scheduleHour} onChange={e => setScheduleHour(e.target.value)} style={{ flex: 1 }}>
                  <option value="">Hour</option>
                  {[12,1,2,3,4,5,6,7,8,9,10,11].map(h => (
                    <option key={h} value={h}>{h}</option>
                  ))}
                </select>
                <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#666' }}>:</span>
                <select className="form-control admin-input" value={scheduleMinute} onChange={e => setScheduleMinute(e.target.value)} style={{ flex: 1 }}>
                  {['00','05','10','15','20','25','30','35','40','45','50','55'].map(m => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
                <select className="form-control admin-input" value={schedulePeriod} onChange={e => setSchedulePeriod(e.target.value)} style={{ flex: 1 }}>
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
            </div>

            <button type="submit" className="btn primary send-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
              Dispatch Notification
            </button>
          </form>
        </div>

        {/* Live Preview Pane */}
        <div className="live-preview-pane">
          <h3 style={{ marginBottom: '20px', color: '#666', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Live User Preview
          </h3>
          <div className="preview-environment" style={{ minHeight: '400px' }}>
            <div className="preview-toast">
              <div className="notification-title">{title || 'Urgent Team Meeting'}</div>
              <div className="notification-time">{previewTime}</div>
              <div className="notification-body">{message || 'The meeting will be at 2:30pm on July 13 in the main hall.'}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Sent Notifications Log - fixed at the bottom, this is the admin's "outbox" */}
      <div className="notification-history-panel">
        <div className="notification-history-header" onClick={() => setIsLogOpen(!isLogOpen)}>
          <h3>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            Sent Notifications {sentNotifications.length > 0 && `(${sentNotifications.length})`}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: isLogOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}><polyline points="6 9 12 15 18 9"></polyline></svg>
          </h3>
          {sentNotifications.length > 0 && (
            <button
              className="btn small text"
              onClick={(e) => {
                e.stopPropagation();
                if (window.confirm('Clear all sent notifications? This removes them for users too.')) {
                  clearAllNotifications();
                }
              }}
            >
              Clear All
            </button>
          )}
        </div>

        {isLogOpen && (
          <div className="notification-history-list">
            {sentNotifications.length === 0 ? (
              <div className="empty-state">Nothing sent yet. Compose a message above.</div>
            ) : (
              sentNotifications.map(notif => (
                <div key={notif.id} className="notification-history-item">
                  <div className="notification-history-dot"></div>
                  <div style={{ flex: 1 }}>
                    <div className="notification-title">{notif.title}</div>
                    <div className="notification-body">{notif.message}</div>
                    <div className="notification-time">
                      To: {notif.targetUser === 'all' ? 'All Users' : notif.targetUser} &middot; {notif.time}
                    </div>
                  </div>
                  <button className="notification-close" onClick={() => removeNotification(notif.id)} aria-label="Remove">&times;</button>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPanel;
