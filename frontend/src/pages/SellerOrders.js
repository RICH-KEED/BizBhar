import React, { useEffect, useState } from 'react';
import { orderAPI, shopAPI } from '../services/api';
import { getUser } from '../utils/auth';
import { formatInr } from '../utils/format';
import SellerLayout from '../components/SellerLayout';
import { LoadingState, EmptyState, AlertBanner, Card } from '../components/ui';

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
      <div className="min-h-screen flex items-center justify-center bg-background-light">
        <p className="text-slate-600">Seller account required.</p>
      </div>
    );
  }

  return (
    <SellerLayout
      title="Store orders"
      subtitle={shop ? shop.name : 'Incoming orders from buyers'}
    >
      <div className="p-6 lg:p-8 max-w-4xl">
        {loading && <LoadingState message="Loading orders…" />}

        {!loading && error && (
          <AlertBanner variant="error" className="mb-6" icon="error">
            {String(error)}
          </AlertBanner>
        )}

        {!loading && !error && orders.length === 0 && (
          <EmptyState
            icon="inbox"
            title="No orders yet"
            description="When buyers complete checkout, their orders will show up here."
          />
        )}

        <div className="space-y-4">
          {orders.map((o) => (
            <Card key={o.id} className="!p-6">
              <div className="flex flex-wrap justify-between gap-2">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Order #{o.id}</p>
                  <p className="text-sm text-slate-500">
                    {o.createdAt ? new Date(o.createdAt).toLocaleString() : ''}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-black text-primary">{formatInr(o.total)}</p>
                  <span className="inline-block mt-1 text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                    {o.status}
                  </span>
                </div>
              </div>
              {NEXT_STATUS[(o.status || '').toUpperCase()] && (
                <button
                  type="button"
                  onClick={() => advance(o)}
                  className="mt-4 inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-white text-sm font-bold hover:opacity-95"
                >
                  <span className="material-symbols-outlined text-[18px]">local_shipping</span>
                  Mark as {NEXT_STATUS[(o.status || '').toUpperCase()]}
                </button>
              )}
            </Card>
          ))}
        </div>
      </div>
    </SellerLayout>
  );
};

export default SellerOrders;
