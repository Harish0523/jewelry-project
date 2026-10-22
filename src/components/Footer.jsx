import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Sparkles } from 'lucide-react';
import useSiteContent from '../context/useSiteContent';

export default function Footer() {
  const { content } = useSiteContent();
  const phoneHref = `tel:${content.mainPhone.replace(/[^\d+]/g, '')}`;
  const whatsappNumber = content.whatsappNumber.replace(/\D/g, '');
  const mapUrl = `https://maps.google.com/?${new URLSearchParams({ q: content.showroomAddress })}`;

  return (
    <footer 
      className="relative bg-neutral-950 text-gray-300 pt-16 pb-8 border-t border-amber-500/20 bg-cover bg-center bg-no-repeat shadow-2xl"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(15, 15, 18, 0.80), rgba(10, 10, 12, 0.60)), url('/footer.gif')`
      }}
    >
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12 relative z-10">
        
        {/* Brand & About (ATELIER HARX) */}
        <div className="space-y-4">
          <Link to="/" className="flex items-center gap-3 group select-none">
            {/* Logo Monogram */}
            <div className="relative flex items-center justify-center w-10 h-10 shrink-0">
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
            </div>

            {/* Brand Name */}
            <div className="flex flex-col">
              <span className="text-xl font-serif font-bold tracking-widest text-transparent bg-clip-text bg-linear-to-r from-amber-100 via-amber-300 to-amber-500 group-hover:from-white group-hover:to-amber-300 transition duration-300">
                ATELIER HARX
              </span>
              <span className="text-[9px] tracking-[0.25em] text-amber-400/80 uppercase font-light">
                Fine Jewelry & Craft
              </span>
            </div>
          </Link>

          <p className="text-sm text-gray-300 leading-relaxed font-light">
            Crafting timeless luxury and bespoke elegance. Specializing in fine Gold, Diamond, Silver & custom handcrafted jewelry masterpieces.
          </p>

          <div className="pt-2 space-y-2 text-sm text-gray-300">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
              <span>
                <a 
                  href={mapUrl}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-amber-400 transition"
                >
                  {content.showroomAddress}
                </a>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-amber-500 shrink-0" />
              <a href={phoneHref} className="hover:text-amber-400 transition">
                {content.mainPhone}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-amber-500 shrink-0" />
              <a href={`mailto:${content.email}`} className="hover:text-amber-400 transition underline decoration-amber-500/40">
                {content.email}
              </a>
            </div>
          </div>

          {/* Pure SVG Social Media Links */}
          <div className="pt-3">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold block mb-2">
              Follow Our Craft
            </span>
            <div className="flex items-center gap-3">
              {/* Facebook */}
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded-full bg-neutral-900 border border-amber-500/30 flex items-center justify-center text-amber-400 hover:bg-amber-500 hover:text-neutral-950 transition duration-300"
                title="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              {/* Instagram */}
              <a 
                href={content.instagramUrl}
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded-full bg-neutral-900 border border-amber-500/30 flex items-center justify-center text-amber-400 hover:bg-amber-500 hover:text-neutral-950 transition duration-300"
                title="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* Youtube */}
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded-full bg-neutral-900 border border-amber-500/30 flex items-center justify-center text-amber-400 hover:bg-amber-500 hover:text-neutral-950 transition duration-300"
                title="YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>

              {/* WhatsApp */}
              <a 
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded-full bg-neutral-900 border border-amber-500/30 flex items-center justify-center text-amber-400 hover:bg-amber-500 hover:text-neutral-950 transition duration-300"
                title="WhatsApp"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
                </svg>
              </a>
            </div>
          </div>

        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-serif font-semibold text-lg mb-4 border-b border-amber-500/40 pb-2 inline-block">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-amber-400 transition">Home</Link></li>
            <li><Link to="/about" className="hover:text-amber-400 transition">About Us</Link></li>
            <li><Link to="/products" className="hover:text-amber-400 transition">Our Products</Link></li>
            <li><Link to="/gallery" className="hover:text-amber-400 transition">Gallery</Link></li>
            <li><Link to="/testimonials" className="hover:text-amber-400 transition">Testimonials</Link></li>
            <li><Link to="/faq" className="hover:text-amber-400 transition">FAQ</Link></li>
          </ul>
        </div>

        {/* Jewelry Collections */}
        <div>
          <h3 className="text-white font-serif font-semibold text-lg mb-4 border-b border-amber-500/40 pb-2 inline-block">
            Jewelry Collections
          </h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/products?category=gold" className="hover:text-amber-400 transition">Gold Jewelry</Link></li>
            <li><Link to="/products?category=silver" className="hover:text-amber-400 transition">Silver Jewelry</Link></li>
            <li><Link to="/products?category=diamond" className="hover:text-amber-400 transition">Diamond Jewelry</Link></li>
            <li><Link to="/products?category=bridal" className="hover:text-amber-400 transition">Bridal Jewelry</Link></li>
            <li><Link to="/custom-jewelry" className="hover:text-amber-400 transition">Custom Jewelry</Link></li>
            <li><Link to="/manufacturing" className="hover:text-amber-400 transition">Manufacturing</Link></li>
          </ul>
        </div>

        {/* Customer Care & Legal */}
        <div>
          <h3 className="text-white font-serif font-semibold text-lg mb-4 border-b border-amber-500/40 pb-2 inline-block">
            Customer Care & Legal
          </h3>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link to="/offers" className="inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-medium transition">
                <Sparkles className="w-4 h-4" />
                <span> Offers</span>
              </Link>
            </li>
            <li><Link to="/contact" className="hover:text-amber-400 transition">Contact Us</Link></li>
            <li><Link to="/privacy-policy" className="hover:text-amber-400 transition">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-amber-400 transition">Terms & Conditions</Link></li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-800/80 pt-6 text-center text-xs text-gray-400 max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4 relative z-10">
        <p>&copy; {new Date().getFullYear()} Atelier Harx. All Rights Reserved.</p>
        <div className="flex gap-6">
          <Link to="/privacy-policy" className="hover:text-amber-400 transition">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-amber-400 transition">Terms & Conditions</Link>
        </div>
      </div>
    </footer>
  );
}