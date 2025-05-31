import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Users, BookOpen, Briefcase, Award, ArrowRight } from 'lucide-react';

const HomePage = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="space-y-8">
      {!isAuthenticated ? (
        <div className="relative py-16 md:py-24 overflow-hidden">
          {/* Hero Section */}
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
                <span className="block">Connect with</span>
                <span className="block text-primary-600 dark:text-primary-500">Productive Professionals</span>
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                Join the platform where talented individuals showcase their skills, 
                share knowledge, and collaborate on meaningful projects.
              </p>
              <div className="mt-8 sm:mt-12 flex justify-center space-x-4">
                <Link to="/register" className="btn-primary px-8 py-3 text-base font-medium">
                  Get started
                </Link>
                <Link to="/login" className="btn-outline px-8 py-3 text-base font-medium">
                  Sign in
                </Link>
              </div>
            </div>
            
            {/* Features Section */}
            <div className="mt-24 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div className="card p-6 animate-slide-in-up" style={{ animationDelay: '0.1s' }}>
                <div className="w-12 h-12 rounded-md bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Community</h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Connect with like-minded professionals and join specialized communities.
                </p>
              </div>
              
              <div className="card p-6 animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
                <div className="w-12 h-12 rounded-md bg-secondary-100 dark:bg-secondary-900 text-secondary-600 dark:text-secondary-300 flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Learning</h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Access quality courses and share your knowledge with others.
                </p>
              </div>
              
              <div className="card p-6 animate-slide-in-up" style={{ animationDelay: '0.3s' }}>
                <div className="w-12 h-12 rounded-md bg-accent-100 dark:bg-accent-900 text-accent-600 dark:text-accent-300 flex items-center justify-center mb-4">
                  <Briefcase className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Opportunities</h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Find team members, jobs, and collaboration opportunities.
                </p>
              </div>
              
              <div className="card p-6 animate-slide-in-up" style={{ animationDelay: '0.4s' }}>
                <div className="w-12 h-12 rounded-md bg-success-100 dark:bg-success-900 text-success-600 dark:text-success-300 flex items-center justify-center mb-4">
                  <Award className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Verification</h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Verify your skills and credentials to stand out from the crowd.
                </p>
              </div>
            </div>
            
            {/* Testimonials */}
            <div className="mt-24">
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center mb-12">
                Trusted by professionals worldwide
              </h2>
              <div className="grid gap-8 md:grid-cols-3">
                <div className="card p-6">
                  <p className="text-gray-600 dark:text-gray-300 italic mb-4">
                    "ProConnect helped me find the perfect team for my startup. The verification system ensures I'm working with qualified professionals."
                  </p>
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                    <div className="ml-3">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">Sarah Johnson</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Founder, TechStart</p>
                    </div>
                  </div>
                </div>
                
                <div className="card p-6">
                  <p className="text-gray-600 dark:text-gray-300 italic mb-4">
                    "I've been able to monetize my knowledge by creating courses and connecting with students who value my expertise."
                  </p>
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                    <div className="ml-3">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">Michael Chen</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Professor, Computer Science</p>
                    </div>
                  </div>
                </div>
                
                <div className="card p-6">
                  <p className="text-gray-600 dark:text-gray-300 italic mb-4">
                    "The communities on ProConnect are incredibly valuable. I've learned so much and made connections that advanced my career."
                  </p>
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                    <div className="ml-3">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">Priya Patel</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Software Engineer</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* CTA Section */}
            <div className="mt-24 bg-primary-700 rounded-2xl text-white overflow-hidden shadow-xl">
              <div className="px-6 py-12 md:p-12 md:flex md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-extrabold md:text-3xl">Ready to boost your professional growth?</h2>
                  <p className="mt-3 text-primary-200 max-w-3xl">
                    Join thousands of professionals who are connecting, learning, and growing together.
                  </p>
                </div>
                <div className="mt-8 md:mt-0">
                  <Link to="/register" className="btn bg-white text-primary-700 hover:bg-primary-50 px-6 py-3 text-base font-medium">
                    Join now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Dashboard for authenticated users */
        <div className="space-y-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Here's what's happening in your professional network.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-lg">
                <h3 className="font-medium text-primary-700 dark:text-primary-300 mb-1">Your Profile</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Complete your profile to increase visibility
                </p>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div className="bg-primary-600 h-2.5 rounded-full" style={{ width: '70%' }}></div>
                </div>
                <p className="text-xs text-right mt-1 text-gray-500 dark:text-gray-400">70% complete</p>
              </div>
              
              <div className="bg-secondary-50 dark:bg-secondary-900/20 p-4 rounded-lg">
                <h3 className="font-medium text-secondary-700 dark:text-secondary-300 mb-1">Connections</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">You have 5 new connection requests</p>
                <Link to="/connections" className="text-xs text-secondary-600 dark:text-secondary-400 mt-3 inline-block hover:underline">
                  View all requests
                </Link>
              </div>
              
              <div className="bg-accent-50 dark:bg-accent-900/20 p-4 rounded-lg">
                <h3 className="font-medium text-accent-700 dark:text-accent-300 mb-1">Upcoming Events</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">2 events scheduled this week</p>
                <Link to="/events" className="text-xs text-accent-600 dark:text-accent-400 mt-3 inline-block hover:underline">
                  View calendar
                </Link>
              </div>
            </div>
          </div>
          
          {/* Recent Activity */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Activity</h2>
              <Link to="/activity" className="text-sm text-primary-600 dark:text-primary-400 hover:underline">
                View all
              </Link>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0"></div>
                <div>
                  <p className="text-gray-900 dark:text-white text-sm">
                    <span className="font-medium">Alex Kim</span> posted in <span className="text-primary-600 dark:text-primary-400">Web Development</span>
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                    "Has anyone used the new React Server Components in production yet? I'd love to hear your experiences..."
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">2 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0"></div>
                <div>
                  <p className="text-gray-900 dark:text-white text-sm">
                    <span className="font-medium">Maria Garcia</span> is hosting a new course: <span className="text-primary-600 dark:text-primary-400">Advanced Data Visualization</span>
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                    Starting next Monday - 20% early bird discount available!
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Yesterday</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0"></div>
                <div>
                  <p className="text-gray-900 dark:text-white text-sm">
                    <span className="font-medium">TechStartup Inc.</span> is looking for <span className="text-primary-600 dark:text-primary-400">Frontend Developers</span>
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                    Remote position with competitive salary and benefits
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">2 days ago</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Recommended */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recommended Courses</h2>
                <Link to="/courses" className="text-sm text-primary-600 dark:text-primary-400 hover:underline">
                  View all
                </Link>
              </div>
              
              <div className="space-y-4">
                <div className="card">
                  <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-t-lg"></div>
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 dark:text-white">Machine Learning Fundamentals</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Dr. James Wilson • 4.8 ★ (240 reviews)</p>
                    <div className="flex justify-between items-center mt-3">
                      <span className="text-primary-600 dark:text-primary-400 font-medium">$49.99</span>
                      <span className="badge-primary">Bestseller</span>
                    </div>
                  </div>
                </div>
                
                <div className="card">
                  <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-t-lg"></div>
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 dark:text-white">Advanced React Patterns</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Sarah Chen • 4.9 ★ (189 reviews)</p>
                    <div className="flex justify-between items-center mt-3">
                      <span className="text-primary-600 dark:text-primary-400 font-medium">$39.99</span>
                      <span className="badge-secondary">New</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Communities for You</h2>
                <Link to="/communities" className="text-sm text-primary-600 dark:text-primary-400 hover:underline">
                  View all
                </Link>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0"></div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">React Developers</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">3.2k members</p>
                    </div>
                  </div>
                  <button className="btn-outline py-1 px-3 text-sm">Join</button>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0"></div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">UI/UX Design</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">5.7k members</p>
                    </div>
                  </div>
                  <button className="btn-outline py-1 px-3 text-sm">Join</button>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0"></div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">Data Science Network</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">8.1k members</p>
                    </div>
                  </div>
                  <button className="btn-outline py-1 px-3 text-sm">Join</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;