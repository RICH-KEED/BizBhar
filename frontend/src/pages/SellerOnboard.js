import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { shopAPI } from '../services/api';

const SellerOnboard = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    logoUrl: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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
      setError(err.response?.data?.message || err.response?.data || 'Failed to create shop');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-light flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white shadow-2xl rounded-lg p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center text-white shadow-lg mx-auto mb-4">
            <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Welcome to BizBhar!</h2>
          <p className="text-slate-500">Let's set up your shop and start selling</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Shop Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              placeholder="Enter your shop name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Logo URL (optional)
            </label>
            <input
              type="url"
              name="logoUrl"
              value={formData.logoUrl}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              placeholder="https://example.com/logo.png"
            />
            <p className="text-xs text-slate-500 mt-1">You can add a logo later from settings</p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">What happens next?</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>✓ Your shop will be created instantly</li>
              <li>✓ You'll get access to the seller dashboard</li>
              <li>✓ Start adding products and managing orders</li>
            </ul>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-blue-800 text-white font-bold py-4 rounded-lg shadow-md shadow-primary/10 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating Shop...' : 'Create My Shop'}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default SellerOnboard;
