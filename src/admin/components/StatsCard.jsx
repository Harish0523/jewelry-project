import React from 'react';

export default function StatsCard({ title, value, icon, change, isPositive }) {
  return (
    <div className="bg-[#141416] border border-neutral-800 p-6 rounded-2xl shadow-xl flex items-center justify-between hover:border-amber-500/30 transition duration-300">
      <div className="space-y-1">
        <span className="text-xs font-medium text-neutral-400 uppercase tracking-wider">
          {title}
        </span>
        <h3 className="text-2xl font-serif font-bold text-white">
          {value}
        </h3>
        {change && (
          <p className={`text-[11px] font-medium ${isPositive ? 'text-emerald-400' : 'text-amber-400'}`}>
            {change}
          </p>
        )}
      </div>

      <div className="w-12 h-12 rounded-2xl bg-neutral-900 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
        {icon}
      </div>
    </div>
  );
}