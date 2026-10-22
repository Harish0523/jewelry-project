import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, Sparkles, MessageCircle, HelpCircle } from 'lucide-react';

export default function FAQ() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      category: 'Purity & Certification',
      question: 'Are all gold and silver jewelry hallmarked?',
      answer: 'Yes! Every piece crafted or sold at Atelier Harx comes with official 22K (916) or 24K hallmark certification ensuring 100% purity and authentic metal weight standards.'
    },
    {
      category: 'Custom Design',
      question: 'How long does a custom jewelry design order take?',
      answer: 'Standard custom jewelry (rings, bangles, pendants) takes 5 to 10 working days. Intricate bridal sets and 3D CAD custom designs take approximately 10 to 14 days from design approval.'
    },
    {
      category: 'Pricing & Weight',
      question: 'How are custom jewelry prices calculated?',
      answer: 'Our pricing is completely transparent: Total Price = (Live Gold Rate × Weight in Grams/Sovereign) + Making Charges + Gem/Stone costs. No hidden fees.'
    },
    {
      category: 'Custom Design',
      question: 'Can I bring my own gold to melt and make a new design?',
      answer: 'Yes, we accept old gold for exchange or melting. Our master goldsmiths perform on-site purity testing before processing your new bespoke piece.'
    },
    {
      category: 'Orders & Delivery',
      question: 'How can I place an order online or enquire?',
      answer: 'You can explore our Collections or Custom Design page and click the "Enquire via WhatsApp" button. Our team will assist you with quotes, weight estimations, and order placement.'
    },
    {
      category: 'Showroom Visit',
      question: 'Where is the Atelier Harx workshop & showroom located?',
      answer: 'Our main showroom and manufacturing workshop are located at Kandy Road, Chavakachcheri, Jaffna, Sri Lanka.'
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-white py-16 px-4">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Animated Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" /> Customer Support
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold tracking-wide">
            Frequently Asked <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-200 via-amber-400 to-amber-500">Questions</span>
          </h1>
          <p className="text-gray-300 text-sm sm:text-base font-light max-w-xl mx-auto">
            Find quick answers regarding our hallmark purity, custom CAD design process, pricing, and workshop services.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative max-w-xl mx-auto"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-400" />
          <input
            type="text"
            placeholder="Search questions (e.g. purity, custom order, location)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-neutral-900 border border-neutral-800 focus:border-amber-500/60 rounded-2xl pl-12 pr-4 py-3.5 text-sm text-white placeholder-gray-500 outline-none transition shadow-xl"
          />
        </motion.div>

        {/* Accordion List */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-4"
        >
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="bg-neutral-900/90 border border-neutral-800 hover:border-amber-500/40 rounded-2xl overflow-hidden transition-all duration-300 shadow-xl"
                >
                  <button
                    onClick={() => toggleFAQ(idx)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 cursor-pointer"
                  >
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-semibold text-amber-400 tracking-wider bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                        {faq.category}
                      </span>
                      <h3 className="text-base sm:text-lg font-serif font-semibold text-white pt-1">
                        {faq.question}
                      </h3>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-amber-400 shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-amber-300' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="px-6 pb-5 pt-1 text-sm text-gray-300 leading-relaxed border-t border-neutral-800/80 font-light"
                      >
                        {faq.answer}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })
          ) : (
            <div className="text-center py-12 text-gray-400 text-sm">
              No matching questions found. Feel free to contact our WhatsApp desk directly!
            </div>
          )}
        </motion.div>

        {/* WhatsApp Help Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-linear-to-r from-neutral-900 via-neutral-900/90 to-neutral-950 border border-amber-500/30 rounded-3xl p-8 text-center space-y-4 shadow-2xl"
        >
          <Sparkles className="w-8 h-8 text-amber-400 mx-auto" />
          <h3 className="text-2xl font-serif font-bold text-white">Have More Questions?</h3>
          <p className="text-xs sm:text-sm text-gray-300 max-w-md mx-auto font-light">
            Our master jeweler team is ready to guide you on WhatsApp for instant price quotes and custom design sketches.
          </p>
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href="https://wa.me/94762084145?text=Hi%20Atelier%20Harx,%20I%20have%20a%20question%20regarding%20jewelry."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold px-6 py-3 rounded-xl text-xs transition shadow-lg shadow-amber-500/20"
          >
            <MessageCircle className="w-4 h-4" /> Ask on WhatsApp
          </motion.a>
        </motion.div>

      </div>
    </div>
  );
}