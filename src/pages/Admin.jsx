import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../api';

// Admin Components
import AdminLogin from '../admin/pages/AdminLogin';
import AdminSidebar from '../admin/components/AdminSidebar';
import AdminHeader from '../admin/components/AdminHeader';

// Admin Pages
import AdminDashboard from '../admin/pages/AdminDashboard';
import ProductManager from '../admin/pages/ProductManager';
import GalleryManager from '../admin/pages/GalleryManager';
import OfferManager from '../admin/pages/OfferManager';
import TestimonialManager from '../admin/pages/TestimonialManager';
import InquiryManager from '../admin/pages/InquiryManager';
import ContentManager from '../admin/pages/ContentManager';

export default function Admin() {
  const location = useLocation();
  const navigate = useNavigate();
  const [authStatus, setAuthStatus] = useState('checking');
  const isAuthenticated = authStatus === 'authenticated';
  const [inquiries, setInquiries] = useState([]);
  const activeTab = location.pathname.split('/').filter(Boolean).at(-1) || 'dashboard';

  useEffect(() => {
    let isActive = true;
    fetch(`${API_BASE_URL}/auth/session.php`, { credentials: 'include' })
      .then((response) => response.json())
      .then((data) => {
        if (isActive) setAuthStatus(data.success ? 'authenticated' : 'unauthenticated');
      })
      .catch(() => {
        if (isActive) setAuthStatus('unauthenticated');
      });
    return () => {
      isActive = false;
    };
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return undefined;
    fetchInquiries();
    const interval = setInterval(fetchInquiries, 5000);
    return () => clearInterval(interval);
  }, [isAuthenticated]);

  const fetchInquiries = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/inquiries/get_inquiries.php`, { credentials: 'include' });
      const data = await res.json();
      if (data.success && Array.isArray(data.inquiries)) {
        setInquiries(data.inquiries);
      }
    } catch (err) {
      console.error('Error fetching live inquiries:', err);
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      setInquiries(prev => prev.map(inq => inq.id === id ? { ...inq, status: newStatus } : inq));

      await fetch(`${API_BASE_URL}/inquiries/manage_inquiry.php`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'update_status', id, status: newStatus })
      });
    } catch (err) {
      console.error('Error updating inquiry status:', err);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch(`${API_BASE_URL}/auth/logout.php`, { method: 'POST', credentials: 'include' });
    } finally {
      localStorage.removeItem('adminUsername');
      setAuthStatus('unauthenticated');
      navigate('/admin/login', { replace: true });
    }
  };

  if (authStatus === 'checking') {
    return <div className="flex min-h-screen items-center justify-center bg-[#0a0a0c] text-sm text-neutral-400">Checking admin session...</div>;
  }

  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={() => {
      setAuthStatus('authenticated');
      navigate('/admin/dashboard', { replace: true });
    }} />;
  }

  if (activeTab === 'login') {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const pageVariants = {
    initial: { opacity: 0, y: 15, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3, ease: 'easeOut' } },
    exit: { opacity: 0, y: -10, scale: 0.98, transition: { duration: 0.15, ease: 'easeIn' } }
  };

  return (
    <div className="flex min-h-screen bg-[#0a0a0c] text-white font-sans selection:bg-amber-500 selection:text-neutral-950">
      
      <AdminSidebar activeTab={activeTab} onLogout={handleLogout} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <AdminHeader
          activeTab={activeTab}
          inquiries={Array.isArray(inquiries) ? inquiries : []}
          onOpenInquiries={() => navigate('/admin/inquiries')}
          onUpdateStatus={handleUpdateStatus}
        />

        <main className="flex-1 p-6 sm:p-8 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="h-full"
            >
              <Routes>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="products" element={<ProductManager />} />
                <Route path="gallery" element={<GalleryManager />} />
                <Route path="offers" element={<OfferManager />} />
                <Route path="testimonials" element={<TestimonialManager />} />
                <Route
                  path="inquiries"
                  element={(
                    <InquiryManager
                      inquiries={Array.isArray(inquiries) ? inquiries : []}
                      setInquiries={setInquiries}
                      refreshInquiries={fetchInquiries}
                    />
                  )}
                />
                <Route path="content" element={<ContentManager />} />
                <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

    </div>
  );
}