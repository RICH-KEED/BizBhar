import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { checkoutAPI } from '../services/api';

const OrderSuccess = () => {
  const { paymentIntentId } = useParams();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');
  const [polling, setPolling] = useState(true);

  const id = paymentIntentId ? decodeURIComponent(paymentIntentId) : '';

  useEffect(() => {
    if (!id) {
      setError('Missing payment reference');
      setPolling(false);
      return undefined;
    }

    let attempts = 0;
    const maxAttempts = 40;
    const timer = setInterval(async () => {
      attempts += 1;
      try {
        const res = await checkoutAPI.orderStatus(id);
        if (res.data?.orderId) {
          setOrder(res.data);
          setPolling(false);
          clearInterval(timer);
          return;
        }
      } catch {
        // 404 until webhook creates order
      }
      if (attempts >= maxAttempts) {
        clearInterval(timer);
        setPolling(false);
        setError(
          'Order is still being confirmed. If payment succeeded, ensure the Stripe webhook is forwarded to this server (e.g. Stripe CLI: stripe listen --forward-to localhost:8080/api/webhook/stripe).'
        );
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [id]);

  return (
    <div className="min-h-screen bg-[#f9fafb] flex flex-col items-center justify-center px-4 py-12">
      {polling && !order && !error && (
        <p className="text-slate-600">Confirming your order…</p>
      )}
      {order && (
        <div className="text-center max-w-md space-y-4">
          <h1 className="text-3xl font-black text-green-700">Payment successful</h1>
          <p className="text-slate-600">
            Order <span className="font-bold text-slate-900">#{order.orderId}</span> is placed (status: {order.status}
            ).
          </p>
          <Link to="/my-orders" className="inline-block text-primary font-bold">
            View my orders
          </Link>
          <div>
            <Link to="/products" className="text-slate-500 text-sm">
              Continue shopping
            </Link>
          </div>
        </div>
      )}
      {error && !order && (
        <div className="max-w-lg text-center space-y-4">
          <p className="text-amber-800 text-sm">{error}</p>
          <Link to="/products" className="text-primary font-bold">
            Back to shop
          </Link>
        </div>
      )}
    </div>
  );
};

export default OrderSuccess;
