import React from 'react';
import { Link } from 'react-router-dom';

const ProviderDashboard = ({ children }) => {
  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-green-700 text-white p-4">
        <h2 className="text-lg font-semibold">Provider Dashboard</h2>
        <nav>
          <ul>
            <li><Link to="/dashboard/provider">Dashboard</Link></li>
            <li><Link to="/dashboard/provider/tasks">My Tasks</Link></li>
            <li><Link to="/dashboard/provider/earnings">Earnings</Link></li>
            <li><Link to="/dashboard/provider/reviews">Reviews</Link></li>
            <li><Link to="/dashboard/provider/profile">Profile</Link></li>
            <li><Link to="/dashboard/provider/settings">Settings</Link></li>
          </ul>
        </nav>
      </aside>

      <div className="flex-1 p-6">{children}</div>
    </div>
  );
};

export default ProviderDashboard;
