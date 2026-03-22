import React from 'react';

const LoadingState = ({ message = 'Loading…', className = '' }) => (
  <div className={`flex flex-col items-center justify-center py-20 sm:py-28 gap-5 ${className}`}>
    <div className="relative size-14">
      <div className="absolute inset-0 rounded-full border-2 border-slate-200" />
      <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary border-r-primary/40 animate-spin" />
    </div>
    <p className="text-sm font-medium text-slate-500 tracking-wide">{message}</p>
  </div>
);

export default LoadingState;
