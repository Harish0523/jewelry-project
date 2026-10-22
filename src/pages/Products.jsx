import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Filter, ChevronDown, MessageCircle, Gem, Eye, X, ShieldCheck, Scale, Award, Tag } from 'lucide-react';

const getProductImageUrls = (item) => {
  let images = item.images;
  if (typeof images === 'string') {
    try {
      images = JSON.parse(images);
    } catch {
      images = [];
    }
  }

  const imageUrls = (Array.isArray(images) ? images : [])
    .map((image) => typeof image === 'string' ? image : image?.image)
    .filter(Boolean)
    .map((image) => image.startsWith('/') ? image.slice(1) : image);

  if (!imageUrls.length && item.image) {
    imageUrls.push(item.image.startsWith('/') ? item.image.slice(1) : item.image);
  }
  return imageUrls;
};

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const categoryParam = searchParams.get('category') || 'all';
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [selectedType, setSelectedType] = useState('all');
  const [activeModalProduct, setActiveModalProduct] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const activeModalImages = activeModalProduct?.images?.length
    ? activeModalProduct.images
    : activeModalProduct?.image ? [activeModalProduct.image] : [];
  const openProductModal = (product) => {
    setActiveImageIndex(0);
    setActiveModalProduct(product);
  };

  // Database Products States
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch products from XAMPP PHP Backend API
  const fetchStoreProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://atelierharx.gt.tc/jewelry_api/products/get_products.php');
      const data = await response.json();
      
      if (data.success) {
        // Map database fields to match UI structure seamlessly
        const formattedProducts = data.data.map((item) => {
          const images = getProductImageUrls(item);
          return {
            id: item.id,
            title: item.title,
            code: item.code,
            category: (item.category_short || 'gold').toLowerCase(),
            type: item.type || 'rings',
            purity: item.purity || '22K (916) Hallmark Gold',
            weightGrams: item.weight || '10.00 g',
            weightPavan: '1.25 Sovereign',
            price: item.price,
            discount_price: item.discount_price || '',
            description: item.description || 'Handcrafted luxury jewelry piece designed to perfection.',
            image: images[0] || 'Gold Ring.jpg',
            images,
          };
        });
        setProducts(formattedProducts);
      } else {
        setError('Failed to load products from database.');
      }
    } catch (err) {
      setError('Cannot connect to XAMPP backend server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStoreProducts();
  }, []);

  useEffect(() => {
    if (searchParams.get('category')) {
      setSelectedCategory(searchParams.get('category'));
    }
  }, [searchParams]);

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setSelectedType('all');
    setSearchParams(cat === 'all' ? {} : { category: cat });
  };

  const filteredProducts = products.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory.toLowerCase();
    const matchesType = selectedType === 'all' || item.type === selectedType;
    return matchesCategory && matchesType;
  });

  const categories = [
    { id: 'all', label: 'All Collections' },
    { id: 'gold', label: 'Gold Jewelry' },
    { id: 'silver', label: 'Silver Jewelry' },
    { id: 'diamond', label: 'Diamond Jewelry' },
    { id: 'bridal', label: 'Bridal Jewelry' },
  ];

  const itemTypes = [
    { id: 'all', label: 'All Item Types' },
    { id: 'rings', label: 'Rings (மோதிரம்)' },
    { id: 'chains', label: 'Chains (சங்கிலி)' },
    { id: 'necklaces', label: 'Necklaces (அட்டிகை)' },
    { id: 'bangles', label: 'Bangles (வளையல்)' },
    { id: 'earrings', label: 'Earrings (தோடு)' },
  ];

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
    <div className="min-h-screen bg-neutral-950 text-white py-12 px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Header Section with Fade & Slide */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-4 max-w-3xl mx-auto pt-12"
      >
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-neutral-900 border border-amber-500/60 shadow-lg">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">
            Exclusive Catalogue
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white">
          Jewelry <span className="text-amber-400">Collections</span>
        </h1>
        <p className="text-gray-300 text-sm sm:text-base font-light">
          Click on any creation below to view complete weight, live estimated pricing & purity specifications.
        </p>
      </motion.div>

      {/* Main Material Categories Filter */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-wrap items-center justify-center gap-3 max-w-5xl mx-auto"
      >
        {categories.map((cat) => (
          <motion.button
            key={cat.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleCategoryChange(cat.id)}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
              selectedCategory === cat.id
                ? 'bg-amber-500 text-neutral-950 shadow-lg shadow-amber-500/20 font-bold'
                : 'bg-neutral-900 text-gray-300 border border-neutral-800 hover:border-amber-500/40 hover:text-amber-400'
            }`}
          >
            {cat.label}
          </motion.button>
        ))}
      </motion.div>

      {/* Sub-Category Item Type Filter */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-neutral-900/90 border border-amber-500/30 rounded-2xl p-6 max-w-5xl mx-auto shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        <div className="flex items-center gap-2 text-amber-400">
          <Filter className="w-5 h-5" />
          <span className="text-sm font-bold text-white">Filter By Item Type:</span>
        </div>

        <div className="hidden md:flex flex-wrap items-center gap-2">
          {itemTypes.map((type) => (
            <motion.button
              key={type.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedType(type.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition ${
                selectedType === type.id
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/60 font-semibold'
                  : 'bg-neutral-950 text-gray-400 hover:text-white border border-neutral-800'
              }`}
            >
              {type.label.split(' ')[0]}
            </motion.button>
          ))}
        </div>

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

      {error && (
        <div className="p-4 bg-red-950/40 border border-red-500/40 text-red-300 rounded-xl text-xs text-center max-w-md mx-auto">
          {error}
        </div>
      )}

      {/* Products Display Grid */}
      {loading ? (
        <div className="text-center py-20 text-neutral-400 text-sm">
          Loading exquisite collection from database...
        </div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div 
            key={selectedCategory + selectedType}
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  variants={itemVariants}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className="bg-neutral-900/90 border border-neutral-800 hover:border-amber-500/50 rounded-2xl overflow-hidden shadow-xl transition duration-300 group flex flex-col justify-between"
                >
                  <div 
                    className="relative h-64 overflow-hidden bg-neutral-950 cursor-pointer"
                    onClick={() => openProductModal(product)}
                  >
                    <motion.img
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.4 }}
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-3 left-3 bg-neutral-950/80 backdrop-blur-md text-amber-400 border border-amber-500/40 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {product.purity.split('/')[0]}
                    </span>
                    {product.images.length > 1 && (
                      <span className="absolute bottom-3 right-3 rounded-full border border-neutral-700 bg-neutral-950/80 px-3 py-1 text-[10px] font-semibold text-white">
                        {product.images.length} photos
                      </span>
                    )}

                    <div className="absolute inset-0 bg-neutral-950/60 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center gap-2">
                      <button className="bg-amber-500 text-neutral-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-2 shadow-lg">
                        <Eye className="w-4 h-4" />
                        <span>View Details</span>
                      </button>
                    </div>
                  </div>

                  {/* Product Info with Price */}
                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div 
                      className="space-y-1.5 cursor-pointer"
                      onClick={() => openProductModal(product)}
                    >
                      <span className="text-[10px] text-amber-400 uppercase tracking-widest font-semibold block">
                        {product.weightGrams}
                      </span>
                      <h3 className="text-lg font-serif font-bold text-white group-hover:text-amber-400 transition">
                        {product.title}
                      </h3>
                      <div className="pt-1 flex items-center justify-between">
                        <span className="text-xs text-gray-400 font-light">{product.discount_price ? 'Discount Price:' : 'Est. Price:'}</span>
                        <span className="text-right font-mono">
                          {product.discount_price && <span className="block text-xs text-neutral-500 line-through">{product.price}</span>}
                          <span className="text-base font-bold text-amber-400 tracking-wide">
                            {product.discount_price || product.price}
                          </span>
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => openProductModal(product)}
                        className="flex-1 bg-neutral-950 hover:bg-neutral-800 text-gray-300 border border-neutral-800 font-semibold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition"
                      >
                        <Eye className="w-3.5 h-3.5 text-amber-400" />
                        <span>View Spec</span>
                      </motion.button>

                      <motion.a
                        whileTap={{ scale: 0.95 }}
                        href={`https://wa.me/94762084145?text=${encodeURIComponent(`Hi Atelier Harx, I am interested in ${product.title}. Price: ${product.discount_price || product.price}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold p-2.5 rounded-xl text-xs flex items-center justify-center transition"
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
                  No items found in the database under the selected category filter.
                </p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      )}

      {/* Animated Modal Window */}
      <AnimatePresence>
        {activeModalProduct && (
          <div className="fixed inset-0 z-50 bg-neutral-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.25 }}
              className="bg-neutral-900 border border-amber-500/40 rounded-3xl max-h-[90vh] max-w-3xl w-full overflow-y-auto shadow-2xl relative my-8 text-white"
            >
              <button
                onClick={() => setActiveModalProduct(null)}
                className="absolute top-4 right-4 z-10 bg-neutral-950/80 text-gray-400 hover:text-amber-400 p-2 rounded-full border border-neutral-800 transition"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="flex flex-col bg-neutral-950">
                  <div className="relative flex h-72 items-center justify-center md:h-120">
                    {activeModalImages[activeImageIndex] && (
                      <img
                        src={activeModalImages[activeImageIndex]}
                        alt={`${activeModalProduct.title} ${activeImageIndex + 1}`}
                        className="h-full w-full object-contain"
                      />
                    )}
                    <span className="absolute top-4 left-4 bg-amber-500 text-neutral-950 font-bold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider">
                      {activeModalProduct.purity}
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
                          key={`${activeModalProduct.id}-${index}`}
                          type="button"
                          onClick={() => setActiveImageIndex(index)}
                          aria-label={`View image ${index + 1} of ${activeModalImages.length}`}
                          aria-pressed={activeImageIndex === index}
                          className={`aspect-square overflow-hidden rounded-lg border-2 transition ${activeImageIndex === index ? 'border-amber-400' : 'border-neutral-800 hover:border-neutral-500'}`}
                        >
                          <img src={image} alt={`${activeModalProduct.title} thumbnail ${index + 1}`} className="h-full w-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="p-6 sm:p-8 space-y-6 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div>
                      <h2 className="text-2xl font-serif font-bold text-white pt-1">
                        {activeModalProduct.title}
                      </h2>
                    </div>

                    {/* Specifications Box */}
                    <div className="bg-neutral-950/80 rounded-2xl p-4 border border-neutral-800 space-y-2.5 text-xs">
                      <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                        <span className="text-gray-400 flex items-center gap-1.5">
                          <Tag className="w-3.5 h-3.5 text-amber-400" /> {activeModalProduct.discount_price ? 'Discount Price:' : 'Estimated Price:'}
                        </span>
                        <span className="text-right font-mono">
                          {activeModalProduct.discount_price && <span className="block text-xs text-neutral-500 line-through">{activeModalProduct.price}</span>}
                          <span className="font-bold text-amber-400 text-sm">
                            {activeModalProduct.discount_price || activeModalProduct.price}
                          </span>
                        </span>
                      </div>

                      <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                        <span className="text-gray-400 flex items-center gap-1.5">
                          <Scale className="w-3.5 h-3.5 text-amber-400" /> Metal Weight:
                        </span>
                        <span className="font-semibold text-amber-300">
                          {activeModalProduct.weightGrams}
                        </span>
                      </div>

                      <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                        <span className="text-gray-400 flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> Hallmark Quality:
                        </span>
                        <span className="font-semibold text-gray-200">
                          100% Certified 22K (916)
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 flex items-center gap-1.5">
                          <Award className="w-3.5 h-3.5 text-amber-400" /> Workshop Craft:
                        </span>
                        <span className="font-semibold text-gray-200">
                          Chavakachcheri, Jaffna
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-gray-300 font-light leading-relaxed">
                      {activeModalProduct.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-neutral-800 space-y-3">
                    <motion.a
                      whileTap={{ scale: 0.97 }}
                      href={`https://wa.me/94762084145?text=${encodeURIComponent(`Hi Atelier Harx, I would like details about ${activeModalProduct.title}. Price: ${activeModalProduct.discount_price || activeModalProduct.price}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold py-3.5 rounded-xl text-xs flex items-center justify-center gap-2 transition shadow-lg shadow-amber-500/20"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Inquire / Request Quote on WhatsApp</span>
                    </motion.a>

                    <button
                      onClick={() => setActiveModalProduct(null)}
                      className="w-full bg-neutral-950 text-gray-400 hover:text-white py-2 rounded-xl text-xs font-medium transition"
                    >
                      Close Window
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