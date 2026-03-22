import React from 'react';
import { Link } from 'react-router-dom';

const SiteFooter = () => (
  <footer className="relative bg-[#0b1220] text-slate-400 mt-auto border-t border-white/[0.06]">
    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent pointer-events-none" />
    <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-14">
      <div className="space-y-5">
        <div className="flex items-center gap-2.5 text-white">
          <span className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-blue-700 text-white shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined text-2xl">storefront</span>
          </span>
          <span className="font-display text-xl font-extrabold tracking-tight">BizBhar</span>
        </div>
        <p className="text-sm leading-relaxed text-slate-400">
          Multi-vendor marketplace connecting verified sellers with buyers — curated products and secure Stripe checkout.
        </p>
      </div>
      <div>
        <h4 className="text-white font-display font-bold mb-5 text-sm tracking-wide">Shop</h4>
        <ul className="space-y-3.5 text-sm">
          <li>
            <Link to="/products" className="hover:text-white transition-colors">
              All products
            </Link>
          </li>
          <li>
            <Link to="/products?category=Electronics" className="hover:text-white transition-colors">
              Electronics
            </Link>
          </li>
          <li>
            <Link to="/products?category=Fashion" className="hover:text-white transition-colors">
              Fashion
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <h4 className="text-white font-display font-bold mb-5 text-sm tracking-wide">Sellers</h4>
        <ul className="space-y-3.5 text-sm">
          <li>
            <Link to="/register" className="hover:text-white transition-colors">
              Sell on BizBhar
            </Link>
          </li>
          <li>
            <Link to="/seller/dashboard" className="hover:text-white transition-colors">
              Seller dashboard
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <h4 className="text-white font-display font-bold mb-5 text-sm tracking-wide">Account</h4>
        <ul className="space-y-3.5 text-sm">
          <li>
            <Link to="/login" className="hover:text-white transition-colors">
              Login
            </Link>
          </li>
          <li>
            <Link to="/profile" className="hover:text-white transition-colors">
              Profile
            </Link>
          </li>
          <li>
            <Link to="/my-orders" className="hover:text-white transition-colors">
              My orders
            </Link>
          </li>
        </ul>
      </div>
    </div>
    <div className="border-t border-white/[0.06]">
      <div className="max-w-[1200px] mx-auto px-4 py-8 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} BizBhar Marketplace. All rights reserved.
      </div>
    </div>
  </footer>
);

export default SiteFooter;
