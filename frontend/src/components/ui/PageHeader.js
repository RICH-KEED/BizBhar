import React from 'react';
import { Link } from 'react-router-dom';

const PageHeader = ({ eyebrow, title, subtitle, backTo, backLabel = 'Back', actions }) => (
  <div className="mb-10 sm:mb-12">
    {backTo && (
      <Link
        to={backTo}
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-primary mb-5 group transition-colors"
      >
        <span className="material-symbols-outlined text-lg text-slate-400 group-hover:text-primary group-hover:-translate-x-0.5 transition-all">
          arrow_back
        </span>
        {backLabel}
      </Link>
    )}
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5">
      <div className="max-w-3xl">
        {eyebrow && (
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary/90 mb-2.5">{eyebrow}</p>
        )}
        <h1 className="font-display text-3xl sm:text-[2.125rem] font-extrabold text-slate-900 tracking-tight leading-[1.15]">
          {title}
        </h1>
        {subtitle && <p className="mt-3 text-slate-500 text-base leading-relaxed">{subtitle}</p>}
      </div>
      {actions && <div className="shrink-0 flex flex-wrap gap-2">{actions}</div>}
    </div>
  </div>
);

export default PageHeader;
