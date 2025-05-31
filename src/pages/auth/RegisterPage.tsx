import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { User, Mail, Lock, AlertCircle, Briefcase } from 'lucide-react';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'professional' // Default role
  });
  const [passwordError, setPasswordError] = useState('');
  const { register, error, loading, isAuthenticated, clearError } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear password error if they start typing again
    if (name === 'password' || name === 'confirmPassword') {
      setPasswordError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    
    // Password strength validation
    if (formData.password.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
      return;
    }
    
    await register({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role
    });
  };

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center">
                <User className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">ProConnect</span>
            </Link>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-primary-600 dark:text-primary-400 hover:text-primary-500">
              Sign in
            </Link>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
            {error && (
              <div className="mb-4 rounded-md bg-error-50 dark:bg-error-900/20 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertCircle className="h-5 w-5 text-error-400 dark:text-error-500" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-error-800 dark:text-error-200">{error}</h3>
                  </div>
                </div>
              </div>
            )}

            {passwordError && (
              <div className="mb-4 rounded-md bg-error-50 dark:bg-error-900/20 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertCircle className="h-5 w-5 text-error-400 dark:text-error-500" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-error-800 dark:text-error-200">{passwordError}</h3>
                  </div>
                </div>
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Full Name
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input py-2 pl-10 block w-full"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email address
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input py-2 pl-10 block w-full"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  I am joining as a
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Briefcase className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    id="role"
                    name="role"
                    required
                    value={formData.role}
                    onChange={handleChange}
                    className="form-input py-2 pl-10 block w-full"
                  >
                    <option value="professional">Professional</option>
                    <option value="student">Student</option>
                    <option value="educator">Educator</option>
                    <option value="recruiter">Recruiter</option>
                    <option value="company">Company</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="form-input py-2 pl-10 block w-full"
                    placeholder="At least 8 characters"
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Must be at least 8 characters long
                </p>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Confirm Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="form-input py-2 pl-10 block w-full"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full py-2"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white\" xmlns="http://www.w3.org/2000/svg\" fill="none\" viewBox="0 0 24 24">
                        <circle className="opacity-25\" cx="12\" cy="12\" r="10\" stroke="currentColor\" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating account...
                    </span>
                  ) : (
                    'Create account'
                  )}
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="btn-outline w-full py-2 px-4"
                >
                  <span className="sr-only">Sign up with Google</span>
                  Google
                </button>
                <button
                  type="button"
                  className="btn-outline w-full py-2 px-4"
                >
                  <span className="sr-only">Sign up with LinkedIn</span>
                  LinkedIn
                </button>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                By creating an account, you agree to our{' '}
                <Link to="/terms" className="text-primary-600 dark:text-primary-400 hover:underline">Terms of Service</Link>
                {' '}and{' '}
                <Link to="/privacy" className="text-primary-600 dark:text-primary-400 hover:underline">Privacy Policy</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right side image/info */}
      <div className="hidden lg:block relative w-0 flex-1 bg-secondary-700">
        <div className="absolute inset-0 flex flex-col justify-center p-12 text-white">
          <h2 className="text-4xl font-bold mb-6">Join ProConnect Today</h2>
          <p className="text-xl mb-8">Create your professional profile and connect with opportunities.</p>
          <ul className="space-y-4">
            <li className="flex items-center">
              <div className="rounded-full bg-secondary-600 p-1 mr-3">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              Connect with other professionals
            </li>
            <li className="flex items-center">
              <div className="rounded-full bg-secondary-600 p-1 mr-3">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              Showcase your skills and achievements
            </li>
            <li className="flex items-center">
              <div className="rounded-full bg-secondary-600 p-1 mr-3">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              Access exclusive courses and events
            </li>
            <li className="flex items-center">
              <div className="rounded-full bg-secondary-600 p-1 mr-3">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              Find team members for your projects
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;