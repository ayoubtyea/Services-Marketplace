// src/pages/Home.jsx
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home = () => {
  return (

    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Sapruin</Link>
        <div className="space-x-4">
          <Link to="/services" className="hover:underline">Services</Link>
          <Link to="/dashboard" className="hover:underline">Dashboard</Link>
          <Link to="/login" className="hover:underline">Login</Link>
        </div>
      </div>
    </nav>
  );
};

export default Home;