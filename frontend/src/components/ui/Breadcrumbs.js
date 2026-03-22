import React from 'react';
import { Link } from 'react-router-dom';

/** items: [{ label, to? }] — last item can omit `to` for current page */
const Breadcrumbs = ({ items, className = '' }) => (
  <nav
    aria-label="Breadcrumb"
    className={`inline-flex items-center gap-2 text-sm text-slate-500 flex-wrap rounded-full bg-white/70 border border-slate-200/80 px-3 py-1.5 shadow-sm ${className}`}
  >
    {items.map((item, i) => (
      <React.Fragment key={`${item.label}-${i}`}>
        {i > 0 && <span className="material-symbols-outlined text-[14px] text-slate-300">chevron_right</span>}
        {item.to ? (
          <Link to={item.to} className="hover:text-primary font-medium transition-colors">
            {item.label}
          </Link>
        ) : (
          <span className="text-slate-800 font-semibold line-clamp-1">{item.label}</span>
        )}
      </React.Fragment>
    ))}
  </nav>
);

export default Breadcrumbs;
