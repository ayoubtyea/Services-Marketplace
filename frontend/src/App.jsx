import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // Assuming this is your custom AuthProvider
import ProtectedRoute from './components/ProtectedRoute';
import { Outlet } from 'react-router-dom';  // Import Outlet to render child routes


// Layouts
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


// Dashboard Client

import ClientBookings from './pages/dashboard/client/Bookings';
import ClientDashboardHome from './pages/dashboard/client/DashboardHome';
import Notifications from './pages/dashboard/client/Notifications';
import ProfileSettings from './pages/dashboard/client/Profile';
import HelpAndSupport from './pages/dashboard/client/Help';

// Dashboard Provider
import ProviderDashboardHome from './pages/dashboard/provider/DashboardHome';
import ProviderBookings from './pages/dashboard/provider/Bookings';
import MyMessages from './pages/dashboard/provider/MyMessages';
import Earnings from './pages/dashboard/provider/Earnings';
import MyTasks from './pages/dashboard/provider/MyTasks';
import Settings from './pages/dashboard/provider/Settings';
import Profile from './pages/dashboard/provider/Profile';
import ProviderNotifications from './pages/dashboard/provider/Notifications';
import ProviderHelp from './pages/dashboard/provider/Help'; 
import ManageServices from './pages/dashboard/provider/ManageServices';

// Dashboard Admin
import AdminBookings from './pages/dashboard/admin/Bookings';
import AdminDashboardHome from './pages/dashboard/admin/DashboardHome';
import AdminCutomers from './pages/dashboard/admin/Customers';
import AdminNotifications from './pages/dashboard/admin/Notifications';
import AdminTaskers from './pages/dashboard/admin/Taskers';
import AdminServices from './pages/dashboard/admin/Services';
import AdminSettings from './pages/dashboard/admin/Settings';

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

  const [loading, setLoading] = useState(true);

  // Check for token and user data in localStorage
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userData = JSON.parse(localStorage.getItem('userData')) || null;
    
    setAuthState({
      isAuthenticated: !!token,
      userRole: userData?.role || null,
      userData: userData,
    });

    setLoading(false);  // Set loading to false once the auth check is done
  }, []);

  // Show a loading state while authentication data is being checked
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Auth route without navbar/footer */}
          <Route path="/auth" element={<AuthPage />} />

          {/* Protected routes for client, provider, and admin */}
          <Route 
            path="/client-dashboard" 
            element={
              <ProtectedRoute allowedRoles={['client']}>
                <ClientDashboard userRole={authState.userRole} />
              </ProtectedRoute>
            }
          >
            <Route index element={<ClientDashboardHome />} />
            <Route path="bookings" element={<ClientBookings />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="profile" element={<ProfileSettings />} />
            <Route path="help" element={<HelpAndSupport />} />
          </Route>

          <Route 
            path="/provider-dashboard" 
            element={
              <ProtectedRoute allowedRoles={['provider']}>
                <ProviderDashboard userRole={authState.userRole} />
              </ProtectedRoute>
            }
          >
            <Route index element={<ProviderDashboardHome />} />
            <Route path="bookings" element={<ProviderBookings />} />
            <Route path="messages" element={<MyMessages />} />
            <Route path="notifications" element={<ProviderNotifications />} />
            <Route path="earnings" element={<Earnings />} />
            <Route path="tasks" element={<MyTasks />} />
            <Route path="settings" element={<Settings />} />
            <Route path="profile" element={<Profile />} />
            <Route path="help" element={<ProviderHelp />} />
            <Route path="manage-services" element={<ManageServices />} />
          </Route>

          <Route 
            path="/admin-dashboard" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard userRole={authState.userRole} />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboardHome />} />
            <Route path="taskers" element={<AdminTaskers />} />
            <Route path="bookings" element={<AdminBookings />} />
            <Route path="customers" element={<AdminCutomers />} />
            <Route path="services" element={<AdminServices />} />
            <Route path="notifications" element={<AdminNotifications />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          {/* Public routes with navbar and footer */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/service-details/:id" element={<ServiceDetailsPage />} />
            <Route path="/taskers/:id" element={<TaskerDetailsPage />} />
            <Route path="/become-tasker" element={<BecomeTasker />} />
            <Route path="/book/:id" element={<BookingPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/ready-to-join" element={<ReadyToJoin />} />
            <Route path="/NotFound" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Redirect to correct dashboard if authenticated */}
          <Route path="/" element={authState.isAuthenticated ? <Navigate to={`/${authState.userRole}-dashboard`} /> : <Navigate to="/auth" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
