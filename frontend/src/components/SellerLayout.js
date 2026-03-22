import React from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { getUser, logout } from '../utils/auth';

const navClass = ({ isActive }) =>
  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
    isActive
      ? 'bg-white/10 text-white shadow-lg shadow-black/20 border border-white/10'
      : 'text-slate-400 hover:bg-white/5 hover:text-white border border-transparent'
  }`;

const SellerLayout = ({ title, subtitle, children, headerRight }) => {
  const navigate = useNavigate();
  const user = getUser();

  if (!user || user.role !== 'SELLER') {
    return (
      <div className="min-h-screen bg-background-light flex flex-col items-center justify-center gap-4 p-6">
        <p className="text-slate-600">Seller account required.</p>
        <Link to="/login" className="text-primary font-semibold">
          Sign in
        </Link>
      </div>
    );
  }

  const shortName = user.email?.split('@')[0] || 'Seller';

  return (
    <div className="flex min-h-screen w-full overflow-hidden bg-slate-100">
      <aside className="flex w-64 flex-col justify-between bg-gradient-to-b from-[#0f172a] via-[#0c1322] to-[#020617] text-white border-r border-white/[0.06] shrink-0 min-h-screen overflow-y-auto shadow-xl">
        <div className="flex flex-col gap-6 p-6">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-2xl border border-white/10 bg-gradient-to-br from-primary/40 to-blue-900/80 flex items-center justify-center shadow-lg shadow-primary/20 group-hover:border-white/20 transition-colors">
              <span className="material-symbols-outlined text-white text-2xl">storefront</span>
            </div>
            <div>
              <h1 className="font-display text-lg font-bold text-white leading-tight">BizBhar</h1>
              <p className="text-slate-500 text-xs font-medium">Seller</p>
            </div>
          </Link>

          <nav className="flex flex-col gap-1.5 mt-2">
            <NavLink to="/seller/dashboard" end className={navClass}>
              <span className="material-symbols-outlined text-[24px]">dashboard</span>
              Dashboard
            </NavLink>
            <NavLink to="/seller/products" end className={navClass}>
              <span className="material-symbols-outlined text-[24px]">shopping_bag</span>
              My products
            </NavLink>
            <NavLink to="/seller/products/add" className={navClass}>
              <span className="material-symbols-outlined text-[24px]">add_circle</span>
              Publish item
            </NavLink>
            <NavLink to="/seller/orders" className={navClass}>
              <span className="material-symbols-outlined text-[24px]">receipt_long</span>
              Orders
            </NavLink>
            <Link
              to="/products"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-500 hover:text-white hover:bg-white/5 transition-colors border border-transparent"
            >
              <span className="material-symbols-outlined text-[24px]">travel_explore</span>
              View storefront
            </Link>
          </nav>
        </div>

        <div className="p-6 border-t border-white/[0.06]">
          <button
            type="button"
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-white/5 border border-white/10 py-3 text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">logout</span>
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-h-screen overflow-hidden bg-gradient-to-br from-background-light to-slate-100/80">
        <header className="min-h-[5rem] w-full flex flex-wrap items-center justify-between gap-4 px-6 lg:px-8 py-4 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shrink-0 shadow-sm">
          <div>
            <h2 className="font-display text-xl lg:text-2xl font-bold text-slate-900">{title}</h2>
            {subtitle && <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>}
          </div>
          <div className="flex items-center gap-3">
            {headerRight}
            <span className="hidden sm:inline text-sm text-slate-500">
              Hi, <span className="font-semibold text-slate-800">{shortName}</span>
            </span>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto w-full">{children}</div>
        </div>
      </main>
    </div>
  );
};

export default SellerLayout;
