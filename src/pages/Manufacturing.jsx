import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Hammer, 
  Sparkles, 
  Layers, 
  ShieldCheck, 
  PackageCheck, 
  MessageCircle, 
  ArrowRight, 
  DraftingCompass, 
  Award, 
  CheckCircle2 
} from 'lucide-react';

export default function Manufacturing() {
  const steps = [
    {
      num: '01',
      title: 'Consultation & Concept Design',
      desc: 'We discuss your custom design ideas, required gold weight, budget, and stone preferences via WhatsApp or in-person showroom visit.',
      icon: <DraftingCompass className="w-6 h-6 text-amber-400" />
    },
    {
      num: '02',
      title: '3D CAD Modeling & Rendering',
      desc: 'Our CAD specialists generate precision 3D digital models, allowing you to preview the exact jewelry piece before manufacturing begins.',
      icon: <Layers className="w-6 h-6 text-amber-400" />
    },
    {
      num: '03',
      title: 'Master Casting & Artisan Crafting',
      desc: 'Using 100% certified 22K/18K Gold or 925 Silver, master goldsmiths in Chavakachcheri handcraft the intricate details and setting.',
      icon: <Hammer className="w-6 h-6 text-amber-400" />
    },
    {
      num: '04',
      title: 'Hallmark Quality & VIP Delivery',
      desc: 'Every completed masterpiece undergoes strict purity testing, hallmark certification, and secure insured delivery or store pickup.',
      icon: <ShieldCheck className="w-6 h-6 text-amber-400" />
    }
  ];

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
    <div className="bg-[#0b0b0c] text-white font-sans min-h-screen py-14 px-4 sm:px-6 lg:px-8 space-y-20">
      
      {/* 1. PAGE HERO */}
      <motion.section 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-4xl mx-auto space-y-4"
      >
        <span className="text-amber-400 font-bold uppercase text-[10px] sm:text-xs tracking-widest bg-amber-500/10 px-4 py-1.5 rounded-full border border-amber-500/20 inline-block">
          CRAFT & PRECISION
        </span>
        <h1 className="text-4xl sm:text-6xl font-serif font-bold text-white tracking-tight">
          Jewelry <span className="text-amber-400">Manufacturing Services</span>
        </h1>
        <p className="text-neutral-400 text-sm sm:text-base font-light max-w-2xl mx-auto leading-relaxed">
          Combining centuries-old traditional Jaffna goldsmith techniques with modern 3D CAD manufacturing to create certified luxury masterpieces.
        </p>
      </motion.section>

      {/* 2. MANUFACTURING SERVICES GRID WITH STAGGER */}
      <motion.section 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {/* Service 1: Custom Jewelry Design */}
        <motion.div 
          variants={itemVariants}
          whileHover={{ y: -6, transition: { duration: 0.2 } }}
          className="bg-[#141416] border border-neutral-800 p-8 rounded-3xl space-y-4 hover:border-amber-500/40 transition duration-300 shadow-xl group"
        >
          <div className="w-12 h-12 bg-neutral-900 border border-amber-500/30 rounded-2xl flex items-center justify-center text-amber-400 group-hover:scale-110 transition">
            <Sparkles size={24} />
          </div>
          <h3 className="text-xl font-serif font-bold text-white">Custom Jewelry Design</h3>
          <p className="text-neutral-400 text-xs sm:text-sm font-light leading-relaxed">
            Turn your dream ring, necklace, or bridal set into reality. Bring us a sketch, photo, or idea and we will custom forge it to exact weight & specifications.
          </p>
          <ul className="space-y-2 text-xs text-neutral-300 pt-2">
            <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-amber-400" /> Custom Bridal Sets & Engagement Rings</li>
            <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-amber-400" /> Name Pendants & Family Crest Rings</li>
          </ul>
        </motion.div>

        {/* Service 2: Bulk & Wholesale Orders */}
        <motion.div 
          variants={itemVariants}
          whileHover={{ y: -6, transition: { duration: 0.2 } }}
          className="bg-[#141416] border border-neutral-800 p-8 rounded-3xl space-y-4 hover:border-amber-500/40 transition duration-300 shadow-xl group"
        >
          <div className="w-12 h-12 bg-neutral-900 border border-amber-500/30 rounded-2xl flex items-center justify-center text-amber-400 group-hover:scale-110 transition">
            <PackageCheck size={24} />
          </div>
          <h3 className="text-xl font-serif font-bold text-white">Bulk & Wholesale Orders</h3>
          <p className="text-neutral-400 text-xs sm:text-sm font-light leading-relaxed">
            We provide precision manufacturing for boutique retailers, wedding parties, and corporate gifting with certified purity guarantees and competitive pricing.
          </p>
          <ul className="space-y-2 text-xs text-neutral-300 pt-2">
            <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-amber-400" /> B2B Gold & Silver Batch Production</li>
            <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-amber-400" /> Consistent Hallmark Standard Certification</li>
          </ul>
        </motion.div>

        {/* Service 3: Quality & Craftsmanship */}
        <motion.div 
          variants={itemVariants}
          whileHover={{ y: -6, transition: { duration: 0.2 } }}
          className="bg-[#141416] border border-neutral-800 p-8 rounded-3xl space-y-4 hover:border-amber-500/40 transition duration-300 shadow-xl group"
        >
          <div className="w-12 h-12 bg-neutral-900 border border-amber-500/30 rounded-2xl flex items-center justify-center text-amber-400 group-hover:scale-110 transition">
            <Award size={24} />
          </div>
          <h3 className="text-xl font-serif font-bold text-white">Quality & Craftsmanship</h3>
          <p className="text-neutral-400 text-xs sm:text-sm font-light leading-relaxed">
            Every piece crafted in our Chavakachcheri workshop uses 100% authentic 22K (916) Hallmark Gold, VVS natural diamonds, or pure 925 Sterling Silver.
          </p>
          <ul className="space-y-2 text-xs text-neutral-300 pt-2">
            <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-amber-400" /> 100% Purity Certified Gold</li>
            <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-amber-400" /> Master Artisans with 20+ Years Experience</li>
          </ul>
        </motion.div>
      </motion.section>

      {/* 3. STEP-BY-STEP MANUFACTURING PROCESS */}
      <section className="max-w-7xl mx-auto space-y-10">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-2"
        >
          <span className="text-amber-400 font-bold text-xs uppercase tracking-widest">HOW WE WORK</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">The Manufacturing Process</h2>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {steps.map((step, idx) => (
            <motion.div 
              key={idx} 
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-[#141416] border border-neutral-800 p-6 rounded-2xl space-y-3 relative hover:border-amber-500/30 transition duration-300"
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl font-serif font-bold text-amber-500/40">{step.num}</span>
                <div className="p-2 bg-neutral-900 rounded-xl border border-neutral-800">
                  {step.icon}
                </div>
              </div>
              <h4 className="font-bold text-base text-white">{step.title}</h4>
              <p className="text-xs text-neutral-400 leading-relaxed font-light">{step.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 4. CUSTOM ORDER CTA SECTION */}
      <motion.section 
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="max-w-7xl mx-auto"
      >
        <div className="bg-linear-to-r from-amber-950/60 via-neutral-900 to-amber-950/60 border border-amber-500/30 p-8 sm:p-12 rounded-3xl flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-3 text-center lg:text-left">
            <span className="text-amber-400 font-bold uppercase text-xs tracking-widest">START YOUR BESPOKE ORDER</span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white">Ready to Craft Your Custom Piece?</h2>
            <p className="text-neutral-300 text-xs sm:text-sm font-light max-w-xl">
              Talk directly with our master jewelry consultants to get custom design estimates, weight suggestions, and manufacturing timelines.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 shrink-0">
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href="https://wa.me/94762084145?text=Hi%20Atelier%20Harx,%20I%20am%20interested%20in%20a%20custom%20jewelry%20manufacturing%20request."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold px-7 py-3.5 rounded-xl text-xs sm:text-sm flex items-center gap-2 transition shadow-lg shadow-amber-500/20"
            >
              <MessageCircle size={18} />
              <span>Inquire via WhatsApp</span>
            </motion.a>

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/contact"
                className="bg-neutral-900 hover:bg-neutral-800 text-amber-300 border border-amber-500/40 font-bold px-7 py-3.5 rounded-xl text-xs sm:text-sm flex items-center gap-2 transition"
              >
                <span>Visit Showroom</span>
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>

    </div>
  );
}