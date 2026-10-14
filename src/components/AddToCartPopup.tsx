import React, { useEffect } from 'react';
import { ShoppingBag, CheckCircle2, X, ArrowRight } from 'lucide-react';
import { Product, LanguageCode } from '../types';
import { getProductLocalized } from '../data/productTranslations';

interface AddToCartPopupProps {
  item: { product: Product; quantity: number } | null;
  onClose: () => void;
  onCheckInCart: () => void;
  language: LanguageCode;
}

export const AddToCartPopup: React.FC<AddToCartPopupProps> = ({
  item,
  onClose,
  onCheckInCart,
  language
}) => {
  useEffect(() => {
    if (!item) return;
    const timer = setTimeout(() => {
      onClose();
    }, 5500);
    return () => clearTimeout(timer);
  }, [item, onClose]);

  if (!item) return null;

  const { product, quantity } = item;
  const loc = getProductLocalized(
    product.id,
    product.name,
    product.category,
    language,
    product.description,
    product.unit
  );

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="fixed top-5 right-5 sm:right-6 z-[100] max-w-sm sm:max-w-md w-[calc(100%-2.5rem)] animate-fadeIn transition-all duration-300"
    >
      <div className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-green-700 text-white rounded-2xl p-4 sm:p-5 shadow-2xl border-2 border-emerald-400/60 backdrop-blur-md relative overflow-hidden">
        {/* Glow decoration */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-300/20 rounded-full blur-2xl pointer-events-none" />

        {/* Top Header Row */}
        <div className="flex items-center justify-between pb-3 border-b border-emerald-500/40 relative z-10">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-emerald-500/80 border border-emerald-300/60 flex items-center justify-center shrink-0 shadow-inner">
              <CheckCircle2 className="w-4.5 h-4.5 text-white" />
            </div>
            <div>
              <h4 className="font-black text-sm sm:text-base tracking-wide text-white leading-tight">
                Item added to card
              </h4>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close notification"
            className="w-7 h-7 rounded-lg bg-emerald-800/60 hover:bg-emerald-900/80 text-emerald-200 hover:text-white flex items-center justify-center transition-colors cursor-pointer border border-emerald-500/30"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Product preview */}
        <div className="flex items-center gap-3.5 py-3 relative z-10">
          <img
            src={product.image}
            alt={loc.name}
            referrerPolicy="no-referrer"
            className="w-13 h-13 rounded-xl object-cover bg-emerald-950/50 border border-emerald-300/40 shrink-0 shadow-sm"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-white truncate font-serif-display">
              {loc.name}
            </p>
            <p className="text-xs text-emerald-100 flex items-center gap-2 mt-0.5">
              <span className="font-semibold text-emerald-200">
                Qty: {quantity} {loc.unit}
              </span>
              <span>·</span>
              <span className="font-bold text-white font-numeric">
                ₹{product.price * quantity}
              </span>
            </p>
            <p className="text-[11px] text-emerald-200/90 truncate mt-0.5">
              Direct from {product.farmerName} ({product.farmerVillage.split(',')[0]})
            </p>
          </div>
        </div>

        {/* CTA: Check in cart */}
        <div className="pt-2 relative z-10">
          <button
            onClick={onCheckInCart}
            className="w-full bg-white hover:bg-emerald-50 active:bg-emerald-100 text-emerald-900 font-extrabold text-xs sm:text-sm py-2.5 px-4 rounded-xl shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer group"
          >
            <ShoppingBag className="w-4 h-4 text-emerald-700 group-hover:scale-110 transition-transform" />
            <span>Check in cart</span>
            <ArrowRight className="w-4 h-4 text-emerald-700 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
