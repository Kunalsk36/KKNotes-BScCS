import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import Home from './pages/Home';
import YearPage from './pages/YearPage';
import SubjectInfo from './pages/SubjectInfo';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminOverview from './pages/AdminOverview';
import AdminFeedback from './pages/AdminFeedback';
import AdminSubjects from './pages/AdminSubjects';
import './App.css';
import { visitCount } from './data';

function VisitTracker() {
  const location = useLocation();

  useEffect(() => {
    const storedCount = localStorage.getItem('kknotes_visit_count');
    const currentCount = storedCount ? parseInt(storedCount) : visitCount;
    const newCount = currentCount + 1;
    localStorage.setItem('kknotes_visit_count', newCount.toString());
    window.dispatchEvent(new Event('visitCountUpdated'));
  }, [location]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <VisitTracker />
      <Toaster position="top-right" richColors />
      <Routes>
        {/* Public Routes */}
        <Route
          path="/*"
          element={
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/fy" element={<YearPage />} />
                  <Route path="/sy" element={<YearPage />} />
                  <Route path="/ty" element={<YearPage />} />
                  <Route path="/subjects" element={<SubjectInfo />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </main>
              <Footer />
            </div>
          }
        />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />}>
          <Route index element={<AdminOverview />} />
          <Route path="feedback" element={<AdminFeedback />} />
          <Route path="subjects" element={<AdminSubjects />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
