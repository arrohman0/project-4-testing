import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-9xl font-bold text-primary-600 dark:text-primary-500">404</h1>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-4">Page Not Found</h2>
      <p className="text-lg text-gray-600 dark:text-gray-300 max-w-md mt-2">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link 
        to="/" 
        className="mt-8 btn-primary py-2 px-4 inline-flex items-center"
      >
        <Home className="mr-2 h-5 w-5" />
        Go Home
      </Link>
    </div>
  );
};

export default NotFoundPage;