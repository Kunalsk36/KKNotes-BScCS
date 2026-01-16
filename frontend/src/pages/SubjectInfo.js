import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { subjects } from '../data';
import { BookOpen, Award, Search } from 'lucide-react';

export default function SubjectInfo() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSubjects = subjects.filter((subject) =>
    subject.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div data-testid="subject-info-page" className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 data-testid="subjects-title" className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            Subject <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Information</span>
          </h1>
          <p className="text-slate-600">Comprehensive details about all BSc CS subjects</p>
        </motion.div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              data-testid="subject-info-search"
              placeholder="Search subjects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
            />
          </div>
        </div>

        {/* Subject Cards Grid */}
        {filteredSubjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSubjects.map((subject, index) => (
              <motion.div
                key={subject.id}
                data-testid={`subject-card-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-blue-100 hover:scale-105"
              >
                <div className="h-2 bg-gradient-to-r from-blue-600 to-cyan-500"></div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-gradient-to-br from-blue-100 to-cyan-100 p-3 rounded-lg">
                      <BookOpen className="h-6 w-6 text-blue-600" />
                    </div>
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                      {subject.year} - Sem {subject.semester}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{subject.name}</h3>
                  
                  <p className="text-sm text-slate-600 mb-4 line-clamp-3">
                    {subject.description}
                  </p>
                  
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <div className="flex items-start space-x-2">
                      <Award className="h-5 w-5 text-cyan-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="text-xs font-semibold text-slate-700 mb-1">Examination Details</div>
                        <div className="text-xs text-slate-600">{subject.exam_details}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div data-testid="no-subjects-found" className="text-center py-12 bg-white rounded-xl shadow-md">
            <Search className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-600 text-lg">No subjects found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
