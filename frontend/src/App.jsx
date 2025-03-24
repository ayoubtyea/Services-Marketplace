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



const App = () => {
  return (
    <Router>
      {/* Navbar should be rendered on all pages except /auth */}
      <Routes>
        <Route path="/" element={<Navbar />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>

      {/* Main Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/service-details/:id" element={<ServiceDetailsPage />} />
        <Route path="/taskers/:id" element={<TaskerDetailsPage />} /> 
        <Route path="/book/:id" element={<BookingPage />} /> {/* Add this route */}

        </Routes>

      <Footer />
    </Router>
  );
};

export default App;
