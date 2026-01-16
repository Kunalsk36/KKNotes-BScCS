import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, MessageSquare, BookOpen, TrendingUp } from 'lucide-react';
import { subjects, feedback, visitCount } from '../data';

export default function AdminOverview() {
  const storedFeedback = localStorage.getItem('kknotes_feedback');
  const currentFeedback = storedFeedback ? JSON.parse(storedFeedback) : feedback;

  const storedSubjects = localStorage.getItem('kknotes_subjects');
  const currentSubjects = storedSubjects ? JSON.parse(storedSubjects) : subjects;

  const [visitCountState, setVisitCountState] = useState(() => {
    const stored = localStorage.getItem('kknotes_visit_count');
    return stored ? parseInt(stored) : visitCount;
  });

  useEffect(() => {
    const updateCount = () => {
      const stored = localStorage.getItem('kknotes_visit_count');
      if (stored) setVisitCountState(parseInt(stored));
    };

    window.addEventListener('visitCountUpdated', updateCount);
    // Also listen for storage events (cross-tab updates)
    window.addEventListener('storage', updateCount);
    
    return () => {
      window.removeEventListener('visitCountUpdated', updateCount);
      window.removeEventListener('storage', updateCount);
    };
  }, []);

  const stats = [
    {
      label: 'Total Subjects',
      value: currentSubjects.length,
      icon: BookOpen,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-600'
    },
    {
      label: 'Feedback Received',
      value: currentFeedback.length,
      icon: MessageSquare,
      color: 'from-cyan-500 to-cyan-600',
      bgColor: 'bg-cyan-100',
      textColor: 'text-cyan-600'
    },
    {
      label: 'Years Covered',
      value: 3,
      icon: TrendingUp,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-600'
    },
    {
      label: 'Total Visits',
      value: visitCountState.toLocaleString(),
      icon: Users,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-100',
      textColor: 'text-green-600'
    }
  ];

  return (
    <div data-testid="admin-overview">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Dashboard Overview</h1>
        <p className="text-slate-600">Welcome back! Here's what's happening with KKNotes.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            data-testid={`stat-card-${index}`}
            className="bg-white rounded-xl shadow-md p-6 border border-slate-200 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.bgColor} p-3 rounded-lg`}>
                <stat.icon className={`h-6 w-6 ${stat.textColor}`} />
              </div>
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</div>
            <div className="text-sm text-slate-600">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Quick Info Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Feedback */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Recent Feedback</h2>
          <div className="space-y-4">
            {currentFeedback.slice(0, 3).map((fb) => (
              <div key={fb.id} className="border-l-4 border-blue-500 pl-4 py-2">
                <div className="font-semibold text-slate-900">{fb.name}</div>
                <div className="text-sm text-slate-600 line-clamp-2">{fb.message}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Subject Distribution */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Subject Distribution</h2>
          <div className="space-y-3">
            {['FY', 'SY', 'TY'].map((year) => {
              const count = currentSubjects.filter((s) => s.year === year).length;
              return (
                <div key={year} className="flex items-center justify-between">
                  <span className="text-slate-700 font-medium">{year === 'FY' ? 'First Year' : year === 'SY' ? 'Second Year' : 'Third Year'}</span>
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                    {count} subjects
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
