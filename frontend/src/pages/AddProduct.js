import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { productAPI } from '../services/api';
import { getUser, isAuthenticated } from '../utils/auth';

const AddProduct = () => {
  const navigate = useNavigate();
  const user = isAuthenticated() ? getUser() : null;
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    stock: '0',
    imageUrl: '',
    category: 'Electronics',
  });
  const [preview, setPreview] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  if (!user || user.role !== 'SELLER') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-4">
        <p className="text-slate-600">Only sellers can add products.</p>
        <Link to="/login" className="text-primary font-bold">
          Login as seller
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
      .catch((err) => setError(err.response?.data || err.message || 'Failed'))
      .finally(() => setSaving(false));
  };

  return (
    <div className="min-h-screen bg-[#f9fafb] py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <Link to="/seller/dashboard" className="text-primary font-bold mb-6 inline-block">
          ← Dashboard
        </Link>
        <h1 className="text-3xl font-black text-slate-900 mb-2">Add product</h1>
        <p className="text-slate-500 mb-8">List a new item in your shop</p>

        <form onSubmit={onSubmit} className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4 shadow-sm">
          {error && <p className="text-red-600 text-sm">{String(error)}</p>}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Name</label>
            <input
              name="name"
              required
              className="w-full rounded-xl border border-gray-200 px-4 py-3"
              value={form.name}
              onChange={onChange}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Description</label>
            <textarea
              name="description"
              rows={4}
              className="w-full rounded-xl border border-gray-200 px-4 py-3"
              value={form.description}
              onChange={onChange}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Price (₹)</label>
              <input
                name="price"
                type="number"
                min="0"
                step="0.01"
                required
                className="w-full rounded-xl border border-gray-200 px-4 py-3"
                value={form.price}
                onChange={onChange}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Stock</label>
              <input
                name="stock"
                type="number"
                min="0"
                className="w-full rounded-xl border border-gray-200 px-4 py-3"
                value={form.stock}
                onChange={onChange}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Category</label>
            <select
              name="category"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 bg-white"
              value={form.category}
              onChange={onChange}
            >
              {['Electronics', 'Fashion', 'Home & Living', 'Beauty', 'Sports', 'General'].map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Image URL</label>
            <input
              name="imageUrl"
              type="url"
              placeholder="https://..."
              className="w-full rounded-xl border border-gray-200 px-4 py-3"
              value={form.imageUrl}
              onChange={onChange}
            />
          </div>
          {(preview || form.imageUrl) && (
            <div className="rounded-xl overflow-hidden border border-gray-200 max-h-64 bg-gray-100">
              <img src={preview || form.imageUrl} alt="Preview" className="w-full h-full object-contain max-h-64" />
            </div>
          )}
          <button
            type="submit"
            disabled={saving}
            className="w-full py-4 rounded-xl bg-primary text-white font-bold disabled:opacity-60"
          >
            {saving ? 'Saving...' : 'Publish product'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
