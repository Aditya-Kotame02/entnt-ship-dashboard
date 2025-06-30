import { createContext, useContext, useEffect, useState } from 'react';

// 1. Create the context
const GlobalContext = createContext();

// 2. Custom hook for easy context access
export const useGlobalContext = () => useContext(GlobalContext);

// 3. Provider Component
export const GlobalProvider = ({ children }) => {
  // Current user (persisted via localStorage)
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('currentUser')) || null;
    } catch {
      return null;
    }
  });

  // In-app notification system (non-persistent by default)
  const [notifications, setNotifications] = useState([]);

  // Handle login
  const login = (userObj) => {
    setUser(userObj);
    localStorage.setItem('currentUser', JSON.stringify(userObj));
  };

  // Handle logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  // Add a new notification
  const addNotification = (msg) => {
    const note = { id: Date.now(), message: msg };
    setNotifications((prev) => [...prev, note]);
  };

  // Dismiss a notification
  const dismissNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // Optional: Persist notifications (if needed)
  // useEffect(() => {
  //   localStorage.setItem('notifications', JSON.stringify(notifications));
  // }, [notifications]);

  return (
    <GlobalContext.Provider
      value={{
        user,
        login,
        logout,
        notifications,
        addNotification,
        dismissNotification
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
