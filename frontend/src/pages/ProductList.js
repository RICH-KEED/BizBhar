import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { productAPI } from '../services/api';
import { PageShell, PageSection, PageHeader, Card, LoadingState, EmptyState, AlertBanner } from '../components/ui';
import ProductCard from '../components/ProductCard';

const CATEGORIES = ['', 'Electronics', 'Fashion', 'Home & Living', 'Beauty', 'Sports', 'General'];

const ProductList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || '');

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

  return (
    <PageShell>
      <PageSection wide>
        <PageHeader
          eyebrow="Marketplace"
          title="Browse products"
          subtitle="Search and filter by category. Every listing comes from verified sellers on BizBhar."
        />

        <Card className="mb-10 !p-0 overflow-hidden" padding="">
          <div className="p-5 sm:p-6 border-b border-slate-100/90 bg-gradient-to-r from-slate-50/80 to-white">
            <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-primary mb-1">Filters</p>
            <p className="text-sm text-slate-500">Refine by keyword and category</p>
          </div>
          <form onSubmit={applyFilters} className="flex flex-col lg:flex-row gap-4 p-5 sm:p-6">
            <div className="flex-1 relative">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xl pointer-events-none">
                search
              </span>
              <input
                className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200/90 bg-white text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm"
                placeholder="Search by name or description…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <select
              className="lg:w-56 rounded-xl border border-slate-200/90 px-4 py-3.5 bg-white font-semibold text-slate-800 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none shadow-sm"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {CATEGORIES.map((c) => (
                <option key={c || 'all'} value={c}>
                  {c || 'All categories'}
                </option>
              ))}
            </select>
            <button type="submit" className="btn-primary btn-primary--filter">
              Apply
            </button>
          </form>
        </Card>

        {error && (
          <AlertBanner variant="error" icon="error" className="mb-8">
            {typeof error === 'string' ? error : JSON.stringify(error)}
          </AlertBanner>
        )}

        {loading && <LoadingState message="Loading products…" />}

        {!loading && !error && products.length === 0 && (
          <EmptyState
            icon="search_off"
            title="No products match"
            description={
              search || category
                ? 'Try clearing filters or search — or browse all categories.'
                : 'No listings yet. Check back soon or register as a seller to add products.'
            }
          >
            {(search || category) && (
              <button
                type="button"
                onClick={() => {
                  setSearch('');
                  setCategory('');
                  setSearchParams(new URLSearchParams());
                }}
                className="btn-primary btn-primary--compact"
              >
                Clear filters
              </button>
            )}
          </EmptyState>
        )}

        {!loading && !error && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </PageSection>
    </PageShell>
  );
};

export default ProductList;
