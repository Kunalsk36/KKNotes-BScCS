import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const toggleDropdown = (menu) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  return (
    <nav data-testid="main-navbar" className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-blue-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group" data-testid="logo-link">
            <div className="bg-gradient-to-br from-blue-600 to-cyan-500 p-2 rounded-lg group-hover:shadow-lg transition-shadow">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              KKNotes
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              to="/"
              data-testid="nav-home"
              className={`px-4 py-2 rounded-lg transition-colors ${
                isActive('/') ? 'bg-blue-50 text-blue-600' : 'text-slate-700 hover:bg-blue-50 hover:text-blue-600'
              }`}
            >
              Home
            </Link>

            {/* FY Dropdown */}
            <div className="relative group">
              <button
                data-testid="nav-fy-dropdown"
                className="px-4 py-2 rounded-lg text-slate-700 hover:bg-blue-50 hover:text-blue-600 flex items-center space-x-1 transition-colors"
              >
                <span>First Year</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-blue-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <Link
                  to="/fy?semester=1"
                  data-testid="nav-fy-sem1"
                  className="block px-4 py-3 text-slate-700 hover:bg-blue-50 hover:text-blue-600 rounded-t-lg transition-colors"
                >
                  Semester I
                </Link>
                <Link
                  to="/fy?semester=2"
                  data-testid="nav-fy-sem2"
                  className="block px-4 py-3 text-slate-700 hover:bg-blue-50 hover:text-blue-600 rounded-b-lg transition-colors"
                >
                  Semester II
                </Link>
              </div>
            </div>

            {/* SY Dropdown */}
            <div className="relative group">
              <button
                data-testid="nav-sy-dropdown"
                className="px-4 py-2 rounded-lg text-slate-700 hover:bg-blue-50 hover:text-blue-600 flex items-center space-x-1 transition-colors"
              >
                <span>Second Year</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-blue-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <Link
                  to="/sy?semester=1"
                  data-testid="nav-sy-sem1"
                  className="block px-4 py-3 text-slate-700 hover:bg-blue-50 hover:text-blue-600 rounded-t-lg transition-colors"
                >
                  Semester I
                </Link>
                <Link
                  to="/sy?semester=2"
                  data-testid="nav-sy-sem2"
                  className="block px-4 py-3 text-slate-700 hover:bg-blue-50 hover:text-blue-600 rounded-b-lg transition-colors"
                >
                  Semester II
                </Link>
              </div>
            </div>

            {/* TY Dropdown */}
            <div className="relative group">
              <button
                data-testid="nav-ty-dropdown"
                className="px-4 py-2 rounded-lg text-slate-700 hover:bg-blue-50 hover:text-blue-600 flex items-center space-x-1 transition-colors"
              >
                <span>Third Year</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-blue-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <Link
                  to="/ty?semester=1"
                  data-testid="nav-ty-sem1"
                  className="block px-4 py-3 text-slate-700 hover:bg-blue-50 hover:text-blue-600 rounded-t-lg transition-colors"
                >
                  Semester I
                </Link>
                <Link
                  to="/ty?semester=2"
                  data-testid="nav-ty-sem2"
                  className="block px-4 py-3 text-slate-700 hover:bg-blue-50 hover:text-blue-600 rounded-b-lg transition-colors"
                >
                  Semester II
                </Link>
              </div>
            </div>

            <Link
              to="/subjects"
              data-testid="nav-subjects"
              className={`px-4 py-2 rounded-lg transition-colors ${
                isActive('/subjects') ? 'bg-blue-50 text-blue-600' : 'text-slate-700 hover:bg-blue-50 hover:text-blue-600'
              }`}
            >
              Subject Info
            </Link>

            <Link
              to="/contact"
              data-testid="nav-contact"
              className={`px-4 py-2 rounded-lg transition-colors ${
                isActive('/contact') ? 'bg-blue-50 text-blue-600' : 'text-slate-700 hover:bg-blue-50 hover:text-blue-600'
              }`}
            >
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            data-testid="mobile-menu-button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-blue-50"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            data-testid="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-blue-100"
          >
            <div className="px-4 py-4 space-y-2">
              <Link
                to="/"
                data-testid="mobile-nav-home"
                className="block px-4 py-2 rounded-lg text-slate-700 hover:bg-blue-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>

              {/* FY Mobile */}
              <div>
                <button
                  data-testid="mobile-nav-fy-toggle"
                  onClick={() => toggleDropdown('fy')}
                  className="w-full flex justify-between items-center px-4 py-2 rounded-lg text-slate-700 hover:bg-blue-50"
                >
                  <span>First Year</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${activeDropdown === 'fy' ? 'rotate-180' : ''}`} />
                </button>
                {activeDropdown === 'fy' && (
                  <div className="ml-4 mt-2 space-y-2">
                    <Link
                      to="/fy?semester=1"
                      data-testid="mobile-nav-fy-sem1"
                      className="block px-4 py-2 rounded-lg text-slate-600 hover:bg-blue-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Semester I
                    </Link>
                    <Link
                      to="/fy?semester=2"
                      data-testid="mobile-nav-fy-sem2"
                      className="block px-4 py-2 rounded-lg text-slate-600 hover:bg-blue-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Semester II
                    </Link>
                  </div>
                )}
              </div>

              {/* SY Mobile */}
              <div>
                <button
                  data-testid="mobile-nav-sy-toggle"
                  onClick={() => toggleDropdown('sy')}
                  className="w-full flex justify-between items-center px-4 py-2 rounded-lg text-slate-700 hover:bg-blue-50"
                >
                  <span>Second Year</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${activeDropdown === 'sy' ? 'rotate-180' : ''}`} />
                </button>
                {activeDropdown === 'sy' && (
                  <div className="ml-4 mt-2 space-y-2">
                    <Link
                      to="/sy?semester=1"
                      data-testid="mobile-nav-sy-sem1"
                      className="block px-4 py-2 rounded-lg text-slate-600 hover:bg-blue-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Semester I
                    </Link>
                    <Link
                      to="/sy?semester=2"
                      data-testid="mobile-nav-sy-sem2"
                      className="block px-4 py-2 rounded-lg text-slate-600 hover:bg-blue-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Semester II
                    </Link>
                  </div>
                )}
              </div>

              {/* TY Mobile */}
              <div>
                <button
                  data-testid="mobile-nav-ty-toggle"
                  onClick={() => toggleDropdown('ty')}
                  className="w-full flex justify-between items-center px-4 py-2 rounded-lg text-slate-700 hover:bg-blue-50"
                >
                  <span>Third Year</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${activeDropdown === 'ty' ? 'rotate-180' : ''}`} />
                </button>
                {activeDropdown === 'ty' && (
                  <div className="ml-4 mt-2 space-y-2">
                    <Link
                      to="/ty?semester=1"
                      data-testid="mobile-nav-ty-sem1"
                      className="block px-4 py-2 rounded-lg text-slate-600 hover:bg-blue-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Semester I
                    </Link>
                    <Link
                      to="/ty?semester=2"
                      data-testid="mobile-nav-ty-sem2"
                      className="block px-4 py-2 rounded-lg text-slate-600 hover:bg-blue-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Semester II
                    </Link>
                  </div>
                )}
              </div>

              <Link
                to="/subjects"
                data-testid="mobile-nav-subjects"
                className="block px-4 py-2 rounded-lg text-slate-700 hover:bg-blue-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Subject Info
              </Link>

              <Link
                to="/contact"
                data-testid="mobile-nav-contact"
                className="block px-4 py-2 rounded-lg text-slate-700 hover:bg-blue-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
