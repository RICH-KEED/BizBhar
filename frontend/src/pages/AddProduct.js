import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { productAPI, shopAPI } from '../services/api';
import { getUser, isAuthenticated } from '../utils/auth';
import SellerLayout from '../components/SellerLayout';
import { Card, AlertBanner } from '../components/ui';

const CATEGORIES = [
  'Spices',
  'Handloom',
  'Crafts',
  'Food',
  'Electronics',
  'Fashion',
  'Home & Living',
  'Beauty',
  'Sports',
  'General',
];

const AddProduct = () => {
  const navigate = useNavigate();
  const user = isAuthenticated() ? getUser() : null;
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    stock: '0',
    imageUrl: '',
    category: 'General',
  });
  const [preview, setPreview] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [shopMissing, setShopMissing] = useState(false);

  useEffect(() => {
    if (!user || user.role !== 'SELLER') return;
    shopAPI
      .getMyShop()
      .then(() => setShopMissing(false))
      .catch((err) => {
        const status = err.response?.status;
        const d = err.response?.data;
        const msg = typeof d === 'string' ? d : '';
        if (status === 404 || msg.includes('Shop not found')) setShopMissing(true);
      });
  }, [user]);

  if (!user || user.role !== 'SELLER') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-4 bg-background-light">
        <p className="text-slate-600">Only sellers can publish items.</p>
        <Link to="/register" className="text-primary font-bold">
          Register as seller
        </Link>
      </div>
    );
  }

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (name === 'imageUrl') setPreview(value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);
    productAPI
      .create({
        name: form.name,
        description: form.description,
        price: Number(form.price),
        stock: parseInt(form.stock, 10) || 0,
        imageUrl: form.imageUrl || null,
        category: form.category,
      })
      .then((res) => navigate(`/products/${res.data.id}`))
      .catch((err) => {
        const d = err.response?.data;
        const msg = typeof d === 'string' ? d : d?.error || d?.message || err.message || 'Failed to publish';
        setError(msg);
        if (typeof d === 'string' && (d.includes('Create a shop') || d.includes('Shop not found'))) {
          setShopMissing(true);
        }
      })
      .finally(() => setSaving(false));
  };

  return (
    <SellerLayout
      title="Publish an item"
      subtitle="Add title, price, stock, and an image URL — buyers will see it on the marketplace immediately."
      headerRight={
        <Link
          to="/seller/products"
          className="text-sm font-semibold text-gray-600 hover:text-primary"
        >
          ← My products
        </Link>
      }
    >
      <div className="p-6 lg:p-8 max-w-5xl mx-auto">
        {shopMissing && (
          <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950 flex flex-wrap items-center justify-between gap-3">
            <span>Create your shop first — then you can publish products.</span>
            <Link
              to="/seller/onboard"
              className="inline-flex items-center gap-1.5 font-semibold text-primary hover:underline shrink-0"
            >
              <span className="material-symbols-outlined text-[18px]">storefront</span>
              Shop setup
            </Link>
          </div>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10">
          <form onSubmit={onSubmit} className="lg:col-span-3 space-y-5">
            {error && (
              <AlertBanner variant="error" icon="error">
                {error}
              </AlertBanner>
            )}

            <Card className="space-y-5">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Basics</h3>
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1.5">Product name</label>
                <input
                  name="name"
                  required
                  placeholder="e.g. Kashmiri Saffron (1g)"
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-primary/30 focus:border-primary transition-shadow"
                  value={form.name}
                  onChange={onChange}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1.5">Description</label>
                <textarea
                  name="description"
                  rows={5}
                  placeholder="What makes this product special? Materials, origin, care…"
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-primary/30 focus:border-primary resize-y min-h-[120px]"
                  value={form.description}
                  onChange={onChange}
                />
              </div>
            </Card>

            <Card className="space-y-5">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Pricing & inventory</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1.5">Price (₹)</label>
                  <input
                    name="price"
                    type="number"
                    min="0"
                    step="0.01"
                    required
                    className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:ring-2 focus:ring-primary/30 focus:border-primary"
                    value={form.price}
                    onChange={onChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1.5">Stock units</label>
                  <input
                    name="stock"
                    type="number"
                    min="0"
                    className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:ring-2 focus:ring-primary/30 focus:border-primary"
                    value={form.stock}
                    onChange={onChange}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1.5">Category</label>
                <select
                  name="category"
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 bg-white focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  value={form.category}
                  onChange={onChange}
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </Card>

            <Card className="space-y-5">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Media</h3>
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1.5">Image URL</label>
                <input
                  name="imageUrl"
                  type="url"
                  placeholder="https://… (paste a direct image link)"
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  value={form.imageUrl}
                  onChange={onChange}
                />
                <p className="text-xs text-slate-500 mt-2">Use a public HTTPS image URL. You can use picsum.photos for testing.</p>
              </div>
            </Card>

            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-white font-bold shadow-lg shadow-primary/25 hover:opacity-95 disabled:opacity-60 transition-opacity"
              >
                <span className="material-symbols-outlined text-[22px]">publish</span>
                {saving ? 'Publishing…' : 'Publish to marketplace'}
              </button>
              <Link
                to="/seller/products"
                className="inline-flex items-center justify-center rounded-xl border border-gray-200 px-6 py-3.5 font-semibold text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </Link>
            </div>
          </form>

          <aside className="lg:col-span-2">
            <div className="sticky top-6 space-y-4">
              <Card className="!p-0 overflow-hidden" padding="p-0">
                <div className="bg-gradient-to-br from-primary to-blue-700 px-4 py-3 text-white">
                  <p className="text-xs font-semibold uppercase tracking-wider opacity-90">Preview</p>
                  <p className="text-sm font-medium">How buyers may see your listing</p>
                </div>
                <div className="aspect-[4/3] bg-gray-100 relative">
                  {preview || form.imageUrl ? (
                    <img
                      src={preview || form.imageUrl}
                      alt=""
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 p-6 text-center">
                      <span className="material-symbols-outlined text-5xl mb-2 opacity-50">add_photo_alternate</span>
                      <p className="text-sm">Add an image URL to preview</p>
                    </div>
                  )}
                </div>
                <div className="p-4 space-y-2">
                  <p className="font-bold text-gray-900 line-clamp-2">{form.name || 'Product name'}</p>
                  <p className="text-xs text-gray-500 line-clamp-3">{form.description || 'Description will appear here.'}</p>
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <span className="text-lg font-bold text-primary">
                      {form.price ? `₹${Number(form.price).toLocaleString('en-IN')}` : '₹ —'}
                    </span>
                    <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {form.category}
                    </span>
                  </div>
                </div>
              </Card>
              <Card variant="muted" className="!bg-blue-50/90 !border-blue-100" padding="p-4">
                <p className="font-semibold flex items-center gap-2 mb-1">
                  <span className="material-symbols-outlined text-[20px]">tips_and_updates</span>
                  Tip
                </p>
                <p className="text-blue-800/90">
                  Clear photos and honest descriptions improve trust. You can open the live product page after publishing.
                </p>
              </Card>
            </div>
          </aside>
        </div>
      </div>
    </SellerLayout>
  );
};

export default AddProduct;
