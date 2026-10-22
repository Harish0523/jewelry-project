import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Sparkles, Phone } from 'lucide-react';
import useLanguage from '../i18n/useLanguage';
import useSiteContent from '../context/useSiteContent';

const labelVariants = {
  active: { transition: { staggerChildren: 0.035 } },
  inactive: {},
};

const letterVariants = {
  active: { y: [0, -5, 0], transition: { duration: 0.35, ease: 'easeOut' } },
  inactive: { y: 0 },
};

function LanguageSelect() {
  const { language, setLanguage } = useLanguage();

  return (
    <select
      value={language}
      onChange={(event) => setLanguage(event.target.value)}
      aria-label={language === 'ta' ? 'மொழியைத் தேர்ந்தெடுக்கவும்' : 'Select language'}
      className="h-9 rounded-lg border border-amber-500/30 bg-neutral-900 px-2 text-xs font-semibold text-amber-300 outline-none focus:border-amber-400"
      data-no-translate="true"
    >
      <option value="en">English</option>
      <option value="ta">தமிழ்</option>
    </select>
  );
}

function AnimatedNavLabel({ label, active }) {
  const { language, translate } = useLanguage();
  const localizedLabel = translate(label);

  if (language === 'ta') {
    return (
      <motion.span aria-label={localizedLabel} className="inline-flex" animate={active ? 'active' : 'inactive'}>
        {localizedLabel}
      </motion.span>
    );
  }

  return (
    <motion.span
      aria-label={label}
      className="inline-flex"
      variants={labelVariants}
      animate={active ? 'active' : 'inactive'}
    >
      {label.split('').map((character, index) => (
        <motion.span
          key={`${character}-${index}`}
          aria-hidden="true"
          className="inline-block whitespace-pre"
          variants={letterVariants}
        >
          {character}
        </motion.span>
      ))}
    </motion.span>
  );
}

export default function Navbar() {
  const { content } = useSiteContent();
  const phoneHref = `tel:${content.mainPhone.replace(/[^\d+]/g, '')}`;
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileCollectionsOpen, setMobileCollectionsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-neutral-950/95 backdrop-blur-md text-white sticky top-0 z-50 border-b border-amber-500/20 shadow-2xl transition-all"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 w-full">
          
          {/* ==================== 1. LOGO & BRAND NAME ==================== */}
          <Link 
            to="/" 
            className="flex items-center gap-3 group select-none shrink-0" 
            onClick={() => setIsOpen(false)}
          >
            {/* Geometric Monogram Logo */}
            <motion.div 
              whileHover={{ rotate: 5, scale: 1.05 }}
              className="relative flex items-center justify-center w-11 h-11 shrink-0"
            >
              <div className="absolute inset-0 bg-amber-500/20 rounded-xl blur-sm group-hover:bg-amber-400/40 transition duration-300" />
              <svg 
                viewBox="0 0 100 100" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full relative z-10 drop-shadow-[0_2px_8px_rgba(245,158,11,0.4)]"
              >
                <polygon 
                  points="50,6 90,28 90,72 50,94 10,72 10,28" 
                  className="stroke-amber-400 group-hover:stroke-amber-300 transition-colors" 
                  strokeWidth="3.5" 
                  strokeLinejoin="round" 
                />
                <polygon 
                  points="50,13 83,31 83,69 50,87 17,69 17,31" 
                  className="stroke-amber-500/40" 
                  strokeWidth="1.5" 
                  strokeLinejoin="round" 
                />
                <path 
                  d="M 32 68 L 50 28 L 68 68" 
                  className="stroke-amber-300" 
                  strokeWidth="4" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />
                <path 
                  d="M 28 48 H 72" 
                  className="stroke-amber-400" 
                  strokeWidth="3" 
                  strokeLinecap="round" 
                />
                <path 
                  d="M 50 28 V 72" 
                  className="stroke-amber-200" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                />
                <polygon 
                  points="50,17 53,22 50,27 47,22" 
                  fill="#FBBF24" 
                />
              </svg>
            </motion.div>

            {/* Typography */}
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-serif font-bold tracking-widest text-transparent bg-clip-text bg-linear-to-r from-amber-100 via-amber-300 to-amber-500 group-hover:from-white group-hover:to-amber-300 transition duration-300">
                ATELIER HARX
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-[0.25em] text-amber-400/80 uppercase font-light">
                Fine Jewelry & Craft
              </span>
            </div>
          </Link>

          {/* ==================== 2. DESKTOP LINKS + PHONE BUTTON ==================== */}
          <div className="hidden lg:flex items-center gap-6 ml-auto">
            <div className="flex items-center space-x-6 text-sm font-medium">
              <Link 
                to="/" 
                className={`transition-colors py-1 border-b-2 ${isActive('/') ? 'text-amber-400 border-amber-400 font-semibold' : 'border-transparent text-gray-300 hover:text-amber-400'}`}
              >
                <AnimatedNavLabel label="Home" active={isActive('/')} />
              </Link>

              {/* Collections Dropdown with Framer Motion */}
              <div 
                className="relative group py-6"
                onMouseEnter={() => setDropdownOpen(true)} 
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <button className={`flex items-center gap-1.5 transition-colors py-1 border-b-2 ${location.pathname.startsWith('/products') ? 'text-amber-400 border-amber-400 font-semibold' : 'border-transparent text-gray-300 hover:text-amber-400'}`}>
                  <AnimatedNavLabel label="Collections" active={location.pathname.startsWith('/products')} />
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${dropdownOpen ? 'rotate-180 text-amber-400' : ''}`} />
                </button>

                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 w-56 bg-neutral-900/98 backdrop-blur-lg border border-amber-500/30 rounded-xl shadow-2xl py-3 z-50"
                    >
                      <Link to="/products" className="block px-5 py-2.5 text-xs uppercase tracking-wider font-semibold text-amber-400 border-b border-neutral-800 hover:bg-neutral-800/60">
                        All Collections
                      </Link>
                      <Link to="/products?category=gold" className="block px-5 py-2.5 text-sm text-gray-300 hover:bg-neutral-800 hover:text-amber-400 transition">
                        Gold Jewelry
                      </Link>
                      <Link to="/products?category=silver" className="block px-5 py-2.5 text-sm text-gray-300 hover:bg-neutral-800 hover:text-amber-400 transition">
                        Silver Jewelry
                      </Link>
                      <Link to="/products?category=diamond" className="block px-5 py-2.5 text-sm text-gray-300 hover:bg-neutral-800 hover:text-amber-400 transition">
                        Diamond Jewelry
                      </Link>
                      <Link to="/products?category=bridal" className="block px-5 py-2.5 text-sm text-gray-300 hover:bg-neutral-800 hover:text-amber-400 transition">
                        Bridal Jewelry
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link 
                to="/custom-jewelry" 
                className={`transition-colors py-1 border-b-2 ${isActive('/custom-jewelry') ? 'text-amber-400 border-amber-400 font-semibold' : 'border-transparent text-gray-300 hover:text-amber-400'}`}
              >
                <AnimatedNavLabel label="Custom Design" active={isActive('/custom-jewelry')} />
              </Link>

              <Link 
                to="/manufacturing" 
                className={`transition-colors py-1 border-b-2 ${isActive('/manufacturing') ? 'text-amber-400 border-amber-400 font-semibold' : 'border-transparent text-gray-300 hover:text-amber-400'}`}
              >
                <AnimatedNavLabel label="Manufacturing" active={isActive('/manufacturing')} />
              </Link>

              <Link 
                to="/gallery" 
                className={`transition-colors py-1 border-b-2 ${isActive('/gallery') ? 'text-amber-400 border-amber-400 font-semibold' : 'border-transparent text-gray-300 hover:text-amber-400'}`}
              >
                <AnimatedNavLabel label="Gallery" active={isActive('/gallery')} />
              </Link>

              {/* About Us placed right before Contact */}
              <Link 
                to="/about" 
                className={`transition-colors py-1 border-b-2 ${isActive('/about') ? 'text-amber-400 border-amber-400 font-semibold' : 'border-transparent text-gray-300 hover:text-amber-400'}`}
              >
                <AnimatedNavLabel label="About Us" active={isActive('/about')} />
              </Link>

              <Link 
                to="/contact" 
                className={`transition-colors py-1 border-b-2 ${isActive('/contact') ? 'text-amber-400 border-amber-400 font-semibold' : 'border-transparent text-gray-300 hover:text-amber-400'}`}
              >
                <AnimatedNavLabel label="Contact" active={isActive('/contact')} />
              </Link>

              <Link 
                to="/offers" 
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500 hover:text-neutral-950 font-semibold transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <AnimatedNavLabel label="Offers" active={isActive('/offers') || isActive('/special-offers')} />
              </Link>
            </div>

            {/* Call Button */}
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={phoneHref}
              className="bg-amber-500 hover:bg-amber-400 text-neutral-950 font-semibold px-4 py-2 rounded-full text-xs flex items-center gap-2 transition-all shadow-md shadow-amber-500/10 shrink-0 ml-2"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{content.mainPhone}</span>
            </motion.a>
            <LanguageSelect />
          </div>

          {/* ==================== 3. MOBILE MENU BUTTON ==================== */}
          <div className="lg:hidden flex items-center gap-3">
            <a 
              href={phoneHref}
              className="bg-amber-500/10 text-amber-400 border border-amber-500/30 p-2 rounded-full"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="p-2 text-gray-300 hover:text-amber-400 transition"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation Drawer with AnimatePresence */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-neutral-950/98 border-t border-neutral-800 px-6 py-6 space-y-3 text-sm overflow-hidden"
          >
            <div className="flex justify-end pb-2">
              <LanguageSelect />
            </div>

            <Link 
              to="/" 
              onClick={() => setIsOpen(false)} 
              className={`block py-2 text-base border-b border-neutral-800/80 ${isActive('/') ? 'text-amber-400 font-semibold' : 'text-gray-300'}`}
            >
              <AnimatedNavLabel label="Home" active={isActive('/')} />
            </Link>

            <div className="border-b border-neutral-800/80 pb-2">
              <button 
                onClick={() => setMobileCollectionsOpen(!mobileCollectionsOpen)}
                className="w-full flex items-center justify-between py-2 text-base text-gray-300"
              >
                <AnimatedNavLabel label="Collections" active={location.pathname.startsWith('/products')} />
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileCollectionsOpen ? 'rotate-180 text-amber-400' : ''}`} />
              </button>
              {mobileCollectionsOpen && (
                <div className="pl-4 space-y-2 py-2 text-sm bg-neutral-900/60 rounded-lg my-1">
                  <Link to="/products" onClick={() => setIsOpen(false)} className="block py-1.5 text-amber-400 font-medium">All Collections</Link>
                  <Link to="/products?category=gold" onClick={() => setIsOpen(false)} className="block py-1.5 text-gray-400 hover:text-amber-400">Gold Jewelry</Link>
                  <Link to="/products?category=silver" onClick={() => setIsOpen(false)} className="block py-1.5 text-gray-400 hover:text-amber-400">Silver Jewelry</Link>
                  <Link to="/products?category=diamond" onClick={() => setIsOpen(false)} className="block py-1.5 text-gray-400 hover:text-amber-400">Diamond Jewelry</Link>
                  <Link to="/products?category=bridal" onClick={() => setIsOpen(false)} className="block py-1.5 text-gray-400 hover:text-amber-400">Bridal Jewelry</Link>
                </div>
              )}
            </div>

            <Link 
              to="/custom-jewelry" 
              onClick={() => setIsOpen(false)} 
              className={`block py-2 text-base border-b border-neutral-800/80 ${isActive('/custom-jewelry') ? 'text-amber-400 font-semibold' : 'text-gray-300'}`}
            >
              <AnimatedNavLabel label="Custom Design" active={isActive('/custom-jewelry')} />
            </Link>

            <Link 
              to="/manufacturing" 
              onClick={() => setIsOpen(false)} 
              className={`block py-2 text-base border-b border-neutral-800/80 ${isActive('/manufacturing') ? 'text-amber-400 font-semibold' : 'text-gray-300'}`}
            >
              <AnimatedNavLabel label="Manufacturing" active={isActive('/manufacturing')} />
            </Link>

            <Link 
              to="/gallery" 
              onClick={() => setIsOpen(false)} 
              className={`block py-2 text-base border-b border-neutral-800/80 ${isActive('/gallery') ? 'text-amber-400 font-semibold' : 'text-gray-300'}`}
            >
              <AnimatedNavLabel label="Gallery" active={isActive('/gallery')} />
            </Link>

            <Link 
              to="/offers" 
              onClick={() => setIsOpen(false)} 
              className="flex items-center gap-2 py-2 text-base font-semibold text-amber-400 border-b border-neutral-800/80"
            >
              <Sparkles className="w-4 h-4" />
              <AnimatedNavLabel label="Special Offers" active={isActive('/offers') || isActive('/special-offers')} />
            </Link>

            <Link 
              to="/faq" 
              onClick={() => setIsOpen(false)} 
              className={`block py-2 text-base border-b border-neutral-800/80 ${isActive('/faq') ? 'text-amber-400 font-semibold' : 'text-gray-300'}`}
            >
              FAQ
            </Link>

            {/* About Us placed right before Contact Us in mobile view */}
            <Link 
              to="/about" 
              onClick={() => setIsOpen(false)} 
              className={`block py-2 text-base border-b border-neutral-800/80 ${isActive('/about') ? 'text-amber-400 font-semibold' : 'text-gray-300'}`}
            >
              <AnimatedNavLabel label="About Us" active={isActive('/about')} />
            </Link>

            <Link 
              to="/contact" 
              onClick={() => setIsOpen(false)} 
              className={`block py-2 text-base ${isActive('/contact') ? 'text-amber-400 font-semibold' : 'text-gray-300'}`}
            >
              <AnimatedNavLabel label="Contact Us" active={isActive('/contact')} />
            </Link>

            <div className="pt-4">
              <motion.a 
                whileTap={{ scale: 0.97 }}
                href={phoneHref}
                className="w-full bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold py-3 rounded-xl text-center flex items-center justify-center gap-2 transition"
              >
                <Phone className="w-4 h-4" /> Call Now: {content.mainPhone}
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}