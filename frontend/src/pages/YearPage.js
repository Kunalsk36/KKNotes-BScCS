import React, { useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Book, FileText, ClipboardList, Search, ExternalLink } from 'lucide-react';
import { subjects } from '../data';

export default function YearPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;
  const searchParams = new URLSearchParams(location.search);
  const currentSemester = searchParams.get('semester') || '1';
  
  const year = path.includes('/fy') ? 'FY' : path.includes('/sy') ? 'SY' : 'TY';
  const yearFullName = year === 'FY' ? 'First Year' : year === 'SY' ? 'Second Year' : 'Third Year';
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSemester, setActiveSemester] = useState(currentSemester);

  const handleSemesterChange = (sem) => {
    setActiveSemester(sem);
    navigate(`${path}?semester=${sem}`);
  };

  const filteredSubjects = useMemo(() => {
    return subjects.filter(
      (subject) =>
        subject.year === year &&
        subject.semester === (activeSemester === '1' ? 'I' : 'II') &&
        subject.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [year, activeSemester, searchQuery]);

  const openLink = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div data-testid="year-page" className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 data-testid="year-title" className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            {yearFullName} - <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">BSc CS</span>
          </h1>
          <p className="text-slate-600">Select a semester to view subjects and materials</p>
        </motion.div>

        {/* Semester Tabs */}
        <div data-testid="semester-tabs" className="flex justify-center mb-8">
          <div className="bg-white rounded-lg shadow-md p-1 inline-flex border border-blue-100">
            <button
              data-testid="semester-1-tab"
              onClick={() => handleSemesterChange('1')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeSemester === '1'
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg'
                  : 'text-slate-600 hover:bg-blue-50'
              }`}
            >
              Semester I
            </button>
            <button
              data-testid="semester-2-tab"
              onClick={() => handleSemesterChange('2')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeSemester === '2'
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg'
                  : 'text-slate-600 hover:bg-blue-50'
              }`}
            >
              Semester II
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              data-testid="subject-search"
              placeholder="Search subjects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
            />
          </div>
        </div>

        {/* Subjects Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden border border-blue-100"
        >
          {filteredSubjects.length > 0 ? (
            <div className="overflow-x-auto">
              <table data-testid="subjects-table" className="w-full">
                <thead className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">#</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Subject Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Description</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredSubjects.map((subject, index) => (
                    <tr key={subject.id} data-testid={`subject-row-${index}`} className="hover:bg-blue-50 transition-colors">
                      <td className="px-6 py-4 text-slate-600 font-medium">{index + 1}</td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-slate-900">{subject.name}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600 max-w-xs">
                        {subject.description}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center space-x-2">
                          <button
                            data-testid={`reference-book-btn-${index}`}
                            onClick={() => openLink(subject.reference_book_url)}
                            className="group relative p-2 bg-green-100 hover:bg-green-200 rounded-lg transition-colors"
                            title="Reference Book"
                          >
                            <Book className="h-5 w-5 text-green-600" />
                          </button>
                          <button
                            data-testid={`notes-btn-${index}`}
                            onClick={() => openLink(subject.notes_url)}
                            className="group relative p-2 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors"
                            title="Notes"
                          >
                            <FileText className="h-5 w-5 text-blue-600" />
                          </button>
                          <button
                            data-testid={`question-paper-btn-${index}`}
                            onClick={() => openLink(subject.question_paper_url)}
                            className="group relative p-2 bg-purple-100 hover:bg-purple-200 rounded-lg transition-colors"
                            title="Question Papers"
                          >
                            <ClipboardList className="h-5 w-5 text-purple-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div data-testid="no-subjects" className="text-center py-12">
              <Search className="h-16 w-16 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-600 text-lg">No subjects found matching your search.</p>
            </div>
          )}
        </motion.div>

        {/* Legend */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6 border border-blue-100">
          <h3 className="font-semibold text-slate-900 mb-4">Quick Guide:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Book className="h-5 w-5 text-green-600" />
              </div>
              <span className="text-slate-700">Reference Book</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <span className="text-slate-700">Lecture Notes</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <ClipboardList className="h-5 w-5 text-purple-600" />
              </div>
              <span className="text-slate-700">Question Papers</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
