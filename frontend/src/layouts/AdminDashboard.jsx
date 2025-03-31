import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = ({ children }) => {
  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-red-700 text-white p-4">
        <h2 className="text-lg font-semibold">Admin Dashboard</h2>
        <nav>
          <ul>
            <li><Link to="/dashboard/admin">Dashboard</Link></li>
            <li><Link to="/dashboard/admin/users">Manage Users</Link></li>
            <li><Link to="/dashboard/admin/bookings">Manage Bookings</Link></li>
            <li><Link to="/dashboard/admin/reports">Reports</Link></li>
            <li><Link to="/dashboard/admin/profile">Profile</Link></li>
            <li><Link to="/dashboard/admin/settings">Settings</Link></li>
          </ul>
        </nav>
      </aside>

      <div className="flex-1 p-6">{children}</div>
    </div>
  );
};

export default AdminDashboard;
