import React, { useState } from 'react';
import {
  ShieldCheck,
  Edit2,
  Plus,
  Sliders,
  LogOut,
  Sparkles,
  ArrowRight,
  Package,
  Layers,
  CheckCircle2,
  LogIn
} from 'lucide-react';
import { Product } from '../types';

interface AdminCardProps {
  isAdmin: boolean;
  onLoginAsAdmin: () => void;
  onLogoutAdmin: () => void;
  onOpenProductManager: () => void;
  onAddNewProduct: () => void;
  onNavigateToAdminStudio: () => void;
  totalProductsCount: number;
}

export const AdminCard: React.FC<AdminCardProps> = ({
  isAdmin,
  onLoginAsAdmin,
  onLogoutAdmin,
  onOpenProductManager,
  onAddNewProduct,
  onNavigateToAdminStudio,
  totalProductsCount
}) => {
  return (
    <div
      className={`rounded-2xl p-4 border transition-all duration-200 shadow-xs relative overflow-hidden ${
        isAdmin
          ? 'bg-gradient-to-br from-emerald-950 via-emerald-900 to-stone-900 text-white border-emerald-700/80'
          : 'bg-white text-stone-900 border-emerald-200/90 hover:border-emerald-500/60'
      }`}
    >
      {/* Decorative background glow */}
      {isAdmin && (
        <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-emerald-500/20 rounded-full blur-xl pointer-events-none" />
      )}

      {/* Top Header Row */}
      <div className="flex items-center justify-between mb-2.5 relative z-10">
        <div className="flex items-center gap-2.5">
          <div
            className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
              isAdmin
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'bg-emerald-50 text-[#007a4d]'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h4
              className={`text-sm font-black leading-tight ${
                isAdmin ? 'text-white' : 'text-stone-900'
              }`}
            >
              {isAdmin ? 'Admin Control Center' : 'Admin Portal'}
            </h4>
            <span
              className={`text-[10px] font-semibold tracking-wide block mt-0.5 ${
                isAdmin ? 'text-emerald-300' : 'text-stone-500'
              }`}
            >
              {isAdmin ? 'Storefront Live Editor' : 'Catalog Management'}
            </span>
          </div>
        </div>

        {/* Status Indicator */}
        {isAdmin ? (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-200 border border-emerald-400/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Active
          </span>
        ) : (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-stone-100 text-stone-600 border border-stone-200">
            Admin Only
          </span>
        )}
      </div>

      {/* Card Content & Action Buttons */}
      <div className="relative z-10 space-y-2.5">
        {isAdmin ? (
          <>
            <p className="text-xs text-emerald-100/90 leading-relaxed font-medium">
              You can edit prices, stock, and info on any product below, or open full controls.
            </p>

            <div className="grid grid-cols-2 gap-2 pt-1">
              {/* Quick Edit Products Button */}
              <button
                onClick={onOpenProductManager}
                className="flex items-center justify-center gap-1.5 bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-xs py-2 px-2.5 rounded-xl transition-colors shadow-xs cursor-pointer"
                title="Edit existing products"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit Products</span>
              </button>

              {/* Add New Product Button */}
              <button
                onClick={onAddNewProduct}
                className="flex items-center justify-center gap-1.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs py-2 px-2.5 rounded-xl border border-white/20 transition-colors cursor-pointer"
                title="Add a new crop or product"
              >
                <Plus className="w-3.5 h-3.5 text-emerald-300" />
                <span>Add Product</span>
              </button>
            </div>

            {/* Bottom Row: Open Admin Section Studio + Logout */}
            <div className="flex items-center justify-between pt-2 border-t border-emerald-800/80 text-xs">
              <button
                onClick={onNavigateToAdminStudio}
                className="inline-flex items-center gap-1 text-emerald-300 hover:text-white font-bold cursor-pointer transition-colors"
              >
                <span>Admin Section</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={onLogoutAdmin}
                className="inline-flex items-center gap-1 text-rose-300 hover:text-rose-200 font-semibold cursor-pointer transition-colors"
                title="Exit Admin Mode"
              >
                <LogOut className="w-3 h-3" />
                <span>Sign Out</span>
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="text-xs text-stone-600 leading-normal">
              Log in to edit products, update pricing, stock levels & publish new crops directly.
            </p>

            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={onLoginAsAdmin}
                className="flex-1 flex items-center justify-center gap-2 bg-[#007a4d] hover:bg-[#006841] text-white font-bold text-xs py-2 px-3 rounded-xl transition-all shadow-xs cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign in as Admin</span>
              </button>

              <button
                onClick={onNavigateToAdminStudio}
                className="flex items-center justify-center gap-1 px-3 py-2 text-stone-700 hover:text-stone-900 hover:bg-stone-100 rounded-xl font-bold text-xs border border-stone-200 transition-colors cursor-pointer shrink-0"
                title="Go to Admin Section"
              >
                <span>Admin Section</span>
                <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
