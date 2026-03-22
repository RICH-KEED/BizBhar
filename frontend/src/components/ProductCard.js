import React from 'react';
import { Link } from 'react-router-dom';
import { formatInr } from '../utils/format';

const ProductCard = ({ product }) => (
  <Link
    to={`/products/${product.id}`}
    className="group flex flex-col bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-card ring-1 ring-slate-900/[0.03] hover:shadow-premium hover:border-primary/25 hover:-translate-y-1 transition-all duration-300"
  >
    <div className="relative aspect-[4/5] bg-gradient-to-b from-slate-100 to-slate-50 overflow-hidden">
      {product.imageUrl ? (
        <img
          src={product.imageUrl}
          alt=""
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500 ease-out"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-slate-400">
          <span className="material-symbols-outlined text-5xl text-slate-300">image</span>
        </div>
      )}
      {product.stock === 0 && (
        <span className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg">
          Out of stock
        </span>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
    <div className="p-4 sm:p-5 flex flex-col flex-1 gap-1.5">
      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-primary/90">{product.category || 'General'}</p>
      <h3 className="font-display font-bold text-slate-900 line-clamp-2 group-hover:text-primary transition-colors leading-snug text-[15px]">
        {product.name}
      </h3>
      <p className="text-lg font-extrabold text-primary mt-auto pt-2 tracking-tight">{formatInr(product.price)}</p>
    </div>
  </Link>
);

export default ProductCard;
