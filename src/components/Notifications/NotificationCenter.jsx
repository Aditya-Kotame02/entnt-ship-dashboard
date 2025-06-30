import React from 'react';
import { useGlobalContext } from '../../context/GlobalContext';

const NotificationCenter = () => {
  const { notifications, dismissNotification } = useGlobalContext();

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((note) => (
        <div
          key={note.id}
          className="bg-white shadow-lg border-l-4 border-blue-500 p-4 rounded w-64"
        >
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-700">{note.message}</p>
            <button
              onClick={() => dismissNotification(note.id)}
              className="text-red-500 text-sm font-bold"
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationCenter;
