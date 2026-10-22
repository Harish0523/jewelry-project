import React from 'react';
import { ShieldCheck, Lock, Eye, FileText, CheckCircle2 } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-linear-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-white py-16 px-4">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <Lock className="w-3.5 h-3.5" /> Data Protection
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold tracking-wide">
            Privacy <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-200 via-amber-400 to-amber-500">Policy</span>
          </h1>
          <p className="text-gray-300 text-sm font-light">
            Last Updated: October 2026 • Atelier Harx, Chavakachcheri, Jaffna
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-neutral-900/90 border border-neutral-800 rounded-3xl p-8 sm:p-12 space-y-8 shadow-2xl text-sm leading-relaxed font-light">
          
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-amber-400 font-serif text-xl font-bold">
              <ShieldCheck className="w-5 h-5 shrink-0" />
              <h2>1. Information We Collect</h2>
            </div>
            <p className="text-gray-300">
              When you submit a custom jewelry design inquiry or contact us via WhatsApp, we collect basic details including your name, telephone number, email, and design descriptions/sketches. We do not collect online credit card details directly on this site.
            </p>
          </div>

          <div className="space-y-3 border-t border-neutral-800 pt-6">
            <div className="flex items-center gap-2 text-amber-400 font-serif text-xl font-bold">
              <Eye className="w-5 h-5 shrink-0" />
              <h2>2. How We Use Your Information</h2>
            </div>
            <ul className="space-y-2 text-gray-300 list-disc pl-5">
              <li>To provide accurate 3D CAD modeling previews and custom gold quotes.</li>
              <li>To communicate order status, hallmark verification, and delivery timelines.</li>
              <li>To notify you of exclusive seasonal offers and making charge discounts (if opted-in).</li>
            </ul>
          </div>

          <div className="space-y-3 border-t border-neutral-800 pt-6">
            <div className="flex items-center gap-2 text-amber-400 font-serif text-xl font-bold">
              <Lock className="w-5 h-5 shrink-0" />
              <h2>3. Data Protection & Security</h2>
            </div>
            <p className="text-gray-300">
              Your personal information and custom design sketches are treated with absolute confidentiality. We never sell, rent, or trade customer information to third parties.
            </p>
          </div>

          <div className="space-y-3 border-t border-neutral-800 pt-6">
            <div className="flex items-center gap-2 text-amber-400 font-serif text-xl font-bold">
              <FileText className="w-5 h-5 shrink-0" />
              <h2>4. Contact Us regarding Privacy</h2>
            </div>
            <p className="text-gray-300">
              If you have any questions regarding your personal information, please visit our showroom on Kandy Road, Chavakachcheri, Jaffna or call us at <span className="text-amber-400 font-semibold">+94 76 208 4145</span>.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}