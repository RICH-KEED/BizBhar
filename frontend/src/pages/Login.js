import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login as authLogin } from '../services/authService';
import { getUser } from '../utils/auth';
import { mergeGuestCartToServer } from '../utils/guestCart';
import { cartAPI } from '../services/api';
import AuthLayout from '../components/AuthLayout';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [fieldErrors, setFieldErrors] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
    setFieldErrors((er) => ({ ...er, [name]: '' }));
    setError('');
  };

  const validate = () => {
    const next = { email: '', password: '' };
    if (!formData.email.trim()) next.email = 'Email is required';
    if (!formData.password) next.password = 'Password is required';
    setFieldErrors(next);
    return !next.email && !next.password;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setError('');

    try {
      await authLogin({
        email: formData.email.trim(),
        password: formData.password,
      });
      await mergeGuestCartToServer(cartAPI);
      const u = getUser();
      if (u?.role === 'SELLER') {
        navigate('/seller/dashboard');
      } else {
        navigate('/profile');
      }
    } catch (err) {
      const d = err.response?.data;
      const msg =
        typeof d === 'string'
          ? d
          : d?.error || d?.message || 'Login failed. Please check your credentials.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const empty = !formData.email.trim() || !formData.password;

  return (
    <AuthLayout
      mode="login"
      title="Welcome back"
      subtitle="Sign in to continue shopping or manage your store."
    >
      {error && <div className="alert-error">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <div>
          <label htmlFor="login-email" className="form-label">
            Email
          </label>
          <div className="form-field">
            <span className="material-symbols-outlined form-input-icon">mail</span>
            <input
              id="login-email"
              type="email"
              name="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className={`form-input ${fieldErrors.email ? 'form-input--error' : ''}`}
              aria-invalid={!!fieldErrors.email}
            />
          </div>
          {fieldErrors.email && <p className="mt-1.5 text-sm text-red-600">{fieldErrors.email}</p>}
        </div>

        <div>
          <label htmlFor="login-password" className="form-label">
            Password
          </label>
          <div className="form-field">
            <span className="material-symbols-outlined form-input-icon">lock</span>
            <input
              id="login-password"
              type="password"
              name="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className={`form-input ${fieldErrors.password ? 'form-input--error' : ''}`}
              aria-invalid={!!fieldErrors.password}
            />
          </div>
          {fieldErrors.password && <p className="mt-1.5 text-sm text-red-600">{fieldErrors.password}</p>}
        </div>

        <button type="submit" disabled={empty || loading} className="btn-primary btn-primary--block">
          {loading && (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          )}
          Continue
          <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-slate-600">
        New to BizBhar?{' '}
        <Link to="/register" className="font-bold text-primary hover:text-blue-700">
          Create an account
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Login;
