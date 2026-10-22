import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Gem, Award, Sparkles, CheckCircle2, MapPin, Phone } from 'lucide-react';
import useSiteContent from '../context/useSiteContent';

export default function About() {
  const { content } = useSiteContent();
  // Staggered Container Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white py-16 px-4">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* ==================== PAGE HEADER WITH ANIMATION ==================== */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-5 max-w-3xl mx-auto"
        >
          {/* Gold Border Pill Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-neutral-900 border border-amber-500/60 shadow-lg">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">
              Our Legacy & Heritage
            </span>
          </div>

          {/* High-Contrast Title: White + Solid Gold */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-white">
            About <span className="text-amber-400">Atelier Harx</span>
          </h1>

          {/* Subtitle */}
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed font-light max-w-2xl mx-auto">
            Crafting fine 22K Gold and VVS Diamond jewelry in Chavakachcheri, Jaffna with unmatched perfection, modern elegance, and traditional purity.
          </p>
        </motion.div>

        {/* Feature Cards with Staggered Animation */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            {
              icon: ShieldCheck,
              title: "100% Certified Purity",
              desc: "Every gold, diamond, and silver piece comes with official hallmark authentication guaranteeing exact karat weight."
            },
            {
              icon: Gem,
              title: "Master Goldsmiths",
              desc: "Handcrafted by experienced artisans specializing in bespoke bridal sets and modern haute-joaillerie motifs."
            },
            {
              icon: Award,
              title: "Bespoke Workshop",
              desc: "From initial 3D CAD modeling to final stone polish, all steps are executed under one roof at Atelier Harx."
            }
          ].map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div 
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="bg-neutral-900/90 border border-amber-500/20 hover:border-amber-500/50 p-8 rounded-2xl space-y-4 shadow-2xl backdrop-blur-sm transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-serif font-bold text-amber-400">{feature.title}</h3>
                <p className="text-sm text-gray-300 leading-relaxed font-light">
                  {feature.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Story Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-neutral-900/90 border border-amber-500/30 rounded-3xl p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center shadow-2xl"
        >
          <div className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-white">
              Our Promise to <span className="text-amber-400">Every Customer</span>
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed font-light">
              At Atelier Harx, we believe fine jewelry is an heirloom passed down generations. Our Chavakachcheri workshop ensures full transparency, zero hidden charges, and lifelong maintenance.
            </p>
            <ul className="space-y-3 text-sm text-gray-200">
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
                <span>Ethically sourced gold, certified VVS diamonds & gems</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
                <span>Transparent weight calculations & exact hallmark stamping</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
                <span>Lifetime cleaning, inspection and polishing guarantee</span>
              </li>
            </ul>
          </div>

          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-neutral-950/80 p-8 rounded-2xl border border-neutral-800 text-center space-y-4"
          >
            <Sparkles className="w-10 h-10 text-amber-400 mx-auto" />
            <h3 className="text-xl font-serif font-bold text-amber-400">Visit Our Showroom</h3>
            <div className="space-y-2 text-xs text-gray-300">
              <p className="flex items-center justify-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{content.showroomAddress}</span>
              </p>
              <p className="flex items-center justify-center gap-2 font-semibold text-amber-400 text-sm pt-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{content.mainPhone}</span>
              </p>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
}