import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SiteFooter from '../components/SiteFooter';

const Home = () => {
  const navigate = useNavigate();
  const [searchQ, setSearchQ] = useState('');

  const goSearch = (e) => {
    e.preventDefault();
    const p = new URLSearchParams();
    if (searchQ.trim()) p.set('search', searchQ.trim());
    navigate(`/products?${p.toString()}`);
  };

  return (
    <div className="text-slate-900 bg-background-light min-h-screen relative">
      <div
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(55,100,235,0.11),transparent_50%)]"
        aria-hidden
      />
      <div className="relative z-10">
        <Navbar />

      {/* Hero Section */}
      <section className="relative w-full pt-12 pb-24 px-4 sm:px-6 overflow-hidden">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-16 items-center">
          <div className="flex flex-col gap-8 order-2 lg:order-1">
            <div className="space-y-5">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-800 text-[11px] font-bold uppercase tracking-[0.15em] rounded-full border border-emerald-100">
                New arrivals daily
              </span>
              <h1 className="font-display text-4xl sm:text-5xl md:text-[3.25rem] font-extrabold leading-[1.08] tracking-tight text-slate-900">
                Discover everything <span className="text-primary">you need</span> in one place.
              </h1>
              <p className="text-lg text-slate-600 max-w-xl leading-relaxed">
                Verified sellers, curated quality, and secure checkout — shop electronics, fashion, and home essentials with confidence.
              </p>
            </div>
            <form
              onSubmit={goSearch}
              className="flex flex-col sm:flex-row w-full max-w-2xl bg-white/90 backdrop-blur-sm p-1.5 rounded-2xl border border-slate-200/90 shadow-card ring-1 ring-slate-900/[0.04]"
            >
              <div className="flex flex-1 items-center px-4 gap-3">
                <svg className="w-5 h-5 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  className="w-full bg-transparent border-none focus:ring-0 text-slate-800 placeholder:text-slate-400 py-3.5 text-sm"
                  placeholder="Search products, brands, categories…"
                  type="search"
                  value={searchQ}
                  onChange={(e) => setSearchQ(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="bg-primary text-white px-8 py-3.5 rounded-xl font-bold text-sm hover:brightness-105 transition-all shadow-md shadow-primary/25 sm:shrink-0"
              >
                Search
              </button>
            </form>
            <div className="flex items-center gap-6 pt-4">
              <div className="flex -space-x-3">
                <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 bg-cover bg-center" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAor5yAwpI64_mPXcFqvGP3JTOmZEoG68UBuNs0pVtJdEo1uIvErNlqzaVWv7_7oljpWV10CTeT6Dvzallwl6YG9l-baxAgBW-nPQEP540Hdk8yE1HpfHFogi0cNR823Zbrdn7KVZqb7MdV8QLUD7_7rFpxJx1O8DG4aZNTzYyceV9ysZoyM1BWTHLKY7KmpJNMPBSGG6qPw3fosbhhwGZo_T7rrn4-GDzcIwTPHgGJi7sGFKoDoGzLV3exV-A33aoDE19K5tmp1Zg')"}}></div>
                <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 bg-cover bg-center" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBxeuODo9PlcUMCbkqdajjxiGZFB8RF1ofy2bG0TxNunhDNU63syCiHmwTVvzNn9TGZ6h1wQ5-HHNpuaUHRKD3YIx6goVOgYBKSAVRKrVZideJNw_46vm_KtwcgCr0ClgColws_61_ym1U-_UOELEoAtag5oujI040FqWyTlwFg9SebTxmsjI64kv6jaSVuxXW6Mqb79Htr3mPXqknxVtwaj5n1v-C2uFrAggntyZANf3oaW6PpUKPxJ8a1THhTGeVqnxzedybCjYw')"}}></div>
                <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 bg-cover bg-center" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDVgmUb1nM0N5POWL1ssIg91-8K2afRq0qlzTJXSWuN59GDPEcP6UUAR5msp9ra8IJ6RFUPHYVAaxnSxa7D2CkTx9_LUf0qGyTgdzYTfR927zdFg5JQ-0YEXHZOG2dumgRMFSZNYv8FumMny1vedIvZtTBCgXr7QX8Lu5aYwlUk7koXHpQAMSGVtM_3_wYg_5DsRfYCrP6UM2eyFZ5irSIFBEg0L1Se9IrPMwLY_fSurwrX4KZ1Je_Bz9exAak4i7yYjESRi4BEBvk')"}}></div>
                <div className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-primary to-blue-700 flex items-center justify-center text-white text-[10px] font-bold shadow-md">
                  +10k
                </div>
              </div>
              <p className="text-sm font-medium text-slate-500">Trusted by over 10,000+ happy shoppers</p>
            </div>
          </div>
          <div className="relative order-1 lg:order-2">
            <div className="w-full aspect-square rounded-[1.75rem] bg-slate-100 overflow-hidden border border-slate-200/80 relative shadow-premium ring-1 ring-slate-900/[0.04]">
              <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAilOA0qlbKLlQ3lVeaRCS6MgY79Rp8B5QBWvAmFFGwF7Vn5IcwVBhn3q2A_egZDi7saqjPwDqEx07PCu-sDoL9N2lU0km7aP9ZuccdqdsdskSNPYcsyHqmcENhXirn1hCWBVhr1IYQqTjSm8Cu3_UQlJ2ZiUpxxKfMhubXKnI0kCr06JnrDjWviIlj30W5rYbEHpH_0ml2_ORhXwVozKLHZCfRpVexaxFu4Tk00tqLhd5hYkaJOTZJHkliq7dFxEEde3vmjfOPUV0')"}}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/25 via-transparent to-transparent pointer-events-none" />
              <div className="absolute top-8 left-8 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-card flex items-center gap-3 border border-white/80 ring-1 ring-slate-900/[0.05]">
                <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
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
      <section className="py-14 border-y border-slate-200/60 bg-white/60 backdrop-blur-sm">
        <div className="max-w-[1200px] mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="flex items-center gap-4 p-6 bg-white rounded-2xl shadow-card border border-slate-200/80 ring-1 ring-slate-900/[0.03] hover:shadow-premium transition-shadow duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-blue-50 rounded-xl flex items-center justify-center text-primary">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h4 className="font-display font-bold text-slate-900">Secure payments</h4>
              <p className="text-sm text-slate-500 leading-relaxed">Stripe-encrypted checkout</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-6 bg-white rounded-2xl shadow-card border border-slate-200/80 ring-1 ring-slate-900/[0.03] hover:shadow-premium transition-shadow duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-blue-50 rounded-xl flex items-center justify-center text-primary">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h4 className="font-display font-bold text-slate-900">Pan-India delivery</h4>
              <p className="text-sm text-slate-500 leading-relaxed">Fast, tracked shipments</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-6 bg-white rounded-2xl shadow-card border border-slate-200/80 ring-1 ring-slate-900/[0.03] hover:shadow-premium transition-shadow duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-blue-50 rounded-xl flex items-center justify-center text-primary">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div>
              <h4 className="font-display font-bold text-slate-900">24/7 support</h4>
              <p className="text-sm text-slate-500 leading-relaxed">Help when you need it</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20 px-4 sm:px-6 bg-gradient-to-b from-white to-background-light">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary mb-2">Collections</p>
              <h2 className="font-display text-3xl font-extrabold text-slate-900 tracking-tight">Featured categories</h2>
              <p className="text-slate-500 mt-2">Handpicked starting points for your next find</p>
            </div>
            <Link
              to="/products"
              className="inline-flex items-center gap-1.5 text-primary font-bold text-sm hover:gap-2 transition-all"
            >
              View all
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            <Link to="/products?category=Electronics" className="group flex flex-col items-center gap-4">
              <div className="w-full aspect-square rounded-2xl bg-gray-100 overflow-hidden relative border border-transparent group-hover:border-primary/20 group-hover:shadow-lg transition-all">
                <div className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBYZH80fVsBPPKnINYjGpf_3FTnQdXI4xQpNkkIBpcWeX7SO9PcJGDLinRfwVAgP-olkksGYey4oXViCyHCzPlPEnmTtEW0PoAf1BcHZ34tgWmrU8RXGPhzlP8AOkcn7fb2dDEts877SYNQTzss4F372Exh_S-JGkR7BvJo4zsrUKmu95GVEEsBGawqWFr9DZjCIdZIEXZZh1Sg4qvYuix4I1LpwNOcxMAkeIfpauXMiV43VWNetLmuodcVIyHvSUeFAXcuID0TDi0')"}}></div>
                <div className="absolute inset-0 bg-slate-900/5 group-hover:bg-primary/10 transition-colors"></div>
              </div>
              <p className="font-bold text-slate-700 group-hover:text-primary transition-colors">Electronics</p>
            </Link>
            <Link to="/products?category=Fashion" className="group flex flex-col items-center gap-4">
              <div className="w-full aspect-square rounded-2xl bg-gray-100 overflow-hidden relative border border-transparent group-hover:border-primary/20 group-hover:shadow-lg transition-all">
                <div className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCK5n6QzI4rCzmuH0CdM5UK5GBdlzzWCl6pExsMGn9cPYX7dhxdvOFUVUnXLD9k3c6DRwJ9DlRZ3rVdq2NwGMNpNDDbJSVp14skpn1UbHkD4l64H1u2EHrR0l-QPp7yfPxG4d1DZkBKJAH11i6cxki-zd0V1w6CItR19-Ffhh0IBPMFJeegGEvYhqtdCjDJjpjJnrE3HyO3a0jtQ-en2g_sMj7LFgxqUN7GpxS1aLwKKylCKf_Bef0wUUnVfAvOBIGugTTEG_IpQgA')"}}></div>
                <div className="absolute inset-0 bg-slate-900/5 group-hover:bg-primary/10 transition-colors"></div>
              </div>
              <p className="font-bold text-slate-700 group-hover:text-primary transition-colors">Fashion</p>
            </Link>
            <Link to={`/products?category=${encodeURIComponent('Home & Living')}`} className="group flex flex-col items-center gap-4">
              <div className="w-full aspect-square rounded-2xl bg-gray-100 overflow-hidden relative border border-transparent group-hover:border-primary/20 group-hover:shadow-lg transition-all">
                <div className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA7y3JurA5VBZ6fsD3IMQRNO0-0hh4_lRx3zx_zu0Z1KmOjrzOH3vvYZQIQadRhr0QK6qkAoo_nt1nUjZ47tGUGeH9EY3TkrUEyYV398x4905jQESDdfDg7pHdjryrbN8wskQv90GJRYCM0k7gRTTOFhr5fjAFdiszn78aj-lJcWctojVwpdpaXFu3-DtnMeua3x9BAUQd1HnochEEVOOvAPLlpEkWbZ95hHpYoNPL43mzlHaRND3RQBO3lfim3JCYavcasw8VQodo')"}}></div>
                <div className="absolute inset-0 bg-slate-900/5 group-hover:bg-primary/10 transition-colors"></div>
              </div>
              <p className="font-bold text-slate-700 group-hover:text-primary transition-colors">Home & Living</p>
            </Link>
            <Link to="/products?category=Beauty" className="group flex flex-col items-center gap-4">
              <div className="w-full aspect-square rounded-2xl bg-gray-100 overflow-hidden relative border border-transparent group-hover:border-primary/20 group-hover:shadow-lg transition-all">
                <div className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDrQ1E3ZK3CHOODAi_NQpsXVaA9NBYFLfXVrredlFDVrMaaRacsEmHlJ61ThOMpyG5QRzmqhgdOmhwuuIZYvIvRd5YR3BM0OKrG_uV4y9rp_FYdU5kyySvuu6HJkHxfe2yOCnGTXUtmgf6d5LJqwb9omCbSwytg6zNiFUSaX1jmU10dypUgs8NjX2oeNHQwHfzLpspZ6h7Qxocl8yKnifDNp6UBMLc1kSw7fJJIMG1fWHKjwNrrPY8ieYD0CDSK8IMqNYkMvi9tqf0')"}}></div>
                <div className="absolute inset-0 bg-slate-900/5 group-hover:bg-primary/10 transition-colors"></div>
              </div>
              <p className="font-bold text-slate-700 group-hover:text-primary transition-colors">Beauty</p>
            </Link>
            <Link to="/products?category=Sports" className="group flex flex-col items-center gap-4">
              <div className="w-full aspect-square rounded-2xl bg-gray-100 overflow-hidden relative border border-transparent group-hover:border-primary/20 group-hover:shadow-lg transition-all">
                <div className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA9zIrfjR5d42bVS523kCz2ujwiiUQgTyKaU2U84GoGZtH2nxYXFHe8sL9p7D3wvXmYJJZqcCgcyvbeQVnkWs4ICV8DcQ-ldfAZ90XMdgO6W0Elolbnc3sdyjn-N7gQQfzYV1dwZpLEcDu8S9gf6pPgXW7eY0PcPi3KbDnZLsj4URHLDtIVwD7ijEcaJgpjRGdX9gKhi36piGC-ghWgZAVggQMgKzXDmXUtlEmClT4cpYxoA-u4N6q67CQs7CEsDe70I5_b_jjKflI')"}}></div>
                <div className="absolute inset-0 bg-slate-900/5 group-hover:bg-primary/10 transition-colors"></div>
              </div>
              <p className="font-bold text-slate-700 group-hover:text-primary transition-colors">Sports</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-20 px-4 sm:px-6 bg-slate-50/80 border-t border-slate-200/60">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary mb-2">Inspiration</p>
              <h2 className="font-display text-3xl font-extrabold text-slate-900 tracking-tight">Trending picks</h2>
              <p className="text-slate-500 mt-2">Editorial highlights — explore the live marketplace for real inventory</p>
            </div>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-800 shadow-sm hover:border-primary/30 hover:bg-primary-light/40 transition-all"
            >
              Shop marketplace
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Product 1 - Headphones */}
            <div className="group bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-card ring-1 ring-slate-900/[0.03] hover:shadow-premium hover:-translate-y-1 transition-all duration-300 p-4 sm:p-5">
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
            <div className="group bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-card ring-1 ring-slate-900/[0.03] hover:shadow-premium hover:-translate-y-1 transition-all duration-300 p-4 sm:p-5">
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
            <div className="group bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-card ring-1 ring-slate-900/[0.03] hover:shadow-premium hover:-translate-y-1 transition-all duration-300 p-4 sm:p-5">
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
      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-[1200px] mx-auto rounded-[2rem] p-8 md:p-14 lg:p-16 flex flex-col md:flex-row items-center gap-10 overflow-hidden relative shadow-premium bg-gradient-to-br from-primary via-blue-700 to-slate-900 ring-1 ring-white/10">
          <div className="flex-1 space-y-6 relative z-10">
            <h2 className="font-display text-3xl md:text-5xl font-extrabold text-white leading-[1.1]">
              Start selling on <br />
              BizBhar today
            </h2>
            <p className="text-blue-100/95 bg-white/10 backdrop-blur-md p-6 rounded-2xl text-base md:text-lg leading-relaxed border border-white/15">
              List products, manage orders, and grow your brand with our seller tools — Stripe payouts and a dashboard built for
              Indian commerce.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 bg-white text-primary px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition-all shadow-lg shadow-black/20"
              >
                Register as seller
                <span className="material-symbols-outlined text-xl">arrow_forward</span>
              </Link>
              <Link
                to="/seller/dashboard"
                className="inline-flex items-center justify-center gap-2 border border-white/35 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-all"
              >
                Seller dashboard
              </Link>
            </div>
          </div>
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-400/15 rounded-full blur-3xl pointer-events-none" />
        </div>
      </section>

      <SiteFooter />
      </div>
    </div>
  );
};

export default Home;
