import React from 'react';
import Navbar from '../Navbar';
import SiteFooter from '../SiteFooter';

/**
 * Standard marketplace page: ambient background + nav + content + footer.
 */
const PageShell = ({ children, footer = true, className = '' }) => (
  <div className={`min-h-screen bg-background-light flex flex-col text-slate-900 relative ${className}`}>
    <div
      className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_85%_55%_at_50%_-12%,rgba(55,100,235,0.09),transparent_55%)]"
      aria-hidden
    />
    <div className="relative z-10 flex min-h-screen flex-col">
      <Navbar />
      <div className="flex-1 w-full">{children}</div>
      {footer ? <SiteFooter /> : null}
    </div>
  </div>
);

export default PageShell;
