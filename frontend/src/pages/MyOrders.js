import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { orderAPI } from '../services/api';

const statusSteps = ['PENDING', 'SHIPPED', 'DELIVERED'];

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    orderAPI
      .myOrders()
      .then((res) => setOrders(res.data))
      .catch((e) => setError(e.response?.data || e.message || 'Failed to load orders'))
      .finally(() => setLoading(false));
  }, []);

  const formatPrice = (p) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(Number(p));

  const stepIndex = (s) => {
    const u = (s || '').toUpperCase();
    const i = statusSteps.indexOf(u);
    return i >= 0 ? i : 0;
  };

  return (
    <div className="min-h-screen bg-[#f9fafb] px-4 py-10">
      <div className="max-w-3xl mx-auto">
        <Link to="/products" className="text-primary font-bold text-sm mb-4 inline-block">
          ← Shop
        </Link>
        <h1 className="text-3xl font-black text-slate-900 mb-2">My orders</h1>
        <p className="text-slate-500 mb-8">Track your purchases</p>

        {loading && <p className="text-slate-500">Loading…</p>}
        {error && <p className="text-red-600">{String(error)}</p>}

        {!loading && !error && orders.length === 0 && (
          <p className="text-slate-500">No orders yet.</p>
        )}

        <div className="space-y-6">
          {orders.map((o) => (
            <div key={o.id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="flex flex-wrap justify-between gap-2 mb-4">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase">Order #{o.id}</p>
                  <p className="font-bold text-slate-900">{o.shopName || 'Shop'}</p>
                  <p className="text-sm text-slate-500">{o.createdAt ? new Date(o.createdAt).toLocaleString() : ''}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-black text-primary">{formatPrice(o.total)}</p>
                  <span className="inline-block mt-1 text-xs font-bold px-2 py-1 rounded bg-slate-100 text-slate-700">
                    {o.status}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {statusSteps.map((step, i) => (
                  <div
                    key={step}
                    className={`flex-1 h-2 rounded-full ${
                      i <= stepIndex(o.status) ? 'bg-primary' : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
              <div className="flex justify-between text-[10px] text-slate-500 mt-1 uppercase font-bold">
                <span>Placed</span>
                <span>Shipped</span>
                <span>Delivered</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
