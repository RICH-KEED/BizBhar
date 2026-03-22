import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { productAPI } from '../services/api';
import { isAuthenticated, getUser, logout } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

const CATEGORIES = ['', 'Electronics', 'Fashion', 'Home & Living', 'Beauty', 'Sports', 'General'];

const ProductList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const navigate = useNavigate();
  const user = isAuthenticated() ? getUser() : null;

  useEffect(() => {
    const s = searchParams.get('search') || '';
    const c = searchParams.get('category') || '';
    setSearch(s);
    setCategory(c);
    setLoading(true);
    setError('');
    const params = {};
    if (c) params.category = c;
    if (s) params.search = s;
    productAPI
      .list(params)
      .then((res) => setProducts(res.data))
      .catch((e) => setError(e.response?.data || e.message || 'Failed to load products'))
      .finally(() => setLoading(false));
  }, [searchParams]);

  const applyFilters = (e) => {
    e.preventDefault();
    const next = new URLSearchParams();
    if (search) next.set('search', search);
    if (category) next.set('category', category);
    setSearchParams(next);
  };

  const formatPrice = (p) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(Number(p));

  return (
    <div className="min-h-screen bg-[#f9fafb] text-slate-900">
      <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-gray-200 px-4 md:px-10 py-3">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between gap-4">
          <Link to="/" className="text-xl font-extrabold text-primary">
            BizBhar
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/products" className="text-sm font-semibold text-slate-700">
              All products
            </Link>
            {user?.role === 'SELLER' && (
              <Link to="/seller/products/add" className="text-sm font-semibold text-primary">
                Add product
              </Link>
            )}
            {user ? (
              <>
                <Link to="/profile" className="text-sm font-semibold text-slate-600">
                  Profile
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    navigate('/login');
                  }}
                  className="text-sm font-semibold text-slate-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="text-sm font-bold text-primary">
                Login
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto px-4 py-10">
        <h1 className="text-3xl font-black text-slate-900 mb-2">Browse products</h1>
        <p className="text-slate-500 mb-8">Search and filter by category</p>

        <form onSubmit={applyFilters} className="flex flex-col md:flex-row gap-4 mb-10">
          <input
            className="flex-1 rounded-xl border border-gray-200 px-4 py-3"
            placeholder="Search by name or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="rounded-xl border border-gray-200 px-4 py-3 bg-white"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {CATEGORIES.map((c) => (
              <option key={c || 'all'} value={c}>
                {c || 'All categories'}
              </option>
            ))}
          </select>
          <button type="submit" className="rounded-xl bg-primary text-white font-bold px-8 py-3">
            Apply
          </button>
        </form>

        {loading && <p className="text-slate-500">Loading...</p>}
        {error && <p className="text-red-600">{typeof error === 'string' ? error : JSON.stringify(error)}</p>}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((p) => (
              <Link
                key={p.id}
                to={`/products/${p.id}`}
                className="group bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all"
              >
                <div className="relative aspect-[4/5] bg-gray-100">
                  {p.imageUrl ? (
                    <img src={p.imageUrl} alt={p.name} className="absolute inset-0 w-full h-full object-cover" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-sm">No image</div>
                  )}
                  {p.stock === 0 && (
                    <span className="absolute top-3 left-3 bg-slate-900 text-white text-xs font-bold px-2 py-1 rounded">
                      Out of stock
                    </span>
                  )}
                </div>
                <div className="p-4 space-y-1">
                  <p className="text-xs font-medium text-slate-400">{p.category}</p>
                  <h3 className="font-bold text-slate-800 line-clamp-2">{p.name}</h3>
                  <p className="text-lg font-black text-primary">{formatPrice(p.price)}</p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <p className="text-slate-500">No products match your filters.</p>
        )}
      </main>
    </div>
  );
};

export default ProductList;
