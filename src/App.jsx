import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { LanguageProvider } from './i18n/LanguageContext.jsx';
import { SiteContentProvider } from './context/SiteContentContext';
import useSiteContent from './context/useSiteContent';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import CustomJewelry from './pages/CustomJewelry';
import Manufacturing from './pages/Manufacturing';
import Gallery from './pages/Gallery';
import Offers from './pages/Offers';
import TestimonialsPage from './pages/TestimonialsPage';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';

// Admin Components & Pages (From src/admin/)
import Admin from './pages/Admin';

function MainLayout() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const { content } = useSiteContent();
  const whatsappNumber = content.whatsappNumber.replace(/\D/g, '');

  return (
    <div className="min-h-screen flex flex-col bg-neutral-950 text-white font-sans">
      
      {!isAdminRoute && <Navbar />}

      <main className="flex-1">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/custom-jewelry" element={<CustomJewelry />} />
              <Route path="/manufacturing" element={<Manufacturing />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/offers" element={<Offers />} />
              <Route path="/special-offers" element={<Offers />} />
              <Route path="/testimonials" element={<TestimonialsPage />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<Terms />} />

              {/* Admin Routes */}
              <Route path="/admin/*" element={<Admin />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>

      {!isAdminRoute && (
        <div className="fixed bottom-6 right-6 z-50">
          <a 
            href={`https://wa.me/${whatsappNumber}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-emerald-500 hover:bg-emerald-600 text-white p-3.5 rounded-full shadow-2xl transition hover:scale-110 flex items-center justify-center"
            title="Chat on WhatsApp"
          >
            <MessageCircle size={26} />
          </a>
        </div>
      )}

      {!isAdminRoute && <Footer />}

    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <Router>
        <SiteContentProvider>
          <MainLayout />
        </SiteContentProvider>
      </Router>
    </LanguageProvider>
  );
}