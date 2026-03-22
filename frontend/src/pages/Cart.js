import React, { useCallback, useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { cartAPI, productAPI } from '../services/api';
import { isAuthenticated, isSeller } from '../utils/auth';
import { getGuestCart, updateGuestQty, removeGuestItem } from '../utils/guestCart';
import { formatInr } from '../utils/format';
import { PageShell, PageSection, PageHeader, Card, AlertBanner, EmptyState, LoadingState } from '../components/ui';

const Cart = () => {
  const [lines, setLines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadServer = useCallback(() => {
    setLoading(true);
    setError('');
    cartAPI
      .get()
      .then((res) => setLines(res.data))
      .catch((e) => setError(e.response?.data || e.message || 'Failed to load cart'))
      .finally(() => setLoading(false));
  }, []);

  const loadGuest = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const guest = getGuestCart();
      const enriched = [];
      for (const g of guest) {
        try {
          const { data: p } = await productAPI.getById(g.productId);
          enriched.push({
            cartItemId: `guest-${g.productId}`,
            productId: g.productId,
            quantity: g.quantity,
            name: p.name,
            price: p.price,
            imageUrl: p.imageUrl,
            stock: p.stock,
            category: p.category,
            guest: true,
          });
        } catch {
          /* skip */
        }
      }
      setLines(enriched);
    } catch (e) {
      setError(e.message || 'Failed to load cart');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated() && isSeller()) return;
    if (isAuthenticated()) loadServer();
    else loadGuest();
  }, [loadServer, loadGuest]);

  if (isAuthenticated() && isSeller()) {
    return <Navigate to="/seller/dashboard" replace />;
  }

  const total = lines.reduce((sum, l) => sum + Number(l.price) * Number(l.quantity), 0);

  const changeQty = async (line, delta) => {
    const next = Number(line.quantity) + delta;
    if (next < 1) return;
    if (line.stock != null && next > line.stock) return;

    if (line.guest) {
      updateGuestQty(line.productId, next);
      loadGuest();
      return;
    }
    try {
      await cartAPI.update(line.cartItemId, { quantity: next });
      loadServer();
    } catch (e) {
      setError(e.response?.data || e.message);
    }
  };

  const remove = async (line) => {
    if (line.guest) {
      removeGuestItem(line.productId);
      loadGuest();
      return;
    }
    try {
      await cartAPI.remove(line.cartItemId);
      loadServer();
    } catch (e) {
      setError(e.response?.data || e.message);
    }
  };

  return (
    <PageShell>
      <PageSection>
        <PageHeader
          eyebrow="Cart"
          title="Your cart"
          subtitle="Review items before checkout. Quantities sync when you sign in."
          backTo="/products"
          backLabel="Continue shopping"
        />

        {!isAuthenticated() && (
          <AlertBanner variant="warning" icon="info" className="mb-8">
            You&apos;re browsing as a guest. Sign in to save your cart to your account — it merges when you log in.
          </AlertBanner>
        )}

        {error && (
          <AlertBanner variant="error" className="mb-6" icon="error">
            {String(error)}
          </AlertBanner>
        )}

        {loading && <LoadingState message="Loading your cart…" />}

        {!loading && lines.length === 0 && (
          <EmptyState
            icon="shopping_cart"
            title="Your cart is empty"
            description="Browse the marketplace and add products you love."
          >
            <Link
              to="/products"
              className="inline-flex items-center gap-2 rounded-xl bg-primary text-white font-bold px-6 py-3 shadow-lg shadow-primary/20"
            >
              Browse products
            </Link>
          </EmptyState>
        )}

        {!loading && lines.length > 0 && (
          <div className="space-y-4">
            {lines.map((line) => (
              <Card key={line.cartItemId} className="flex flex-col sm:flex-row gap-5 !p-5 sm:!p-6">
                <div className="w-full sm:w-32 h-32 bg-slate-100 rounded-xl overflow-hidden shrink-0 border border-slate-100">
                  {line.imageUrl ? (
                    <img src={line.imageUrl} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">No image</div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <Link to={`/products/${line.productId}`} className="font-bold text-lg text-slate-900 hover:text-primary">
                    {line.name}
                  </Link>
                  <p className="text-sm text-slate-500 mt-0.5">{line.category}</p>
                  <p className="text-xl font-black text-primary mt-2">{formatInr(line.price)}</p>
                </div>
                <div className="flex sm:flex-col items-center justify-between sm:justify-start gap-3 sm:min-w-[140px]">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => changeQty(line, -1)}
                      className="w-10 h-10 rounded-xl border border-slate-200 font-bold hover:bg-slate-50"
                    >
                      −
                    </button>
                    <span className="w-10 text-center font-bold">{line.quantity}</span>
                    <button
                      type="button"
                      onClick={() => changeQty(line, 1)}
                      disabled={line.stock != null && line.quantity >= line.stock}
                      className="w-10 h-10 rounded-xl border border-slate-200 font-bold hover:bg-slate-50 disabled:opacity-40"
                    >
                      +
                    </button>
                  </div>
                  <button type="button" onClick={() => remove(line)} className="text-sm font-bold text-red-600 hover:underline">
                    Remove
                  </button>
                </div>
              </Card>
            ))}

            <Card variant="muted" className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 !p-6">
              <div>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Order total</p>
                <p className="text-3xl font-black text-primary">{formatInr(total)}</p>
              </div>
              {isAuthenticated() ? (
                <Link
                  to="/checkout"
                  className="inline-flex justify-center items-center rounded-xl bg-primary text-white font-bold px-10 py-4 shadow-lg shadow-primary/25 hover:opacity-95"
                >
                  Proceed to checkout
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="inline-flex justify-center items-center rounded-xl bg-slate-900 text-white font-bold px-10 py-4 hover:bg-slate-800"
                >
                  Login to checkout
                </Link>
              )}
            </Card>
          </div>
        )}
      </PageSection>
    </PageShell>
  );
};

export default Cart;
