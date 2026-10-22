import React from 'react';
import { Scale, CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react';

export default function Terms() {
  return (
    <div className="min-h-screen bg-linear-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-white py-16 px-4">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <Scale className="w-3.5 h-3.5" /> Customer Agreement
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold tracking-wide">
            Terms & <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-200 via-amber-400 to-amber-500">Conditions</span>
          </h1>
          <p className="text-gray-300 text-sm font-light">
            Effective: October 2026 • Atelier Harx, Fine Jewelry & Craft
          </p>
        </div>

        {/* Terms Card */}
        <div className="bg-neutral-900/90 border border-neutral-800 rounded-3xl p-8 sm:p-12 space-y-8 shadow-2xl text-sm leading-relaxed font-light">
          
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-amber-400 font-serif text-xl font-bold">
              <ShieldCheck className="w-5 h-5 shrink-0" />
              <h2>1. Hallmark Purity & Weight Guarantee</h2>
            </div>
            <p className="text-gray-300">
              All 22K Gold and 925 Sterling Silver products sold by Atelier Harx undergo rigorous quality checks and carry official hallmark authentication. Final prices reflect exact weight measurements at our certified digital scales.
            </p>
          </div>

          <div className="space-y-3 border-t border-neutral-800 pt-6">
            <div className="flex items-center gap-2 text-amber-400 font-serif text-xl font-bold">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <h2>2. Custom Design Orders & Tolerances</h2>
            </div>
            <p className="text-gray-300">
              Custom-designed hand-crafted jewelry may have minor weight variations (±0.1g to 0.3g) due to hand-polishing and casting processes. Final pricing will be updated according to the exact weight produced upon completion.
            </p>
          </div>

          <div className="space-y-3 border-t border-neutral-800 pt-6">
            <div className="flex items-center gap-2 text-amber-400 font-serif text-xl font-bold">
              <Scale className="w-5 h-5 shrink-0" />
              <h2>3. Pricing & Gold Market Rates</h2>
            </div>
            <p className="text-gray-300">
              Gold and silver rates fluctuate daily according to market conditions. Quotations provided for custom designs are valid for 48 hours from issuance unless advance payment is deposited to lock the gold rate.
            </p>
          </div>

          <div className="space-y-3 border-t border-neutral-800 pt-6">
            <div className="flex items-center gap-2 text-amber-400 font-serif text-xl font-bold">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <h2>4. Returns & Maintenance Service</h2>
            </div>
            <p className="text-gray-300">
              We offer lifetime complimentary cleaning and polish inspection for all Atelier Harx jewelry. Custom-made items are non-refundable but eligible for alteration or resizing if requested within 14 days.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}