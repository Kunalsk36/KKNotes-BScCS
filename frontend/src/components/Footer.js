import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Mail, Users, Eye } from 'lucide-react';
import { visitCount } from '../data';

export const Footer = () => {
  return (
    <footer data-testid="footer" className="bg-slate-900 text-slate-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-br from-blue-600 to-cyan-500 p-2 rounded-lg">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">KKNotes</span>
            </div>
            <p className="text-sm">
              Your trusted resource hub for BSc Computer Science success. Access quality notes, question papers, and reference materials.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Quick Links</span>
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" data-testid="footer-home" className="hover:text-cyan-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/subjects" data-testid="footer-subjects" className="hover:text-cyan-400 transition-colors">
                  Subject Info
                </Link>
              </li>
              <li>
                <Link to="/contact" data-testid="footer-contact" className="hover:text-cyan-400 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/admin" data-testid="footer-admin" className="hover:text-cyan-400 transition-colors">
                  Admin Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Visit Counter & Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4 flex items-center space-x-2">
              <Mail className="h-5 w-5" />
              <span>Get in Touch</span>
            </h3>
            <p className="text-sm mb-4">
              Have questions or suggestions? We'd love to hear from you!
            </p>
            <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
              <div className="flex items-center space-x-2 text-cyan-400">
                <Eye className="h-5 w-5" />
                <div>
                  <div className="text-xs text-slate-400">Total Visits</div>
                  <div data-testid="visit-counter" className="text-lg font-bold">{visitCount.toLocaleString()}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; 2025 KKNotes BSCCS. All rights reserved. Built with care for students.</p>
        </div>
      </div>
    </footer>
  );
};
