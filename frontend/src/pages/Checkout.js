import React, { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { isSeller } from '../utils/auth';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { checkoutAPI } from '../services/api';
import { PageShell, PageSection, PageHeader, Card, LoadingState, AlertBanner } from '../components/ui';

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setBusy(true);
    setErr('');
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
    });
    if (error) {
      setErr(error.message);
      setBusy(false);
      return;
    }
    if (paymentIntent?.status === 'succeeded') {
      navigate(`/order-success/${encodeURIComponent(paymentIntent.id)}`);
      return;
    }
    setErr('Payment was not completed.');
    setBusy(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      {err && <AlertBanner variant="error">{err}</AlertBanner>}
      <button
        type="submit"
        disabled={busy || !stripe}
        className="w-full py-4 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/20 disabled:opacity-50"
      >
        {busy ? 'Processing…' : 'Pay now'}
      </button>
    </form>
  );
}

const Checkout = () => {
  const [clientSecret, setClientSecret] = useState('');
  const [publishableKey, setPublishableKey] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isSeller()) {
      setLoading(false);
      return;
    }
    checkoutAPI
      .createPaymentIntent()
      .then((res) => {
        setClientSecret(res.data.clientSecret);
        setPublishableKey(res.data.publishableKey);
      })
      .catch((e) => setError(typeof e.response?.data === 'string' ? e.response.data : e.message || 'Failed'))
      .finally(() => setLoading(false));
  }, []);

  const stripePromise = useMemo(() => {
    if (!publishableKey) return null;
    return loadStripe(publishableKey);
  }, [publishableKey]);

  if (isSeller()) {
    return <Navigate to="/seller/dashboard" replace />;
  }

  if (loading) {
    return (
      <PageShell footer={false}>
        <PageSection narrow>
          <LoadingState message="Preparing secure checkout…" />
        </PageSection>
      </PageShell>
    );
  }

  if (error) {
    return (
      <PageShell>
        <PageSection narrow className="py-12">
          <AlertBanner variant="error" icon="error" className="mb-6">
            {String(error)}
          </AlertBanner>
          <Link to="/cart" className="font-bold text-primary hover:underline">
            ← Back to cart
          </Link>
        </PageSection>
      </PageShell>
    );
  }

  if (!clientSecret || !stripePromise) {
    return (
      <PageShell>
        <PageSection narrow>
          <p className="text-slate-500 mb-4">Could not start payment session.</p>
          <Link to="/cart" className="font-bold text-primary">
            Back to cart
          </Link>
        </PageSection>
      </PageShell>
    );
  }

  return (
    <PageShell footer={false}>
      <PageSection narrow className="py-8 sm:py-12">
        <PageHeader
          eyebrow="Secure pay"
          title="Checkout"
          subtitle="Test mode — use Stripe test cards. Your card details are encrypted by Stripe."
          backTo="/cart"
          backLabel="Cart"
        />
        <Card variant="elevated" className="max-w-2xl mx-auto">
          <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'stripe' } }}>
            <CheckoutForm />
          </Elements>
        </Card>
      </PageSection>
    </PageShell>
  );
};

export default Checkout;
