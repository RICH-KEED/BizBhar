import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated, getUser, logout } from '../utils/auth';

const Home = () => {
  const navigate = useNavigate();
  const user = isAuthenticated() ? getUser() : null;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="text-slate-900 bg-[#f9fafb]">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-gray-200 px-4 md:px-10 py-3">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4 md:gap-8">
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-2 text-primary">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
              <h2 className="text-xl font-extrabold tracking-tight text-slate-900">BizBhar</h2>
            </div>
            <nav className="hidden lg:flex items-center gap-6">
              <a className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors" href="#">Electronics</a>
              <a className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors" href="#">Fashion</a>
              <a className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors" href="#">Home & Living</a>
              <a className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors" href="#">Beauty</a>
            </nav>
          </div>
          <div className="flex items-center gap-3 md:gap-6">
            <div className="hidden md:flex items-center gap-2">
              {user ? (
                <>
                  {user.role === 'SELLER' && (
                    <Link to="/seller/dashboard" className="flex items-center justify-center h-10 px-5 rounded-lg border border-gray-300 text-slate-700 font-bold text-sm hover:bg-slate-50 transition-all">
                      My Dashboard
                    </Link>
                  )}
                  <Link to="/profile" className="flex items-center justify-center h-10 px-5 rounded-lg bg-primary text-white font-bold text-sm hover:opacity-90 transition-all">
                    Profile
                  </Link>
                  <button onClick={handleLogout} className="flex items-center justify-center h-10 px-5 rounded-lg border border-gray-300 text-slate-700 font-bold text-sm hover:bg-slate-50 transition-all">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/register" className="flex items-center justify-center h-10 px-5 rounded-lg border border-gray-300 text-slate-700 font-bold text-sm hover:bg-slate-50 transition-all">
                    Become a Seller
                  </Link>
                  <Link to="/login" className="flex items-center justify-center h-10 px-5 rounded-lg bg-primary text-white font-bold text-sm hover:opacity-90 shadow-sm transition-all">
                    Login/Register
                  </Link>
                </>
              )}
            </div>
            <div className="flex items-center gap-4 text-slate-700">
              <svg className="w-6 h-6 cursor-pointer hover:text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative w-full bg-white pt-10 pb-20 px-4">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-8 order-2 lg:order-1">
            <div className="space-y-4">
              <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wider rounded-full">New Arrivals Daily</span>
              <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tight text-slate-900">
                Discover Everything <span className="text-primary">You Need</span> in One Place.
              </h1>
              <p className="text-lg text-slate-500 max-w-xl">
                Connect with thousands of verified sellers and find the best deals on premium electronics, trendy fashion, and modern home essentials.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row w-full max-w-2xl bg-gray-50 p-2 rounded-xl border border-gray-200">
              <div className="flex flex-1 items-center px-4 gap-3">
                <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input className="w-full bg-transparent border-none focus:ring-0 text-slate-800 placeholder:text-slate-400 py-3" placeholder="Search for products, brands, and more..." type="text"/>
              </div>
              <button className="bg-primary text-white px-8 py-3 rounded-lg font-bold hover:opacity-95 transition-all shadow-sm">
                Search
              </button>
            </div>
            <div className="flex items-center gap-6 pt-4">
              <div className="flex -space-x-3">
                <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 bg-cover bg-center" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAor5yAwpI64_mPXcFqvGP3JTOmZEoG68UBuNs0pVtJdEo1uIvErNlqzaVWv7_7oljpWV10CTeT6Dvzallwl6YG9l-baxAgBW-nPQEP540Hdk8yE1HpfHFogi0cNR823Zbrdn7KVZqb7MdV8QLUD7_7rFpxJx1O8DG4aZNTzYyceV9ysZoyM1BWTHLKY7KmpJNMPBSGG6qPw3fosbhhwGZo_T7rrn4-GDzcIwTPHgGJi7sGFKoDoGzLV3exV-A33aoDE19K5tmp1Zg')"}}></div>
                <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 bg-cover bg-center" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBxeuODo9PlcUMCbkqdajjxiGZFB8RF1ofy2bG0TxNunhDNU63syCiHmwTVvzNn9TGZ6h1wQ5-HHNpuaUHRKD3YIx6goVOgYBKSAVRKrVZideJNw_46vm_KtwcgCr0ClgColws_61_ym1U-_UOELEoAtag5oujI040FqWyTlwFg9SebTxmsjI64kv6jaSVuxXW6Mqb79Htr3mPXqknxVtwaj5n1v-C2uFrAggntyZANf3oaW6PpUKPxJ8a1THhTGeVqnxzedybCjYw')"}}></div>
                <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 bg-cover bg-center" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDVgmUb1nM0N5POWL1ssIg91-8K2afRq0qlzTJXSWuN59GDPEcP6UUAR5msp9ra8IJ6RFUPHYVAaxnSxa7D2CkTx9_LUf0qGyTgdzYTfR927zdFg5JQ-0YEXHZOG2dumgRMFSZNYv8FumMny1vedIvZtTBCgXr7QX8Lu5aYwlUk7koXHpQAMSGVtM_3_wYg_5DsRfYCrP6UM2eyFZ5irSIFBEg0L1Se9IrPMwLY_fSurwrX4KZ1Je_Bz9exAak4i7yYjESRi4BEBvk')"}}></div>
                <div className="w-10 h-10 rounded-full border-2 border-white bg-green-500 flex items-center justify-center text-white text-[10px] font-bold">+10k</div>
              </div>
              <p className="text-sm font-medium text-slate-500">Trusted by over 10,000+ happy shoppers</p>
            </div>
          </div>
          <div className="relative order-1 lg:order-2">
            <div className="w-full aspect-square rounded-2xl bg-gray-100 overflow-hidden border border-gray-200 relative shadow-lg">
              <div className="absolute inset-0 bg-cover bg-center opacity-90" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAilOA0qlbKLlQ3lVeaRCS6MgY79Rp8B5QBWvAmFFGwF7Vn5IcwVBhn3q2A_egZDi7saqjPwDqEx07PCu-sDoL9N2lU0km7aP9ZuccdqdsdskSNPYcsyHqmcENhXirn1hCWBVhr1IYQqTjSm8Cu3_UQlJ2ZiUpxxKfMhubXKnI0kCr06JnrDjWviIlj30W5rYbEHpH_0ml2_ORhXwVozKLHZCfRpVexaxFu4Tk00tqLhd5hYkaJOTZJHkliq7dFxEEde3vmjfOPUV0')"}}></div>
              <div className="absolute top-8 left-8 bg-white p-4 rounded-xl shadow-lg flex items-center gap-3 border border-gray-200">
                <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter leading-none">Verified</p>
                  <p className="text-sm font-bold text-slate-800">Premium Sellers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-10">
        <div className="max-w-[1200px] mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-4 p-6 bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-primary/5 rounded-lg flex items-center justify-center text-primary">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h4 className="font-bold text-slate-900">Secure Payments</h4>
              <p className="text-sm text-slate-500">100% encrypted transactions</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-6 bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-primary/5 rounded-lg flex items-center justify-center text-primary">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h4 className="font-bold text-slate-900">Global Shipping</h4>
              <p className="text-sm text-slate-500">Available in 200+ countries</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-6 bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-primary/5 rounded-lg flex items-center justify-center text-primary">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div>
              <h4 className="font-bold text-slate-900">24/7 Support</h4>
              <p className="text-sm text-slate-500">Dedicated assistance team</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Featured Categories</h2>
              <p className="text-slate-500">Handpicked collections for your lifestyle</p>
            </div>
            <a className="text-primary font-bold text-sm flex items-center gap-1 group" href="#">
              View All
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            <a className="group flex flex-col items-center gap-4" href="#">
              <div className="w-full aspect-square rounded-2xl bg-gray-100 overflow-hidden relative border border-transparent group-hover:border-primary/20 group-hover:shadow-lg transition-all">
                <div className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBYZH80fVsBPPKnINYjGpf_3FTnQdXI4xQpNkkIBpcWeX7SO9PcJGDLinRfwVAgP-olkksGYey4oXViCyHCzPlPEnmTtEW0PoAf1BcHZ34tgWmrU8RXGPhzlP8AOkcn7fb2dDEts877SYNQTzss4F372Exh_S-JGkR7BvJo4zsrUKmu95GVEEsBGawqWFr9DZjCIdZIEXZZh1Sg4qvYuix4I1LpwNOcxMAkeIfpauXMiV43VWNetLmuodcVIyHvSUeFAXcuID0TDi0')"}}></div>
                <div className="absolute inset-0 bg-slate-900/5 group-hover:bg-primary/10 transition-colors"></div>
              </div>
              <p className="font-bold text-slate-700 group-hover:text-primary">Electronics</p>
            </a>
            <a className="group flex flex-col items-center gap-4" href="#">
              <div className="w-full aspect-square rounded-2xl bg-gray-100 overflow-hidden relative border border-transparent group-hover:border-primary/20 group-hover:shadow-lg transition-all">
                <div className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCK5n6QzI4rCzmuH0CdM5UK5GBdlzzWCl6pExsMGn9cPYX7dhxdvOFUVUnXLD9k3c6DRwJ9DlRZ3rVdq2NwGMNpNDDbJSVp14skpn1UbHkD4l64H1u2EHrR0l-QPp7yfPxG4d1DZkBKJAH11i6cxki-zd0V1w6CItR19-Ffhh0IBPMFJeegGEvYhqtdCjDJjpjJnrE3HyO3a0jtQ-en2g_sMj7LFgxqUN7GpxS1aLwKKylCKf_Bef0wUUnVfAvOBIGugTTEG_IpQgA')"}}></div>
                <div className="absolute inset-0 bg-slate-900/5 group-hover:bg-primary/10 transition-colors"></div>
              </div>
              <p className="font-bold text-slate-700 group-hover:text-primary">Fashion</p>
            </a>
            <a className="group flex flex-col items-center gap-4" href="#">
              <div className="w-full aspect-square rounded-2xl bg-gray-100 overflow-hidden relative border border-transparent group-hover:border-primary/20 group-hover:shadow-lg transition-all">
                <div className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA7y3JurA5VBZ6fsD3IMQRNO0-0hh4_lRx3zx_zu0Z1KmOjrzOH3vvYZQIQadRhr0QK6qkAoo_nt1nUjZ47tGUGeH9EY3TkrUEyYV398x4905jQESDdfDg7pHdjryrbN8wskQv90GJRYCM0k7gRTTOFhr5fjAFdiszn78aj-lJcWctojVwpdpaXFu3-DtnMeua3x9BAUQd1HnochEEVOOvAPLlpEkWbZ95hHpYoNPL43mzlHaRND3RQBO3lfim3JCYavcasw8VQodo')"}}></div>
                <div className="absolute inset-0 bg-slate-900/5 group-hover:bg-primary/10 transition-colors"></div>
              </div>
              <p className="font-bold text-slate-700 group-hover:text-primary">Home & Living</p>
            </a>
            <a className="group flex flex-col items-center gap-4" href="#">
              <div className="w-full aspect-square rounded-2xl bg-gray-100 overflow-hidden relative border border-transparent group-hover:border-primary/20 group-hover:shadow-lg transition-all">
                <div className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDrQ1E3ZK3CHOODAi_NQpsXVaA9NBYFLfXVrredlFDVrMaaRacsEmHlJ61ThOMpyG5QRzmqhgdOmhwuuIZYvIvRd5YR3BM0OKrG_uV4y9rp_FYdU5kyySvuu6HJkHxfe2yOCnGTXUtmgf6d5LJqwb9omCbSwytg6zNiFUSaX1jmU10dypUgs8NjX2oeNHQwHfzLpspZ6h7Qxocl8yKnifDNp6UBMLc1kSw7fJJIMG1fWHKjwNrrPY8ieYD0CDSK8IMqNYkMvi9tqf0')"}}></div>
                <div className="absolute inset-0 bg-slate-900/5 group-hover:bg-primary/10 transition-colors"></div>
              </div>
              <p className="font-bold text-slate-700 group-hover:text-primary">Beauty</p>
            </a>
            <a className="group flex flex-col items-center gap-4" href="#">
              <div className="w-full aspect-square rounded-2xl bg-gray-100 overflow-hidden relative border border-transparent group-hover:border-primary/20 group-hover:shadow-lg transition-all">
                <div className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA9zIrfjR5d42bVS523kCz2ujwiiUQgTyKaU2U84GoGZtH2nxYXFHe8sL9p7D3wvXmYJJZqcCgcyvbeQVnkWs4ICV8DcQ-ldfAZ90XMdgO6W0Elolbnc3sdyjn-N7gQQfzYV1dwZpLEcDu8S9gf6pPgXW7eY0PcPi3KbDnZLsj4URHLDtIVwD7ijEcaJgpjRGdX9gKhi36piGC-ghWgZAVggQMgKzXDmXUtlEmClT4cpYxoA-u4N6q67CQs7CEsDe70I5_b_jjKflI')"}}></div>
                <div className="absolute inset-0 bg-slate-900/5 group-hover:bg-primary/10 transition-colors"></div>
              </div>
              <p className="font-bold text-slate-700 group-hover:text-primary">Sports</p>
            </a>
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Trending Products</h2>
              <p className="text-slate-500">Top picks based on recent community activity</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Product 1 - Headphones */}
            <div className="group bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all p-4">
              <div className="relative w-full aspect-[4/5] bg-gray-100 rounded-lg overflow-hidden mb-4">
                <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB3OJx2NwVvmNyZew3CuDkZD9w3fJKMbSQr76mFmKoeE961lN_w6Swh57GQGy6jnrVocnQ-1Ow1kjiC0_wOTJGWrsfkAxmD0oC4VyNnR-Nsni6nBp2ZLSr0D_ehHMgT20wxUVKAiLdS_DrHWlxlVyKJcS2M5yc2-5UZHKyJ2uVj0WUmEXftipsCscI5NIE-bJuLrKIncpoMfwevHqAa8W3NqxKWh8td3Pl8QdbBZRQZMd5sg2uXOImjJGvi1aiKurWEGwszekQYajo')"}}></div>
                <div className="absolute top-3 left-3 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded">HOT</div>
                <button className="absolute bottom-3 right-3 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </button>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-medium text-slate-400">Electronics</p>
                <h3 className="font-bold text-slate-800 line-clamp-1">Premium Wireless Headphones</h3>
                <div className="flex items-center gap-1 text-yellow-400">
                  {[...Array(4)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                  <span className="text-xs text-slate-400 ml-1">(4.0)</span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <p className="text-lg font-black text-primary">$199.00</p>
                </div>
              </div>
            </div>

            {/* Product 2 - Watch */}
            <div className="group bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all p-4">
              <div className="relative w-full aspect-[4/5] bg-gray-100 rounded-lg overflow-hidden mb-4">
                <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCz3Lu7kwkFPNydvZOaVsZMHBUU0rZuNjqi45MS3uNDr9f52ZmsNKP1-U54yzBcu_RKk4K2BgKqier7La15eeDmkmSHM0Em7xkVZlXbuUwVmK3CofiPQH_bl03UbAN2ac0Mg0hwHW_dBYWcq8hqTpYu4oxGS0N7bYxwFRbA2BBolLgwu_dA-QI1GT8eirb7PydyyVfHWKqLynmZ7VyHf7kEhwlh3O1VTLALgq_q4A6px85TPnqYdIfbn12Os8CFS0q6taMbxdv88pw')"}}></div>
                <div className="absolute top-3 right-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded">20% OFF</div>
                <button className="absolute bottom-3 right-3 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </button>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-medium text-slate-400">Accessories</p>
                <h3 className="font-bold text-slate-800 line-clamp-1">Minimalist Quartz Watch</h3>
                <div className="flex items-center gap-1 text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-xs text-slate-400 ml-1">(5.0)</span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-baseline gap-2">
                    <p className="text-lg font-black text-primary">$89.00</p>
                    <p className="text-sm text-slate-400 line-through">$110.00</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Product 3 - Sneakers */}
            <div className="group bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all p-4">
              <div className="relative w-full aspect-[4/5] bg-gray-100 rounded-lg overflow-hidden mb-4">
                <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAnG477upBOT0qjkdimooW8D7JuKji3XiY8LnEEFZ_u8siRE1UmyNhzSZVP-txYxuCogIYPA1DvCriSw75ryk56W1dxUjidse7RuQY6mUaP1xCNkq8uMIDLMo620J32n6SAtMszicNGTeDV753vzZbWjeqkVC80z6EzNIiMTqIqYhlIGAwa9-Xt5U-UMHBLCxF8IuGVETTwBo7LAFK_CI-5S02xIQDa_oj6_c6UvPiWiQFgl_pNzgd_nuv8c3QJqIcInv9SdDLZfYI')"}}></div>
                <button className="absolute bottom-3 right-3 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </button>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-medium text-slate-400">Fashion</p>
                <h3 className="font-bold text-slate-800 line-clamp-1">Velocity Run Sneakers</h3>
                <div className="flex items-center gap-1 text-yellow-400">
                  {[...Array(4)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <svg className="w-4 h-4 fill-current opacity-50" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-xs text-slate-400 ml-1">(4.5)</span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <p className="text-lg font-black text-primary">$125.00</p>
                </div>
              </div>
            </div>

            {/* Product 4 - Air Purifier */}
            <div className="group bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all p-4">
              <div className="relative w-full aspect-[4/5] bg-gray-100 rounded-lg overflow-hidden mb-4">
                <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCt_MR0wUXrIBYbF8AabsMlLvMr6uBj8qBCYHBo-grd0DefyBIV3F_sWJnqDvT_P3s-7OaxFG4aDJ1G7oH8LBpu3qqZDPCsf87aMy4LT6ZNsC9E8OkONgdeR3koYoWbNeZJm7cUAbNhj2TALw5jWTBFtl42QwPhlaKSf1t4Sh6eEagUr15ZWXY-JiXkCNYtv_1fVIWNvxGWpQLLhsbaLcIzsGwfOZSgIT6zxVC1CP-_iiWSkS4WxaaqtrIpE_rF1n4AK8OU00gir_g')"}}></div>
                <button className="absolute bottom-3 right-3 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </button>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-medium text-slate-400">Home</p>
                <h3 className="font-bold text-slate-800 line-clamp-1">Smart Air Purifier Gen 3</h3>
                <div className="flex items-center gap-1 text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-xs text-slate-400 ml-1">(5.0)</span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <p className="text-lg font-black text-primary">$249.00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-[1200px] mx-auto bg-primary rounded-[2rem] p-8 md:p-16 flex flex-col md:flex-row items-center gap-10 overflow-hidden relative shadow-xl">
          <div className="flex-1 space-y-6 relative z-10">
            <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">Start Selling on <br/>BizBhar Today</h2>
            <p className="text-slate-100 bg-white/10 backdrop-blur-md p-6 rounded-2xl text-lg border border-white/20">
              Join over 5,000 successful entrepreneurs. List your products, manage orders, and grow your brand with our powerful seller tools.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/register" className="bg-green-500 text-white px-8 py-4 rounded-xl font-bold hover:opacity-90 transition-all shadow-lg">
                Register as Seller
              </Link>
              <button className="border border-white/30 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-all">
                Learn More
              </button>
            </div>
          </div>
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-green-500/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-black/10 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-16 px-4">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-white">
              <svg className="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
              <h2 className="text-2xl font-extrabold tracking-tight">BizBhar</h2>
            </div>
            <p className="text-sm leading-relaxed">
              BizBhar is the leading multi-vendor marketplace platform connecting passionate sellers with millions of buyers worldwide.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Shop</h4>
            <ul className="space-y-4 text-sm">
              <li><a className="hover:text-green-500 transition-colors" href="#">Categories</a></li>
              <li><a className="hover:text-green-500 transition-colors" href="#">Best Sellers</a></li>
              <li><a className="hover:text-green-500 transition-colors" href="#">New Arrivals</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Sellers</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/register" className="hover:text-green-500 transition-colors">Sell on BizBhar</Link></li>
              <li><Link to="/seller/dashboard" className="hover:text-green-500 transition-colors">Seller Dashboard</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Newsletter</h4>
            <p className="text-xs mb-4">Get the latest deals and updates from BizBhar directly in your inbox.</p>
          </div>
        </div>
        <div className="max-w-[1200px] mx-auto mt-16 pt-8 border-t border-white/5 text-center text-xs">
          <p>© 2026 BizBhar Marketplace. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
