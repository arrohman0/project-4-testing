import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import { useAuth } from '../../contexts/AuthContext';

const Layout = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <div className="flex flex-1">
        {isAuthenticated && (
          <Sidebar />
        )}
        
        <main className={`flex-1 p-4 md:p-6 ${isAuthenticated ? 'md:ml-64' : ''}`}>
          <div className="max-w-7xl mx-auto animate-fade-in">
            <Outlet />
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default Layout;