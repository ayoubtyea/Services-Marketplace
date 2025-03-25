import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer';
import AuthPage from './pages/AuthPage';
import Services from './pages/Services';
import ServiceDetailsPage from './pages/ServiceDetailsPage';
import TaskerDetailsPage from './pages/TaskerDetailsPage';
import BookingPage from './pages/BookingPage';
import ClientDashboard from './pages/dashboard/ClientDashboard';
import ProviderDashboard from './pages/dashboard/ProviderDashboard';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';

const MainLayout = () => {
  const location = useLocation();
  const hideFooter = location.pathname === '/auth' || location.pathname === '/logout';

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/service-details/:id" element={<ServiceDetailsPage />} />
        <Route path="/taskers/:id" element={<TaskerDetailsPage />} />
        <Route path="/book/:id" element={<BookingPage />} />
        
        {/* Protected Dashboard Routes */}
        <Route path="/client-dashboard" element={
          <ProtectedRoute allowedRoles={['client']}>
            <ClientDashboard />
          </ProtectedRoute>
        } />
        <Route path="/provider-dashboard" element={
  <ProtectedRoute allowedRoles={['provider']}>
    <ProviderDashboard />
  </ProtectedRoute>
}/>
        <Route path="/admin-dashboard" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        } />
      </Routes>
      {!hideFooter && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Auth routes without navbar/footer */}
        <Route path="/auth" element={<AuthPage />} />
        
        {/* All other routes with navbar and conditional footer */}
        <Route path="/*" element={<MainLayout />} />
      </Routes>
    </Router>
  );
};

export default App;