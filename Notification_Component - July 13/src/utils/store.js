import { useState, useEffect } from 'react';

const STORAGE_KEY = 'react_notification_app_data';

// Default users database
const DEFAULT_USERS = [
  { username: 'admin', password: 'admin123', role: 'admin' },
  { username: 'user1', password: 'password123', role: 'user' },
  { username: 'user2', password: 'password123', role: 'user' }
];

// Helper to init storage
const initStore = () => {
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ 
      notifications: [],
      users: DEFAULT_USERS
    }));
  }
};
initStore();

const getStore = () => JSON.parse(localStorage.getItem(STORAGE_KEY));

export const getUsers = () => {
  const store = getStore();
  // If user visited previously before we added users DB, patch it
  if (!store.users) {
    store.users = DEFAULT_USERS;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  }
  return store.users;
};

const setStore = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  // Dispatch custom event for the current tab to re-render
  window.dispatchEvent(new Event('local-storage-update'));
};

export const addNotification = (targetUser, title, message, time) => {
  const data = getStore();
  const newNotif = {
    id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
    targetUser,
    title,
    message,
    time, // e.g., "Jul 13, 2:30 PM" without seconds
    timestamp: Date.now(),
    read: false,
    clearedBy: [] // tracks which users have individually dismissed a broadcast ('all') notification
  };
  data.notifications.push(newNotif);
  setStore(data);
};

// Full delete - used by the ADMIN outbox only, removes it for everyone
export const removeNotification = (id) => {
  const data = getStore();
  data.notifications = data.notifications.filter(n => n.id !== id);
  setStore(data);
};

// Per-user dismiss - used by the USER sidebar/toast.
// If the notif was sent directly to this user, delete it for real.
// If it was a broadcast ('all'), just mark it cleared for this user so others still see it.
export const removeNotificationForUser = (id, userId) => {
  const data = getStore();
  const notif = data.notifications.find(n => n.id === id);
  if (!notif) return;

  if (notif.targetUser === userId) {
    data.notifications = data.notifications.filter(n => n.id !== id);
  } else if (notif.targetUser === 'all') {
    if (!notif.clearedBy) notif.clearedBy = [];
    if (!notif.clearedBy.includes(userId)) notif.clearedBy.push(userId);
  }
  setStore(data);
};

export const clearAllForUser = (userId) => {
  const data = getStore();
  data.notifications = data.notifications.filter(n => n.targetUser !== userId); // direct ones: delete
  data.notifications.forEach(n => {
    if (n.targetUser === 'all') {
      if (!n.clearedBy) n.clearedBy = [];
      if (!n.clearedBy.includes(userId)) n.clearedBy.push(userId);
    }
  });
  setStore(data);
};

// Marks every notification a given user can see as read (used when the bell/sidebar is opened)
export const markAllRead = (userId) => {
  const data = getStore();
  let changed = false;
  data.notifications.forEach(n => {
    if ((n.targetUser === userId || n.targetUser === 'all') && !n.read) {
      n.read = true;
      changed = true;
    }
  });
  if (changed) setStore(data);
};

// Admin only: wipe every notification that has ever been sent
export const clearAllNotifications = () => {
  const data = getStore();
  data.notifications = [];
  setStore(data);
};

// React Hook to subscribe to notifications for a specific user
export const useNotifications = (userId) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // We do NOT want the admin to receive ANY notifications.
    // So if userId is admin, always return empty array and don't listen.
    if (userId === 'admin') {
      setNotifications([]);
      return;
    }

    const loadData = () => {
      const data = getStore();
      const userNotifs = data.notifications
        .filter(n => (n.targetUser === userId || n.targetUser === 'all') && !(n.clearedBy || []).includes(userId))
        .sort((a, b) => b.timestamp - a.timestamp);
      setNotifications(userNotifs);
    };

    // Load initial data
    loadData();

    // Listen for cross-tab updates (Storage Event)
    const handleStorage = (e) => {
      if (e.key === STORAGE_KEY) loadData();
    };
    
    // Listen for same-tab updates (Custom Event)
    const handleLocalUpdate = () => loadData();

    window.addEventListener('storage', handleStorage);
    window.addEventListener('local-storage-update', handleLocalUpdate);

    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('local-storage-update', handleLocalUpdate);
    };
  }, [userId]);

  return notifications;
};

// React Hook for the admin: everything ever sent, newest first (this is the admin's "outbox")
export const useAllNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const loadData = () => {
      const data = getStore();
      const sorted = [...data.notifications].sort((a, b) => b.timestamp - a.timestamp);
      setNotifications(sorted);
    };

    loadData();

    const handleStorage = (e) => {
      if (e.key === STORAGE_KEY) loadData();
    };
    const handleLocalUpdate = () => loadData();

    window.addEventListener('storage', handleStorage);
    window.addEventListener('local-storage-update', handleLocalUpdate);

    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('local-storage-update', handleLocalUpdate);
    };
  }, []);

  return notifications;
};