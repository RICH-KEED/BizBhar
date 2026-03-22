import React from 'react';

const variants = {
  default:
    'bg-white/90 backdrop-blur-sm border border-slate-200/90 shadow-card ring-1 ring-slate-900/[0.03]',
  elevated:
    'bg-white border border-slate-100/90 shadow-premium ring-1 ring-slate-900/[0.04]',
  muted: 'bg-slate-50/90 border border-slate-200/70 ring-1 ring-slate-900/[0.02]',
};

const Card = ({ children, className = '', variant = 'default', padding = 'p-6 sm:p-8' }) => (
  <div className={`rounded-2xl ${variants[variant] || variants.default} ${padding} ${className}`.trim()}>{children}</div>
);

export default Card;
