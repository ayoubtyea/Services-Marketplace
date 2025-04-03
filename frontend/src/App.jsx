import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Layouts
import MainLayout from './layouts/MainLayout'; // Keep this import
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

// Dashboard Pages
import ClientBookings from './pages/dashboard/client/Bookings';
import ProviderBookings  from "./pages/dashboard/provider/Bookings"
import AdminBookings from "./pages/dashboard/admin/Bookings"
import ClientDashboardHome from './pages/dashboard/client/DashboardHome';
import Notifications from './pages/dashboard/client/Notifications';
import ProfileSettings from './pages/dashboard/client/Profile';

// Import Navbar and Footer if they're used in MainLayout
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Auth routes without navbar/footer */}
          <Route path="/auth" element={<AuthPage />} />
          
          {/* Client Dashboard routes */}
          <Route path="/client-dashboard" element={
            <ProtectedRoute allowedRoles={['client']}>
              <ClientDashboard />
            </ProtectedRoute>
          }>
            <Route index element={<ClientDashboardHome />} />
            <Route path="bookings" element={<ClientBookings />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="profile" element={<ProfileSettings />} />
            {/* Add other client routes */}
          </Route>
          
          {/* Provider Dashboard routes */}
          <Route path="/provider-dashboard" element={
            <ProtectedRoute allowedRoles={['provider']}>
              <ProviderDashboard />
            </ProtectedRoute>
          }>
            <Route index element={<div>Provider Dashboard Home</div>} />
            <Route path="bookings" element={<ProviderBookings />} />
            {/* Add other provider routes */}
          </Route>
          
          {/* Admin Dashboard routes */}
          <Route path="/admin-dashboard" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }>
            <Route index element={<div>Admin Dashboard Home</div>} />
            <Route path="bookings" element={<AdminBookings />} />
            {/* Add other admin routes */}
          </Route>
          
          {/* All other routes with navbar and footer */}
          <Route path="/*" element={
            <>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<Services />} />
                <Route path="/service-details/:id" element={<ServiceDetailsPage />} />
                <Route path="/taskers/:id" element={<TaskerDetailsPage />} />
                <Route path="/book/:id" element={<BookingPage />} />
              </Routes>
              <Footer />
            </>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;