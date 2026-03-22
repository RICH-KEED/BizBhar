import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { orderAPI } from '../services/api';
import { isSeller } from '../utils/auth';
import { formatInr } from '../utils/format';
import { PageShell, PageSection, PageHeader, Card, LoadingState, EmptyState, AlertBanner } from '../components/ui';

const statusSteps = ['PENDING', 'SHIPPED', 'DELIVERED'];

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isSeller()) {
      setLoading(false);
      return;
    }
    orderAPI
      .myOrders()
      .then((res) => setOrders(res.data))
      .catch((e) => setError(e.response?.data || e.message || 'Failed to load orders'))
      .finally(() => setLoading(false));
  }, []);

  if (isSeller()) {
    return <Navigate to="/seller/dashboard" replace />;
  }

  const stepIndex = (s) => {
    const u = (s || '').toUpperCase();
    const i = statusSteps.indexOf(u);
    return i >= 0 ? i : 0;
  };

  return (
    <PageShell>
      <PageSection narrow>
        <PageHeader
          eyebrow="Purchases"
          title="My orders"
          subtitle="Track status from payment to delivery."
          backTo="/products"
          backLabel="Shop"
        />

        {error && (
          <AlertBanner variant="error" className="mb-6" icon="error">
            {String(error)}
          </AlertBanner>
        )}

        {loading && <LoadingState message="Loading your orders…" />}

        {!loading && !error && orders.length === 0 && (
          <EmptyState
            icon="receipt_long"
            title="No orders yet"
            description="When you complete a purchase, your orders will show up here."
          >
            <Link to="/products" className="inline-flex items-center gap-2 rounded-xl bg-primary text-white font-bold px-6 py-3">
              Start shopping
            </Link>
          </EmptyState>
        )}

        <div className="space-y-6">
          {!loading &&
            orders.map((o) => (
              <Card key={o.id} className="!p-6">
                <div className="flex flex-wrap justify-between gap-4 mb-5">
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Order #{o.id}</p>
                    <p className="font-bold text-slate-900 text-lg">{o.shopName || 'Shop'}</p>
                    <p className="text-sm text-slate-500">{o.createdAt ? new Date(o.createdAt).toLocaleString() : ''}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black text-primary">{formatInr(o.total)}</p>
                    <span className="inline-block mt-2 text-xs font-bold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">
                      {o.status}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {statusSteps.map((step, i) => (
                    <div
                      key={step}
                      className={`flex-1 h-2 rounded-full transition-colors ${i <= stepIndex(o.status) ? 'bg-primary' : 'bg-slate-200'}`}
                    />
                  ))}
                </div>
                <div className="flex justify-between text-[10px] text-slate-500 mt-2 uppercase font-bold tracking-wide">
                  <span>Placed</span>
                  <span>Shipped</span>
                  <span>Delivered</span>
                </div>
              </Card>
            ))}
        </div>
      </PageSection>
    </PageShell>
  );
};

export default MyOrders;
