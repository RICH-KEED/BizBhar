import React from 'react';

/** Centered content column — use inside PageShell */
const PageSection = ({ children, className = '', narrow = false, wide = false }) => (
  <div
    className={`mx-auto w-full px-4 sm:px-6 lg:px-10 py-10 sm:py-12 ${
      wide ? 'max-w-[1400px]' : narrow ? 'max-w-3xl' : 'max-w-[1200px]'
    } ${className}`}
  >
    {children}
  </div>
);

export default PageSection;
