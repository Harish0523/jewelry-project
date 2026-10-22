import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Gem, 
  Sparkles, 
  ShieldCheck, 
  Award, 
  Star, 
  ArrowRight, 
  MessageCircle, 
  HelpCircle, 
  Eye, 
  X, 
  Scale, 
  Tag
} from 'lucide-react';

const normalizeHomeImages = (images, primaryImage) => {
  let parsedImages = images;
  if (typeof parsedImages === 'string') {
    try {
      parsedImages = JSON.parse(parsedImages);
    } catch {
      parsedImages = [];
    }
  }

  const imageUrls = (Array.isArray(parsedImages) ? parsedImages : [])
    .map((image) => typeof image === 'string' ? image : image?.image)
    .filter(Boolean);

  if (!imageUrls.length && primaryImage) imageUrls.push(primaryImage);
  return imageUrls;
};

export default function Home() {
  // Modal State for viewing product specification details
  const [activeModalProduct, setActiveModalProduct] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [testimonials, setTestimonials] = useState([
    { id: 'sample-1', name: 'Sangeetha P.', text: 'The custom bridal necklace turned out even better than the design model. Exceptional service!', rating: 5 },
    { id: 'sample-2', name: 'Rahul M.', text: 'High quality 22K gold bangles. Very transparent pricing and quick WhatsApp communication.', rating: 5 },
    { id: 'sample-3', name: 'Ananya K.', text: 'Beautiful solitaire diamond ring. Highly recommend Atelier Harx for luxury pieces.', rating: 5 },
  ]);
  const activeModalImages = normalizeHomeImages(activeModalProduct?.images, activeModalProduct?.image);
  const openProductModal = (item) => {
    setActiveImageIndex(0);
    setActiveModalProduct(item);
  };

  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);

  // Gallery Items[cite: 2]
  const [galleryProducts, setGalleryProducts] = useState([
    {
      id: 101,
      title: "Royal Gold Bridal Necklace",
      code: "AH-NCK-701",
      category_short: "NECKLACES",
      purity: "22K (916) HALLMARK GOLD",
      weight: "32.00 G",
      weightPavan: "4.00 Sovereign",
      price: "LKR 735,000",
      description: "Extraordinary royal bridal necklace handcrafted with 22K hallmarked gold and intricate traditional motifs.",
      hallmark: "100% Certified 22K (916)",
      workshop: "Chavakachcheri, Jaffna",
      image: "/bridal2.jpg"
    },
    {
      id: 102,
      title: "Solitaire Diamond Engagement Ring",
      code: "AH-DIA-501",
      category_short: "RINGS",
      purity: "CERTIFIED VVS DIAMONDS / 18K GOLD",
      weight: "4.50 G",
      weightPavan: "0.56 Sovereign",
      price: "LKR 330,000",
      description: "Brilliant cut VVS1 clarity natural solitaire diamond set on custom 18K gold band.",
      hallmark: "VVS Certified Diamonds",
      workshop: "Chavakachcheri, Jaffna",
      image: "/Diamond Ring.jpg"
    },
    {
      id: 103,
      title: "Traditional Jaffna Bangle Set",
      code: "AH-BNG-803",
      category_short: "BANGLES",
      purity: "22K (916) HALLMARK GOLD",
      weight: "24.00 G",
      weightPavan: "3.00 Sovereign",
      price: "LKR 552,000",
      description: "Handcrafted pair of 22K solid gold bangles with traditional braid artwork and ruby accents.",
      hallmark: "100% Certified 22K (916)",
      workshop: "Chavakachcheri, Jaffna",
      image: "/Gold Bangles Pair.jpg"
    },
    {
      id: 104,
      title: "925 Sterling Silver Bracelet",
      code: "AH-SLV-904",
      category_short: "CHAINS",
      purity: "925 HALLMARK SILVER",
      weight: "12.80 G",
      weightPavan: "Pure 925 Silver",
      price: "LKR 32,000",
      description: "Heavy woven 925 sterling silver chain bracelet with secure toggle lock clasp.",
      hallmark: "925 Sterling Hallmark",
      workshop: "Chavakachcheri, Jaffna",
      image: "/silver.jpg"
    }
  ]);

  useEffect(() => {
    let isActive = true;

    const loadHomeProducts = async () => {
      try {
        const response = await fetch('http://localhost/jewelry-api/products/get_products.php');
        const data = await response.json();
        if (!isActive) return;
        if (!data.success || !Array.isArray(data.data)) {
          setProducts([]);
          return;
        }

        setProducts(data.data.slice(0, 1).map((item) => {
          const images = normalizeHomeImages(item.images, item.image);
          return {
            id: item.id,
            title: item.title,
            code: item.code,
            category_short: item.category_short || item.category_name || 'JEWELRY',
            purity: item.purity || '22K (916) HALLMARK GOLD',
            weight: item.weight || 'Custom Weight',
            weightPavan: item.weightPavan || 'Custom Specification',
            price: item.price || 'Inquire for Price',
            discount_price: item.discount_price || '',
            description: item.description || 'Handcrafted jewelry designed by our Atelier team.',
            hallmark: item.purity || 'Certified Quality',
            workshop: 'Chavakachcheri, Jaffna',
            image: images[0] || '/ring.jpg',
            images,
          };
        }));
      } catch {
        if (isActive) setProducts([]);
      } finally {
        if (isActive) setProductsLoading(false);
      }
    };

    const loadHomeGallery = async () => {
      try {
        const response = await fetch('http://localhost/jewelry-api/gallery/get_gallery.php');
        const data = await response.json();
        if (!isActive || !data.success || !Array.isArray(data.gallery)) return;

        setGalleryProducts(data.gallery.map((item) => {
          const images = normalizeHomeImages(item.images, item.image);
          return {
            id: item.id,
            title: item.title,
            code: `AH-GAL-${item.id}`,
            category_short: item.category || 'JEWELRY',
            purity: `${item.category || 'JEWELRY'} COLLECTION`,
            weight: 'Custom Specification',
            weightPavan: 'Atelier Specification',
            price: 'Inquire for Price',
            description: `Handcrafted ${item.category || 'jewelry'} design from Atelier Harx.`,
            hallmark: 'Atelier Quality',
            workshop: 'Chavakachcheri, Jaffna',
            image: images[0] || '/bridal2.jpg',
            images,
          };
        }));
      } catch {
        // Keep the gallery fallback items when the local API is unavailable.
      }
    };

    const loadHomeTestimonials = async () => {
      try {
        const response = await fetch('http://localhost/jewelry-api/testimonials/get_testimonials.php');
        const data = await response.json();
        if (!isActive || !data.success || !Array.isArray(data.testimonials)) return;

        setTestimonials(data.testimonials.map((review) => ({
          id: review.id,
          name: review.clientName || 'Anonymous Client',
          text: review.review || '',
          rating: Math.min(5, Math.max(1, Number(review.rating) || 5)),
        })));
      } catch {
        // Keep the sample testimonials when the local API is unavailable.
      }
    };

    loadHomeProducts();
    loadHomeGallery();
    loadHomeTestimonials();

    return () => {
      isActive = false;
    };
  }, []);

  // Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  return (
    <div className="space-y-20 pb-20 bg-linear-to-br from-stone-50 via-amber-50/40 to-stone-100 text-neutral-900 font-sans selection:bg-amber-500 selection:text-white min-h-screen relative">
      
      {/* ==================== 1. HERO SECTION ==================== */}
      <section 
        className="relative text-white py-28 px-4 text-center border-b border-amber-500/20 bg-cover bg-center bg-no-repeat shadow-md"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(15, 15, 15, 0.65), rgba(15, 15, 15, 0.55)), url('/hero-bg.jpg')`
        }}
      >
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto space-y-6 relative z-10"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-amber-300 font-medium tracking-widest text-xs uppercase flex items-center justify-center gap-2 bg-black/40 px-4 py-1.5 rounded-full backdrop-blur-md w-fit mx-auto border border-amber-400/30"
          >
            <Sparkles className="w-4 h-4 text-amber-300" /> Exquisite Craftsmanship & Luxury
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-white drop-shadow-md"
          >
            Fine Jewelry & <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-200 via-amber-300 to-amber-500">
              Custom Manufacturing
            </span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-gray-200 text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed drop-shadow-sm"
          >
            Explore timeless Gold, Silver, Diamond & Custom-designed Jewelry tailored to perfection.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-4 pt-4"
          >
            <Link 
              to="/products" 
              className="bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold px-8 py-3.5 rounded-full transition-all duration-300 shadow-lg hover:shadow-amber-500/30 hover:scale-105"
            >
              Explore Collections
            </Link>
            <Link 
              to="/custom-jewelry" 
              className="border border-amber-300/80 text-amber-300 hover:bg-amber-400 hover:text-neutral-950 font-bold px-8 py-3.5 rounded-full transition-all duration-300 backdrop-blur-sm hover:scale-105"
            >
              Custom Jewelry Request
            </Link>

          </motion.div>
        </motion.div>
      </section>

      {/* ==================== 2. ABOUT US HIGHLIGHT ==================== */}
      <section className="max-w-7xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#ece8e1] p-8 md:p-12 rounded-3xl border border-amber-200/80 shadow-xl shadow-amber-900/5 grid grid-cols-1 md:grid-cols-2 gap-12 items-center text-neutral-900"
        >
          <div className="space-y-5">
            <span className="text-amber-800 font-bold uppercase tracking-wider text-xs bg-amber-100/90 px-3.5 py-1.5 rounded-full border border-amber-300/60 inline-block">
              ABOUT ROYAL JEWELS
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-neutral-900 leading-tight">
              20+ Years of Crafting Timeless Elegance
            </h2>
            <p className="text-neutral-600 leading-relaxed text-sm font-normal">
              We specialize in fine jewelry manufacturing and bespoke designs. Every piece is crafted with certified materials, ensuring authentic purity and superior quality.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="flex items-center gap-3 bg-white/90 p-3.5 rounded-2xl border border-amber-200/60 shadow-sm">
                <ShieldCheck className="w-6 h-6 text-amber-600 shrink-0" />
                <span className="text-xs font-bold text-neutral-800">100% Certified Gold</span>
              </div>
              <div className="flex items-center gap-3 bg-white/90 p-3.5 rounded-2xl border border-amber-200/60 shadow-sm">
                <Award className="w-6 h-6 text-amber-600 shrink-0" />
                <span className="text-xs font-bold text-neutral-800">Master Artisans</span>
              </div>
            </div>
            <div className="pt-2">
              <Link to="/about" className="inline-flex items-center gap-2 text-amber-700 font-bold hover:text-amber-800 transition">
                <span>Read More About Us</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden shadow-xl border border-amber-300/40 bg-neutral-950 group">
            <img 
              src="/HD.jpg" 
              alt="About Royal Jewels" 
              className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-700 ease-out" 
            />
            {/* Shine Sweep Overlay */}
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
          </div>
        </motion.div>
      </section>

      {/* ==================== 3. JEWELRY COLLECTIONS ==================== */}
      <section className="max-w-7xl mx-auto px-4 space-y-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-2"
        >
          <span className="text-amber-700 font-bold text-xs uppercase tracking-widest">OUR CATEGORIES</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-neutral-900">Jewelry Collections</h2>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { name: 'Gold Jewelry', cat: 'gold' },
            { name: 'Silver Jewelry', cat: 'silver' },
            { name: 'Diamond Jewelry', cat: 'diamond' },
            { name: 'Bridal Jewelry', cat: 'bridal' }
          ].map((item, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              <Link 
                to={`/products?category=${item.cat}`} 
                className="bg-white border border-amber-200/80 rounded-2xl p-6 text-center hover:border-amber-500 hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-300 transform hover:-translate-y-1 block group"
              >
                <div className="w-14 h-14 mx-auto bg-amber-500/10 rounded-2xl flex items-center justify-center mb-4 border border-amber-300/40 group-hover:bg-amber-500/20 transition">
                  <Gem className="text-amber-600" size={28} />
                </div>
                <h3 className="font-bold text-base text-neutral-900 group-hover:text-amber-700 transition">{item.name}</h3>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ==================== 4. FEATURED PRODUCTS (4 ITEMS GRID) ==================== */}
      <section className="max-w-7xl mx-auto px-4 space-y-8">
        <div className="flex justify-between items-end border-b border-amber-200/80 pb-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-neutral-900">Featured Products</h2>
            <p className="text-gray-500 text-xs md:text-sm font-light pt-1">Handpicked designs for special moments</p>
          </div>
          <Link to="/products" className="text-amber-700 font-bold text-xs md:text-sm hover:text-amber-800 hover:underline flex items-center gap-1">
            View All &rarr;
          </Link>
        </div>
        
        {/* Featured Product Cards Grid (4 Columns) */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {productsLoading ? (
            <p className="col-span-full py-12 text-center text-sm text-neutral-500">Loading featured product...</p>
          ) : products.length > 0 ? products.map(product => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="bg-[#141416] border border-neutral-800 rounded-2xl overflow-hidden shadow-xl hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Image Container with Hover View Spec Button */}
              <div className="relative h-60 overflow-hidden bg-neutral-950">
                <motion.img
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.4 }}
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Top Left Hallmark Gold Badge */}
                <span className="absolute top-3 left-3 bg-amber-500 text-neutral-950 font-black text-[9px] px-2.5 py-1 rounded-md uppercase tracking-wider shadow-md z-10">
                  {product.purity}
                </span>
                {product.images?.length > 1 && (
                  <span className="absolute bottom-3 right-3 rounded-full border border-neutral-700 bg-neutral-950/80 px-3 py-1 text-[10px] font-semibold text-white">
                    {product.images.length} photos
                  </span>
                )}

                {/* Centered Hover Button */}
                <div className="absolute inset-0 bg-neutral-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
                  <button
                    onClick={() => openProductModal(product)}
                    className="bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold px-4 py-2 rounded-full text-xs flex items-center gap-2 shadow-lg hover:scale-105 transition-transform"
                  >
                    <Eye className="w-4 h-4 text-neutral-950" />
                    <span>View Spec</span>
                  </button>
                </div>
              </div>

              {/* Product Details */}
              <div className="p-4 space-y-2">
                <div className="text-[10px] font-extrabold text-amber-500 tracking-widest uppercase">
                  {product.category_short} • {product.weight}
                </div>
                <h3 
                  onClick={() => openProductModal(product)}
                  className="font-bold text-sm sm:text-base text-white hover:text-amber-400 transition leading-snug cursor-pointer line-clamp-2"
                >
                  {product.title}
                </h3>
                <div className="pt-2 flex items-center justify-between text-xs">
                  <span className="text-neutral-500 font-medium">{product.discount_price ? 'Discount Price:' : 'Est. Price:'}</span>
                  <span className="text-right">
                    {product.discount_price && <span className="block text-xs text-neutral-500 line-through">{product.price}</span>}
                    <span className="font-bold text-amber-400 text-sm tracking-wide">
                      {product.discount_price || product.price}
                    </span>
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 pt-0 flex items-center gap-2">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => openProductModal(product)}
                  className="flex-1 bg-black hover:bg-neutral-900 text-gray-200 hover:text-white border border-neutral-800 py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition"
                >
                  <Eye size={14} className="text-amber-400" />
                  <span>View Spec</span>
                </motion.button>

                <motion.a
                  whileTap={{ scale: 0.95 }}
                  href={`https://wa.me/94762084145?text=${encodeURIComponent(`Hi Atelier Harx, I am interested in inquiring about "${product.title}" (${product.discount_price || product.price}).`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-amber-500 hover:bg-amber-400 text-neutral-950 p-2.5 rounded-xl transition shadow-md flex items-center justify-center shrink-0"
                  title="Inquire via WhatsApp"
                >
                  <MessageCircle size={16} className="fill-neutral-950" />
                </motion.a>
              </div>

            </motion.div>
          )) : (
            <p className="col-span-full py-12 text-center text-sm text-neutral-500">No featured product is available right now.</p>
          )}
        </motion.div>
      </section>

      {/* ==================== 5. SPECIAL OFFERS BANNER ==================== */}
      <section className="max-w-7xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-white p-8 md:p-12 rounded-3xl flex flex-col md:flex-row justify-between items-center gap-8 border border-amber-400/40 shadow-2xl bg-cover bg-center bg-no-repeat relative overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(20, 20, 20, 0.8), rgba(20, 20, 20, 0.6)), url('/hero-bg.jpg')`
          }}
        >
          <div className="space-y-3 text-center md:text-left relative z-10">
            <span className="bg-amber-500 text-neutral-950 text-xs font-bold px-3.5 py-1 rounded-full uppercase shadow-md inline-block">
         git add .
git commit -m "Fixed all localhost API endpoints to live URL"
git push origin main     Special Offers
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-amber-300">
              Exclusive Seasonal Bridal Discount
            </h2>
            <p className="text-gray-200 max-w-xl text-sm font-light">
              Get up to 15% off on complete bridal gold sets and customized engagement rings.
            </p>
          </div>
          <Link 
            to="/offers" 
            className="bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold px-8 py-3.5 rounded-full transition-all duration-300 whitespace-nowrap shadow-lg relative z-10 hover:scale-105"
          >
            View All Offers
          </Link>
        </motion.div>
      </section>

      {/* ==================== 6. MANUFACTURING & CUSTOM ORDERS ==================== */}
      <section 
        className="text-white py-16 px-4 bg-cover bg-center bg-no-repeat relative border-y border-amber-500/20 shadow-inner"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(15, 15, 15, 0.85), rgba(15, 15, 15, 0.75)), url('/hero-bg.jpg')`
        }}
      >
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10"
        >
          <div className="space-y-3 text-center md:text-left">
            <span className="text-amber-400 font-semibold uppercase text-xs tracking-widest">
              Custom Jewelry & Manufacturing
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold">Have a Unique Jewelry Design in Mind?</h2>
            <p className="text-gray-300 max-w-lg text-sm font-light">
              Our master craftsmen use advanced 3D CAD modeling and traditional handcrafting to bring your dream jewelry to life.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link 
              to="/custom-jewelry" 
              className="bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold px-6 py-3 rounded-full transition-all duration-300 shadow-md hover:scale-105"
            >
              Custom Order
            </Link>
            <Link 
              to="/manufacturing" 
              className="border border-amber-300 text-amber-300 hover:bg-amber-400 hover:text-neutral-950 font-bold px-6 py-3 rounded-full transition-all duration-300"
            >
              Our Process
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ==================== 7. JEWELRY GALLERY ==================== */}
      <section className="max-w-7xl mx-auto px-4 space-y-6">
        <div className="flex justify-between items-end border-b border-neutral-400/40 pb-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight">
              Jewelry Gallery
            </h2>
            <p className="text-neutral-500 text-xs sm:text-sm font-normal pt-1">
              Glimpse of our crafted masterpieces
            </p>
          </div>
          <Link 
            to="/gallery" 
            className="text-amber-700 hover:text-amber-800 font-bold text-xs sm:text-sm flex items-center gap-1 transition"
          >
            <span>View Gallery</span>
            <span>&rarr;</span>
          </Link>
        </div>

        {/* Gallery Product Cards Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {galleryProducts.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="bg-[#141416] border border-neutral-800 rounded-2xl overflow-hidden shadow-xl hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="relative h-60 overflow-hidden bg-neutral-950">
                <motion.img
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.4 }}
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                
                <span className="absolute top-3 left-3 bg-amber-500 text-neutral-950 font-black text-[9px] px-2.5 py-1 rounded-md uppercase tracking-wider shadow-md z-10">
                  {item.purity}
                </span>
                {item.images?.length > 1 && (
                  <span className="absolute bottom-3 right-3 rounded-full border border-neutral-700 bg-neutral-950/80 px-3 py-1 text-[10px] font-semibold text-white">
                    {item.images.length} photos
                  </span>
                )}

                <div className="absolute inset-0 bg-neutral-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
                  <button
                    onClick={() => openProductModal(item)}
                    className="bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold px-4 py-2 rounded-full text-xs flex items-center gap-2 shadow-lg hover:scale-105 transition-transform"
                  >
                    <Eye className="w-4 h-4 text-neutral-950" />
                    <span>View Spec</span>
                  </button>
                </div>
              </div>

              <div className="p-4 space-y-2">
                <div className="text-[10px] font-extrabold text-amber-500 tracking-widest uppercase">
                  {item.category_short} • {item.weight}
                </div>
                <h3 
                  onClick={() => openProductModal(item)}
                  className="font-bold text-sm sm:text-base text-white hover:text-amber-400 transition leading-snug cursor-pointer line-clamp-2"
                >
                  {item.title}
                </h3>
                <div className="pt-2 flex items-center justify-between text-xs">
                  <span className="text-neutral-500 font-medium">Est. Price:</span>
                  <span className="font-bold text-amber-400 text-sm tracking-wide">
                    {item.price}
                  </span>
                </div>
              </div>

              <div className="p-4 pt-0 flex items-center gap-2">
                <button
                  onClick={() => openProductModal(item)}
                  className="flex-1 bg-black hover:bg-neutral-900 text-gray-200 hover:text-white border border-neutral-800 py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition"
                >
                  <Eye size={14} className="text-amber-400" />
                  <span>View Spec</span>
                </button>

                <a
                  href={`https://wa.me/94762084145?text=${encodeURIComponent(`Hi Atelier Harx, I am interested in inquiring about "${item.title}" (${item.price}).`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-amber-500 hover:bg-amber-400 text-neutral-950 p-2.5 rounded-xl transition shadow-md flex items-center justify-center shrink-0"
                  title="Inquire via WhatsApp"
                >
                  <MessageCircle size={16} className="fill-neutral-950" />
                </a>
              </div>

            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ==================== 8. TESTIMONIALS ==================== */}
      <section className="max-w-7xl mx-auto px-4 space-y-6">
        <div className="flex justify-between items-end border-b border-neutral-400/40 pb-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight">
              What Our Clients Say
            </h2>
            <p className="text-neutral-500 text-xs sm:text-sm font-normal pt-1">
              Trusted by families for generations
            </p>
          </div>
          <Link 
            to="/testimonials" 
            className="text-amber-700 hover:text-amber-800 font-bold text-xs sm:text-sm flex items-center gap-1 transition"
          >
            <span>All Reviews</span>
            <span>&rarr;</span>
          </Link>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {testimonials.length > 0 ? testimonials.slice(0, 3).map((rev) => (
            <motion.div 
              key={rev.id || rev.name}
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-md space-y-3 hover:shadow-xl hover:border-amber-300 transition duration-300"
            >
              <div className="flex text-amber-500 gap-1">
                {Array.from({ length: rev.rating }, (_, index) => (
                  <Star key={index} className="w-4 h-4 fill-amber-500" />
                ))}
              </div>
              <p className="text-neutral-600 text-xs italic leading-relaxed font-light">
                "{rev.text}"
              </p>
              <h4 className="font-bold text-sm text-neutral-900 pt-3 border-t border-neutral-100">
                {rev.name}
              </h4>
            </motion.div>
          )) : (
            <p className="col-span-full py-8 text-center text-sm text-neutral-500">No approved testimonials yet.</p>
          )}
        </motion.div>
      </section>

      {/* ==================== 9. FAQ & CONTACT CTA ==================== */}
      <section className="max-w-7xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-[#ece8e1] p-8 md:p-10 rounded-3xl border border-amber-300/80 shadow-xl text-neutral-900"
        >
          <div className="space-y-4">
            <div className="w-12 h-12 bg-amber-500/20 rounded-2xl flex items-center justify-center border border-amber-400/40 text-amber-800">
              <HelpCircle className="w-7 h-7" />
            </div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-neutral-900">Have Questions Before Ordering?</h2>
            <p className="text-neutral-600 text-sm leading-relaxed font-normal">Find quick answers about purity certifications, custom timelines, and nationwide delivery.</p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link to="/faq" className="bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold px-5 py-2.5 rounded-xl text-xs transition shadow-md">
                Read FAQs
              </Link>
              <Link to="/contact" className="border border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white font-bold px-5 py-2.5 rounded-xl text-xs transition">
                Contact Us
              </Link>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-amber-200/90 shadow-md space-y-3">
            <h3 className="font-bold text-neutral-900 text-base">Direct WhatsApp Assistance</h3>
            <p className="text-gray-500 text-xs font-light">Chat directly with our jewelry consultants for instant custom quotes.</p>
            <a 
              href="https://wa.me/94762084145" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 text-xs transition shadow-sm"
            >
              <MessageCircle className="w-4 h-4" /> Start WhatsApp Chat
            </a>
          </div>
        </motion.div>
      </section>

      {/* ==================== PRODUCT SPEC POPUP MODAL ==================== */}
      <AnimatePresence>
        {activeModalProduct && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.25 }}
              className="bg-[#121214] border border-amber-500/30 rounded-3xl max-h-[90vh] max-w-3xl w-full overflow-y-auto shadow-2xl relative my-8 text-white"
            >
              
              {/* Close Button */}
              <button
                onClick={() => setActiveModalProduct(null)}
                className="absolute top-4 right-4 z-10 bg-neutral-900/80 hover:bg-neutral-800 text-gray-400 hover:text-white p-2 rounded-full border border-neutral-800 transition"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                
                {/* Image Side */}
                <div className="flex flex-col bg-neutral-950">
                  <div className="relative flex h-72 items-center justify-center md:h-120">
                    {activeModalImages[activeImageIndex] && (
                      <img
                        src={activeModalImages[activeImageIndex]}
                        alt={`${activeModalProduct.title} ${activeImageIndex + 1}`}
                        className="h-full w-full object-contain"
                      />
                    )}
                    <span className="absolute top-4 left-4 bg-amber-500 text-neutral-950 font-black text-[9px] px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
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

                {/* Details Side */}
                <div className="p-6 sm:p-8 space-y-5 flex flex-col justify-between">
                  <div className="space-y-4">
                    
                    <div>
                      <span className="text-[10px] text-amber-500 font-bold uppercase tracking-widest">
                        PRODUCT DETAILS
                      </span>
                      <h2 className="text-2xl font-bold text-white pt-1">
                        {activeModalProduct.title}
                      </h2>
                    </div>

                    <div className="bg-[#0b0b0c] rounded-2xl p-4 border border-neutral-800/80 space-y-2.5 text-xs">
                      <div className="flex items-center justify-between border-b border-neutral-800/60 pb-2">
                        <span className="text-gray-400 flex items-center gap-1.5">
                          <Tag size={14} className="text-amber-400" /> {activeModalProduct.discount_price ? 'Discount Price:' : 'Estimated Price:'}
                        </span>
                        <span className="text-right">
                          {activeModalProduct.discount_price && <span className="block text-xs text-neutral-500 line-through">{activeModalProduct.price}</span>}
                          <span className="font-bold text-amber-400 text-sm tracking-wide">
                            {activeModalProduct.discount_price || activeModalProduct.price}
                          </span>
                        </span>
                      </div>

                      <div className="flex items-center justify-between border-b border-neutral-800/60 pb-2">
                        <span className="text-gray-400 flex items-center gap-1.5">
                          <Scale size={14} className="text-amber-400" /> Metal Weight:
                        </span>
                        <span className="font-semibold text-amber-300">
                          {activeModalProduct.weight} ({activeModalProduct.weightPavan})
                        </span>
                      </div>

                      <div className="flex items-center justify-between border-b border-neutral-800/60 pb-2">
                        <span className="text-gray-400 flex items-center gap-1.5">
                          <ShieldCheck size={14} className="text-amber-400" /> Hallmark Quality:
                        </span>
                        <span className="font-semibold text-gray-200">
                          {activeModalProduct.hallmark}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 flex items-center gap-1.5">
                          <Award size={14} className="text-amber-400" /> Workshop Craft:
                        </span>
                        <span className="font-semibold text-gray-200">
                          {activeModalProduct.workshop}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-gray-400 font-light leading-relaxed">
                      {activeModalProduct.description}
                    </p>
                  </div>

                  <div className="pt-2 space-y-2.5">
                    <motion.a
                      whileTap={{ scale: 0.97 }}
                      href={`https://wa.me/94762084145?text=${encodeURIComponent(`Hi Atelier Harx, I would like to request a quote/inquire about "${activeModalProduct.title}" (Price: ${activeModalProduct.discount_price || activeModalProduct.price}).`)}` }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold py-3.5 rounded-xl text-xs flex items-center justify-center gap-2 transition shadow-lg shadow-amber-500/20"
                    >
                      <MessageCircle size={16} className="fill-neutral-950" />
                      <span>Inquire / Request Quote on WhatsApp</span>
                    </motion.a>

                    <button
                      onClick={() => setActiveModalProduct(null)}
                      className="w-full bg-[#0b0b0c] hover:bg-neutral-900 text-gray-400 hover:text-white py-2.5 rounded-xl text-xs font-medium border border-neutral-800 transition"
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