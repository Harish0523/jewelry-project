import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, MessageCircle, Tag } from 'lucide-react';

export default function Offers() {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchActiveOffers = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://atelierharx.gt.tc/jewelry_api/offers/get_offers.php');
      const data = await res.json();
      if (data.success) {
        // Active ஆக உள்ள ஆஃபர்களை மட்டும் பப்ளிக் பக்கத்திற்காக வடிகட்டுகிறோம்
        const activeDeals = data.offers.filter(offer => offer.status === 'Active');
        setDeals(activeDeals);
      }
    } catch (err) {
      console.error('Error fetching public offers:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // oxlint-disable-next-line react/set-state-in-effect -- intentional initial load of active offers from the backend API
    fetchActiveOffers();
  }, []);

  // Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-white py-16 px-4 pt-24">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Animated Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 max-w-2xl mx-auto"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider shadow-lg shadow-amber-500/5">
            <Sparkles className="w-3.5 h-3.5" /> Special Promotions
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white">
            Offers & <span className="text-amber-400">Deals</span>
          </h1>
          <p className="text-gray-300 text-sm font-light">Exclusive seasonal promotional offers on jewelry making charges.</p>
        </motion.div>

        {/* Deals Grid with Staggered Animation */}
        {loading ? (
          <div className="py-16 text-center text-xs text-neutral-500">Loading active promotions from database...</div>
        ) : deals.length > 0 ? (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {deals.map((deal, idx) => (
              <motion.div 
                key={deal.id || idx}
                variants={itemVariants}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="bg-neutral-900/90 border border-amber-500/30 p-8 rounded-2xl space-y-4 shadow-2xl relative overflow-hidden flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="bg-amber-500 text-neutral-950 font-bold text-xs uppercase px-3 py-1 rounded-full shadow-md">
                      {deal.code ? `CODE: ${deal.code}` : 'SPECIAL OFFER'}
                    </span>
                    <Tag className="w-6 h-6 text-amber-400" />
                  </div>

                  <h3 className="text-2xl font-serif font-bold text-white">{deal.title}</h3>
                  <p className="text-xl font-bold text-amber-400">{deal.discount}</p>
                  <p className="text-sm text-gray-300 leading-relaxed font-light">
                    {deal.validTill ? `Valid till: ${deal.validTill}` : 'Limited time promotional offer.'}
                  </p>
                </div>

                <div className="pt-4">
                  <motion.a 
                    whileTap={{ scale: 0.97 }}
                    href={`https://wa.me/94762084145?text=Hi,%20I%20want%20to%20claim%20the%20${encodeURIComponent(deal.title)}%20(Code:%20${encodeURIComponent(deal.code || 'N/A')})`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold px-6 py-3 rounded-xl text-xs transition shadow-lg shadow-amber-500/20 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" /> Claim Offer via WhatsApp
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="py-16 text-center text-xs text-neutral-500 bg-neutral-900/50 rounded-3xl border border-neutral-800 max-w-3xl mx-auto">
            No active promotional offers at the moment. Check back soon!
          </div>
        )}

      </div>
    </div>
  );
}