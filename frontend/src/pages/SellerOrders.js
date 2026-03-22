import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { orderAPI, shopAPI } from '../services/api';
import { getUser } from '../utils/auth';

const NEXT_STATUS = {
  PENDING: 'SHIPPED',
  SHIPPED: 'DELIVERED',
  DELIVERED: null,
};

const SellerOrders = () => {
  const user = getUser();
  const [shop, setShop] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = () => {
    setLoading(true);
    setError('');
    shopAPI
      .getMyShop()
      .then((res) => {
        setShop(res.data);
        return orderAPI.shopOrders(res.data.id);
      })
      .then((res) => setOrders(res.data))
      .catch((e) => setError(e.response?.data || e.message || 'Failed to load'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const formatPrice = (p) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(Number(p));

  const advance = async (order) => {
    const next = NEXT_STATUS[(order.status || '').toUpperCase()];
    if (!next) return;
    try {
      await orderAPI.updateStatus(order.id, { status: next });
      load();
    } catch (e) {
      setError(e.response?.data || e.message);
    }
  };

  if (user?.role !== 'SELLER') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-600">Seller account required.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9fafb] px-4 py-10">
      <div className="max-w-3xl mx-auto">
        <Link to="/seller/dashboard" className="text-primary font-bold text-sm mb-4 inline-block">
          ← Dashboard
        </Link>
        <h1 className="text-3xl font-black text-slate-900 mb-2">Store orders</h1>
        {shop && <p className="text-slate-500 mb-8">{shop.name}</p>}

        {loading && <p className="text-slate-500">Loading…</p>}
        {error && <p className="text-red-600">{String(error)}</p>}

        {!loading && !error && orders.length === 0 && (
          <p className="text-slate-500">No orders yet.</p>
        )}

        <div className="space-y-4">
          {orders.map((o) => (
            <div key={o.id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="flex flex-wrap justify-between gap-2">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase">Order #{o.id}</p>
                  <p className="text-sm text-slate-500">{o.createdAt ? new Date(o.createdAt).toLocaleString() : ''}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-black text-primary">{formatPrice(o.total)}</p>
                  <span className="inline-block mt-1 text-xs font-bold px-2 py-1 rounded bg-slate-100 text-slate-700">
                    {o.status}
                  </span>
                </div>
              </div>
              {NEXT_STATUS[(o.status || '').toUpperCase()] && (
                <button
                  type="button"
                  onClick={() => advance(o)}
                  className="mt-4 px-4 py-2 rounded-lg bg-primary text-white text-sm font-bold"
                >
                  Mark as {NEXT_STATUS[(o.status || '').toUpperCase()]}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SellerOrders;
