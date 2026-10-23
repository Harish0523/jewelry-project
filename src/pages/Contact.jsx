import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  Clock, 
  MessageCircle, 
  Send, 
  Mail, 
  User, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import useSiteContent from '../context/useSiteContent';

export default function Contact() {
  const { content } = useSiteContent();
  const phoneHref = `tel:${content.mainPhone.replace(/[^\d+]/g, '')}`;
  const whatsappNumber = content.whatsappNumber.replace(/\D/g, '');
  const mapUrl = `https://maps.google.com/?${new URLSearchParams({ q: content.showroomAddress })}`;
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    inquiryType: 'Custom Jewelry Request',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      // 1. Send data to XAMPP MySQL Database via PHP API
      const response = await fetch('http://atelierharx.gt.tc/jewelry_api/inquiries/add_inquiry.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          type: formData.inquiryType,
          message: formData.message
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
      } else {
        setErrorMessage(data.message || 'Failed to submit inquiry to database.');
      }
    } catch {
      setErrorMessage('Cannot connect to XAMPP backend server.');
    } finally {
      setLoading(false);
    }
  };

  // Staggered Container Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
  };

  return (
    <div className="min-h-screen bg-[#0b0b0c] text-white font-sans py-14 px-4 sm:px-6 lg:px-8 space-y-16 pt-24">
      
      {/* ==================== 1. PAGE HEADER ==================== */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mx-auto space-y-3"
      >
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white font-serif">
          Contact <span className="text-amber-400">Atelier Harx</span>
        </h1>
        <p className="text-neutral-400 text-sm sm:text-base font-light">
          Visit our showroom in Chavakachcheri or reach us via phone/WhatsApp.
        </p>
      </motion.div>

      {/* ==================== 2. TOP INFO CARDS ==================== */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        
        {/* Showroom Address Card */}
        <motion.div 
          variants={itemVariants}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          className="bg-[#141416] border border-neutral-800 p-8 rounded-2xl shadow-xl space-y-4 hover:border-amber-500/30 transition duration-300"
        >
          <div className="w-12 h-12 bg-neutral-900 border border-amber-500/30 rounded-xl flex items-center justify-center text-amber-400">
            <MapPin size={22} />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-lg text-white">Showroom Address</h3>
            <p className="text-neutral-400 text-xs sm:text-sm font-light leading-relaxed pt-1">
              {content.showroomAddress}
            </p>
          </div>
        </motion.div>

        {/* Direct Phone Card */}
        <motion.div 
          variants={itemVariants}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          className="bg-[#141416] border border-neutral-800 p-8 rounded-2xl shadow-xl space-y-4 hover:border-amber-500/30 transition duration-300 flex flex-col justify-between"
        >
          <div className="space-y-4">
            <div className="w-12 h-12 bg-neutral-900 border border-amber-500/30 rounded-xl flex items-center justify-center text-amber-400">
              <Phone size={22} />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-lg text-white">Direct Phone</h3>
              <a href={phoneHref} className="inline-block text-amber-400 font-bold text-sm tracking-wide pt-1">
                {content.mainPhone}
              </a>
              <p className="text-neutral-500 text-xs font-light">
                Available during business hours.
              </p>
            </div>
          </div>
          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 text-xs font-bold transition pt-2"
          >
            <MessageCircle size={15} />
            <span>Start WhatsApp Chat</span>
          </a>
        </motion.div>

        {/* Opening Hours Card */}
        <motion.div 
          variants={itemVariants}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          className="bg-[#141416] border border-neutral-800 p-8 rounded-2xl shadow-xl space-y-4 hover:border-amber-500/30 transition duration-300"
        >
          <div className="w-12 h-12 bg-neutral-900 border border-amber-500/30 rounded-xl flex items-center justify-center text-amber-400">
            <Clock size={22} />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-lg text-white">Opening Hours</h3>
            <p className="text-neutral-400 text-xs sm:text-sm font-light leading-relaxed pt-1">
              {content.openingHours}
            </p>
          </div>
        </motion.div>

      </motion.div>

      {/* ==================== 3. CONTACT FORM & MAP LOCATION ==================== */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        
        {/* Left Column: Interactive Contact Form */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-[#141416] border border-neutral-800 p-8 sm:p-10 rounded-3xl shadow-2xl space-y-6"
        >
          <div className="space-y-2">
            <span className="text-amber-400 font-bold uppercase text-[10px] tracking-widest bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              DIRECT INQUIRY
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white pt-2">
              Send Us a Message
            </h2>
            <p className="text-neutral-400 text-xs sm:text-sm font-light">
              Have a custom jewelry query or pricing request? Fill out the form below for instant assistance.
            </p>
          </div>

          {errorMessage && (
            <div className="p-4 bg-red-950/40 border border-red-500/40 text-red-300 rounded-xl text-xs flex items-center gap-2">
              <AlertCircle size={16} />
              <span>{errorMessage}</span>
            </div>
          )}

          {submitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-emerald-950/40 border border-emerald-500/40 p-6 rounded-2xl text-center space-y-3"
            >
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h3 className="text-lg font-bold text-white">Inquiry Submitted Successfully</h3>
              <p className="text-xs text-emerald-200 font-light">
                Thank you for contacting Atelier Harx. Your message has been sent to our team, and we will get back to you soon.
              </p>
              <button 
                onClick={() => setSubmitted(false)}
                className="text-amber-400 underline text-xs font-medium pt-2 block mx-auto"
              >
                Send another message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              
              {/* Full Name Input */}
              <div className="space-y-1.5">
                <label className="text-neutral-300 font-medium flex items-center gap-1.5">
                  <User size={14} className="text-amber-400" /> Your Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Sangeetha Perera"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-[#0b0b0c] border border-neutral-800 focus:border-amber-500 rounded-xl px-4 py-3 text-white placeholder-neutral-600 outline-none transition"
                />
              </div>

              {/* Phone & Email Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Phone */}
                <div className="space-y-1.5">
                  <label className="text-neutral-300 font-medium flex items-center gap-1.5">
                    <Phone size={14} className="text-amber-400" /> Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="+94 77 123 4567"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-[#0b0b0c] border border-neutral-800 focus:border-amber-500 rounded-xl px-4 py-3 text-white placeholder-neutral-600 outline-none transition"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-neutral-300 font-medium flex items-center gap-1.5">
                    <Mail size={14} className="text-amber-400" /> Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-[#0b0b0c] border border-neutral-800 focus:border-amber-500 rounded-xl px-4 py-3 text-white placeholder-neutral-600 outline-none transition"
                  />
                </div>

              </div>

              {/* Inquiry Type Dropdown */}
              <div className="space-y-1.5">
                <label className="text-neutral-300 font-medium">
                  Inquiry Category
                </label>
                <select
                  name="inquiryType"
                  value={formData.inquiryType}
                  onChange={handleChange}
                  className="w-full bg-[#0b0b0c] border border-neutral-800 focus:border-amber-500 rounded-xl px-4 py-3 text-white outline-none transition cursor-pointer"
                >
                  <option value="Custom Jewelry Request">Custom Jewelry Request</option>
                  <option value="Bridal Collection Pricing">Bridal Collection Pricing</option>
                  <option value="Showroom VIP Appointment">Showroom VIP Appointment</option>
                  <option value="Gold Purity Certification">Gold Purity Certification</option>
                  <option value="General Inquiry">General Inquiry</option>
                </select>
              </div>

              {/* Message TextArea */}
              <div className="space-y-1.5">
                <label className="text-neutral-300 font-medium">
                  Message Details *
                </label>
                <textarea
                  name="message"
                  required
                  rows="4"
                  placeholder="Describe your design preference, gold weight requirements, or question..."
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-[#0b0b0c] border border-neutral-800 focus:border-amber-500 rounded-xl p-4 text-white placeholder-neutral-600 outline-none transition resize-none"
                ></textarea>
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                disabled={loading}
                className="w-full bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold py-3.5 px-6 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition shadow-lg shadow-amber-500/20 cursor-pointer disabled:opacity-50"
              >
                <Send size={16} />
                <span>{loading ? 'Submitting Inquiry...' : 'Submit Inquiry'}</span>
              </motion.button>

            </form>
          )}

        </motion.div>

        {/* Right Column: Embedded Google Map Location */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-[#141416] border border-neutral-800 p-6 sm:p-8 rounded-3xl shadow-2xl space-y-5 h-full flex flex-col justify-between"
        >
          <div className="space-y-2">
            <span className="text-amber-400 font-bold uppercase text-[10px] tracking-widest bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              SHOWROOM LOCATION
            </span>
            <h2 className="text-2xl font-serif font-bold text-white pt-1">
              Visit Our Chavakachcheri Workshop
            </h2>
            <p className="text-neutral-400 text-xs font-light">
              Experience our master artisans at work and explore certified gold & custom jewelry designs in person.
            </p>
          </div>

          {/* Interactive Google Map Embed */}
          <div className="w-full h-80 sm:h-95 rounded-2xl overflow-hidden border border-neutral-800 shadow-inner bg-neutral-950">
            <iframe
              title="Atelier Harx Showroom Location"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(content.showroomAddress)}&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <div className="flex items-center justify-between text-xs text-neutral-400 border-t border-neutral-800/80 pt-4">
            <span className="flex items-center gap-1.5">
              <MapPin size={14} className="text-amber-400 shrink-0" />
              <span>{content.showroomAddress}</span>
            </span>
            <a 
              href={mapUrl}
              target="_blank" 
              rel="noopener noreferrer"
              className="text-amber-400 font-bold hover:underline"
            >
              Get Directions &rarr;
            </a>
          </div>

        </motion.div>

      </div>

    </div>
  );
}