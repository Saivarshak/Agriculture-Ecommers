import React from 'react';
import { X, Heart, Trash2, ShoppingBag } from 'lucide-react';
import { Product } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistIds: string[];
  products: Product[];
  onRemoveFromWishlist: (productId: string) => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onSelectProduct: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistIds,
  products,
  onRemoveFromWishlist,
  onAddToCart,
  onSelectProduct
}) => {
  if (!isOpen) return null;

  const wishlistProducts = products.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-900/60 backdrop-blur-xs flex justify-end animate-fadeIn">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto">
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-600 fill-rose-600" />
            <h3 className="text-base font-bold text-stone-900 font-serif-display">
              My Wishlist ({wishlistProducts.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {wishlistProducts.length === 0 ? (
            <div className="py-20 text-center space-y-3">
              <Heart className="w-12 h-12 text-stone-300 mx-auto" />
              <h4 className="text-sm font-semibold text-stone-800">Your wishlist is empty</h4>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Save your favorite organic crops by clicking the heart icon on any product card.
              </p>
            </div>
          ) : (
            wishlistProducts.map((product) => (
              <div
                key={product.id}
                className="flex gap-3 p-3 rounded-xl border border-stone-200 bg-stone-50/50 hover:bg-stone-50 transition-colors"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  onClick={() => {
                    onSelectProduct(product);
                    onClose();
                  }}
                  className="w-16 h-16 rounded-lg object-cover bg-stone-200 border border-stone-200 shrink-0 cursor-pointer"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-1">
                    <h4
                      onClick={() => {
                        onSelectProduct(product);
                        onClose();
                      }}
                      className="text-xs font-bold text-stone-900 truncate cursor-pointer hover:text-emerald-800"
                    >
                      {product.name}
                    </h4>
                    <button
                      onClick={() => onRemoveFromWishlist(product.id)}
                      className="text-stone-400 hover:text-rose-600 p-0.5"
                      title="Remove from wishlist"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <span className="text-[11px] text-stone-500 capitalize block">
                    {product.category}
                  </span>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs font-bold text-emerald-950 font-numeric">
                      ₹{product.price} / {product.unit}
                    </span>
                    <button
                      onClick={() => onAddToCart(product, 1)}
                      className="px-2.5 py-1 bg-emerald-800 hover:bg-emerald-900 text-white text-[11px] font-bold rounded-lg flex items-center gap-1 shadow-2xs"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Add to Bag</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {wishlistProducts.length > 0 && (
          <div className="p-4 border-t border-stone-200 bg-stone-50">
            <button
              onClick={() => {
                wishlistProducts.forEach((p) => onAddToCart(p, 1));
                onClose();
              }}
              className="w-full bg-emerald-800 text-white font-bold py-2.5 rounded-xl hover:bg-emerald-900 text-xs shadow-sm"
            >
              Add All to Shopping Bag
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
