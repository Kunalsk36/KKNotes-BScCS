import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Save, X, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { subjects } from '../data';

export default function AdminSubjects() {
  const [subjectsList, setSubjectsList] = useState(() => {
    const stored = localStorage.getItem('kknotes_subjects');
    return stored ? JSON.parse(stored) : subjects;
  });
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    year: 'FY',
    semester: 'I',
    description: '',
    exam_details: '',
    notes_url: '',
    question_paper_url: '',
    reference_book_url: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'year') {
      const defaultSemester = value === 'FY' ? 'I' : value === 'SY' ? 'III' : 'V';
      setFormData({
        ...formData,
        year: value,
        semester: defaultSemester
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleAddNew = () => {
    setIsAddingNew(true);
    setFormData({
      name: '',
      year: 'FY',
      semester: 'I',
      description: '',
      exam_details: '',
      notes_url: '',
      question_paper_url: '',
      reference_book_url: ''
    });
  };

  const handleEdit = (subject) => {
    setEditingId(subject.id);
    setFormData({
      name: subject.name,
      year: subject.year,
      semester: subject.semester,
      description: subject.description,
      exam_details: subject.exam_details,
      notes_url: subject.notes_url || '',
      question_paper_url: subject.question_paper_url || '',
      reference_book_url: subject.reference_book_url || ''
    });
  };

  const handleSave = () => {
    if (!formData.name || !formData.description || !formData.exam_details) {
      toast.error('Please fill in all fields');
      return;
    }

    if (isAddingNew) {
      const newSubject = {
        id: `custom-${Date.now()}`,
        ...formData,
      };
      const updatedList = [...subjectsList, newSubject];
      setSubjectsList(updatedList);
      localStorage.setItem('kknotes_subjects', JSON.stringify(updatedList));
      toast.success('Subject added successfully');
      setIsAddingNew(false);
    } else {
      const updatedList = subjectsList.map((subject) =>
        subject.id === editingId ? { ...subject, ...formData } : subject
      );
      setSubjectsList(updatedList);
      localStorage.setItem('kknotes_subjects', JSON.stringify(updatedList));
      toast.success('Subject updated successfully');
      setEditingId(null);
    }

    setFormData({
      name: '',
      year: 'FY',
      semester: 'I',
      description: '',
      exam_details: '',
      notes_url: '',
      question_paper_url: '',
      reference_book_url: ''
    });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this subject?')) {
      const updatedList = subjectsList.filter((subject) => subject.id !== id);
      setSubjectsList(updatedList);
      localStorage.setItem('kknotes_subjects', JSON.stringify(updatedList));
      toast.success('Subject deleted successfully');
    }
  };

  const handleCancel = () => {
    setIsAddingNew(false);
    setEditingId(null);
    setFormData({
      name: '',
      year: 'FY',
      semester: 'I',
      description: '',
      exam_details: '',
      notes_url: '',
      question_paper_url: '',
      reference_book_url: ''
    });
  };

  return (
    <div data-testid="admin-subjects-page">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Manage Subjects</h1>
          <p className="text-slate-600">Add or edit subject information</p>
        </div>
        {!isAddingNew && !editingId && (
          <button
            data-testid="add-subject-btn"
            onClick={handleAddNew}
            className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Add Subject</span>
          </button>
        )}
      </div>

      {/* Add/Edit Form */}
      {(isAddingNew || editingId) && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          data-testid="subject-form"
          className="bg-white rounded-xl shadow-md p-6 mb-6 border border-slate-200"
        >
          <h2 className="text-xl font-bold text-slate-900 mb-4">
            {isAddingNew ? 'Add New Subject' : 'Edit Subject'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Subject Name</label>
              <input
                type="text"
                name="name"
                data-testid="subject-name-input"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Machine Learning"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Year</label>
                <select
                  name="year"
                  data-testid="subject-year-select"
                  value={formData.year}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="FY">FY</option>
                  <option value="SY">SY</option>
                  <option value="TY">TY</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Semester</label>
                <select
                  name="semester"
                  data-testid="subject-semester-select"
                  value={formData.semester}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {formData.year === 'FY' && (
                    <>
                      <option value="I">I</option>
                      <option value="II">II</option>
                    </>
                  )}
                  {formData.year === 'SY' && (
                    <>
                      <option value="III">III</option>
                      <option value="IV">IV</option>
                    </>
                  )}
                  {formData.year === 'TY' && (
                    <>
                      <option value="V">V</option>
                      <option value="VI">VI</option>
                    </>
                  )}
                </select>
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
            <textarea
              name="description"
              data-testid="subject-description-input"
              value={formData.description}
              onChange={handleInputChange}
              rows="3"
              className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Brief description of the subject"
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-slate-700 mb-2">Examination Details</label>
            <input
              type="text"
              name="exam_details"
              data-testid="subject-exam-input"
              value={formData.exam_details}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Theory: 60 Marks | Practical: 40 Marks"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-slate-700 mb-2">Resource URLs</label>
            <div className="space-y-3">
              <input
                type="text"
                name="notes_url"
                data-testid="subject-notes-url"
                value={formData.notes_url}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Notes URL"
              />
              <input
                type="text"
                name="question_paper_url"
                data-testid="subject-qp-url"
                value={formData.question_paper_url}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Question Paper URL"
              />
              <input
                type="text"
                name="reference_book_url"
                data-testid="subject-ref-url"
                value={formData.reference_book_url}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Reference Book URL"
              />
            </div>
          </div>
          <div className="flex space-x-3">
            <button
              data-testid="save-subject-btn"
              onClick={handleSave}
              className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center space-x-2"
            >
              <Save className="h-4 w-4" />
              <span>Save</span>
            </button>
            <button
              data-testid="cancel-subject-btn"
              onClick={handleCancel}
              className="bg-slate-200 text-slate-700 px-4 py-2 rounded-lg font-semibold hover:bg-slate-300 transition-colors flex items-center space-x-2"
            >
              <X className="h-4 w-4" />
              <span>Cancel</span>
            </button>
          </div>
        </motion.div>
      )}

      {/* Subjects List */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-slate-200">
        <div className="overflow-x-auto">
          <table data-testid="subjects-list-table" className="w-full">
            <thead className="bg-slate-100 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Subject</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Year/Sem</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Description</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Exam Details</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {subjectsList.map((subject, index) => (
                <tr key={subject.id} data-testid={`subject-list-row-${index}`} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">{subject.name}</td>
                  <td className="px-6 py-4 text-slate-600">
                    {subject.year} - Sem {subject.semester}
                  </td>
                  <td className="px-6 py-4 text-slate-600 max-w-xs">
                    <p className="line-clamp-2 text-sm">{subject.description}</p>
                  </td>
                  <td className="px-6 py-4 text-slate-600 text-sm">{subject.exam_details}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center">
                      <button
                        data-testid={`edit-subject-btn-${index}`}
                        onClick={() => handleEdit(subject)}
                        disabled={isAddingNew || editingId}
                        className="p-2 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Edit Subject"
                      >
                        <Edit className="h-4 w-4 text-blue-600" />
                      </button>
                      <button
                        data-testid={`delete-subject-btn-${index}`}
                        onClick={() => handleDelete(subject.id)}
                        disabled={isAddingNew || editingId}
                        className="p-2 bg-red-100 hover:bg-red-200 rounded-lg transition-colors ml-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Delete Subject"
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
