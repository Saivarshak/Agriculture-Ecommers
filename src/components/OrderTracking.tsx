import React, { useState } from 'react';
import {
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  ThermometerSnowflake,
  Phone,
  ShieldCheck,
  Package,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { Order, LanguageCode } from '../types';
import { translations } from '../data/translations';

interface OrderTrackingProps {
  orders: Order[];
  language: LanguageCode;
  onSelectProduct?: (productId: string) => void;
}

export const OrderTracking: React.FC<OrderTrackingProps> = ({ orders, language }) => {
  const t = translations[language];
  const [selectedOrderId, setSelectedOrderId] = useState<string>(
    orders.length > 0 ? orders[0].id : ''
  );

  const activeOrder = orders.find((o) => o.id === selectedOrderId) || orders[0];

  const stages = [
    { title: 'Harvest Scheduled', desc: 'Farmer notified at village gate' },
    { title: 'Hand-Harvested', desc: 'Plucked & washed in well-water' },
    { title: 'Cold-Chain Transit', desc: 'Reefer vehicle monitored at 4°C' },
    { title: 'Out for Delivery', desc: 'Urban dispatch rider en-route' },
    { title: 'Delivered', desc: 'Handed over at doorstep' }
  ];

  if (!activeOrder) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center mx-auto">
          <Truck className="w-7 h-7" />
        </div>
        <h3 className="text-xl font-bold text-stone-900 font-serif-display">No Active Orders Yet</h3>
        <p className="text-xs text-stone-500 max-w-sm mx-auto">
          When you place a direct farm harvest order, you can monitor the live temperature and reefer vehicle tracking right here.
        </p>
      </div>
    );
  }

  const currentStage = activeOrder.liveStage ?? 2;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
            Real-Time Agricultural Cold-Chain
          </span>
          <h2 className="text-2xl font-bold text-stone-900 font-serif-display mt-0.5">
            Farm-to-Doorstep Tracking
          </h2>
        </div>

        {/* Order Selector Dropdown if multiple orders */}
        {orders.length > 1 && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-500 font-medium">Select Order:</span>
            <select
              value={selectedOrderId}
              onChange={(e) => setSelectedOrderId(e.target.value)}
              className="bg-white border border-stone-300 rounded-lg px-3 py-1.5 text-xs font-bold text-stone-800 focus:ring-1 focus:ring-emerald-700 font-numeric"
            >
              {orders.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.id} ({o.items.length} items) - {o.status.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Main Tracking Card */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
        {/* Top Header of Active Order */}
        <div className="p-6 bg-stone-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-emerald-400 font-mono font-bold tracking-wider">
                {activeOrder.id}
              </span>
              <span className="text-xs text-stone-400">·</span>
              <span className="text-xs text-stone-300">Slot: {activeOrder.delivery.slot.replace('_', ' ').toUpperCase()}</span>
            </div>
            <h3 className="text-lg font-bold text-white font-serif-display mt-1">
              Estimated Delivery: {activeOrder.estimatedDeliveryTime}
            </h3>
            <p className="text-xs text-stone-400 mt-0.5">
              Live Location: <span className="text-stone-200 font-medium">{activeOrder.currentLocationDesc}</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            {activeOrder.tempCelsius !== undefined && (
              <div className="bg-stone-800/80 border border-stone-700 px-3 py-2 rounded-xl flex items-center gap-2">
                <ThermometerSnowflake className="w-5 h-5 text-cyan-400" />
                <div>
                  <span className="text-[10px] text-stone-400 uppercase tracking-wider block">
                    Cargo Temp
                  </span>
                  <span className="text-sm font-bold text-cyan-300 font-numeric">
                    {activeOrder.tempCelsius}°C
                  </span>
                </div>
              </div>
            )}

            <div className="bg-stone-800/80 border border-stone-700 px-3 py-2 rounded-xl flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <div>
                <span className="text-[10px] text-stone-400 uppercase tracking-wider block">
                  Cold Seal
                </span>
                <span className="text-sm font-bold text-emerald-300">Intact</span>
              </div>
            </div>
          </div>
        </div>

        {/* Live Stepper */}
        <div className="p-6 sm:p-8 border-b border-stone-200">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {stages.map((stage, idx) => {
              const isCompleted = idx <= currentStage;
              const isCurrent = idx === currentStage;

              return (
                <div key={idx} className="relative flex md:flex-col items-center md:items-start gap-4 md:gap-2">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 transition-colors shadow-sm ${
                        isCompleted
                          ? 'bg-emerald-700 text-white'
                          : 'bg-stone-200 text-stone-500'
                      } ${isCurrent ? 'ring-4 ring-emerald-100' : ''}`}
                    >
                      {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                    </div>

                    <div className="md:hidden">
                      <h4 className={`text-xs font-bold ${isCurrent ? 'text-emerald-900' : 'text-stone-700'}`}>
                        {stage.title}
                      </h4>
                      <p className="text-[11px] text-stone-500">{stage.desc}</p>
                    </div>
                  </div>

                  <div className="hidden md:block">
                    <h4
                      className={`text-xs font-bold leading-tight ${
                        isCurrent ? 'text-emerald-950 font-bold' : isCompleted ? 'text-stone-900' : 'text-stone-400'
                      }`}
                    >
                      {stage.title}
                    </h4>
                    <p className="text-[11px] text-stone-500 mt-0.5">{stage.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Interactive Visual Map Representation */}
        <div className="p-6 bg-stone-50 border-b border-stone-200">
          <div className="bg-stone-100 rounded-xl p-4 border border-stone-300 relative overflow-hidden">
            {/* Stylized Agriculture Transit SVG Map */}
            <div className="w-full h-44 rounded-lg bg-stone-200/80 relative flex items-center justify-between px-6 sm:px-12 overflow-hidden border border-stone-300">
              {/* Grid lines */}
              <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#15803d_1px,transparent_1px)] [background-size:16px_16px]" />

              {/* Waypoint 1: Rural Farm */}
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full bg-emerald-800 text-white flex items-center justify-center shadow-md">
                  🌾
                </div>
                <span className="text-[11px] font-bold text-emerald-950 mt-1">Village Farm</span>
                <span className="text-[10px] text-stone-500">Aliabad, Shamirpet</span>
              </div>

              {/* Connecting Line with Animated Truck */}
              <div className="flex-1 mx-4 h-1.5 bg-stone-300 rounded relative">
                <div
                  className="h-full bg-emerald-600 rounded transition-all duration-1000"
                  style={{ width: `${Math.min(100, (currentStage / 4) * 100)}%` }}
                />
                {/* Truck icon moving along line */}
                <div
                  className="absolute -top-3.5 transform -translate-x-1/2 transition-all duration-1000 bg-white p-1 rounded-full shadow border border-emerald-600 text-emerald-800"
                  style={{ left: `${Math.min(95, Math.max(5, (currentStage / 4) * 100))}%` }}
                >
                  <Truck className="w-4 h-4" />
                </div>
              </div>

              {/* Waypoint 2: Aggregation Hub */}
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-9 h-9 rounded-full bg-stone-700 text-white flex items-center justify-center shadow-sm">
                  🏭
                </div>
                <span className="text-[11px] font-bold text-stone-800 mt-1">Cold Hub</span>
                <span className="text-[10px] text-stone-500">ORR Junction</span>
              </div>

              {/* Connecting Line 2 */}
              <div className="flex-1 mx-4 h-1.5 bg-stone-300 rounded relative">
                <div
                  className="h-full bg-emerald-600 rounded transition-all duration-1000"
                  style={{
                    width: `${Math.max(0, ((currentStage - 2) / 2) * 100)}%`
                  }}
                />
              </div>

              {/* Waypoint 3: Urban Consumer Kitchen */}
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full bg-stone-900 text-white flex items-center justify-center shadow-md">
                  🏡
                </div>
                <span className="text-[11px] font-bold text-stone-900 mt-1">Urban Kitchen</span>
                <span className="text-[10px] text-stone-500">{activeOrder.delivery.city}</span>
              </div>
            </div>

            {/* Live transit note */}
            <div className="mt-3 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-stone-600 gap-2">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-stone-400" />
                <span>Next automated milestone: Urban Dispatch Handover</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-stone-500">Driver: {activeOrder.driverName || 'Ramesh Reddy'}</span>
                <a
                  href={`tel:${activeOrder.driverPhone || '+919885144321'}`}
                  className="inline-flex items-center gap-1 text-emerald-800 hover:text-emerald-950 font-bold"
                >
                  <Phone className="w-3 h-3" />
                  <span>Call Rider</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Order Items Breakdown */}
        <div className="p-6 sm:p-8 space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700">
            Crops in this Batch ({activeOrder.items.length})
          </h4>

          <div className="divide-y divide-stone-200">
            {activeOrder.items.map((item, idx) => (
              <div key={idx} className="py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-12 h-12 rounded-lg object-cover bg-stone-100 border border-stone-200"
                  />
                  <div>
                    <h5 className="text-xs font-bold text-stone-900">{item.product.name}</h5>
                    <p className="text-[11px] text-stone-500">
                      Farmer: {item.product.farmerName} · Qty: {item.quantity} {item.product.unit}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-bold text-stone-900 font-numeric">
                    ₹{item.product.price * item.quantity}
                  </span>
                  <span className="text-[10px] text-stone-400 block">
                    (₹{item.product.price}/{item.product.unit})
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-stone-200 flex justify-between items-center text-xs">
            <span className="text-stone-600">Delivering to: <strong className="text-stone-900">{activeOrder.delivery.address}</strong></span>
            <span className="font-bold text-sm text-stone-900 font-numeric">Total: ₹{activeOrder.total}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
