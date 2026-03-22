import React, { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register as authRegister } from '../services/authService';
import { mergeGuestCartToServer } from '../utils/guestCart';
import { cartAPI } from '../services/api';
import AuthLayout from '../components/AuthLayout';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    role: 'BUYER',
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
    setFieldErrors((er) => ({ ...er, [name]: '' }));
    setError('');
  };

  const setRole = (role) => {
    setFormData((f) => ({ ...f, role }));
    setFieldErrors((er) => ({ ...er, role: '' }));
  };

  const invalid = useMemo(() => {
    if (!formData.email.trim()) return true;
    if (!formData.password) return true;
    if (formData.password.length < 6) return true;
    if (formData.password !== formData.confirmPassword) return true;
    if (!formData.role) return true;
    return false;
  }, [formData]);

  const validate = () => {
    const next = {};
    if (!formData.email.trim()) next.email = 'Email is required';
    if (!formData.password) next.password = 'Password is required';
    else if (formData.password.length < 6) next.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) next.confirmPassword = 'Passwords do not match';
    if (!formData.role) next.role = 'Role is required';
    setFieldErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setError('');

    try {
      const { confirmPassword, ...registerData } = formData;
      await authRegister(registerData);
      await mergeGuestCartToServer(cartAPI);
      if (formData.role === 'SELLER') {
        navigate('/seller/onboard');
      } else {
        navigate('/profile');
      }
    } catch (err) {
      const d = err.response?.data;
      const msg =
        typeof d === 'string'
          ? d
          : d?.error || d?.message || 'Registration failed. Please try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      mode="register"
      title="Create your account"
      subtitle="Join as a buyer or open a seller shop in minutes."
    >
      {error && <div className="alert-error">{error}</div>}

      <div className="mb-6">
        <p className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-3 text-center">I want to</p>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setRole('BUYER')}
            className={`relative flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
              formData.role === 'BUYER'
                ? 'border-primary bg-primary-light/80 shadow-sm'
                : 'border-slate-200 hover:border-primary/30 bg-white'
            }`}
          >
            <span className={`material-symbols-outlined text-2xl mb-1 ${formData.role === 'BUYER' ? 'text-primary' : 'text-slate-400'}`}>
              shopping_bag
            </span>
            <span className={`text-xs font-bold ${formData.role === 'BUYER' ? 'text-primary' : 'text-slate-600'}`}>Buyer</span>
            {formData.role === 'BUYER' && (
              <span className="absolute top-2 right-2 size-5 rounded-full bg-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-[12px] text-white font-bold">check</span>
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => setRole('SELLER')}
            className={`relative flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
              formData.role === 'SELLER'
                ? 'border-primary bg-primary-light/80 shadow-sm'
                : 'border-slate-200 hover:border-primary/30 bg-white'
            }`}
          >
            <span className={`material-symbols-outlined text-2xl mb-1 ${formData.role === 'SELLER' ? 'text-primary' : 'text-slate-400'}`}>
              store
            </span>
            <span className={`text-xs font-bold ${formData.role === 'SELLER' ? 'text-primary' : 'text-slate-600'}`}>Seller</span>
            {formData.role === 'SELLER' && (
              <span className="absolute top-2 right-2 size-5 rounded-full bg-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-[12px] text-white font-bold">check</span>
              </span>
            )}
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div>
          <label htmlFor="reg-email" className="form-label">
            Email
          </label>
          <div className="form-field">
            <span className="material-symbols-outlined form-input-icon">mail</span>
            <input
              id="reg-email"
              type="email"
              name="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className={`form-input ${fieldErrors.email ? 'form-input--error' : ''}`}
            />
          </div>
          {fieldErrors.email && <p className="mt-1.5 text-sm text-red-600">{fieldErrors.email}</p>}
        </div>

        <div>
          <label htmlFor="reg-password" className="form-label">
            Password
          </label>
          <div className="form-field">
            <span className="material-symbols-outlined form-input-icon">lock</span>
            <input
              id="reg-password"
              type="password"
              name="password"
              autoComplete="new-password"
              placeholder="At least 6 characters"
              value={formData.password}
              onChange={handleChange}
              className={`form-input ${fieldErrors.password ? 'form-input--error' : ''}`}
            />
          </div>
          {fieldErrors.password && <p className="mt-1.5 text-sm text-red-600">{fieldErrors.password}</p>}
        </div>

        <div>
          <label htmlFor="reg-confirm" className="form-label">
            Confirm password
          </label>
          <div className="form-field">
            <span className="material-symbols-outlined form-input-icon">verified_user</span>
            <input
              id="reg-confirm"
              type="password"
              name="confirmPassword"
              autoComplete="new-password"
              placeholder="Repeat password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`form-input ${fieldErrors.confirmPassword ? 'form-input--error' : ''}`}
            />
          </div>
          {fieldErrors.confirmPassword && (
            <p className="mt-1.5 text-sm text-red-600">{fieldErrors.confirmPassword}</p>
          )}
        </div>

        <button type="submit" disabled={invalid || loading} className="btn-primary btn-primary--block mt-2">
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
          Create account
          <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-slate-600">
        Already have an account?{' '}
        <Link to="/login" className="font-bold text-primary hover:text-blue-700">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Register;
