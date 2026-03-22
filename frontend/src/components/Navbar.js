import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated, getUser, logout, isSeller } from '../utils/auth';

const navLink =
  'text-sm font-medium text-slate-600 hover:text-primary transition-colors px-2 py-1 rounded-lg hover:bg-slate-100/80';

/**
 * Marketplace nav — glass header, primary accent.
 */
const Navbar = ({ variant = 'default' }) => {
  const navigate = useNavigate();
  const authed = isAuthenticated();
  const user = authed ? getUser() : null;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (variant === 'profile') {
    return (
      <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl shadow-nav">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="font-display text-lg font-bold text-primary tracking-tight">
            BizBhar
          </Link>
          <div className="flex items-center gap-3">
            <span
              className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                user?.role === 'BUYER' ? 'bg-primary-light text-primary' : 'bg-emerald-100 text-emerald-800'
              }`}
            >
              {user?.role || '—'}
            </span>
            <button
              type="button"
              onClick={handleLogout}
              className="h-9 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-medium transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/60 bg-white/80 backdrop-blur-xl shadow-nav">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-6 lg:gap-10">
          <Link to="/" className="flex items-center gap-2.5 group">
            <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-blue-700 text-white shadow-md shadow-primary/25 group-hover:shadow-glow transition-shadow">
              <span className="material-symbols-outlined text-[22px]">storefront</span>
            </span>
            <span className="font-display text-xl font-extrabold text-slate-900 tracking-tight leading-none">
              Biz<span className="text-primary">Bhar</span>
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <Link to="/products" className={`${navLink} px-2 py-1 rounded-lg`}>
              Shop
            </Link>
            <Link to="/products?search=electronics" className={`${navLink} px-2 py-1 rounded-lg`}>
              Electronics
            </Link>
            <Link to="/products?search=fashion" className={`${navLink} px-2 py-1 rounded-lg`}>
              Fashion
            </Link>
            <Link to="/products?category=Home%20%26%20Living" className={`${navLink} px-2 py-1 rounded-lg`}>
              Home & Living
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-2.5">
          {!isSeller() && (
            <Link
              to="/cart"
              className="p-2.5 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-primary transition-colors"
              aria-label="Cart"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </Link>
          )}

          {authed && user ? (
            <>
              {user.role === 'SELLER' && (
                <>
                  <Link
                    to="/seller/dashboard"
                    className="hidden sm:inline-flex items-center h-9 px-3.5 rounded-xl border border-slate-200/90 bg-white text-slate-700 text-sm font-semibold hover:border-primary/30 hover:bg-primary-light/50 transition-colors"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/seller/products"
                    className="hidden lg:inline-flex items-center h-9 px-3.5 rounded-xl border border-slate-200/90 bg-white text-slate-700 text-sm font-semibold hover:border-primary/30 hover:bg-primary-light/50 transition-colors"
                  >
                    My products
                  </Link>
                </>
              )}
              {user.role === 'BUYER' && (
                <Link
                  to="/my-orders"
                  className="hidden sm:inline-flex items-center h-9 px-3.5 rounded-xl border border-slate-200/90 bg-white text-slate-700 text-sm font-semibold hover:border-primary/30 hover:bg-primary-light/50 transition-colors"
                >
                  My orders
                </Link>
              )}
              <Link
                to="/profile"
                className="inline-flex items-center h-9 px-4 rounded-xl bg-primary text-white text-sm font-semibold shadow-md shadow-primary/25 hover:brightness-105 transition-all"
              >
                Profile
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center h-9 px-3 rounded-xl border border-slate-200/90 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/register"
                className="hidden sm:inline-flex items-center h-9 px-3.5 rounded-xl border border-slate-200/90 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors"
              >
                Become a Seller
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center h-9 px-4 rounded-xl bg-primary text-white text-sm font-semibold shadow-md shadow-primary/25 hover:brightness-105 transition-all"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
