// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import HomePage from './pages/HomePage';
import PortfolioPage from './pages/PortfolioPage';
import PricingPage from './pages/PricingPage';
import FAQPage from './pages/FAQPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import DevicePreviewDemo from './pages/DevicePreviewDemo';

// Existing pages (giữ nguyên nếu có)
import PublicTrackingPage from './pages/PublicTrackingPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminProjects from './pages/AdminProjects';
import AdminProjectForm from './pages/AdminProjectForm';
import AdminProjectDetail from './pages/AdminProjectDetail';
import AdminMessages from './pages/AdminMessages';
import LogDashboard from './pages/LogDashboard';

// Styles
import './styles/theme.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<HomePage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/studio" element={<DevicePreviewDemo />} />

        {/* Project Tracking */}
        <Route path="/track/:projectCode" element={<PublicTrackingPage />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/projects" element={<AdminProjects />} />
        <Route path="/admin/projects/new" element={<AdminProjectForm />} />
        <Route path="/admin/projects/:id" element={<AdminProjectDetail />} />
        <Route path="/admin/projects/:id/edit" element={<AdminProjectForm />} />
        <Route path="/admin/messages" element={<AdminMessages />} />
        <Route path="/admin/logs" element={<LogDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;