import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-blue-600">DataLearn</span>
            </Link>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <NavLink 
                to="/" 
                className={({ isActive }) => isActive ? 'border-blue-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'}
              >
                首页
              </NavLink>
              <NavLink 
                to="/courses" 
                className={({ isActive }) => isActive ? 'border-blue-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'}
              >
                课程
              </NavLink>
              <NavLink 
                to="/dashboard" 
                className={({ isActive }) => isActive ? 'border-blue-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'}
              >
                仪表板
              </NavLink>
              <NavLink 
                to="/achievements" 
                className={({ isActive }) => isActive ? 'border-blue-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'}
              >
                成就
              </NavLink>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
              登录
            </Link>
            <Link to="/register" className="px-3 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
              注册
            </Link>
          </div>
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
            >
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink 
              to="/" 
              className={({ isActive }) => isActive ? 'bg-blue-50 border-blue-500 text-blue-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium' : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium'}
              onClick={() => setIsMenuOpen(false)}
            >
              首页
            </NavLink>
            <NavLink 
              to="/courses" 
              className={({ isActive }) => isActive ? 'bg-blue-50 border-blue-500 text-blue-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium' : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium'}
              onClick={() => setIsMenuOpen(false)}
            >
              课程
            </NavLink>
            <NavLink 
              to="/dashboard" 
              className={({ isActive }) => isActive ? 'bg-blue-50 border-blue-500 text-blue-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium' : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium'}
              onClick={() => setIsMenuOpen(false)}
            >
              仪表板
            </NavLink>
            <NavLink 
              to="/achievements" 
              className={({ isActive }) => isActive ? 'bg-blue-50 border-blue-500 text-blue-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium' : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium'}
              onClick={() => setIsMenuOpen(false)}
            >
              成就
            </NavLink>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-gray-300"></div>
              </div>
              <div className="ml-3">
                <div className="text-base font-medium leading-none text-gray-800">未登录</div>
              </div>
            </div>
            <div className="mt-3 px-2 space-y-1">
              <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50" onClick={() => setIsMenuOpen(false)}>
                登录
              </Link>
              <Link to="/register" className="block px-3 py-2 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700" onClick={() => setIsMenuOpen(false)}>
                注册
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;