import React from 'react';

const styles = {
  info: 'bg-blue-50/90 border-blue-100/90 text-blue-950 shadow-sm',
  warning: 'bg-amber-50/90 border-amber-200/80 text-amber-950 shadow-sm',
  error: 'bg-red-50/90 border-red-100/90 text-red-900 shadow-sm',
  success: 'bg-emerald-50/90 border-emerald-100/90 text-emerald-950 shadow-sm',
};

const AlertBanner = ({ variant = 'info', children, className = '', icon }) => (
  <div
    className={`rounded-xl border px-4 py-3.5 text-sm font-medium flex gap-3 items-start backdrop-blur-sm ${styles[variant] || styles.info} ${className}`}
    role="status"
  >
    {icon && <span className="material-symbols-outlined text-[20px] shrink-0 mt-0.5 opacity-90">{icon}</span>}
    <div className="min-w-0 flex-1 leading-relaxed">{children}</div>
  </div>
);

export default AlertBanner;
