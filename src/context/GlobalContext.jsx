import { createContext, useContext, useEffect, useState } from 'react';

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('currentUser')) || null;
    } catch {
      return null;
    }
  });

  const [notifications, setNotifications] = useState([]);

  const login = (userObj) => {
    setUser(userObj);
    localStorage.setItem('currentUser', JSON.stringify(userObj));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const addNotification = (msg) => {
    const note = { id: Date.now(), message: msg };
    setNotifications((prev) => [...prev, note]);
  };

  const dismissNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

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
