import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { shopAPI } from '../services/api';
import { getUser } from '../utils/auth';
import { PageShell, PageSection, PageHeader, Card, AlertBanner, LoadingState } from '../components/ui';

const SellerOnboard = () => {
  const navigate = useNavigate();
  const user = getUser();
  const [formData, setFormData] = useState({
    name: '',
    logoUrl: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  /** Only sellers need the “already have a shop?” check */
  const [checkingShop, setCheckingShop] = useState(() => user?.role === 'SELLER');

  useEffect(() => {
    if (user?.role !== 'SELLER') return;
    shopAPI
      .getMyShop()
      .then(() => {
        navigate('/seller/dashboard', { replace: true });
      })
      .catch((err) => {
        const status = err.response?.status;
        if (status === 404) {
          setCheckingShop(false);
          return;
        }
        const d = err.response?.data;
        const msg = typeof d === 'string' ? d : err.message || 'Could not verify your shop';
        setError(msg);
        setCheckingShop(false);
      });
  }, [navigate, user?.role]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (user.role !== 'SELLER') {
    return <Navigate to="/" replace />;
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await shopAPI.createShop(formData);
      navigate('/seller/dashboard');
    } catch (err) {
      const d = err.response?.data;
      setError(typeof d === 'string' ? d : d?.message || 'Failed to create shop');
    } finally {
      setLoading(false);
    }
  };

  if (checkingShop) {
    return (
      <PageShell footer={false}>
        <PageSection narrow className="py-24">
          <LoadingState message="Checking your shop…" />
        </PageSection>
      </PageShell>
    );
  }

  return (
    <PageShell footer={false}>
      <PageSection narrow className="py-10 sm:py-14">
        <PageHeader
          eyebrow="Seller setup"
          title="Create your shop"
          subtitle="One quick step — then you can publish products and receive orders."
        />

        <Card variant="elevated" className="max-w-xl mx-auto">
          <div className="flex justify-center mb-8">
            <div className="size-16 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/30">
              <span className="material-symbols-outlined text-4xl">storefront</span>
            </div>
          </div>

          {error && (
            <AlertBanner variant="error" className="mb-6" icon="error">
              {typeof error === 'string' ? error : 'Failed to create shop'}
            </AlertBanner>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2" htmlFor="shop-name">
                Shop name *
              </label>
              <input
                id="shop-name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/25 focus:border-primary outline-none transition-all"
                placeholder="e.g. Spice Route Co."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2" htmlFor="shop-logo">
                Logo URL (optional)
              </label>
              <input
                id="shop-logo"
                type="url"
                name="logoUrl"
                value={formData.logoUrl}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/25 focus:border-primary outline-none transition-all"
                placeholder="https://…"
              />
              <p className="text-xs text-slate-500 mt-1.5">You can update this later from your shop settings.</p>
            </div>

            <div className="rounded-xl bg-blue-50 border border-blue-100 p-4">
              <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-blue-600 text-[20px]">tips_and_updates</span>
                What happens next
              </h4>
              <ul className="text-sm text-blue-800 space-y-1.5">
                <li className="flex gap-2">
                  <span className="text-blue-500">✓</span> Your shop is created instantly
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-500">✓</span> Access the seller dashboard
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-500">✓</span> Add products and manage orders
                </li>
              </ul>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/25 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? 'Creating…' : 'Create my shop'}
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </form>
        </Card>
      </PageSection>
    </PageShell>
  );
};

export default SellerOnboard;
