
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer';
import AuthPage from './pages/AuthPage';



const App = () => {
  return (
    <Router>
      {/* Navbar will not be shown on the /auth page */}
      <Routes>
        <Route path="/" element={<Navbar />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>

      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;