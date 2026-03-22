import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { checkoutAPI } from '../services/api';

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
    <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
      <PaymentElement />
      {err && <p className="text-red-600 text-sm">{err}</p>}
      <button
        type="submit"
        disabled={busy || !stripe}
        className="w-full py-4 rounded-xl bg-primary text-white font-bold disabled:opacity-50"
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f9fafb]">
        <p className="text-slate-500">Preparing checkout…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#f9fafb] px-4 py-12 max-w-lg mx-auto">
        <p className="text-red-600 mb-4">{String(error)}</p>
        <Link to="/cart" className="text-primary font-bold">
          Back to cart
        </Link>
      </div>
    );
  }

  if (!clientSecret || !stripePromise) {
    return (
      <div className="min-h-screen bg-[#f9fafb] px-4 py-12">
        <p className="text-slate-500">Could not start payment session.</p>
        <Link to="/cart" className="text-primary font-bold">
          Back to cart
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9fafb] px-4 py-10">
      <div className="max-w-xl mx-auto">
        <Link to="/cart" className="text-primary font-bold text-sm mb-6 inline-block">
          ← Cart
        </Link>
        <h1 className="text-3xl font-black text-slate-900 mb-2">Checkout</h1>
        <p className="text-slate-500 mb-8">Secure payment with Stripe (test mode)</p>
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret,
            appearance: { theme: 'stripe' },
          }}
        >
          <CheckoutForm />
        </Elements>
      </div>
    </div>
  );
};

export default Checkout;
