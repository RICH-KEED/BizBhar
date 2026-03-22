import React, { useState, useEffect } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { getUser, isAuthenticated, isSeller, logout } from '../utils/auth';
import { authAPI } from '../services/api';
import { formatDate } from '../utils/format';
import { PageShell, PageSection, Card, AlertBanner } from '../components/ui';

const Profile = () => {
  const navigate = useNavigate();
  const [localUser, setLocalUser] = useState(null);
  const [serverProfile, setServerProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileError, setProfileError] = useState('');

  useEffect(() => {
    if (!isAuthenticated()) {
      setLoading(false);
      return;
    }
    setLocalUser(getUser());
    authAPI
      .getProfile()
      .then((res) => setServerProfile(res.data))
      .catch(() => setProfileError('Could not refresh profile from the server. Showing saved session data.'))
      .finally(() => setLoading(false));
  }, []);

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  const email = serverProfile?.email || localUser?.email || '—';
  const role = serverProfile?.role || localUser?.role || '—';
  const memberSince = serverProfile?.createdAt || localUser?.memberSince;
  const initial = (email && email !== '—' ? email[0] : '?').toUpperCase();
  const seller = isSeller();

  if (loading) {
    return (
      <PageShell footer={false}>
        <PageSection className="flex items-center justify-center py-32">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-2 border-primary border-t-transparent mx-auto" />
            <p className="mt-4 text-sm text-slate-500">Loading your profile…</p>
          </div>
        </PageSection>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <PageSection className="max-w-5xl mx-auto py-8 sm:py-12">
        {profileError && (
          <AlertBanner variant="warning" icon="info" className="mb-8">
            {profileError}
          </AlertBanner>
        )}

        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5 space-y-6">
            <Card variant="elevated" className="overflow-hidden !p-0">
              <div className="h-24 sm:h-28 bg-gradient-to-br from-primary via-blue-600 to-indigo-900" />
              <div className="px-6 pb-6 -mt-12">
                <div className="size-24 rounded-2xl bg-white border-4 border-white shadow-xl flex items-center justify-center text-3xl font-black text-primary mb-4">
                  {initial}
                </div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Signed in as</p>
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 break-all leading-snug">{email}</h1>
                <span
                  className={`inline-flex mt-3 items-center px-3 py-1 rounded-full text-xs font-bold ${
                    seller ? 'bg-emerald-100 text-emerald-800' : 'bg-indigo-100 text-indigo-800'
                  }`}
                >
                  {role}
                </span>
              </div>
            </Card>

            <Card variant="muted" padding="p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Session</p>
                  <p className="text-sm text-slate-600">Sign out on this device.</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    navigate('/login');
                  }}
                  className="shrink-0 px-4 py-2 rounded-xl border border-slate-200 font-semibold text-slate-800 hover:bg-slate-50 text-sm"
                >
                  Log out
                </button>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-4">Account</h2>
              <Card variant="muted" padding="p-0" className="divide-y divide-slate-100">
                <div className="px-5 py-4 flex justify-between gap-4">
                  <span className="text-sm text-slate-500">Member since</span>
                  <span className="text-sm font-semibold text-slate-900 text-right">{formatDate(memberSince)}</span>
                </div>
                <div className="px-5 py-4 flex justify-between gap-4">
                  <span className="text-sm text-slate-500">Account type</span>
                  <span className="text-sm font-semibold text-slate-900">{seller ? 'Seller' : 'Buyer'}</span>
                </div>
                <div className="px-5 py-4 flex justify-between gap-4">
                  <span className="text-sm text-slate-500">Email</span>
                  <span className="text-sm font-semibold text-slate-900 break-all text-right">{email}</span>
                </div>
              </Card>
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-4">{seller ? 'Seller workspace' : 'Shopping'}</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {seller ? (
                  <>
                    <QuickLink to="/seller/dashboard" icon="dashboard" title="Dashboard" subtitle="Sales and store overview" />
                    <QuickLink to="/seller/products" icon="shopping_bag" title="My products" subtitle="Listings and inventory" />
                    <QuickLink to="/seller/products/add" icon="add_circle" title="Add product" subtitle="Publish a new item" />
                    <QuickLink to="/seller/orders" icon="receipt_long" title="Store orders" subtitle="Fulfill customer orders" />
                    <QuickLink to="/products" icon="travel_explore" title="Browse marketplace" subtitle="Preview catalog (read-only)" />
                  </>
                ) : (
                  <>
                    <QuickLink to="/products" icon="storefront" title="Browse products" subtitle="Discover and shop" />
                    <QuickLink to="/cart" icon="shopping_cart" title="Your cart" subtitle="Review before checkout" />
                    <QuickLink to="/my-orders" icon="receipt_long" title="My orders" subtitle="Track purchases" />
                  </>
                )}
              </div>
            </div>

            {seller && (
              <Card variant="muted" padding="p-4" className="flex gap-3 text-sm text-slate-600">
                <span className="material-symbols-outlined text-slate-400 shrink-0">info</span>
                <p>
                  Seller accounts are for running your store. To buy items, use a separate buyer account — cart and checkout are
                  disabled while you&apos;re signed in as a seller.
                </p>
              </Card>
            )}
          </div>
        </div>
      </PageSection>
    </PageShell>
  );
};

function QuickLink({ to, icon, title, subtitle }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 bg-white hover:border-primary/40 hover:bg-primary-light/30 transition-colors group"
    >
      <span className="material-symbols-outlined text-slate-400 group-hover:text-primary text-2xl shrink-0">{icon}</span>
      <div className="min-w-0 flex-1">
        <p className="font-bold text-slate-900">{title}</p>
        <p className="text-xs text-slate-500">{subtitle}</p>
      </div>
      <span className="material-symbols-outlined text-slate-300 group-hover:text-primary shrink-0">chevron_right</span>
    </Link>
  );
}

export default Profile;
