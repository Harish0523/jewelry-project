import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, MessageCircle } from 'lucide-react';

export default function ProductCard({ product, onViewSpec }) {
  const whatsappMessage = encodeURIComponent(
    `Hi Atelier Harx, I would like to inquire about "${product.title}" (${product.purity || '22K (916) Hallmark Gold'}, Weight: ${product.weight || '8.50 G'}, Price: ${product.price || 'LKR 195,000'}).`
  );

  return (
    <div className="bg-[#141416] border border-neutral-800 rounded-2xl overflow-hidden shadow-xl hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between group">
      <div>
        {/* Product Image Container with Hover "View Details" Overlay */}
        <div className="relative h-64 overflow-hidden bg-neutral-950">
          <img 
            src={product.image} 
            alt={product.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          />
          
          {/* Top-Left Hallmark Gold Badge */}
          <span className="absolute top-3 left-3 bg-amber-500 text-neutral-950 font-black text-[9px] px-2.5 py-1 rounded-md uppercase tracking-wider shadow-md z-10">
            {product.purity || "22K (916) HALLMARK GOLD"}
          </span>

          {/* Centered "View Details" Hover Button (Matching Screenshot) */}
          <div className="absolute inset-0 bg-neutral-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Link
              to={`/product/${product.id}`}
              className="bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold px-4 py-2 rounded-full text-xs flex items-center gap-2 shadow-lg hover:scale-105 transition-transform"
            >
              <Eye className="w-4 h-4 text-neutral-950" />
              <span>View Details</span>
            </Link>
          </div>
        </div>

        {/* Product Details */}
        <div className="p-5 space-y-2">
          {/* Category & Weight Subtitle */}
          <div className="text-[10px] font-extrabold text-amber-500 tracking-widest uppercase">
            {product.category_short || product.category_name || "RINGS"} • {product.weight || "8.50 G"}
          </div>

          {/* Product Title */}
          <Link to={`/product/${product.id}`}>
            <h3 className="font-bold text-base sm:text-lg text-white group-hover:text-amber-400 transition leading-snug">
              {product.title}
            </h3>
          </Link>

          {/* Estimated Price Line */}
          <div className="pt-2 flex items-center justify-between text-xs">
            <span className="text-neutral-500 font-medium">Est. Price:</span>
            <span className="font-bold text-amber-400 text-sm tracking-wide">
              {product.price || "LKR 195,000"}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons Row */}
      <div className="p-5 pt-0 flex items-center gap-2">
        {/* View Spec Button (Triggers Popup Modal) */}
        <button
          onClick={() => onViewSpec && onViewSpec(product)}
          className="flex-1 bg-black hover:bg-neutral-900 text-gray-200 hover:text-white border border-neutral-800 py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition"
        >
          <Eye size={14} className="text-amber-400" />
          <span>View Spec</span>
        </button>

        {/* WhatsApp Direct Inquiry Button */}
        <a 
          href={`https://wa.me/94762084145?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-amber-500 hover:bg-amber-400 text-neutral-950 p-2.5 rounded-xl transition shadow-md flex items-center justify-center shrink-0"
          title="Inquire via WhatsApp"
        >
          <MessageCircle size={16} className="fill-neutral-950" />
        </a>
      </div>
    </div>
  );
}