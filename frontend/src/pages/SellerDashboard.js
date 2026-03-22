import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { shopAPI } from '../services/api';
import { getUser } from '../utils/auth';
import { formatInr } from '../utils/format';
import SellerLayout from '../components/SellerLayout';
import { LoadingState, Card, AlertBanner } from '../components/ui';

const SellerDashboard = () => {
  const [user] = useState(getUser());
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [needsShop, setNeedsShop] = useState(false);
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoadError('');
      const shopResponse = await shopAPI.getMyShop();
      const statsResponse = await shopAPI.getShopStats(shopResponse.data.id);
      setStats(statsResponse.data);
      setNeedsShop(false);
    } catch (err) {
      console.error('Failed to load dashboard:', err);
      const status = err.response?.status;
      const d = err.response?.data;
      const msg = typeof d === 'string' ? d : '';
      if (status === 404 || msg.includes('Shop not found')) {
        setNeedsShop(true);
        setStats(null);
      } else {
        setNeedsShop(false);
        setStats(null);
        setLoadError(msg || err.message || 'Could not load dashboard');
      }
    } finally {
      setLoading(false);
    }
  };

  const payoutProgress = stats ? (Number(stats.balance) / 5000) * 100 : 0;
  const shortName = user?.email?.split('@')[0] || 'Seller';

  if (loading) {
    return (
      <SellerLayout title={`Welcome, ${shortName}`} subtitle="Loading your store…">
        <LoadingState message="Loading your dashboard…" />
      </SellerLayout>
    );
  }

  if (loadError) {
    return (
      <SellerLayout title="Dashboard" subtitle="Something went wrong loading your store.">
        <div className="p-6 lg:p-8 max-w-xl">
          <AlertBanner variant="error" icon="error">
            {loadError}
          </AlertBanner>
          <button
            type="button"
            onClick={() => {
              setLoading(true);
              loadDashboard();
            }}
            className="mt-4 text-primary font-semibold text-sm hover:underline"
          >
            Try again
          </button>
        </div>
      </SellerLayout>
    );
  }

  if (needsShop) {
    return (
      <SellerLayout
        title={`Welcome, ${shortName}`}
        subtitle="Create your shop once — then you can publish products and see them here."
      >
        <div className="p-6 lg:p-8 max-w-xl">
          <Card variant="muted" className="!bg-amber-50/90 !border-amber-200">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Set up your shop</h3>
            <p className="text-sm text-slate-700 mb-6">
              You need a shop before you can list products. Choose a shop name and optional logo URL.
            </p>
            <Link
              to="/seller/onboard"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-white font-semibold shadow-sm hover:opacity-95"
            >
              <span className="material-symbols-outlined text-[22px]">storefront</span>
              Create my shop
            </Link>
          </Card>
        </div>
      </SellerLayout>
    );
  }

  if (!stats) {
    return null;
  }

  return (
    <SellerLayout
      title={`Welcome back, ${shortName}`}
      subtitle="Here's what's happening with your store today."
      headerRight={
        <Link
          to="/seller/products/add"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-95"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          Publish item
        </Link>
      }
    >
      <div className="p-6 lg:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 rounded-lg bg-blue-50 text-primary">
                <span className="material-symbols-outlined">payments</span>
              </div>
            </div>
            <p className="text-sm text-gray-500 font-medium">Total Revenue</p>
            <p className="text-xs text-gray-400 mt-0.5">From paid orders</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">{formatInr(stats?.totalRevenue)}</h3>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 rounded-lg bg-purple-50 text-purple-600">
                <span className="material-symbols-outlined">shopping_basket</span>
              </div>
            </div>
            <p className="text-sm text-gray-500 font-medium">Total Orders</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats?.totalOrders ?? 0}</h3>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 rounded-lg bg-orange-50 text-orange-600">
                <span className="material-symbols-outlined">inventory_2</span>
              </div>
            </div>
            <p className="text-sm text-gray-500 font-medium">Active Products</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats?.activeProducts ?? 0}</h3>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 rounded-lg bg-yellow-50 text-yellow-600">
                <span className="material-symbols-outlined">star</span>
              </div>
            </div>
            <p className="text-sm text-gray-500 font-medium">Store Rating</p>
            <p className="text-xs text-gray-400 mt-0.5">Buyer reviews (coming soon)</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">
              {stats?.rating != null ? (
                <>
                  {stats.rating}
                  <span className="text-base text-gray-400 font-normal">/5.0</span>
                </>
              ) : (
                <span className="text-gray-400 text-xl font-semibold">—</span>
              )}
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <div className="mb-4">
              <h3 className="text-lg font-bold text-gray-900">Sales Analytics</h3>
              <p className="text-sm text-gray-500">Weekly trends are not available yet — totals above are live.</p>
            </div>
            <div className="h-64 flex flex-col items-center justify-center text-center rounded-xl border border-dashed border-gray-200 bg-slate-50/80 px-6">
              <span className="material-symbols-outlined text-5xl text-gray-300 mb-3">show_chart</span>
              <p className="text-sm font-medium text-gray-700">No chart data yet</p>
              <p className="text-xs text-gray-500 mt-2 max-w-md">
                When we add time-based reporting, you will see revenue trends here. For now, use Total Revenue and
                Total Orders for real numbers from your shop.
              </p>
            </div>
          </div>

          <div className="lg:col-span-1 bg-white rounded-xl p-6 border border-gray-100 shadow-sm flex flex-col">
            <h3 className="text-lg font-bold text-gray-900 mb-1">Payout Progress</h3>
            <p className="text-sm text-gray-500 mb-6">Track your earnings towards the next payout.</p>
            <div className="flex-1 flex flex-col justify-center py-4">
              <div className="relative w-full h-40 bg-gradient-to-br from-primary to-blue-600 rounded-2xl p-6 flex flex-col justify-between text-white overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <span className="material-symbols-outlined text-[120px]">account_balance_wallet</span>
                </div>
                <div>
                  <p className="text-blue-100 text-sm font-medium">Current Balance</p>
                  <h2 className="text-3xl font-bold mt-1">{formatInr(stats?.balance)}</h2>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-medium mb-2 text-blue-100">
                    <span>Progress</span>
                    <span>{Math.round(payoutProgress)}%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div
                      className="bg-white h-2 rounded-full transition-all"
                      style={{ width: `${Math.min(100, payoutProgress)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] mt-1 text-blue-200">
                    <span>₹0</span>
                    <span>Goal: ₹5,000</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <button
                type="button"
                disabled={payoutProgress < 100}
                className="w-full bg-gray-100 text-gray-400 font-bold py-3 rounded-lg cursor-not-allowed flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-sm">lock</span>
                Request Payout
              </button>
              <p className="text-xs text-center text-gray-400 mt-2">Reach ₹5,000 to unlock payout</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            to="/seller/products"
            className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-5 shadow-sm hover:border-primary/30 hover:shadow-md transition-all group"
          >
            <div className="p-3 rounded-lg bg-primary/10 text-primary">
              <span className="material-symbols-outlined text-4xl">shopping_bag</span>
            </div>
            <div>
              <p className="font-bold text-gray-900 group-hover:text-primary">Manage your products</p>
              <p className="text-sm text-gray-500">View stock, prices, and listing previews</p>
            </div>
            <span className="material-symbols-outlined text-gray-300 group-hover:text-primary ml-auto">chevron_right</span>
          </Link>
          <Link
            to="/seller/orders"
            className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-5 shadow-sm hover:border-primary/30 hover:shadow-md transition-all group"
          >
            <div className="p-3 rounded-lg bg-purple-50 text-purple-600">
              <span className="material-symbols-outlined text-4xl">receipt_long</span>
            </div>
            <div>
              <p className="font-bold text-gray-900 group-hover:text-primary">Store orders</p>
              <p className="text-sm text-gray-500">Fulfill and update order status</p>
            </div>
            <span className="material-symbols-outlined text-gray-300 group-hover:text-primary ml-auto">chevron_right</span>
          </Link>
        </div>
      </div>
    </SellerLayout>
  );
};

export default SellerDashboard;
