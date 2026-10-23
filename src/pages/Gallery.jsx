import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Filter, ChevronDown, MessageCircle, Eye, X, ShieldCheck, Award, Gem, Tag } from 'lucide-react';

export default function Gallery() {
  const [selectedType, setSelectedType] = useState('all');
  const [activeModalItem, setActiveModalItem] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const activeModalImages = activeModalItem?.allImages?.length
    ? activeModalItem.allImages
    : activeModalItem ? [{ image: activeModalItem.image }] : [];
  const activeModalImage = activeModalImages[activeImageIndex] || activeModalImages[0];

  const openGalleryItem = (item) => {
    setActiveImageIndex(0);
    setActiveModalItem(item);
  };

  const fetchGalleryData = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://atelierharx.gt.tc/jewelry_api/gallery/get_gallery.php');
      const data = await res.json();

      if (data.success) {
        // Database தரவை Public UI அமைப்பிற்கு ஏற்ப மாற்றி அமைக்கிறோம்
        const formattedItems = data.gallery.map((item) => {
          const images = item.images?.length
            ? item.images.map((image) => typeof image === 'string' ? { image } : image)
            : item.image ? [{ image: item.image }] : [];
          const firstImg = images[0]?.image || item.image;
          
          // Category-ஐ Filter Type-க்கு ஏற்ப மாற்றுதல்
          let typeKey = 'all';
          const cat = (item.category || '').toLowerCase();
          if (cat.includes('ring')) typeKey = 'rings';
          else if (cat.includes('chain')) typeKey = 'chains';
          else if (cat.includes('necklace') || cat.includes('bridal')) typeKey = 'necklaces';
          else if (cat.includes('bangle')) typeKey = 'bangles';
          else if (cat.includes('earring')) typeKey = 'earrings';
          else typeKey = cat;

          return {
            id: item.id,
            title: item.title,
            code: `ATELIER-GAL-${item.id}`,
            type: typeKey,
            purity: `${item.category || 'Hallmark Gold'} Collection`,
            weightGrams: 'Custom Spec',
            weightPavan: 'Atelier Spec',
            price: 'Inquire for Price',
            description: `Hand-crafted ${item.category || 'jewelry'} design from Atelier Harx workshop showcase.`,
            image: firstImg,
            allImages: images
          };
        });

        setGalleryItems(formattedItems);
      }
    } catch (err) {
      console.error('Error loading gallery database items:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // oxlint-disable-next-line react/set-state-in-effect -- intentional initial load of gallery items from the backend API
    fetchGalleryData();
  }, []);

  const itemTypes = [
    { id: 'all', label: 'All Items' },
    { id: 'rings', label: 'Rings (மோதிரம்)' },
    { id: 'chains', label: 'Chains (சங்கிலி)' },
    { id: 'necklaces', label: 'Necklaces (அட்டிகை)' },
    { id: 'bangles', label: 'Bangles (வளையல்)' },
    { id: 'earrings', label: 'Earrings (தோடு)' },
  ];

  // Filter Items by Type
  const filteredItems = galleryItems.filter((item) => {
    return selectedType === 'all' || item.type === selectedType || item.purity.toLowerCase().includes(selectedType);
  });

  // Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white py-12 px-4 sm:px-6 lg:px-8 space-y-10 pt-24 font-sans">
      
      {/* Animated Page Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-4 max-w-3xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-neutral-900 border border-amber-500/60 shadow-lg">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">
            Real Creations & Showcase
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white">
          Masterpiece <span className="text-amber-400">Gallery</span>
        </h1>
        <p className="text-gray-300 text-sm sm:text-base font-light">
          Photos of actual custom orders hand-crafted at our Atelier Harx workshop in Jaffna.
        </p>
      </motion.div>

      {/* Item Type Filter Bar */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-neutral-900/90 border border-amber-500/30 rounded-2xl p-6 max-w-5xl mx-auto shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        <div className="flex items-center gap-2 text-amber-400">
          <Filter className="w-5 h-5" />
          <span className="text-sm font-bold text-white">Filter By Category:</span>
        </div>

        {/* Desktop Filter Buttons */}
        <div className="hidden md:flex flex-wrap items-center gap-2">
          {itemTypes.map((type) => (
            <motion.button
              key={type.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedType(type.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition duration-200 cursor-pointer ${
                selectedType === type.id
                  ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20 font-bold'
                  : 'bg-neutral-950 text-gray-300 hover:text-amber-400 border border-neutral-800'
              }`}
            >
              {type.label.split(' ')[0]}
            </motion.button>
          ))}
        </div>

        {/* Mobile Dropdown */}
        <div className="relative w-full md:hidden">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full bg-neutral-950 border border-amber-500/40 text-amber-300 text-xs py-3 px-4 rounded-xl outline-none appearance-none"
          >
            {itemTypes.map((type) => (
              <option key={type.id} value={type.id} className="bg-neutral-900 text-white">
                {type.label}
              </option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 text-amber-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </motion.div>

      {/* Gallery Cards Grid */}
      {loading ? (
        <div className="py-20 text-center text-xs text-neutral-500">Loading gallery showcase from database...</div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div 
            key={selectedType}
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className="bg-neutral-900/90 border border-neutral-800 hover:border-amber-500/50 rounded-2xl overflow-hidden shadow-xl transition duration-300 group flex flex-col justify-between"
                >
                  {/* Image & Hover Action */}
                  <div 
                    className="relative h-64 overflow-hidden bg-neutral-950 cursor-pointer"
                    onClick={() => openGalleryItem(item)}
                  >
                    <motion.img
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.4 }}
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-3 left-3 bg-neutral-950/80 backdrop-blur-md text-amber-400 border border-amber-500/40 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {item.purity}
                    </span>
                    {item.allImages.length > 1 && (
                      <span className="absolute bottom-3 right-3 rounded-full border border-neutral-700 bg-neutral-950/80 px-3 py-1 text-[10px] font-semibold text-white">
                        {item.allImages.length} photos
                      </span>
                    )}

                    <div className="absolute inset-0 bg-neutral-950/60 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                      <button className="bg-amber-500 text-neutral-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-2 shadow-lg cursor-pointer">
                        <Eye className="w-4 h-4" />
                        <span>View Spec</span>
                      </button>
                    </div>
                  </div>

                  {/* Info Display */}
                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div 
                      className="space-y-1.5 cursor-pointer"
                      onClick={() => openGalleryItem(item)}
                    >
                      <span className="text-[10px] text-amber-400 uppercase tracking-widest font-semibold block">
                        REF: {item.code}
                      </span>
                      <h3 className="text-lg font-serif font-bold text-white group-hover:text-amber-400 transition truncate">
                        {item.title}
                      </h3>
                      <div className="pt-1 flex items-center justify-between">
                        <span className="text-xs text-gray-400 font-light">Custom Order:</span>
                        <span className="text-xs font-bold text-amber-400 tracking-wide">
                          Atelier Craft
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => openGalleryItem(item)}
                        className="flex-1 bg-neutral-950 hover:bg-neutral-800 text-gray-300 border border-neutral-800 font-semibold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-amber-400" />
                        <span>View Spec</span>
                      </motion.button>

                      <motion.a
                        whileTap={{ scale: 0.95 }}
                        href={`https://wa.me/94762084145?text=Hi%20Atelier%20Harx,%20I%20am%20interested%20in%20inquiring%20about%20gallery%20item:%20${encodeURIComponent(item.title)}%20(Code:%20${item.code})`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold p-2.5 rounded-xl text-xs flex items-center justify-center transition cursor-pointer"
                        title="Enquire on WhatsApp"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-16 space-y-3"
              >
                <Gem className="w-12 h-12 text-amber-500/40 mx-auto" />
                <p className="text-gray-400 text-sm">
                  No gallery items found for the selected category.
                </p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      )}

      {/* ==================== GALLERY ITEM SPEC MODAL ==================== */}
      <AnimatePresence>
        {activeModalItem && (
          <div className="fixed inset-0 z-50 bg-neutral-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.25 }}
              className="bg-neutral-900 border border-amber-500/40 rounded-3xl max-h-[90vh] max-w-3xl w-full overflow-y-auto shadow-2xl relative my-8 text-white"
            >
              
              {/* Close Button */}
              <button
                onClick={() => setActiveModalItem(null)}
                className="absolute top-4 right-4 z-10 bg-neutral-950/80 text-gray-400 hover:text-amber-400 p-2 rounded-full border border-neutral-800 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                
                {/* Modal Image */}
                <div className="flex flex-col bg-neutral-950">
                  <div className="relative flex h-72 items-center justify-center md:h-120">
                    {activeModalImage && (
                      <img
                        src={typeof activeModalImage === 'string' ? activeModalImage : activeModalImage.image}
                        alt={`${activeModalItem.title} ${activeImageIndex + 1}`}
                        className="h-full w-full object-contain"
                      />
                    )}
                    <span className="absolute top-4 left-4 bg-amber-500 text-neutral-950 font-bold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider">
                      {activeModalItem.purity}
                    </span>
                    {activeModalImages.length > 1 && (
                      <span className="absolute bottom-3 right-3 rounded-full border border-neutral-700 bg-neutral-950/80 px-3 py-1 text-[10px] text-white">
                        {activeImageIndex + 1} / {activeModalImages.length}
                      </span>
                    )}
                  </div>
                  {activeModalImages.length > 1 && (
                    <div className="grid grid-cols-5 gap-2 border-t border-neutral-800 p-3">
                      {activeModalImages.map((image, index) => (
                        <button
                          key={image.id || `${activeModalItem.id}-${index}`}
                          type="button"
                          onClick={() => setActiveImageIndex(index)}
                          aria-label={`View image ${index + 1} of ${activeModalImages.length}`}
                          aria-pressed={activeImageIndex === index}
                          className={`aspect-square overflow-hidden rounded-lg border-2 transition ${activeImageIndex === index ? 'border-amber-400' : 'border-neutral-800 hover:border-neutral-500'}`}
                        >
                          <img
                            src={typeof image === 'string' ? image : image.image}
                            alt={`${activeModalItem.title} thumbnail ${index + 1}`}
                            className="h-full w-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Modal Details Content */}
                <div className="p-6 sm:p-8 space-y-6 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div>
                      <span className="text-[10px] text-amber-400/80 uppercase font-semibold tracking-widest">
                        Ref Code: {activeModalItem.code}
                      </span>
                      <h2 className="text-2xl font-serif font-bold text-white pt-1">
                        {activeModalItem.title}
                      </h2>
                    </div>

                    {/* Specifications Box */}
                    <div className="bg-neutral-950/80 rounded-2xl p-4 border border-neutral-800 space-y-2.5 text-xs">
                      <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                        <span className="text-gray-400 flex items-center gap-1.5">
                          <Tag className="w-3.5 h-3.5 text-amber-400" /> Category:
                        </span>
                        <span className="font-bold text-amber-400 text-xs">
                          {activeModalItem.purity}
                        </span>
                      </div>

                      <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                        <span className="text-gray-400 flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> Hallmark Authentication:
                        </span>
                        <span className="font-semibold text-gray-200">
                          Certified Standard
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 flex items-center gap-1.5">
                          <Award className="w-3.5 h-3.5 text-amber-400" /> Custom Crafted:
                        </span>
                        <span className="font-semibold text-gray-200">
                          Atelier Harx Workshop, Jaffna
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-gray-300 font-light leading-relaxed">
                      {activeModalItem.description}
                    </p>
                  </div>

                  {/* WhatsApp Action Button */}
                  <div className="pt-4 border-t border-neutral-800 space-y-3">
                    <motion.a
                      whileTap={{ scale: 0.97 }}
                      href={`https://wa.me/94762084145?text=Hi%20Atelier%20Harx,%20I%20would%20like%20to%20order%20or%20inquire%20about%20gallery%20design:%20${encodeURIComponent(activeModalItem.title)}%20(Code:%20${activeModalItem.code})`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold py-3.5 rounded-xl text-xs flex items-center justify-center gap-2 transition shadow-lg shadow-amber-500/20 cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Order Similar Custom Design on WhatsApp</span>
                    </motion.a>

                    <button
                      onClick={() => setActiveModalItem(null)}
                      className="w-full bg-neutral-950 text-gray-400 hover:text-white py-2 rounded-xl text-xs font-medium transition cursor-pointer"
                    >
                      Close
                    </button>
                  </div>

                </div>

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}