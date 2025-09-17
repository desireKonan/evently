// components/layout/AdminSidebar.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const AdminSidebar: React.FC = () => {
  const location = useLocation();
  
  const menuItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: 'dashboard' },
    { path: '/admin/events', label: 'Événements', icon: 'event' },
    { path: '/admin/calendar', label: 'Calendrier', icon: 'calendar' },
    { path: '/admin/users', label: 'Utilisateurs', icon: 'people' },
  ];

  return (
    <div className="w-64 bg-white shadow-md h-screen fixed">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
      </div>
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center p-2 rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? 'bg-event-primary text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="material-symbols-outlined mr-3">{item.icon}</span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default AdminSidebar;