import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Trash2, Search } from 'lucide-react';
import { toast } from 'sonner';
import { feedback } from '../data';

export default function AdminFeedback() {
  const [feedbackList, setFeedbackList] = useState(() => {
    const stored = localStorage.getItem('kknotes_feedback');
    return stored ? JSON.parse(stored) : feedback;
  });
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFeedback = feedbackList.filter(
    (fb) =>
      fb.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fb.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fb.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRecontact = (email, name) => {
    const subject = encodeURIComponent(`Re: Your feedback on KKNotes BSCCS`);
    const body = encodeURIComponent(`Dear ${name},\n\nThank you for your feedback on KKNotes BSCCS. \n\nBest regards,\nKKNotes Team`);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  const handleDelete = (id) => {
    const updatedList = feedbackList.filter((fb) => fb.id !== id);
    setFeedbackList(updatedList);
    localStorage.setItem('kknotes_feedback', JSON.stringify(updatedList));
    toast.success('Feedback deleted successfully');
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div data-testid="admin-feedback-page">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Feedback Management</h1>
        <p className="text-slate-600">View and respond to user feedback</p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
          <input
            type="text"
            data-testid="feedback-search"
            placeholder="Search feedback..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Feedback Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-slate-200">
        {filteredFeedback.length > 0 ? (
          <div className="overflow-x-auto">
            <table data-testid="feedback-table" className="w-full">
              <thead className="bg-slate-100 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Message</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Date</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-slate-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredFeedback.map((fb, index) => (
                  <motion.tr
                    key={fb.id}
                    data-testid={`feedback-row-${index}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-slate-900 font-medium">{fb.name}</td>
                    <td className="px-6 py-4 text-slate-600">{fb.email}</td>
                    <td className="px-6 py-4 text-slate-600 max-w-md">
                      <p className="line-clamp-2">{fb.message}</p>
                    </td>
                    <td className="px-6 py-4 text-slate-600 text-sm">{formatDate(fb.timestamp)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          data-testid={`recontact-btn-${index}`}
                          onClick={() => handleRecontact(fb.email, fb.name)}
                          className="p-2 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors group"
                          title="Recontact via Email"
                        >
                          <Mail className="h-4 w-4 text-blue-600" />
                        </button>
                        <button
                          data-testid={`delete-feedback-btn-${index}`}
                          onClick={() => handleDelete(fb.id)}
                          className="p-2 bg-red-100 hover:bg-red-200 rounded-lg transition-colors group"
                          title="Delete Feedback"
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div data-testid="no-feedback" className="text-center py-12">
            <MessageSquare className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-600">No feedback found</p>
          </div>
        )}
      </div>
    </div>
  );
}
