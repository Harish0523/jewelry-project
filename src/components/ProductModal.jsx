import React, { useState } from 'react';
import { 
  X, 
  Tag, 
  Scale, 
  ShieldCheck, 
  Award, 
  MessageCircle, 
  Send, 
  User, 
  Phone, 
  FileText, 
  ArrowLeft 
} from 'lucide-react';

export default function ProductModal({ product, onClose }) {
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    notes: ''
  });

  if (!product) return null;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    // Construct pre-filled formatted WhatsApp Message
    const whatsappMessage = encodeURIComponent(
      `Hello Atelier Harx,\n\nI would like to make an inquiry for the following product:\n\n` +
      `📌 *Product:* ${product.title}\n` +
      `🏷️ *Item Code:* ${product.code || 'AH-DIA-501'}\n` +
      `💰 *Est. Price:* ${product.price || 'LKR 195,000'}\n` +
      `⚖️ *Weight:* ${product.weight} (${product.weightPavan || ''})\n\n` +
      `👤 *Customer Name:* ${formData.name}\n` +
      `📞 *Phone / WhatsApp:* ${formData.phone}\n` +
      `📝 *Notes/Requirements:* ${formData.notes || 'None'}`
    );

    window.open(`https://wa.me/94762084145?text=${whatsappMessage}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#121214] border border-amber-500/30 rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl relative my-8 text-white animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Right Close (X) Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-neutral-900/80 hover:bg-neutral-800 text-gray-400 hover:text-white p-2 rounded-full border border-neutral-800 transition"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left Side: Product Image */}
          <div className="relative h-72 md:h-full bg-neutral-950 min-h-85">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover"
            />
            <span className="absolute top-4 left-4 bg-amber-500 text-neutral-950 font-black text-[9px] px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
              {product.purity || "22K (916) HALLMARK GOLD"}
            </span>
          </div>

          {/* Right Side: Product Specs or Inquiry Form Toggle */}
          <div className="p-6 sm:p-8 space-y-5 flex flex-col justify-between">
            
            {!showInquiryForm ? (
              /* VIEW 1: PRODUCT SPECIFICATIONS VIEW */
              <>
                <div className="space-y-4">
                  {/* Item Code & Title */}
                  <div>
                    <span className="text-[10px] text-amber-500 font-bold uppercase tracking-widest">
                      ITEM CODE: {product.code || "AH-RING-101"}
                    </span>
                    <h2 className="text-2xl font-bold text-white pt-1">
                      {product.title}
                    </h2>
                  </div>

                  {/* Specifications Card */}
                  <div className="bg-[#0b0b0c] rounded-2xl p-4 border border-neutral-800/80 space-y-2.5 text-xs">
                    <div className="flex items-center justify-between border-b border-neutral-800/60 pb-2">
                      <span className="text-gray-400 flex items-center gap-1.5">
                        <Tag size={14} className="text-amber-400" /> Estimated Price:
                      </span>
                      <span className="font-bold text-amber-400 text-sm tracking-wide">
                        {product.price || "LKR 195,000"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between border-b border-neutral-800/60 pb-2">
                      <span className="text-gray-400 flex items-center gap-1.5">
                        <Scale size={14} className="text-amber-400" /> Metal Weight:
                      </span>
                      <span className="font-semibold text-amber-300">
                        {product.weight} ({product.weightPavan || "1.06 Sovereign"})
                      </span>
                    </div>

                    <div className="flex items-center justify-between border-b border-neutral-800/60 pb-2">
                      <span className="text-gray-400 flex items-center gap-1.5">
                        <ShieldCheck size={14} className="text-amber-400" /> Hallmark Quality:
                      </span>
                      <span className="font-semibold text-gray-200">
                        {product.hallmark || "100% Certified 22K (916)"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 flex items-center gap-1.5">
                        <Award size={14} className="text-amber-400" /> Workshop Craft:
                      </span>
                      <span className="font-semibold text-gray-200">
                        {product.workshop || "Chavakachcheri, Jaffna"}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-gray-400 font-light leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Modal CTA Buttons */}
                <div className="pt-2 space-y-2.5">
                  <button
                    onClick={() => setShowInquiryForm(true)}
                    className="w-full bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold py-3.5 rounded-xl text-xs flex items-center justify-center gap-2 transition shadow-lg shadow-amber-500/20"
                  >
                    <MessageCircle size={16} className="fill-neutral-950" />
                    <span>Inquire / Request Quote on WhatsApp</span>
                  </button>

                  <button
                    onClick={onClose}
                    className="w-full bg-[#0b0b0c] hover:bg-neutral-900 text-gray-400 hover:text-white py-2.5 rounded-xl text-xs font-medium border border-neutral-800 transition"
                  >
                    Close Window
                  </button>
                </div>
              </>
            ) : (
              /* VIEW 2: INQUIRY FORM VIEW */
              <div className="space-y-4 animate-in fade-in duration-200">
                {/* Back to Specs Link */}
                <button
                  onClick={() => setShowInquiryForm(false)}
                  className="text-amber-400 hover:text-amber-300 text-xs font-bold inline-flex items-center gap-1.5 transition"
                >
                  <ArrowLeft size={14} /> Back to Product Specs
                </button>

                <div>
                  <h3 className="text-xl font-bold text-white font-serif">Product Inquiry Form</h3>
                  <p className="text-neutral-400 text-xs pt-1">
                    Inquiring about <span className="text-amber-400 font-semibold">{product.title}</span> ({product.code})
                  </p>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-3 pt-1">
                  {/* Name Input */}
                  <div className="space-y-1">
                    <label className="text-xs text-neutral-300 font-medium flex items-center gap-1">
                      <User size={13} className="text-amber-400" /> Your Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Sangeetha Perera"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-[#0b0b0c] border border-neutral-800 focus:border-amber-500 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-600 outline-none transition"
                    />
                  </div>

                  {/* Phone Input */}
                  <div className="space-y-1">
                    <label className="text-xs text-neutral-300 font-medium flex items-center gap-1">
                      <Phone size={13} className="text-amber-400" /> WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="+94 77 123 4567"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-[#0b0b0c] border border-neutral-800 focus:border-amber-500 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-600 outline-none transition"
                    />
                  </div>

                  {/* Notes / Customization */}
                  <div className="space-y-1">
                    <label className="text-xs text-neutral-300 font-medium flex items-center gap-1">
                      <FileText size={13} className="text-amber-400" /> Size / Customization Notes
                    </label>
                    <textarea
                      name="notes"
                      rows="3"
                      placeholder="Specify ring size, preferred gold purity, or custom weight..."
                      value={formData.notes}
                      onChange={handleInputChange}
                      className="w-full bg-[#0b0b0c] border border-neutral-800 focus:border-amber-500 rounded-xl p-3 text-xs text-white placeholder-neutral-600 outline-none transition resize-none"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2 space-y-2">
                    <button
                      type="submit"
                      className="w-full bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2 transition shadow-lg shadow-amber-500/20"
                    >
                      <Send size={15} />
                      <span>Send Inquiry via WhatsApp</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setShowInquiryForm(false)}
                      className="w-full bg-[#0b0b0c] hover:bg-neutral-900 text-gray-400 hover:text-white py-2 rounded-xl text-xs font-medium border border-neutral-800 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}