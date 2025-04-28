import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth); // Get logged-in user

  // Role-based navigation items
  const navItems = {
    client: [
      { name: "Dashboard", path: "/dashboard/client" },
      { name: "My Bookings", path: "/dashboard/bookings" },
      { name: "Profile", path: "/dashboard/profile" },
    ],
    provider: [
      { name: "Dashboard", path: "/dashboard/provider" },
      { name: "Service Requests", path: "/dashboard/requests" },
      { name: "Earnings", path: "/dashboard/earnings" },
    ],
    admin: [
      { name: "Dashboard", path: "/dashboard/admin" },
      { name: "Users", path: "/dashboard/users" },
      { name: "Reports", path: "/dashboard/reports" },
    ],
  };

  return (
    <aside className="w-64 bg-gray-900 text-white h-screen p-4">
      <h2 className="text-xl font-bold">Dashboard</h2>
      <nav>
        {navItems[user?.role]?.map((item) => (
          <NavLink 
            key={item.path} 
            to={item.path} 
            className="block px-4 py-2 hover:bg-gray-700 rounded">
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
