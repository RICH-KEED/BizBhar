import React from 'react';
import { Link } from 'react-router-dom';

/** Same avatar stack as `public/stitch/authentication_page/code.html` (left hero). */
const HERO_AVATARS = [
  {
    alt: 'Buyer',
    src:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCAjnWmUPV92sVi6HZZGopVsQx3hYKes7gQ36ECawOIqyJ3CF_8h_lDCkHMdjuZbZ2w3FhzAP6ueqlDH9glHebdYNDp5wmHQskIapdtI0fIBBfASVF4E3NsL4SoLkLDD0fY0hWLFOmL3A3IwOCmV9DjitCWHK_SRpliTfXNkz94nMERpvi9TaRijelaNC-6qVQnwcAMWuT8Ti7ZrPcXQpH4i4SWR3o-kovpzFeT-of5W2PklQlU8fNkZ7gCS8hbOTVG5quHHWkGVu8',
  },
  {
    alt: 'Seller',
    src:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB7mjQ_Fxfr88Hlj-6-wmWdvmBChSjQ04y77-A6-1gvzdnt1mgFZ2MHiT8794xtXnxuBvAAxr368fAnwyPcuzrqErF5KbGRAtPSr7ljVQMvxbOshRUhl6tBkhLmaZ14U7Y2ZpIrUX7_XEAYiim2Tat1TvC1ON-OZSEZTr6RwSe6tkEQyvf4JH019QSBBGvH1GmltKuIpJOtAyEvM2lxpIVsDRZ5-ehRFbFyZYK295zu87cMB18uh8Hgz8t9peV6aUcxVSs8TBHcbFI',
  },
  {
    alt: 'Expert',
    src:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAbT-CO2hYXQgRozORyGfFS1c7sR0PUq5S1tzUPNapvPqZaY-n18KB3TE71A0Vq89LZuyfYpar8txf31i7sHBzcCsnoEbGDIGvuFQiCE_huywzCK_nB28AeL_p6uJa-zuoANF6hQqW_wbOm_3ircSmTud7n23FXqHXMomeK9sdVjI2zorHRIbdUlHtxN-56v0hyd9Tg9V7R0pXNJnByo_BH3a7CEt5YYJnspX3BgB_Kn8llUVEmiKsb8pPhptGA7Sv4phF6lrx0H4Y',
  },
];

/**
 * Split hero + form layout — premium card, soft shadow.
 */
const AuthLayout = ({ title, subtitle, mode = 'login', children }) => {
  return (
    <div className="min-h-screen bg-background-light flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      <div
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(55,100,235,0.09),transparent)]"
        aria-hidden
      />
      <div className="relative z-10 flex w-full max-w-[1100px] bg-white shadow-premium rounded-3xl overflow-hidden min-h-[min(680px,90vh)] border border-slate-200/70 ring-1 ring-slate-900/[0.04]">
        {/* Hero — desktop */}
        <div className="hidden lg:flex flex-col justify-between w-[46%] bg-gradient-to-br from-primary via-blue-700 to-slate-950 p-12 text-white relative overflow-hidden shrink-0">
          <div className="absolute inset-0 opacity-[0.07] pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="auth-grid" width="32" height="32" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1.2" fill="white" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#auth-grid)" />
            </svg>
          </div>
          <div className="absolute -bottom-32 -right-32 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
          <div className="relative z-10">
            <Link to="/" className="inline-flex items-center gap-3 mb-10 group">
              <span className="size-11 bg-white/15 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/25 shadow-lg group-hover:bg-white/25 transition-colors">
                <span className="material-symbols-outlined text-2xl text-white">rocket_launch</span>
              </span>
              <span className="font-display text-2xl font-bold tracking-tight">BizBhar</span>
            </Link>
            <h1 className="font-display text-3xl xl:text-4xl font-extrabold leading-tight mb-4">
              Empowering <span className="text-blue-100">Indian</span> commerce
            </h1>
            <p className="text-blue-100/95 text-base leading-relaxed max-w-sm">
              Connect with verified sellers, discover quality products, and grow your business on one trusted marketplace.
            </p>
          </div>
          <div className="relative z-10 flex gap-4 items-center">
            <div className="flex -space-x-2">
              {HERO_AVATARS.map(({ alt, src }) => (
                <img
                  key={alt}
                  src={src}
                  alt={alt}
                  className="size-9 rounded-full border-2 border-white/30 bg-white/20 object-cover ring-2 ring-white/10"
                  loading="lazy"
                  decoding="async"
                />
              ))}
            </div>
            <div className="text-sm">
              <p className="font-bold text-white">Trusted marketplace</p>
              <p className="text-blue-200/90">Buyers & sellers nationwide</p>
            </div>
          </div>
        </div>

        {/* Form column */}
        <div className="flex-1 flex flex-col justify-center p-8 sm:p-10 lg:p-12 bg-white/95">
          <div className="w-full max-w-[400px] mx-auto">
            <div className="text-center mb-8">
              <h2 className="font-display text-2xl font-bold text-slate-900 mb-2">{title}</h2>
              {subtitle && <p className="text-slate-500 text-sm leading-relaxed">{subtitle}</p>}
            </div>

            <div className="flex w-full bg-slate-100/90 p-1 rounded-2xl mb-8 ring-1 ring-slate-200/80">
              <Link
                to="/login"
                className={`flex-1 py-2.5 text-sm font-semibold rounded-xl text-center transition-all ${
                  mode === 'login' ? 'bg-white shadow-sm text-primary' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Login
              </Link>
              <Link
                to="/register"
                className={`flex-1 py-2.5 text-sm font-semibold rounded-xl text-center transition-all ${
                  mode === 'register' ? 'bg-white shadow-sm text-primary' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Sign up
              </Link>
            </div>

            {children}

            <p className="mt-8 text-center">
              <Link
                to="/"
                className="text-xs font-semibold text-slate-400 hover:text-primary inline-flex items-center gap-1 transition-colors"
              >
                <span className="material-symbols-outlined text-base">home</span>
                Back to home
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
