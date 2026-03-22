import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { productAPI } from '../services/api';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    productAPI
      .getById(id)
      .then((res) => setProduct(res.data))
      .catch((e) => setError(e.response?.data || e.message || 'Not found'))
      .finally(() => setLoading(false));
  }, [id]);

  const formatPrice = (p) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(Number(p));

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f9fafb]">
        <p className="text-slate-500">Loading...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[#f9fafb] px-4">
        <p className="text-red-600">{String(error)}</p>
        <Link to="/products" className="text-primary font-bold">
          Back to products
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9fafb] text-slate-900">
      <header className="border-b border-gray-200 bg-white px-4 py-3">
        <div className="max-w-[960px] mx-auto flex justify-between items-center">
          <Link to="/products" className="text-primary font-bold">
            ← Back
          </Link>
        </div>
      </header>

      <main className="max-w-[960px] mx-auto px-4 py-10 grid md:grid-cols-2 gap-10">
        <div className="rounded-2xl overflow-hidden bg-white border border-gray-200 aspect-square">
          {product.imageUrl ? (
            <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-400">No image</div>
          )}
        </div>
        <div className="space-y-4">
          <p className="text-sm font-medium text-slate-400">{product.category}</p>
          <h1 className="text-3xl font-black">{product.name}</h1>
          {product.stock === 0 ? (
            <span className="inline-block bg-slate-900 text-white text-sm font-bold px-3 py-1 rounded">Out of stock</span>
          ) : (
            <span className="inline-block bg-green-100 text-green-800 text-sm font-bold px-3 py-1 rounded">In stock</span>
          )}
          <p className="text-3xl font-black text-primary">{formatPrice(product.price)}</p>
          <p className="text-slate-600 whitespace-pre-wrap">{product.description || 'No description.'}</p>
          <p className="text-sm text-slate-500">Stock: {product.stock}</p>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;
