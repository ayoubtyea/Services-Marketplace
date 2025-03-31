import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer';
import AuthPage from './pages/AuthPage';
import Services from './pages/Services';
import ServiceDetailsPage from './pages/ServiceDetailsPage';
import TaskerDetailsPage from './pages/TaskerDetailsPage';
import BookingPage from './pages/BookingPage';
import ClientDashboard from './layouts/ClientDashboard';
import ProviderDashboard from './layouts/ProviderDashboard';
import AdminDashboard from './layouts/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute'; // ✅ Import this


const MainLayout = () => {
  return (
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
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Auth routes without navbar/footer */}
        <Route path="/auth" element={<AuthPage />} />
        
        {/* Dashboard routes with custom layout (no navbar/footer) */}
        <Route path="/client-dashboard/*" element={
          <ProtectedRoute allowedRoles={['client']}>
            <ClientDashboard />
          </ProtectedRoute>
        } />
        
        <Route path="/provider-dashboard/*" element={
          <ProtectedRoute allowedRoles={['provider']}>
            <ProviderDashboard />
          </ProtectedRoute>
        } />
        
        <Route path="/admin-dashboard/*" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        
        {/* All other routes with navbar and footer */}
        <Route path="/*" element={<MainLayout />} />
      </Routes>
    </Router>
  );
};

export default App;