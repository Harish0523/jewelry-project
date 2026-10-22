import React from 'react';
import { MessageCircle, Phone } from 'lucide-react';

export default function WhatsappButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* Call Now Button */}
      <a 
        href="tel:+947XXXXXXXX" 
        className="bg-neutral-900 text-amber-400 p-3.5 rounded-full shadow-lg hover:bg-neutral-800 transition flex items-center justify-center border border-amber-400/30"
        title="Call Now"
      >
        <Phone size={22} />
      </a>

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/947XXXXXXXX?text=Hello,%20I%20have%20a%20jewelry%20inquiry" 
        target="_blank" 
        rel="noreferrer"
        className="bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition flex items-center justify-center animate-bounce"
        title="WhatsApp Inquiry"
      >
        <MessageCircle size={26} />
      </a>
    </div>
  );
}