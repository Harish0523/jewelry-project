import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ImagePlus, MessageCircle, Sparkles, X, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function CustomJewelry() {
  const [formData, setFormData] = useState({ name: '', phone: '', metal: '22K Gold', budget: '', description: '' });
  const [designImage, setDesignImage] = useState(null);
  const [imageError, setImageError] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => () => {
    if (imagePreview) URL.revokeObjectURL(imagePreview);
  }, [imagePreview]);

  const handleImageChange = (e) => {
    const image = e.target.files?.[0];
    if (!image) return;

    if (!image.type.startsWith('image/')) {
      setImageError('Choose an image file to continue.');
      e.target.value = '';
      return;
    }

    if (image.size > 5 * 1024 * 1024) {
      setImageError('Image must be 5 MB or smaller.');
      e.target.value = '';
      return;
    }

    setDesignImage(image);
    setImagePreview(URL.createObjectURL(image));
    setImageError('');
  };

  const handleRemoveImage = () => {
    setDesignImage(null);
    setImagePreview('');
    setImageError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setServerError('');

    const formattedMessage = `[CUSTOM ORDER REQUEST]\nMetal: ${formData.metal}\nBudget/Weight: ${formData.budget || 'Not specified'}\nDetails: ${formData.description}${designImage ? `\nReference Image: ${designImage.name}` : ''}`;

    try {
      // 1. Save Custom Order to XAMPP MySQL Database via PHP API
      const response = await fetch('http://atelierharx.gt.tc/jewelry_api/inquiries/add_inquiry.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: 'N/A',
          type: 'Custom Jewelry Request',
          message: formattedMessage
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);

        // 2. WhatsApp Message Generation & Sharing
        const message = `Hi Atelier Harx, I want a custom jewelry design:\nName: ${formData.name}\nPhone: ${formData.phone}\nMetal: ${formData.metal}\nBudget/Weight: ${formData.budget}\nDetails: ${formData.description}${designImage ? `\nDesign image: ${designImage.name}` : ''}`;

        if (designImage && navigator.canShare?.({ files: [designImage] }) && navigator.share) {
          try {
            await navigator.share({
              files: [designImage],
              title: 'Custom jewelry design request',
              text: message
            });
            return;
          } catch (error) {
            if (error.name === 'AbortError') return;
          }
        }

        window.open(`https://wa.me/94762084145?text=${encodeURIComponent(message)}`, '_blank');
      } else {
        setServerError(data.message || 'Failed to save order to database.');
      }
    } catch (err) {
      setServerError('Cannot connect to XAMPP backend server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-white py-16 px-4 pt-24">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Animated Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 max-w-3xl mx-auto"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider shadow-lg shadow-amber-500/5">
            <Sparkles className="w-3.5 h-3.5" /> Bespoke Workshop
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white">
            Custom <span className="text-amber-400">Jewelry Design</span>
          </h1>
          <p className="text-gray-300 text-sm sm:text-base font-light">
            Turn your vision into reality. Share your sketch or idea with our master goldsmiths.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left: Animated Step-by-Step Guide */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8 bg-neutral-900/90 border border-neutral-800 p-8 rounded-2xl shadow-2xl"
          >
            <h2 className="text-2xl font-serif font-bold text-amber-400">How Custom Design Works</h2>
            <div className="space-y-6">
              {[
                { num: '1', title: 'Share Your Design Idea', desc: 'Send us a photo, sketch, or custom pattern via WhatsApp.' },
                { num: '2', title: '3D CAD Modeling & Price Quote', desc: 'We generate accurate digital previews and exact weight estimates.' },
                { num: '3', title: 'Handcrafting & Hallmarking', desc: 'Master goldsmiths cast, polish, and hallmark stamp your ornament.' }
              ].map((step, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ x: 5 }}
                  className="flex gap-4 p-2 rounded-xl transition duration-200"
                >
                  <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center shrink-0 border border-amber-500/30 shadow-md">
                    {step.num}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{step.title}</h3>
                    <p className="text-sm text-gray-300 font-light mt-0.5">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Animated Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-neutral-900/90 border border-amber-500/20 p-8 rounded-2xl space-y-5 shadow-2xl relative"
          >
            <h2 className="text-2xl font-serif font-bold text-white">Submit Custom Order Request</h2>
            
            {serverError && (
              <div className="p-4 bg-red-950/40 border border-red-500/40 text-red-300 rounded-xl text-xs flex items-center gap-2">
                <AlertCircle size={16} />
                <span>{serverError}</span>
              </div>
            )}

            {success ? (
              <div className="bg-emerald-950/40 border border-emerald-500/40 p-6 rounded-2xl text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="text-lg font-bold text-white">Custom Request Saved Successfully!</h3>
                <p className="text-xs text-emerald-200 font-light">
                  Your custom design order has been securely saved in our database and opened on WhatsApp.
                </p>
                <button 
                  onClick={() => setSuccess(false)}
                  className="text-amber-400 underline text-xs font-medium pt-2 block mx-auto cursor-pointer"
                >
                  Submit another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs text-amber-300 mb-1 font-semibold uppercase">Your Name</label>
                  <input 
                    type="text" 
                    required 
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:border-amber-500 focus:outline-none text-sm transition" 
                    placeholder="Full Name" 
                    value={formData.name} 
                    onChange={(e) => setFormData({...formData, name: e.target.value})} 
                  />
                </div>

                <div>
                  <label className="block text-xs text-amber-300 mb-1 font-semibold uppercase">WhatsApp / Phone Number</label>
                  <input 
                    type="tel" 
                    required 
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:border-amber-500 focus:outline-none text-sm transition" 
                    placeholder="+94 7X XXX XXXX" 
                    value={formData.phone} 
                    onChange={(e) => setFormData({...formData, phone: e.target.value})} 
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-amber-300 mb-1 font-semibold uppercase">Metal Category</label>
                    <select 
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-3 text-white focus:border-amber-500 focus:outline-none text-sm transition cursor-pointer" 
                      value={formData.metal} 
                      onChange={(e) => setFormData({...formData, metal: e.target.value})}
                    >
                      <option value="22K Gold">22K Gold</option>
                      <option value="18K Diamond">18K Diamond</option>
                      <option value="925 Silver">925 Silver</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-amber-300 mb-1 font-semibold uppercase">Weight / Budget</label>
                    <input 
                      type="text" 
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:border-amber-500 focus:outline-none text-sm transition" 
                      placeholder="Sovereigns (Pavan)" 
                      value={formData.budget} 
                      onChange={(e) => setFormData({...formData, budget: e.target.value})} 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-amber-300 mb-1 font-semibold uppercase">Design Instructions</label>
                  <textarea 
                    rows="3" 
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:border-amber-500 focus:outline-none text-sm transition resize-none" 
                    placeholder="Describe gem choices, ring size, or necklace patterns..." 
                    value={formData.description} 
                    onChange={(e) => setFormData({...formData, description: e.target.value})} 
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="design-image" className="block text-xs text-amber-300 font-semibold uppercase">Design Image <span className="text-neutral-500 normal-case">(optional)</span></label>
                  {designImage ? (
                    <div className="flex items-center gap-3 rounded-xl border border-neutral-800 bg-neutral-950 p-3">
                      <img src={imagePreview} alt={`Preview of ${designImage.name}`} className="w-16 h-16 rounded-lg object-cover border border-neutral-700" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-white truncate">{designImage.name}</p>
                        <p className="text-xs text-neutral-500">{(designImage.size / (1024 * 1024)).toFixed(2)} MB</p>
                      </div>
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        aria-label="Remove design image"
                        className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <label htmlFor="design-image" className="flex items-center gap-3 p-4 rounded-xl border border-dashed border-neutral-700 bg-neutral-950 hover:border-amber-500/60 transition cursor-pointer">
                      <span className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                        <ImagePlus className="w-5 h-5" />
                      </span>
                      <span>
                        <span className="block text-sm text-white">Choose a reference image</span>
                        <span className="block text-xs text-neutral-500 mt-1">JPG, PNG, or other image up to 5 MB</span>
                      </span>
                      <input
                        ref={fileInputRef}
                        id="design-image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="sr-only"
                      />
                    </label>
                  )}
                  <p className="text-xs text-neutral-500">
                    {designImage && navigator.canShare?.({ files: [designImage] })
                      ? 'Your image will be included in the share sheet. Choose WhatsApp to send it.'
                      : 'After WhatsApp opens, attach the selected image in the chat.'}
                  </p>
                  {imageError && <p role="alert" className="text-xs text-rose-400">{imageError}</p>}
                </div>

                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition shadow-lg shadow-amber-500/20 cursor-pointer disabled:opacity-50"
                >
                  <MessageCircle className="w-5 h-5" /> 
                  <span>{loading ? 'Submitting Order...' : 'Send Order Request via WhatsApp'}</span>
                </motion.button>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </div>
  );
}