import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Image as GalleryIcon, 
  Tag, 
  MessageSquare, 
  HelpCircle, 
  FileText, 
  LogOut
} from 'lucide-react';

const MotionLink = motion(Link);

export default function AdminSidebar({ activeTab, onLogout }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'gallery', label: 'Gallery', icon: GalleryIcon },
    { id: 'offers', label: 'Special Offers', icon: Tag },
    { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
    { id: 'inquiries', label: 'Inquiries', icon: HelpCircle },
    { id: 'content', label: 'Site Content', icon: FileText },
  ];

  return (
    <aside className="w-64 bg-[#121215] border-r border-neutral-800 flex flex-col justify-between p-4 selection:bg-amber-500">
      <div>
        {/* Logo Header with Pulse Animation */}
        <div className="flex items-center gap-3 px-3 py-4 mb-6 border-b border-neutral-800/80">
          <motion.div
            whileHover={{ rotate: 5, scale: 1.05 }}
            className="w-9 h-9 shrink-0"
          >
            <svg
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full drop-shadow-[0_2px_8px_rgba(245,158,11,0.4)]"
              aria-hidden="true"
            >
              <polygon points="50,6 90,28 90,72 50,94 10,72 10,28" className="stroke-amber-400" strokeWidth="3.5" strokeLinejoin="round" />
              <polygon points="50,13 83,31 83,69 50,87 17,69 17,31" className="stroke-amber-500/40" strokeWidth="1.5" strokeLinejoin="round" />
              <path d="M 32 68 L 50 28 L 68 68" className="stroke-amber-300" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M 28 48 H 72" className="stroke-amber-400" strokeWidth="3" strokeLinecap="round" />
              <path d="M 50 28 V 72" className="stroke-amber-200" strokeWidth="2.5" strokeLinecap="round" />
              <polygon points="50,17 53,22 50,27 47,22" fill="#FBBF24" />
            </svg>
          </motion.div>
          <div>
            <h1 className="font-serif font-bold text-lg tracking-wider text-amber-400">ATELIER HARX</h1>
            <p className="text-[10px] uppercase tracking-widest text-neutral-400">Admin Control</p>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <MotionLink
                key={item.id}
                to={`/admin/${item.id}`}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.97 }}
                aria-current={isActive ? 'page' : undefined}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 relative ${
                  isActive
                    ? 'text-amber-400 bg-amber-500/10 border border-amber-500/20 shadow-md shadow-amber-500/5' 
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
                }`}
              >
                <Icon size={18} className={isActive ? 'text-amber-400' : 'text-neutral-400'} />
                <span>{item.label}</span>

                {/* Active Indicator Bar */}
                {isActive && (
                  <motion.div 
                    layoutId="activeIndicator"
                    className="absolute right-0 top-2 bottom-2 w-1 bg-amber-400 rounded-l-full" 
                  />
                )}
              </MotionLink>
            );
          })}
        </nav>
      </div>

      {/* Logout Button */}
      <div className="pt-4 border-t border-neutral-800/80">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm text-rose-400 hover:bg-rose-500/10 hover:border hover:border-rose-500/20 transition duration-200"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </motion.button>
      </div>
    </aside>
  );
}