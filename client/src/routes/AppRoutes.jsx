import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute.jsx';
import AppShell from '../components/layout/AppShell.jsx';

import LandingPage from '../pages/LandingPage.jsx';
import DashboardPage from '../pages/DashboardPage.jsx';
import AnalyticsPage from '../pages/AnalyticsPage.jsx';
import ApplicationDetailPage from '../pages/ApplicationDetailPage.jsx';
import KanbanPage from '../pages/KanbanPage.jsx';
import SettingsPage from '../pages/SettingsPage.jsx';
import CalendarPage from '../pages/CalendarPage.jsx';
import SignInPage from '../pages/SignInPage.jsx';
import SignUpPage from '../pages/SignUpPage.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/sign-in/*" element={<SignInPage />} />
      <Route path="/sign-up/*" element={<SignUpPage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<AppShell />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/kanban" element={<KanbanPage />} />
          <Route path="/applications/:id" element={<ApplicationDetailPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
