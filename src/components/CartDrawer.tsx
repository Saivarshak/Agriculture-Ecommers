import React, { useState } from 'react';
import {
  X,
  Trash2,
  Calendar,
  Clock,
  ShieldCheck,
  CreditCard,
  QrCode,
  Banknote,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { CartItem, DeliverySlot, PaymentMethod, User, LanguageCode, Order } from '../types';
import { translations } from '../data/translations';
import { StorageService } from '../services/storage';
import { getProductLocalized } from '../data/productTranslations';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, qty: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  user: User;
  language: LanguageCode;
  isOffline?: boolean;
  onOrderSuccess: (order: Order) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  user,
  language,
  isOffline = false,
  onOrderSuccess
}) => {
  const t = translations[language];

  const [step, setStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [selectedSlot, setSelectedSlot] = useState<DeliverySlot>('early_morning');
  const [deliveryDate, setDeliveryDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [fullName, setFullName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone || '+91 98480 22334');
  const [address, setAddress] = useState(user.address || 'Flat 402, Kaveri Heights, Madhapur, Hyderabad');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');
  const [upiIdInput, setUpiIdInput] = useState('saivarshak14@oksbi');
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const deliveryFee = subtotal >= 399 || items.length === 0 ? 0 : 35;
  const total = subtotal + deliveryFee;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    const newOrder: Order = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      consumerEmail: user.email,
      consumerName: fullName,
      items: [...items],
      subtotal,
      deliveryFee,
      total,
      status: 'confirmed',
      paymentMethod,
      paymentStatus: paymentMethod === 'cod' ? 'pending_cod' : 'paid',
      delivery: {
        fullName,
        phone,
        address,
        city: 'Hyderabad',
        pincode: '500081',
        slot: selectedSlot,
        deliveryDate
      },
      createdAt: new Date().toLocaleString(),
      estimatedDeliveryTime:
        selectedSlot === 'early_morning'
          ? `${deliveryDate} 07:30 AM`
          : `${deliveryDate} 06:30 PM`,
      liveStage: 1, // 'harvested'
      currentLocationDesc: 'Farm Harvest Batch Assigned to Farmer Gate',
      driverName: 'Ramesh Reddy (Cold Transport)',
      driverPhone: '+91 98851 44321',
      tempCelsius: 4.0,
      isOfflineQueued: isOffline
    };

    StorageService.createOrder(newOrder, isOffline);
    setPlacedOrder(newOrder);
    setStep('success');
    onClearCart();
    onOrderSuccess(newOrder);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-900/60 backdrop-blur-xs flex justify-end animate-fadeIn">
      <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div>
            <h3 className="text-base font-bold text-stone-900 font-serif-display">
              {step === 'cart'
                ? `Harvest Basket (${items.length} crops)`
                : step === 'checkout'
                ? 'Automated Delivery & Schedule'
                : 'Order Confirmed!'}
            </h3>
            <p className="text-xs text-stone-500">
              {step === 'cart'
                ? 'Direct farm gate origin · Zero intermediaries'
                : step === 'checkout'
                ? 'Automated cold-chain scheduling'
                : '100% value booked for rural farmers'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {step === 'cart' && (
            <>
              {items.length === 0 ? (
                <div className="py-16 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto">
                    🌱
                  </div>
                  <h4 className="text-sm font-semibold text-stone-800">Your harvest basket is empty</h4>
                  <p className="text-xs text-stone-500 max-w-xs mx-auto">
                    Explore freshly harvested crops directly from local verified farmers.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Cart Items */}
                  {items.map(({ product, quantity }) => (
                    <div
                      key={product.id}
                      className="flex gap-3 p-3 rounded-xl border border-stone-200 bg-stone-50/50 hover:bg-stone-50 transition-colors"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 rounded-lg object-cover bg-stone-200 border border-stone-200 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-xs font-bold text-stone-900 truncate">
                            {getProductLocalized(product.id, product.name, product.category, language).name}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(product.id)}
                            className="text-stone-400 hover:text-rose-600 transition-colors p-0.5 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-[11px] text-stone-500 truncate">
                          Farmer: {product.farmerName} ({product.farmerVillage})
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-stone-300 rounded bg-white text-xs">
                            <button
                              onClick={() => onUpdateQuantity(product.id, quantity - 1)}
                              className="px-2 py-0.5 text-stone-600 hover:bg-stone-100 font-bold"
                            >
                              -
                            </button>
                            <span className="px-2 font-semibold font-numeric">{quantity}</span>
                            <button
                              onClick={() => onUpdateQuantity(product.id, quantity + 1)}
                              className="px-2 py-0.5 text-stone-600 hover:bg-stone-100 font-bold"
                            >
                              +
                            </button>
                          </div>
                          <span className="text-xs font-bold text-stone-900 font-numeric">
                            ₹{product.price * quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Guarantee banner */}
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-900 space-y-1">
                    <div className="font-semibold flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-700" />
                      <span>Direct Farmer Remittance</span>
                    </div>
                    <p className="text-[11px] text-emerald-800 leading-normal">
                      Full subtotal of ₹{subtotal} will be wired directly via Aadhaar/UPI to the farmer's account. Zero platform cut.
                    </p>
                  </div>
                </div>
              )}
            </>
          )}

          {step === 'checkout' && (
            <form onSubmit={handleCheckoutSubmit} className="space-y-5">
              {/* Delivery Schedule Automation */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                  {t.deliverySlots}
                </label>

                <div className="grid grid-cols-1 gap-2">
                  <label
                    className={`p-3 rounded-xl border text-xs cursor-pointer flex items-center justify-between transition-colors ${
                      selectedSlot === 'early_morning'
                        ? 'border-emerald-700 bg-emerald-50/70 text-emerald-950 font-semibold'
                        : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="slot"
                        checked={selectedSlot === 'early_morning'}
                        onChange={() => setSelectedSlot('early_morning')}
                        className="text-emerald-700 focus:ring-emerald-700"
                      />
                      <div>
                        <span className="block font-bold">{t.earlyMorningSlot}</span>
                        <span className="text-[11px] text-stone-500 font-normal">
                          Plucked at 4:30 AM · Delivered cold at 7:00 AM
                        </span>
                      </div>
                    </div>
                    <span className="text-[11px] text-emerald-800 font-bold">Recommended</span>
                  </label>

                  <label
                    className={`p-3 rounded-xl border text-xs cursor-pointer flex items-center justify-between transition-colors ${
                      selectedSlot === 'evening_fresh'
                        ? 'border-emerald-700 bg-emerald-50/70 text-emerald-950 font-semibold'
                        : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="slot"
                        checked={selectedSlot === 'evening_fresh'}
                        onChange={() => setSelectedSlot('evening_fresh')}
                        className="text-emerald-700 focus:ring-emerald-700"
                      />
                      <div>
                        <span className="block font-bold">{t.eveningSlot}</span>
                        <span className="text-[11px] text-stone-500 font-normal">
                          Midday harvest · Doorstep delivery before dinner
                        </span>
                      </div>
                    </div>
                  </label>

                  <label
                    className={`p-3 rounded-xl border text-xs cursor-pointer flex items-center justify-between transition-colors ${
                      selectedSlot === 'bulk_weekend'
                        ? 'border-emerald-700 bg-emerald-50/70 text-emerald-950 font-semibold'
                        : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="slot"
                        checked={selectedSlot === 'bulk_weekend'}
                        onChange={() => setSelectedSlot('bulk_weekend')}
                        className="text-emerald-700 focus:ring-emerald-700"
                      />
                      <div>
                        <span className="block font-bold">{t.weekendSlot}</span>
                        <span className="text-[11px] text-stone-500 font-normal">
                          Apartment community collective drop · Zero carbon
                        </span>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block">
                  Delivery Destination
                </label>
                <div className="space-y-2">
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Recipient Full Name"
                    className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:ring-1 focus:ring-emerald-700"
                  />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Mobile Number (for SMS & Driver Dispatch)"
                    className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:ring-1 focus:ring-emerald-700"
                  />
                  <textarea
                    required
                    rows={2}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Complete Flat/House, Apartment Name, Street, Landmark"
                    className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:ring-1 focus:ring-emerald-700"
                  />
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block">
                  {t.paymentMethod}
                </label>
                <div className="space-y-2">
                  {/* UPI */}
                  <label
                    className={`p-3 rounded-xl border text-xs cursor-pointer flex items-center justify-between ${
                      paymentMethod === 'upi'
                        ? 'border-emerald-700 bg-emerald-50/60'
                        : 'border-stone-200 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'upi'}
                        onChange={() => setPaymentMethod('upi')}
                        className="text-emerald-700"
                      />
                      <QrCode className="w-4 h-4 text-emerald-800" />
                      <div>
                        <span className="font-bold block">{t.upiInstant}</span>
                        <span className="text-[11px] text-stone-500">
                          Google Pay, PhonePe, Paytm, BHIM QR
                        </span>
                      </div>
                    </div>
                  </label>

                  {paymentMethod === 'upi' && (
                    <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 text-xs space-y-2">
                      <span className="text-[11px] text-stone-600 block">Enter your VPA / UPI ID:</span>
                      <input
                        type="text"
                        value={upiIdInput}
                        onChange={(e) => setUpiIdInput(e.target.value)}
                        placeholder="yourname@okhdfcbank"
                        className="w-full p-2 bg-white rounded border border-stone-300 text-xs font-mono"
                      />
                    </div>
                  )}

                  {/* Cash on Delivery */}
                  <label
                    className={`p-3 rounded-xl border text-xs cursor-pointer flex items-center justify-between ${
                      paymentMethod === 'cod'
                        ? 'border-emerald-700 bg-emerald-50/60'
                        : 'border-stone-200 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'cod'}
                        onChange={() => setPaymentMethod('cod')}
                        className="text-emerald-700"
                      />
                      <Banknote className="w-4 h-4 text-stone-700" />
                      <div>
                        <span className="font-bold block">{t.cashOnDelivery}</span>
                        <span className="text-[11px] text-stone-500">
                          Pay upon farm delivery verification
                        </span>
                      </div>
                    </div>
                  </label>

                  {/* RuPay / Card */}
                  <label
                    className={`p-3 rounded-xl border text-xs cursor-pointer flex items-center justify-between ${
                      paymentMethod === 'card'
                        ? 'border-emerald-700 bg-emerald-50/60'
                        : 'border-stone-200 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'card'}
                        onChange={() => setPaymentMethod('card')}
                        className="text-emerald-700"
                      />
                      <CreditCard className="w-4 h-4 text-stone-700" />
                      <div>
                        <span className="font-bold block">{t.cardsRuPay}</span>
                        <span className="text-[11px] text-stone-500">
                          Domestic RuPay & International Cards
                        </span>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-emerald-800 text-white font-bold py-3 rounded-xl hover:bg-emerald-900 transition-colors shadow-sm text-xs flex items-center justify-center gap-2"
              >
                <span>Confirm Harvest Order (₹{total})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {step === 'success' && placedOrder && (
            <div className="py-8 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
                  Order ID: {placedOrder.id}
                </span>
                <h3 className="text-xl font-bold text-stone-900 font-serif-display mt-1">
                  Farm Harvest Dispatched to Queue
                </h3>
                <p className="text-xs text-stone-600 mt-2 max-w-sm mx-auto">
                  Your order has been transmitted directly to the farmer. Automated delivery scheduled for{' '}
                  <span className="font-bold text-stone-900">{placedOrder.estimatedDeliveryTime}</span>.
                </p>
              </div>

              <div className="bg-stone-50 rounded-xl p-4 border border-stone-200 text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-stone-500">Direct Farmer Payout:</span>
                  <span className="font-bold text-emerald-900 font-numeric">₹{placedOrder.subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Cold Transit Logistics:</span>
                  <span className="font-bold text-stone-900 font-numeric">₹{placedOrder.deliveryFee}</span>
                </div>
                <div className="flex justify-between border-t border-stone-200 pt-2 font-bold text-stone-900">
                  <span>Total Amount Paid/Due:</span>
                  <span className="font-numeric">₹{placedOrder.total}</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full bg-emerald-800 text-white font-semibold py-2.5 rounded-xl hover:bg-emerald-900 text-xs shadow-sm"
              >
                View Live Delivery Tracker
              </button>
            </div>
          )}
        </div>

        {/* Footer Summary (if in cart step) */}
        {step === 'cart' && items.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-stone-200 bg-stone-50 space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>{t.directFarmerEarnings}:</span>
                <span className="font-bold text-stone-900 font-numeric">₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Cold-Chain Transit:</span>
                <span className="font-numeric font-medium">
                  {deliveryFee === 0 ? (
                    <span className="text-emerald-700 font-bold">Free (Order ₹399+)</span>
                  ) : (
                    `₹${deliveryFee}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-stone-500 text-[11px]">
                <span>Platform Commission:</span>
                <span className="text-emerald-700 font-bold">₹0.00 (Zero Fee)</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-stone-950 border-t border-stone-200 pt-2">
                <span>{t.orderTotal}:</span>
                <span className="font-numeric text-emerald-950">₹{total}</span>
              </div>
            </div>

            <button
              onClick={() => setStep('checkout')}
              className="w-full bg-emerald-800 text-white font-bold py-3 rounded-xl hover:bg-emerald-900 transition-colors shadow-sm text-xs flex items-center justify-center gap-2"
            >
              <span>{t.secureCheckout}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
