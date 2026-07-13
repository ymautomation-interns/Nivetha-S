import { useState, useEffect, useRef } from 'react';

// Plays the notification chime. Browsers block audio that isn't tied to
// a user gesture on the very first play, so a failed play() is just ignored -
// after the user has clicked anywhere once, every following play() works fine.
const playNotifySound = () => {
  try {
    const audio = new Audio('/notify.mp3');
    audio.volume = 0.5;
    audio.play().catch(() => {});
  } catch (e) {
    // ignore - sound is a nice-to-have, never block the notification for it
  }
};

function Toast({ notif, onRemove }) {
  const [isHiding, setIsHiding] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const soundPlayed = useRef(false);

  useEffect(() => {
    if (!soundPlayed.current) {
      playNotifySound();
      soundPlayed.current = true;
    }

    // 30 seconds timer, no matter if it was opened or not
    const timer = setTimeout(() => {
      handleClose();
    }, 30000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsHiding(true);
  };

  const handleAnimationEnd = () => {
    if (isHiding) {
      onRemove(notif.id);
    }
  };

  return (
    <div
      className={`toast ${isHiding ? 'hiding' : ''} ${revealed ? 'toast-revealed' : ''}`}
      onAnimationEnd={handleAnimationEnd}
      onClick={() => setRevealed(true)}
      role="button"
      tabIndex={0}
    >
      <button
        className="notification-close"
        onClick={(e) => { e.stopPropagation(); handleClose(); }}
        aria-label="Close"
      >
        &times;
      </button>

      {!revealed ? (
        <div className="toast-teaser">
          <div className="toast-teaser-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
          </div>
          <div>
            <div className="notification-title">New message from Admin</div>
            <div className="notification-time">{notif.time}</div>
            <div className="toast-teaser-hint">View full message</div>
          </div>
        </div>
      ) : (
        <>
          <div className="notification-title">{notif.title}</div>
          <div className="notification-time">{notif.time}</div>
          <div className="notification-body">{notif.message}</div>
        </>
      )}
    </div>
  );
}

function ToastManager({ notifications }) {
  const [activeToasts, setActiveToasts] = useState([]);
  
  useEffect(() => {
    // When new notifications arrive, find those we haven't seen in the toast manager yet.
    // We only show toasts for notifications created in the last 5 seconds to avoid 
    // showing old notifications on page reload.
    const newToasts = notifications.filter(
      notif => !activeToasts.find(t => t.id === notif.id) && (Date.now() - notif.timestamp < 5000)
    );
    
    if (newToasts.length > 0) {
      setActiveToasts(prev => [...prev, ...newToasts]);
    }
  }, [notifications]);

  const handleRemove = (id) => {
    setActiveToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="toast-container">
      {activeToasts.map(toast => (
        <Toast key={toast.id} notif={toast} onRemove={handleRemove} />
      ))}
    </div>
  );
}

export default ToastManager;