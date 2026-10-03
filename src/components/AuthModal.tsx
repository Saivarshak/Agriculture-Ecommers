import React, { useState } from 'react';
import { X, Lock, Mail, UserCheck, ShieldCheck, CheckCircle2, User as UserIcon } from 'lucide-react';
import { User, UserRole, LanguageCode } from '../types';
import { translations } from '../data/translations';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
  onLoginSuccess: (user: User) => void;
  language: LanguageCode;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLoginSuccess,
  language
}) => {
  const t = translations[language];

  const [email, setEmail] = useState('saivarshak14@gmail.com');
  const [password, setPassword] = useState('1111');
  const [selectedRole, setSelectedRole] = useState<UserRole>(currentUser.role || 'farmer');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setErrorMsg('Please enter both email and password.');
      return;
    }

    // Authenticate credentials as specified: saivarshak14@gmail.com / 1111
    if (email.toLowerCase() === 'saivarshak14@gmail.com' && password === '1111') {
      const loggedUser: User = {
        id: 'usr_varshak',
        email: 'saivarshak14@gmail.com',
        name: 'Sai Varshak',
        role: selectedRole,
        phone: '+91 98480 22334',
        address: 'Plot 42, Green Meadows Agri Hub, Shamirpet, Hyderabad Rural',
        farmId: 'farm_varshak_01'
      };
      onLoginSuccess(loggedUser);
      onClose();
      return;
    }

    // Generic fallback for any other email/password
    const genericUser: User = {
      id: `usr_${Date.now()}`,
      email: email.trim(),
      name: email.split('@')[0],
      role: selectedRole,
      phone: '+91 98480 00000',
      farmId: selectedRole === 'farmer' ? 'farm_varshak_01' : undefined
    };
    onLoginSuccess(genericUser);
    onClose();
  };

  const handleQuickLogin = (role: UserRole) => {
    setEmail('saivarshak14@gmail.com');
    setPassword('1111');
    setSelectedRole(role);
    const user: User = {
      id: 'usr_varshak',
      email: 'saivarshak14@gmail.com',
      name: 'Sai Varshak',
      role,
      phone: '+91 98480 22334',
      address: 'Plot 42, Green Meadows Agri Hub, Shamirpet, Hyderabad Rural',
      farmId: 'farm_varshak_01'
    };
    onLoginSuccess(user);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-stone-200 space-y-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-700"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-emerald-800 text-white flex items-center justify-center mx-auto text-xl shadow-md">
            🌱
          </div>
          <h3 className="text-xl font-bold text-stone-900 font-serif-display">
            Direct Agriculture Authentication
          </h3>
          <p className="text-xs text-stone-500">
            Secure login for local farmers, urban consumers, and admin verification officers.
          </p>
        </div>

        {/* Quick Demo Credentials Auto-Fill Banner */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-emerald-950 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              Pre-Configured Demo Credentials
            </span>
            <span className="text-[10px] text-emerald-700 font-mono font-bold">1-Click Auto Fill</span>
          </div>
          <div className="text-[11px] text-emerald-800 font-mono space-y-0.5">
            <div>User: <strong>saivarshak14@gmail.com</strong></div>
            <div>Password: <strong>1111</strong></div>
          </div>

          <div className="pt-1.5 flex gap-2">
            <button
              type="button"
              onClick={() => handleQuickLogin('farmer')}
              className="flex-1 py-1.5 px-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded font-bold text-[11px] text-center transition-colors shadow-2xs"
            >
              Sign in as Farmer
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('consumer')}
              className="flex-1 py-1.5 px-2 bg-white hover:bg-emerald-100 text-emerald-900 border border-emerald-300 rounded font-bold text-[11px] text-center transition-colors"
            >
              As Consumer
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('admin')}
              className="flex-1 py-1.5 px-2 bg-stone-800 hover:bg-stone-900 text-white rounded font-bold text-[11px] text-center transition-colors"
            >
              As Admin
            </button>
          </div>
        </div>

        {errorMsg && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-lg">
            {errorMsg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">Select Active Role</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setSelectedRole('farmer')}
                className={`py-2 px-2 rounded-lg text-xs font-semibold border text-center transition-colors ${
                  selectedRole === 'farmer'
                    ? 'border-emerald-700 bg-emerald-50 text-emerald-900 font-bold'
                    : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                }`}
              >
                Farmer
              </button>
              <button
                type="button"
                onClick={() => setSelectedRole('consumer')}
                className={`py-2 px-2 rounded-lg text-xs font-semibold border text-center transition-colors ${
                  selectedRole === 'consumer'
                    ? 'border-emerald-700 bg-emerald-50 text-emerald-900 font-bold'
                    : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                }`}
              >
                Consumer
              </button>
              <button
                type="button"
                onClick={() => setSelectedRole('admin')}
                className={`py-2 px-2 rounded-lg text-xs font-semibold border text-center transition-colors ${
                  selectedRole === 'admin'
                    ? 'border-emerald-700 bg-emerald-50 text-emerald-900 font-bold'
                    : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                }`}
              >
                Admin Desk
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-2.5 pointer-events-none" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="saivarshak14@gmail.com"
                className="w-full text-xs pl-9 pr-3 py-2 rounded-lg border border-stone-300 focus:ring-1 focus:ring-emerald-700 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-2.5 pointer-events-none" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="1111"
                className="w-full text-xs pl-9 pr-3 py-2 rounded-lg border border-stone-300 focus:ring-1 focus:ring-emerald-700 font-mono"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-800 text-white font-bold py-2.5 rounded-xl hover:bg-emerald-900 transition-colors shadow-sm text-xs cursor-pointer"
          >
            Sign In with Credentials
          </button>
        </form>
      </div>
    </div>
  );
};
