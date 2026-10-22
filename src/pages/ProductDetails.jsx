import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, Scale, Award, MessageCircle, Phone, ArrowLeft, Clock, Sparkles } from 'lucide-react';

export default function ProductDetails() {
  const { id } = useParams();

  const product = {
    id: id || 1,
    title: "Royal Bridal Necklace Set",
    image: "/bridal2.jpg",
    category_name: "Bridal Jewelry",
    purity: "22K Gold (916 Hallmarked)",
    weight: "45.5 Grams (5.68 Sovereign)",
    stone_type: "Precious Ruby & Uncut Diamonds",
    making_time: "7 - 10 Days",
    description: "An extraordinary royal bridal necklace handcrafted with 22K hallmarked gold. Detailed with traditional Sri Lankan motifs and hand-set ruby gemstones."
  };

  const whatsappMsg = encodeURIComponent(`Hello Atelier Harx! I am interested in inquiring about: ${product.title} (ID: ${product.id}). Please share complete details.`);

  return (
    <div className="min-h-screen bg-neutral-950 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Back Button Animation */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link 
            to="/products" 
            className="inline-flex items-center gap-2 text-amber-400 text-xs font-semibold hover:text-amber-300 transition"
          >
            <ArrowLeft size={16} /> 
            <span>Back to Collections</span>
          </Link>
        </motion.div>

        {/* Main Product Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 bg-neutral-900/80 p-6 md:p-10 rounded-3xl border border-neutral-800 shadow-2xl relative overflow-hidden"
        >
          
          {/* Left: Animated Product Image */}
          <div className="relative h-80 sm:h-96 md:h-full min-h-87.5 rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800 group">
            <motion.img 
              whileHover={{ scale: 1.06 }}
              transition={{ duration: 0.4 }}
              src={product.image} 
              alt={product.title} 
              className="w-full h-full object-cover" 
            />
            <span className="absolute top-4 left-4 bg-amber-500 text-neutral-950 font-bold text-[10px] px-3.5 py-1 rounded-full uppercase tracking-wider shadow-lg">
              {product.category_name}
            </span>
          </div>

          {/* Right: Product Details */}
          <div className="space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <div className="inline-flex items-center gap-1.5 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-1">
                  <Sparkles size={14} />
                  <span>Atelier Signature Creation</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white">{product.title}</h1>
                <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mt-2 font-light">
                  {product.description}
                </p>
              </div>

              {/* Specifications Box */}
              <div className="bg-neutral-950/80 p-5 rounded-2xl border border-neutral-800 space-y-3 text-xs">
                <div className="flex justify-between py-1.5 border-b border-neutral-800">
                  <span className="text-neutral-400 flex items-center gap-2">
                    <ShieldCheck size={16} className="text-amber-400"/> Purity Certification:
                  </span>
                  <span className="font-semibold text-amber-300">{product.purity}</span>
                </div>

                <div className="flex justify-between py-1.5 border-b border-neutral-800">
                  <span className="text-neutral-400 flex items-center gap-2">
                    <Scale size={16} className="text-amber-400"/> Approximate Weight:
                  </span>
                  <span className="font-semibold text-white">{product.weight}</span>
                </div>

                <div className="flex justify-between py-1.5 border-b border-neutral-800">
                  <span className="text-neutral-400 flex items-center gap-2">
                    <Award size={16} className="text-amber-400"/> Gemstones:
                  </span>
                  <span className="font-semibold text-white">{product.stone_type}</span>
                </div>

                <div className="flex justify-between py-1.5">
                  <span className="text-neutral-400 flex items-center gap-2">
                    <Clock size={16} className="text-amber-400"/> Custom Making Time:
                  </span>
                  <span className="font-semibold text-amber-400">{product.making_time}</span>
                </div>
              </div>
            </div>

            {/* Quick Contact Buttons */}
            <div className="space-y-3 pt-2">
              <motion.a 
                whileTap={{ scale: 0.97 }}
                href={`https://wa.me/94762084145?text=${whatsappMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-neutral-950 font-bold py-3.5 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition shadow-lg shadow-emerald-500/10"
              >
                <MessageCircle size={18} /> Direct WhatsApp Inquiry
              </motion.a>

              <motion.a 
                whileTap={{ scale: 0.97 }}
                href="tel:+94762084145"
                className="w-full bg-neutral-950 hover:bg-neutral-800 text-neutral-300 border border-neutral-800 font-bold py-3.5 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition"
              >
                <Phone size={18} /> Call Store Consultant
              </motion.a>
            </div>

          </div>

        </motion.div>
      </div>
    </div>
  );
}