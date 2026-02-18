import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../services/api';
import { setToken, setUser } from '../utils/auth';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    role: 'BUYER',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    // Validate password strength
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      const { confirmPassword, ...registerData } = formData;
      const response = await authAPI.register(registerData);
      const { token, email, role } = response.data;
      
      setToken(token);
      setUser({ email, role });
      
      navigate('/profile');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-light flex items-center justify-center p-4">
      <div className="flex w-full max-w-[1100px] bg-white shadow-2xl rounded-lg overflow-hidden min-h-[650px]">
        {/* Left Panel - Branding */}
        <div className="hidden lg:flex flex-col justify-between w-1/2 bg-primary p-12 text-white relative overflow-hidden">
          <div className="z-10">
            <div className="flex items-center gap-3 mb-12">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-primary shadow-lg">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold tracking-tight">BizBhar</h2>
            </div>
            <h1 className="text-4xl font-extrabold leading-tight mb-6">Join Our Growing Community</h1>
            <p className="text-lg text-blue-100 max-w-md leading-relaxed">
              Start your journey with BizBhar today. Connect with thousands of verified businesses worldwide.
            </p>
          </div>
          
          <div className="z-10">
            <div className="flex gap-4 mb-8">
              <div className="flex -space-x-3">
                <img alt="Buyer" className="w-10 h-10 rounded-full border-2 border-primary bg-zinc-200" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAjnWmUPV92sVi6HZZGopVsQx3hYKes7gQ36ECawOIqyJ3CF_8h_lDCkHMdjuZbZ2w3FhzAP6ueqlDH9glHebdYNDp5wmHQskIapdtI0fIBBfASVF4E3NsL4SoLkLDD0fY0hWLFOmL3A3IwOCmV9DjitCWHK_SRpliTfXNkz94nMERpvi9TaRijelaNC-6qVQnwcAMWuT8Ti7ZrPcXQpH4i4SWR3o-kovpzFeT-of5W2PklQlU8fNkZ7gCS8hbOTVG5quHHWkGVu8"/>
                <img alt="Seller" className="w-10 h-10 rounded-full border-2 border-primary bg-zinc-200" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7mjQ_Fxfr88Hlj-6-wmWdvmBChSjQ04y77-A6-1gvzdnt1mgFZ2MHiT8794xtXnxuBvAAxr368fAnwyPcuzrqErF5KbGRAtPSr7ljVQMvxbOshRUhl6tBkhLmaZ14U7Y2ZpIrUX7_XEAYiim2Tat1TvC1ON-OZSEZTr6RwSe6tkEQyvf4JH019QSBBGvH1GmltKuIpJOtAyEvM2lxpIVsDRZ5-ehRFbFyZYK295zu87cMB18uh8Hgz8t9peV6aUcxVSs8TBHcbFI"/>
                <img alt="Expert" className="w-10 h-10 rounded-full border-2 border-primary bg-zinc-200" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAbT-CO2hYXQgRozORyGfFS1c7sR0PUq5S1tzUPNapvPqZaY-n18KB3TE71A0Vq89LZuyfYpar8txf31i7sHBzcCsnoEbGDIGvuFQiCE_huywzCK_nB28AeL_p6uJa-zuoANF6hQqW_wbOm_3ircSmTud7n23FXqHXMomeK9sdVjI2zorHRIbdUlHtxN-56v0hyd9Tg9V7R0pXNJnByo_BH3a7CEt5YYJnspX3BgB_Kn8llUVEmiKsb8pPhptGA7Sv4phF6lrx0H4Y"/>
              </div>
              <div className="text-sm">
                <p className="font-bold text-white">50k+ Businesses</p>
                <p className="text-blue-200">Join them today</p>
              </div>
            </div>
            <p className="text-xs text-blue-300">© 2026 BizBhar Global Marketplace.</p>
          </div>

          {/* Background Pattern */}
          <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
            <div className="w-full h-full" style={{
              backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '30px 30px'
            }}></div>
          </div>
        </div>

        {/* Right Panel - Register Form */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 md:p-12 bg-white">
          <div className="w-full max-w-[380px]">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Create Account</h3>
              <p className="text-slate-500 text-sm">Start your business journey with us</p>
            </div>

            {/* Tab Switcher */}
            <div className="flex w-full bg-slate-100 p-1 rounded-lg mb-8">
              <Link
                to="/login"
                className="flex-1 py-2 text-sm font-semibold rounded-lg text-slate-500 hover:text-slate-700 transition-all text-center"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="flex-1 py-2 text-sm font-semibold rounded-lg bg-white shadow-sm text-primary transition-all text-center"
              >
                Sign Up
              </Link>
            </div>

            {/* Role Selection */}
            <div className="mb-6">
              <label className="block text-sm font-bold text-slate-700 mb-3 text-center">
                Select your account type
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label className={`relative flex flex-col items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  formData.role === 'BUYER' 
                    ? 'border-primary bg-primary-light' 
                    : 'border-slate-200 hover:border-primary/30'
                }`}>
                  <input
                    type="radio"
                    name="role"
                    value="BUYER"
                    checked={formData.role === 'BUYER'}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <svg className={`w-6 h-6 mb-1 ${formData.role === 'BUYER' ? 'text-primary' : 'text-slate-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <span className={`text-xs font-bold ${formData.role === 'BUYER' ? 'text-primary' : 'text-slate-500'}`}>
                    Buyer
                  </span>
                  {formData.role === 'BUYER' && (
                    <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </label>

                <label className={`relative flex flex-col items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  formData.role === 'SELLER' 
                    ? 'border-primary bg-primary-light' 
                    : 'border-slate-200 hover:border-primary/30'
                }`}>
                  <input
                    type="radio"
                    name="role"
                    value="SELLER"
                    checked={formData.role === 'SELLER'}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <svg className={`w-6 h-6 mb-1 ${formData.role === 'SELLER' ? 'text-primary' : 'text-slate-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className={`text-xs font-bold ${formData.role === 'SELLER' ? 'text-primary' : 'text-slate-500'}`}>
                    Seller
                  </span>
                  {formData.role === 'SELLER' && (
                    <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Register Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
                    placeholder="name@company.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-12 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Confirm Password
                </label>
                <div className="relative">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-blue-800 text-white font-bold py-3 rounded-lg shadow-md shadow-primary/10 transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </form>

            <div className="text-center pt-6 mt-6 border-t border-slate-100">
              <p className="text-sm text-slate-600">
                Already have an account?{' '}
                <Link to="/login" className="font-bold text-primary hover:underline">
                  Login here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
