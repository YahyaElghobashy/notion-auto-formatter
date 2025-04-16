import React from 'react';
import { Link, useLocation } from 'react-router-dom';

/**
 * Main layout component for NotionFlex application
 */
const Layout = ({ children }) => {
  const location = useLocation();
  
  const isActivePath = (path) => {
    return location.pathname === path;
  };

  const navLinks = [
    { path: '/', label: 'Editor' },
    { path: '/templates', label: 'Templates' },
    { path: '/settings', label: 'Settings' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-nf-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo & Navigation */}
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-indigo-primary rounded-md flex items-center justify-center mr-2 shadow-nf-sm">
                    <span className="text-white font-bold text-xl">N</span>
                  </div>
                  <span className="font-semibold text-xl text-slate-primary">
                    Notion<span className="text-indigo-primary">Flex</span>
                  </span>
                </div>
              </Link>
              
              <nav className="ml-10 flex items-center space-x-8">
                {navLinks.map(link => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-1 py-2 text-sm font-medium border-b-2 ${
                      isActivePath(link.path)
                        ? 'border-indigo-primary text-indigo-primary'
                        : 'border-transparent text-slate-primary hover:text-indigo-primary'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
            
            {/* User Menu & Actions */}
            <div className="flex items-center">
              <button className="p-1 text-slate-primary hover:text-indigo-primary focus:outline-none">
                <span className="sr-only">View help</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-primary">
              &copy; {new Date().getFullYear()} NotionFlex. All rights reserved.
            </div>
            <div className="text-sm text-slate-primary">
              <span className="text-indigo-primary font-medium">NotionFlex</span> - Create. Format. Publish. Seamlessly.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout; 