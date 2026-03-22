import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { productAPI } from '../services/api';
import { formatInr } from '../utils/format';
import SellerLayout from '../components/SellerLayout';
import { LoadingState, EmptyState, AlertBanner, Card } from '../components/ui';

const SellerProducts = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  /** productId -> string being edited in the input */
  const [stockDraft, setStockDraft] = useState({});
  const [savingId, setSavingId] = useState(null);
  const [stockMsg, setStockMsg] = useState('');

  const load = () => {
    setLoading(true);
    setError('');
    productAPI
      .listMyShop()
      .then((res) => setItems(res.data || []))
      .catch((e) => {
        const d = e.response?.data;
        setError(typeof d === 'string' ? d : d?.error || d?.message || e.message || 'Failed to load');
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const saveStock = async (productId) => {
    const pid = Number(productId);
    const line = items.find((x) => Number(x.id) === pid);
    if (!line) {
      setStockMsg('Could not find that product in your list. Refresh the page.');
      return;
    }
    const draftVal = stockDraft[pid] ?? stockDraft[productId];
    const rawStr =
      draftVal !== undefined && draftVal !== '' ? String(draftVal).trim() : String(line.stock ?? 0);
    const parsed = parseInt(rawStr, 10);
    if (Number.isNaN(parsed) || parsed < 0) {
      setStockMsg('Enter a valid stock number (0 or more).');
      return;
    }
    setStockMsg('');
    setSavingId(pid);
    try {
      await productAPI.update(pid, { stock: parsed });
      setStockDraft((s) => {
        const next = { ...s };
        delete next[pid];
        delete next[productId];
        return next;
      });
      setStockMsg('');
      await load();
    } catch (e) {
      const d = e.response?.data;
      setStockMsg(typeof d === 'string' ? d : d?.message || e.message || 'Could not update stock');
    } finally {
      setSavingId(null);
    }
  };

  return (
    <SellerLayout
      title="My products"
      subtitle="Everything you have published to your shop — edit details anytime from the product page."
      headerRight={
        <Link
          to="/seller/products/add"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-95 transition-opacity"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          Publish item
        </Link>
      }
    >
      <div className="p-6 lg:p-8">
        {loading && <LoadingState message="Loading your listings…" />}

        {!loading && error && (
          <AlertBanner variant="error" icon="error" className="max-w-2xl mb-6">
            <div className="space-y-2">
              <p>{error}</p>
              {(error.includes('Create a shop') || error.includes('Shop not found')) && (
                <Link to="/seller/onboard" className="inline-flex items-center gap-2 font-bold text-primary hover:underline">
                  <span className="material-symbols-outlined text-[18px]">storefront</span>
                  Create your shop
                </Link>
              )}
            </div>
          </AlertBanner>
        )}

        {!loading && !error && items.length === 0 && (
          <EmptyState
            icon="inventory_2"
            title="No products yet"
            description="Publish your first item so buyers can find it in the marketplace."
          >
            <Link
              to="/seller/products/add"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-white font-bold shadow-lg shadow-primary/25 hover:opacity-95"
            >
              <span className="material-symbols-outlined">rocket_launch</span>
              Publish your first product
            </Link>
          </EmptyState>
        )}

        {!loading && !error && items.length > 0 && stockMsg && (
          <AlertBanner variant="error" icon="error" className="max-w-2xl mb-4">
            {stockMsg}
          </AlertBanner>
        )}

        {!loading && !error && items.length > 0 && (
          <Card className="overflow-hidden !p-0" padding="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[640px]">
                <thead>
                  <tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wider">
                    <th className="px-6 py-4 font-semibold">Product</th>
                    <th className="px-6 py-4 font-semibold">Category</th>
                    <th className="px-6 py-4 font-semibold">Price</th>
                    <th className="px-6 py-4 font-semibold">Stock</th>
                    <th className="px-6 py-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {items.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="size-14 rounded-lg bg-gray-100 overflow-hidden shrink-0 border border-gray-100">
                            {p.imageUrl ? (
                              <img src={p.imageUrl} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-300">
                                <span className="material-symbols-outlined">image</span>
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{p.name}</p>
                            <p className="text-gray-500 text-xs line-clamp-1 max-w-xs">{p.description || '—'}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{p.category || 'General'}</td>
                      <td className="px-6 py-4 font-semibold text-gray-900">{formatInr(p.price)}</td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap items-center gap-2">
                          <input
                            type="number"
                            min={0}
                            inputMode="numeric"
                            className="w-24 rounded-lg border border-slate-200 px-2.5 py-1.5 text-sm font-medium text-slate-900 focus:ring-2 focus:ring-primary/25 focus:border-primary outline-none"
                            value={stockDraft[Number(p.id)] ?? String(p.stock ?? 0)}
                            onChange={(e) =>
                              setStockDraft((s) => ({ ...s, [Number(p.id)]: e.target.value }))
                            }
                            aria-label={`Stock for ${p.name}`}
                          />
                          <button
                            type="button"
                            onClick={() => saveStock(Number(p.id))}
                            disabled={savingId === Number(p.id)}
                            className="inline-flex items-center gap-1 rounded-lg bg-slate-900 text-white text-xs font-bold px-3 py-1.5 hover:bg-slate-800 disabled:opacity-50"
                          >
                            {savingId === p.id ? (
                              <span className="material-symbols-outlined text-[16px] animate-spin">sync</span>
                            ) : (
                              <span className="material-symbols-outlined text-[16px]">save</span>
                            )}
                            Save
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link
                          to={`/products/${p.id}`}
                          className="inline-flex items-center gap-1 text-primary font-semibold text-sm hover:underline"
                        >
                          View
                          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>
    </SellerLayout>
  );
};

export default SellerProducts;
