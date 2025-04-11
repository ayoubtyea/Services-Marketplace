import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Layouts
import MainLayout from './layouts/MainLayout';
import ClientDashboard from './layouts/dashboard/ClientDashboard';
import ProviderDashboard from './layouts/dashboard/ProviderDashboard';
import AdminDashboard from './layouts/dashboard/AdminDashboard';

// Pages
import Home from './pages/Home';
import AuthPage from './pages/AuthPage';
import Services from './pages/Services';
import ServiceDetailsPage from './pages/ServiceDetailsPage';
import TaskerDetailsPage from './pages/TaskerDetailsPage';
import BookingPage from './pages/BookingPage';
import BecomeTasker from './pages/BecomeTasker';
import About from './pages/About';
import Contact from './pages/Contact';

// Dashboard Pages
import ClientBookings from './pages/dashboard/client/Bookings';
import ProviderBookings from "./pages/dashboard/provider/Bookings";
import AdminBookings from "./pages/dashboard/admin/Bookings";
import ClientDashboardHome from './pages/dashboard/client/DashboardHome';
import Notifications from './pages/dashboard/client/Notifications';
import ProfileSettings from './pages/dashboard/client/Profile';
import HelpAndSupport from './pages/dashboard/client/Help';
import ProviderDashboardHome from './pages/dashboard/provider/DashboardHome';
import NotFound from './pages/NotFound';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ReadyToJoin from './components/ReadyToJoin';

// Layout component for public routes with navbar and footer
const PublicLayout = () => (
  <>
    <Navbar />
    <Outlet />
    <Footer />
  </>
);

// Layout component for private routes with navbar and footer
const PrivateLayout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

const App = () => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    userRole: null,
    userData: null,
  });

  useEffect(() => {
    // Check if user is logged in and retrieve the role
    const token = localStorage.getItem("authToken");
    const userData = JSON.parse(localStorage.getItem("userData") || "null");

    setAuthState({
      isAuthenticated: !!token,
      userRole: userData?.role || null,
      userData: userData,
    });
  }, []);

  // Check if the user is an admin and redirect accordingly
  const redirectToDashboard = () => {
    if (authState.isAuthenticated) {
      if (authState.userRole === 'admin') {
        return <Navigate to="/admin-dashboard" />;
      } else if (authState.userRole === 'provider') {
        return <Navigate to="/provider-dashboard" />;
      } else if (authState.userRole === 'client') {
        return <Navigate to="/client-dashboard" />;
      }
    }
    return <Home />; // Default route if no authentication
  };

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Auth route without navbar/footer */}
          <Route path="/auth" element={<AuthPage />} />

          {/* Dashboard routes */}
          <Route path="/client-dashboard" element={
            <ProtectedRoute allowedRoles={['client']}>
              <ClientDashboard />
            </ProtectedRoute>
          }>
            <Route index element={<ClientDashboardHome />} />
            <Route path="bookings" element={<ClientBookings />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="profile" element={<ProfileSettings />} />
            <Route path="help" element={<HelpAndSupport />} />
          </Route>

          <Route path="/provider-dashboard" element={
            <ProtectedRoute allowedRoles={['provider']}>
              <ProviderDashboard />
            </ProtectedRoute>
          }>
            <Route index element={<ProviderDashboardHome />} />
            <Route path="bookings" element={<ProviderBookings />} />
          </Route>

          <Route path="/admin-dashboard" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }>
            <Route index element={<div>Admin Dashboard Home</div>} />
            <Route path="bookings" element={<AdminBookings />} />
          </Route>

          {/* Public routes with navbar and footer */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={redirectToDashboard()} />
            <Route path="/services" element={<Services />} />
            <Route path="/service-details/:id" element={<ServiceDetailsPage />} />
            <Route path="/taskers/:id" element={<TaskerDetailsPage />} />
            <Route path="/become-tasker" element={<BecomeTasker />} />
            <Route path="/book/:id" element={<BookingPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/ready-to-join" element={<ReadyToJoin />} />
            <Route path="/NotFound" element={<NotFound />} />
            {/* Catch-all for other public routes */}
            <Route path="*" element={<NotFound />} />
          </Route>

        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
