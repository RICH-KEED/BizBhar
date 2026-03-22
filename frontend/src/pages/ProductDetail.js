import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { cartAPI, productAPI } from '../services/api';
import { isAuthenticated, isSeller } from '../utils/auth';
import { addGuestItem, getGuestQty } from '../utils/guestCart';
import { formatInr } from '../utils/format';
import { PageShell, PageSection, Breadcrumbs, Card, AlertBanner } from '../components/ui';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [adding, setAdding] = useState(false);
  const [msg, setMsg] = useState('');
  /** Units of this product already in cart (server or guest). */
  const [cartQty, setCartQty] = useState(0);

  useEffect(() => {
    setLoading(true);
    setError('');
    productAPI
      .getById(id)
      .then((res) => setProduct(res.data))
      .catch((e) => setError(e.response?.data || e.message || 'Not found'))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (!product) return;
    if (isAuthenticated()) {
      cartAPI
        .get()
        .then((res) => {
          const line = res.data.find((l) => Number(l.productId) === Number(product.id));
          setCartQty(line ? Number(line.quantity) : 0);
        })
        .catch(() => setCartQty(0));
    } else {
      setCartQty(getGuestQty(product.id));
    }
  }, [product?.id]);

  const stock = product ? Number(product.stock ?? 0) : 0;
  /** How many more can be added without exceeding warehouse stock. */
  const available = Math.max(0, stock - cartQty);
  const inStock = stock > 0;

  const handleAddToCart = async () => {
    if (!product || available <= 0) return;
    setMsg('');
    setAdding(true);
    try {
      if (isAuthenticated()) {
        await cartAPI.add({ productId: product.id, quantity: 1 });
        setCartQty((q) => q + 1);
      } else {
        const next = getGuestQty(product.id) + 1;
        if (next > stock) {
          setMsg(`Cannot add more than available stock (${stock})`);
          return;
        }
        addGuestItem(product.id, 1);
        setCartQty(getGuestQty(product.id));
      }
      setMsg('Added to cart.');
    } catch (e) {
      setMsg(e.response?.data || e.message || 'Could not add to cart');
    } finally {
      setAdding(false);
    }
  };

  if (loading) {
    return (
      <PageShell footer={false}>
        <PageSection>
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-2 border-primary border-t-transparent" />
            <p className="text-slate-500 text-sm font-medium">Loading product…</p>
          </div>
        </PageSection>
      </PageShell>
    );
  }

  if (error || !product) {
    return (
      <PageShell>
        <PageSection narrow className="py-16">
          <Card variant="muted" className="text-center py-12">
            <span className="material-symbols-outlined text-5xl text-red-300 mb-4 block">inventory_2</span>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Product unavailable</h1>
            <p className="text-slate-500 mb-8">{String(error)}</p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 rounded-xl bg-primary text-white font-bold px-6 py-3 shadow-lg shadow-primary/20"
            >
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
              Back to catalog
            </Link>
          </Card>
        </PageSection>
      </PageShell>
    );
  }

  return (
    <PageShell footer={false}>
      <PageSection className="py-6 sm:py-8">
        <Breadcrumbs
          className="mb-8"
          items={[
            { label: 'Home', to: '/' },
            { label: 'Products', to: '/products' },
            { label: product.name },
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-7">
            <div className="rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm aspect-[4/5] max-h-[min(640px,78vh)]">
              {product.imageUrl ? (
                <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 bg-slate-50 gap-2">
                  <span className="material-symbols-outlined text-6xl text-slate-300">image</span>
                  <span className="text-sm font-medium">No image</span>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            <div>
              <p className="text-xs font-bold text-primary uppercase tracking-wider mb-2">{product.category || 'General'}</p>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight tracking-tight">{product.name}</h1>
            </div>

            <div className="flex flex-wrap gap-2">
              {!inStock ? (
                <span className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full">
                  Out of stock
                </span>
              ) : available > 0 ? (
                <span className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-800 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-full">
                  <span className="material-symbols-outlined text-[18px]">check_circle</span>
                  In stock ({available} available
                  {cartQty > 0 ? ` • ${cartQty} in your cart` : ''})
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-sm font-bold text-amber-900 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-full">
                  <span className="material-symbols-outlined text-[18px]">shopping_cart</span>
                  Max in cart ({cartQty} of {stock})
                </span>
              )}
            </div>

            <Card variant="muted" padding="p-6" className="!bg-primary-light/40 !border-primary/15">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Price</p>
              <p className="text-4xl font-black text-primary">{formatInr(product.price)}</p>
              <p className="text-xs text-slate-500 mt-2">Taxes & shipping calculated at checkout.</p>
            </Card>

            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">Description</h3>
              <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">{product.description || 'No description provided.'}</p>
            </div>

            {isSeller() ? (
              <div className="space-y-3">
                <AlertBanner variant="warning" icon="storefront" className="text-left">
                  Seller accounts can&apos;t place orders. Use the dashboard to manage your own listings.
                </AlertBanner>
                <Link
                  to="/seller/dashboard"
                  className="w-full flex items-center justify-center gap-2 rounded-xl border-2 border-primary bg-white text-primary font-bold py-4 text-lg hover:bg-primary-light/30 transition-colors"
                >
                  <span className="material-symbols-outlined text-[24px]">dashboard</span>
                  Go to seller dashboard
                </Link>
              </div>
            ) : inStock && available > 0 ? (
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={adding}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary text-white font-bold py-4 text-lg shadow-xl shadow-primary/25 hover:opacity-95 disabled:opacity-50 transition-opacity"
              >
                <span className="material-symbols-outlined text-[24px]">add_shopping_cart</span>
                {adding ? 'Adding…' : 'Add to cart'}
              </button>
            ) : inStock ? (
              <button type="button" disabled className="w-full rounded-xl bg-slate-200 text-slate-600 font-bold py-4 cursor-not-allowed">
                All available quantity in cart
              </button>
            ) : (
              <button type="button" disabled className="w-full rounded-xl bg-slate-200 text-slate-500 font-bold py-4 cursor-not-allowed">
                Out of stock
              </button>
            )}

            {!isSeller() && msg && (
              <AlertBanner variant={msg.includes('Could not') ? 'error' : 'success'} icon={msg.includes('Could not') ? 'error' : 'check_circle'}>
                <span className="flex flex-wrap items-center gap-2">
                  {msg}
                  {!msg.includes('Could not') && (
                    <Link to="/cart" className="font-bold underline text-primary">
                      View cart
                    </Link>
                  )}
                </span>
              </AlertBanner>
            )}

            <Card variant="muted" padding="p-4" className="flex gap-3 text-sm text-slate-600">
              <span className="material-symbols-outlined text-slate-400 shrink-0">verified_user</span>
              <span>Secure checkout with Stripe. Purchase from independent sellers on BizBhar.</span>
            </Card>
          </div>
        </div>
      </PageSection>
    </PageShell>
  );
};

export default ProductDetail;
