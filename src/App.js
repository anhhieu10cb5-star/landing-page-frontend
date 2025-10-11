// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ThreeBackground from './components/three/ThreeBackground';

// Import pages
import LandingPage from './LandingPage';
import PublicTrackingPage from './pages/PublicTrackingPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminMessages from './pages/AdminMessages';
import AdminProjects from './pages/AdminProjects';
import AdminProjectDetail from './pages/AdminProjectDetail';
import AdminProjectForm from './pages/AdminProjectForm';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route - Landing Page with ThreeBackground */}
        <Route 
          path="/" 
          element={
            <div className="relative min-h-screen">
              <ThreeBackground />
              <LandingPage />
            </div>
          } 
        />
        
        {/* Public Tracking Page - NO ThreeBackground */}
        <Route path="/track/:projectCode" element={<PublicTrackingPage />} />
        
        {/* Admin Routes - NO ThreeBackground */}
        <Route path="/admin/login" element={<AdminLogin />} />
        
        {/* Redirect /admin to /admin/dashboard */}
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/messages" element={<AdminMessages />} />
        <Route path="/admin/projects" element={<AdminProjects />} />
        
        {/* CRITICAL: /new and /edit/:id MUST come BEFORE /:id to avoid route conflicts */}
        <Route path="/admin/projects/new" element={<AdminProjectForm />} />
        <Route path="/admin/projects/edit/:id" element={<AdminProjectForm />} />
        <Route path="/admin/projects/:id" element={<AdminProjectDetail />} />
      </Routes>
    </Router>
  );
}

export default App;