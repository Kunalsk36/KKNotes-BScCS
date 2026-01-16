import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, FileText, ClipboardList, GraduationCap, CheckCircle } from 'lucide-react';

export default function Home() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const yearCards = [
    {
      year: 'FY',
      title: 'First Year',
      description: 'Build your foundation with core programming and mathematics',
      color: 'from-blue-500 to-blue-600',
      link: '/fy?semester=1'
    },
    {
      year: 'SY',
      title: 'Second Year',
      description: 'Advance your skills with OS, networking, and web technologies',
      color: 'from-cyan-500 to-cyan-600',
      link: '/sy?semester=1'
    },
    {
      year: 'TY',
      title: 'Third Year',
      description: 'Master AI, cloud computing, and modern technologies',
      color: 'from-blue-600 to-cyan-500',
      link: '/ty?semester=1'
    }
  ];

  const features = [
    {
      icon: FileText,
      title: 'Comprehensive Notes',
      description: 'Well-structured notes covering all syllabus topics'
    },
    {
      icon: ClipboardList,
      title: 'Question Papers',
      description: 'Previous years papers for effective exam preparation'
    },
    {
      icon: BookOpen,
      title: 'Reference Books',
      description: 'Curated collection of best reference materials'
    }
  ];

  return (
    <div data-testid="home-page" className="min-h-screen">
      {/* Hero Section */}
      <motion.section
        {...fadeIn}
        className="relative bg-gradient-to-br from-blue-50 via-white to-cyan-50 pt-20 pb-32 px-4 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMzYjgyZjYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzAtMS4xLS45LTItMi0yaC0xMmMtMS4xIDAtMiAuOS0yIDJ2MTJjMCAxLjEuOSAyIDIgMmgxMmMxLjEgMCAyLS45IDItMnYtMTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-40"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl mb-6 shadow-xl"
            >
              <GraduationCap className="h-10 w-10 text-white" />
            </motion.div>
            
            <h1 data-testid="hero-title" className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              Your Gateway to <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">BSc Computer Science</span> Success
            </h1>
            
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mb-8">
              Access comprehensive study materials, previous year question papers, and reference books - all organized by year and semester for your convenience.
            </p>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Link
                to="/subjects"
                data-testid="get-started-btn"
                className="inline-block bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Explore All Subjects
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Quick Access Cards */}
      <section className="max-w-7xl mx-auto px-4 -mt-16 mb-20 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {yearCards.map((card, index) => (
            <motion.div
              key={card.year}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Link
                to={card.link}
                data-testid={`year-card-${card.year.toLowerCase()}`}
                className="group block bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-blue-100 hover:scale-105"
              >
                <div className={`h-2 bg-gradient-to-r ${card.color}`}></div>
                <div className="p-8">
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${card.color} rounded-xl mb-4 text-white font-bold text-2xl group-hover:scale-110 transition-transform`}>
                    {card.year}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{card.title}</h3>
                  <p className="text-slate-600">{card.description}</p>
                  <div className="mt-4 text-blue-600 font-semibold flex items-center space-x-2 group-hover:space-x-3 transition-all">
                    <span>Access Materials</span>
                    <span>→</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Us Section */}
      <section data-testid="why-us-section" className="bg-slate-50 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Why Choose KKNotes?</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              We provide everything you need to excel in your BSc Computer Science journey
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                data-testid={`feature-${index}`}
                className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-shadow border border-blue-50"
              >
                <div className="bg-gradient-to-br from-blue-100 to-cyan-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-7 w-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-500 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-lg mb-8 text-blue-50">
            Join thousands of students who trust KKNotes for their academic success
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/fy?semester=1"
              data-testid="cta-browse-btn"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Browse Notes
            </Link>
            <Link
              to="/contact"
              data-testid="cta-contact-btn"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
