import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { checkoutAPI } from '../services/api';
import { PageShell, PageSection, Card, LoadingState, AlertBanner } from '../components/ui';

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
        if (res.data?.ready && res.data?.orderId) {
          setOrder(res.data);
          setPolling(false);
          clearInterval(timer);
          return;
        }
      } catch (err) {
        const status = err?.response?.status;
        const body = err?.response?.data;
        const msg = typeof body === 'string' ? body : '';
        if (status === 403) {
          clearInterval(timer);
          setPolling(false);
          setError('You cannot view this order with the current account.');
          return;
        }
        if (status === 401) {
          clearInterval(timer);
          setPolling(false);
          setError(
            msg ||
              'Sign in required or session expired. Sign in again — your payment may still be recorded; check My orders.'
          );
          return;
        }
        if (status === 400) {
          clearInterval(timer);
          setPolling(false);
          setError(msg || 'Could not check order status.');
          return;
        }
        /* transient network errors — keep polling */
      }
      if (attempts >= maxAttempts) {
        clearInterval(timer);
        setPolling(false);
        setError(
          'Could not confirm your order in time. If Stripe is configured and you were charged, try refreshing this page or open My orders. For webhooks only: stripe listen --forward-to http://localhost:8081/api/webhook/stripe'
        );
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [id]);

  return (
    <PageShell footer={false}>
      <PageSection narrow className="py-16 sm:py-24">
        {polling && !order && !error && (
          <div className="max-w-md mx-auto text-center">
            <LoadingState message="Confirming your order…" />
          </div>
        )}

        {order && (
          <Card variant="elevated" className="max-w-lg mx-auto text-center !py-12">
            <div className="inline-flex size-16 rounded-full bg-emerald-100 text-emerald-600 items-center justify-center mb-6">
              <span className="material-symbols-outlined text-4xl">check_circle</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3">Payment successful</h1>
            <p className="text-slate-600 mb-8">
              Order <span className="font-bold text-slate-900">#{order.orderId}</span> is placed (status: {order.status}).
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/my-orders" className="btn-primary px-6 py-3 shadow-lg shadow-primary/20">
                View my orders
              </Link>
              <Link to="/products" className="btn-secondary btn-secondary--pad">
                Continue shopping
              </Link>
            </div>
          </Card>
        )}

        {error && !order && (
          <Card className="max-w-lg mx-auto !p-8 text-center">
            <AlertBanner variant="warning" icon="schedule" className="mb-6 text-left">
              {error}
            </AlertBanner>
            <Link to="/products" className="font-bold text-primary hover:underline">
              Back to shop
            </Link>
          </Card>
        )}
      </PageSection>
    </PageShell>
  );
};

export default OrderSuccess;
