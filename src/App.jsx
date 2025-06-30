import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GlobalProvider } from './context/GlobalContext';

// Pages
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ShipsPage from './pages/ShipsPage';
import ShipDetailPage from './pages/ShipDetailPage';
import JobsPage from './pages/JobsPage';

// Components
import MaintenanceCalendar from './components/Calendar/MaintenanceCalendar';
import NotificationCenter from './components/Notifications/NotificationCenter';
import ProtectedRoute from './routes/ProtectedRoute';

function App() {
  return (
    <GlobalProvider>
      <Router>
        {/* Global Notification Display */}
        <NotificationCenter />

        <Routes>
          <Route path="/" element={<LoginPage />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/ships"
            element={
              <ProtectedRoute>
                <ShipsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/ships/:id"
            element={
              <ProtectedRoute>
                <ShipDetailPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/jobs"
            element={
              <ProtectedRoute>
                <JobsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/calendar"
            element={
              <ProtectedRoute>
                <MaintenanceCalendar />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </GlobalProvider>
  );
}

export default App;
