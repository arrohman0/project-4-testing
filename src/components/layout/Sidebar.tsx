import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Home, 
  Users, 
  BookOpen, 
  MessageSquare, 
  Calendar, 
  Award, 
  Bell, 
  Settings, 
  HelpCircle,
  Briefcase
} from 'lucide-react';

const Sidebar = () => {
  const { user } = useAuth();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: <Home size={20} /> },
    { name: 'Communities', path: '/communities', icon: <Users size={20} /> },
    { name: 'Courses', path: '/courses', icon: <BookOpen size={20} /> },
    { name: 'Messages', path: '/messages', icon: <MessageSquare size={20} /> },
    { name: 'Events', path: '/events', icon: <Calendar size={20} /> },
    { name: 'Jobs', path: '/jobs', icon: <Briefcase size={20} /> },
    { name: 'Achievements', path: '/achievements', icon: <Award size={20} /> },
  ];

  const secondaryNavItems = [
    { name: 'Notifications', path: '/notifications', icon: <Bell size={20} /> },
    { name: 'Settings', path: '/settings', icon: <Settings size={20} /> },
    { name: 'Help', path: '/help', icon: <HelpCircle size={20} /> },
  ];

  return (
    <div className="fixed inset-y-0 left-0 z-30 w-64 bg-white dark:bg-gray-800 shadow-md transform transition-transform duration-300 ease-in-out md:translate-x-0 -translate-x-full md:pt-16 pt-0">
      <div className="h-full flex flex-col overflow-y-auto">
        {/* User profile section */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="h-10 w-10 rounded-full"
              />
            ) : (
              <div className="h-10 w-10 rounded-full bg-primary-600 flex items-center justify-center text-white font-medium">
                {user?.name.charAt(0)}
              </div>
            )}
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">{user?.name}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">{user?.title || 'Member'}</p>
            </div>
          </div>
          <NavLink
            to={`/profile/${user?._id}`}
            className="mt-3 block text-center text-sm text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300"
          >
            View Profile
          </NavLink>
        </div>
        
        {/* Navigation section */}
        <div className="flex-1 py-4">
          <nav className="px-2 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`
                }
              >
                <span className="mr-3 text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400">
                  {item.icon}
                </span>
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
        
        {/* Secondary navigation */}
        <div className="py-4 border-t border-gray-200 dark:border-gray-700">
          <nav className="px-2 space-y-1">
            {secondaryNavItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`
                }
              >
                <span className="mr-3 text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400">
                  {item.icon}
                </span>
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;