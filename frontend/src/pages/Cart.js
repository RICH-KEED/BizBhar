import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { cartAPI, productAPI } from '../services/api';
import { isAuthenticated } from '../utils/auth';
import { getGuestCart, updateGuestQty, removeGuestItem } from '../utils/guestCart';

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
          // drop missing products
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
    if (isAuthenticated()) loadServer();
    else loadGuest();
  }, [loadServer, loadGuest]);

  const formatPrice = (p) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(Number(p));

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
    <div className="min-h-screen bg-[#f9fafb] text-slate-900">
      <header className="border-b border-gray-200 bg-white px-4 py-3">
        <div className="max-w-[960px] mx-auto flex justify-between items-center">
          <Link to="/products" className="text-primary font-bold">
            ← Continue shopping
          </Link>
          <Link to="/" className="text-sm font-semibold text-slate-600">
            Home
          </Link>
        </div>
      </header>

      <main className="max-w-[960px] mx-auto px-4 py-10">
        <h1 className="text-3xl font-black mb-2">Your cart</h1>
        {!isAuthenticated() && (
          <p className="text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-4 py-2 mb-6">
            You are browsing as a guest. Sign in to save your cart to your account — it will merge when you log in.
          </p>
        )}

        {loading && <p className="text-slate-500">Loading...</p>}
        {error && <p className="text-red-600 mb-4">{String(error)}</p>}

        {!loading && lines.length === 0 && <p className="text-slate-500">Your cart is empty.</p>}

        {!loading && lines.length > 0 && (
          <div className="space-y-4">
            {lines.map((line) => (
              <div
                key={line.cartItemId}
                className="flex flex-col sm:flex-row gap-4 bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
              >
                <div className="w-full sm:w-28 h-28 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                  {line.imageUrl ? (
                    <img src={line.imageUrl} alt={line.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-slate-400">No image</div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <Link to={`/products/${line.productId}`} className="font-bold text-slate-900 hover:text-primary">
                    {line.name}
                  </Link>
                  <p className="text-sm text-slate-500">{line.category}</p>
                  <p className="text-lg font-black text-primary mt-1">{formatPrice(line.price)}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => changeQty(line, -1)}
                    className="w-10 h-10 rounded-lg border border-gray-200 font-bold"
                  >
                    −
                  </button>
                  <span className="w-8 text-center font-bold">{line.quantity}</span>
                  <button
                    type="button"
                    onClick={() => changeQty(line, 1)}
                    disabled={line.stock != null && line.quantity >= line.stock}
                    className="w-10 h-10 rounded-lg border border-gray-200 font-bold disabled:opacity-40"
                  >
                    +
                  </button>
                  <button
                    type="button"
                    onClick={() => remove(line)}
                    className="text-sm text-red-600 font-bold ml-2"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div className="flex justify-between items-center pt-6 border-t border-gray-200">
              <p className="text-xl font-black">Total</p>
              <p className="text-2xl font-black text-primary">{formatPrice(total)}</p>
            </div>

            {isAuthenticated() && (
              <Link
                to="/checkout"
                className="inline-block w-full sm:w-auto text-center bg-primary text-white font-bold px-8 py-4 rounded-xl"
              >
                Proceed to checkout
              </Link>
            )}
            {!isAuthenticated() && (
              <Link to="/login" className="inline-block text-center bg-slate-900 text-white font-bold px-8 py-4 rounded-xl">
                Login to checkout
              </Link>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Cart;
