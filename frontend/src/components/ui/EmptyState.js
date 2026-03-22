import React from 'react';

const EmptyState = ({ icon = 'inventory_2', title, description, children }) => (
  <div className="relative rounded-2xl border border-dashed border-slate-200/90 bg-gradient-to-b from-white to-slate-50/80 px-6 py-14 sm:py-16 text-center max-w-lg mx-auto shadow-card ring-1 ring-slate-900/[0.03]">
    <span className="material-symbols-outlined text-5xl text-slate-300 mb-4 block">{icon}</span>
    <h3 className="font-display text-lg font-bold text-slate-900 mb-2">{title}</h3>
    {description && <p className="text-slate-500 text-sm mb-6 leading-relaxed max-w-sm mx-auto">{description}</p>}
    {children}
  </div>
);

export default EmptyState;
