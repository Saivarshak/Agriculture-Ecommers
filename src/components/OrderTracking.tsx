import React, { useState } from 'react';
import {
  Truck,
  CheckCircle2,
  Clock,
  ThermometerSnowflake,
  Phone,
  ShieldCheck,
  ShoppingBag,
  RotateCw,
  Plus
} from 'lucide-react';
import { Order, LanguageCode, CartItem } from '../types';
import { translations } from '../data/translations';
import { getProductLocalized } from '../data/productTranslations';

interface OrderTrackingProps {
  orders: Order[];
  language: LanguageCode;
  onSelectProduct?: (productId: string) => void;
  onQuickReorder?: (items: CartItem[]) => void;
}

export const OrderTracking: React.FC<OrderTrackingProps> = ({
  orders,
  language,
  onQuickReorder
}) => {
  const t = translations[language];
  const [selectedOrderId, setSelectedOrderId] = useState<string>(
    orders.length > 0 ? orders[0].id : ''
  );
  const [reorderSuccessMsg, setReorderSuccessMsg] = useState<string | null>(null);

  const activeOrder = orders.find((o) => o.id === selectedOrderId) || orders[0];

  const stages = [
    { title: t.stageHarvestScheduled, desc: t.stageHarvestScheduledDesc },
    { title: t.stageHandHarvested, desc: t.stageHandHarvestedDesc },
    { title: t.stageColdChain, desc: t.stageColdChainDesc },
    { title: t.stageOutForDelivery, desc: t.stageOutForDeliveryDesc },
    { title: t.stageDelivered, desc: t.stageDeliveredDesc }
  ];

  const handleReorder = (items: CartItem[]) => {
    if (onQuickReorder) {
      onQuickReorder(items);
      setReorderSuccessMsg(
        language === 'te'
          ? `${items.length} పంటలు మీ బుట్టలో చేర్చబడ్డాయి!`
          : language === 'hi'
          ? `${items.length} फसलें आपकी टोकरी में जोड़ी गईं!`
          : language === 'ta'
          ? `${items.length} பயிர்கள் உங்கள் கூடையில் சேர்க்கப்பட்டன!`
          : language === 'mr'
          ? `${items.length} पिके तुमच्या बास्केटमध्ये जोडली गेली!`
          : language === 'pa'
          ? `${items.length} ਫਸਲਾਂ ਤੁਹਾਡੀ ਟੋਕਰੀ ਵਿੱਚ ਪਾਈਆਂ ਗਈਆਂ!`
          : `${items.length} crops added to your current basket!`
      );
      setTimeout(() => setReorderSuccessMsg(null), 3000);
    }
  };

  if (!activeOrder) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center mx-auto">
          <Truck className="w-7 h-7" />
        </div>
        <h3 className="text-xl font-bold text-stone-900 font-serif-display">{t.noOrdersTitle}</h3>
        <p className="text-xs text-stone-500 max-w-sm mx-auto">
          {t.noOrdersDesc}
        </p>
      </div>
    );
  }

  const currentStage = activeOrder.liveStage ?? 2;

  const quickReorderLabel =
    language === 'te'
      ? 'త్వరిత రీఆర్డర్'
      : language === 'hi'
      ? 'त्वरित पुन: ऑर्डर'
      : language === 'ta'
      ? 'விரைவு மறு ஆர்டர்'
      : language === 'mr'
      ? 'झटपट पुन्हा ऑर्डर'
      : language === 'pa'
      ? 'ਤੁਰੰਤ ਮੁੜ ਆਰਡਰ'
      : 'Quick Reorder';

  const quickReorderAllLabel =
    language === 'te'
      ? 'మొత్తం రీఆర్డర్ చేయండి'
      : language === 'hi'
      ? 'सभी दोबारा ऑर्डर करें'
      : language === 'ta'
      ? 'அனைத்தையும் மீண்டும் ஆர்டர் செய்'
      : language === 'mr'
      ? 'सर्व पुन्हा ऑर्डर करा'
      : language === 'pa'
      ? 'ਸਾਰੀਆਂ ਮੁੜ ਆਰਡਰ ਕਰੋ'
      : 'Quick Reorder All';

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
            {t.trackingSubtitle}
          </span>
          <h2 className="text-2xl font-bold text-stone-900 font-serif-display mt-0.5">
            {t.trackingTitle}
          </h2>
        </div>

        {/* Order Selector Dropdown if multiple orders */}
        {orders.length > 1 && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-500 font-medium">{t.selectOrder}:</span>
            <select
              value={selectedOrderId}
              onChange={(e) => setSelectedOrderId(e.target.value)}
              className="bg-white border border-stone-300 rounded-lg px-3 py-1.5 text-xs font-bold text-stone-800 focus:ring-1 focus:ring-emerald-700 font-numeric"
            >
              {orders.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.id} ({o.items.length} {t.crops}) - {o.status.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Success Notification Toast */}
      {reorderSuccessMsg && (
        <div className="bg-emerald-800 text-white px-4 py-3 rounded-xl shadow-lg text-xs flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-300" />
            <span className="font-semibold">{reorderSuccessMsg}</span>
          </div>
        </div>
      )}

      {/* Main Tracking Card */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
        {/* Top Header of Active Order */}
        <div className="p-6 bg-stone-900 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-emerald-400 font-mono font-bold tracking-wider">
                {activeOrder.id}
              </span>
              <span className="text-xs text-stone-400">·</span>
              <span className="text-xs text-stone-300">
                {activeOrder.delivery.slot === 'early_morning'
                  ? t.earlyMorningSlot
                  : activeOrder.delivery.slot === 'evening_fresh'
                  ? t.eveningSlot
                  : t.weekendSlot}
              </span>
            </div>
            <h3 className="text-lg font-bold text-white font-serif-display mt-1">
              {t.estimatedDelivery}: {activeOrder.estimatedDeliveryTime}
            </h3>
            <p className="text-xs text-stone-400 mt-0.5">
              Live Location: <span className="text-stone-200 font-medium">{activeOrder.currentLocationDesc}</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Quick Reorder Button right in the header */}
            <button
              onClick={() => handleReorder(activeOrder.items)}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-2 px-3.5 rounded-xl shadow-sm transition-all flex items-center gap-2 cursor-pointer"
              title="Add items from this order directly into current cart"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>{quickReorderLabel}</span>
            </button>

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
                <div key={idx} className="flex flex-col items-start space-y-2">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                        isCompleted
                          ? 'bg-emerald-700 text-white shadow-xs'
                          : 'bg-stone-100 text-stone-400'
                      }`}
                    >
                      {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                    </div>
                    {isCurrent && (
                      <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    )}
                  </div>
                  <div>
                    <h4
                      className={`text-xs font-bold ${
                        isCompleted ? 'text-stone-900' : 'text-stone-400'
                      }`}
                    >
                      {stage.title}
                    </h4>
                    <p className="text-[11px] text-stone-500 mt-0.5 leading-snug">
                      {stage.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Temperature & Cold Status Summary */}
          <div className="mt-8 bg-stone-50 rounded-xl p-4 border border-stone-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h5 className="text-xs font-bold text-stone-900">{t.vehicleTelemetry}</h5>
                <p className="text-[11px] text-stone-600">
                  {t.coldTempStatus} · Refrigerated village gate reefer
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs text-stone-600">
              <span className="text-stone-500">{t.assignedDriver}: {activeOrder.driverName || 'Ramesh Reddy'}</span>
              <a
                href={`tel:${activeOrder.driverPhone || '+919885144321'}`}
                className="inline-flex items-center gap-1 text-emerald-800 hover:text-emerald-950 font-bold"
              >
                <Phone className="w-3 h-3" />
                <span>Call</span>
              </a>
            </div>
          </div>
        </div>

        {/* Order Items Breakdown */}
        <div className="p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700">
              {t.harvestItemsSummary} ({activeOrder.items.length})
            </h4>

            {/* Quick Reorder in section header */}
            <button
              onClick={() => handleReorder(activeOrder.items)}
              className="text-xs font-bold text-emerald-800 hover:text-emerald-900 flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>{quickReorderAllLabel}</span>
            </button>
          </div>

          <div className="divide-y divide-stone-200">
            {activeOrder.items.map((item, idx) => {
              const loc = getProductLocalized(
                item.product.id,
                item.product.name,
                item.product.category,
                language,
                item.product.description,
                item.product.unit
              );

              return (
                <div key={idx} className="py-3 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.product.image}
                      alt={loc.name}
                      className="w-12 h-12 rounded-lg object-cover bg-stone-100 border border-stone-200 shrink-0"
                    />
                    <div>
                      <h5 className="text-xs font-bold text-stone-900">{loc.name}</h5>
                      <p className="text-[11px] text-stone-500">
                        {item.product.farmerName} · Qty: {item.quantity} {loc.unit}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className="text-xs font-bold text-stone-900 font-numeric">
                        ₹{item.product.price * item.quantity}
                      </span>
                      <span className="text-[10px] text-stone-400 block">
                        (₹{item.product.price}/{loc.unit})
                      </span>
                    </div>

                    {/* Single Item Quick Reorder button */}
                    <button
                      onClick={() => handleReorder([item])}
                      className="p-1.5 rounded-lg text-emerald-700 hover:text-emerald-900 hover:bg-emerald-50 border border-emerald-200 transition-colors cursor-pointer"
                      title="Add this item to basket"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Delivery & Quick Reorder Footer Bar */}
          <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs">
            <span className="text-stone-600">
              {t.deliveryDestination}: <strong className="text-stone-900">{activeOrder.delivery.address}</strong>
            </span>
            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
              <span className="font-bold text-sm text-stone-900 font-numeric">
                {t.orderTotal}: ₹{activeOrder.total}
              </span>
              <button
                onClick={() => handleReorder(activeOrder.items)}
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs py-2 px-4 rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>{quickReorderAllLabel}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Previous Orders & 1-Click Quick Reorder Section */}
      {orders.filter((o) => o.id !== activeOrder.id).length > 0 && (
        <div className="space-y-4 pt-4 border-t border-stone-200">
          <div>
            <h3 className="text-lg font-bold text-stone-900 font-serif-display">
              {language === 'te'
                ? 'మునుపటి ఆర్డర్లు'
                : language === 'hi'
                ? 'पिछले ऑर्डर'
                : language === 'ta'
                ? 'முந்தைய ஆர்டர்கள்'
                : language === 'mr'
                ? 'मागील ऑर्डर्स'
                : language === 'pa'
                ? 'ਪਿਛਲੇ ਆਰਡਰ'
                : 'Previous Orders'}
            </h3>
            <p className="text-xs text-stone-500">
              {language === 'te'
                ? 'ఒక్క క్లిక్‌తో మునుపటి ఆర్డర్ పంటలను మీ ప్రస్తుత బుట్టలో తిరిగి చేర్చండి'
                : language === 'hi'
                ? 'एक क्लिक में पिछले ऑर्डर की फसलें अपनी वर्तमान टोकरी में दोबारा जोड़ें'
                : language === 'ta'
                ? 'ஒரே கிளிக்கில் முந்தைய ஆர்டர் பயிர்களை உங்கள் நடப்பு கூடையில் மீண்டும் சேர்க்கவும்'
                : language === 'mr'
                ? 'एका क्लिकवर मागील ऑर्डरची पिके तुमच्या सध्याच्या बास्केटमध्ये पुन्हा जोडा'
                : language === 'pa'
                ? 'ਇੱਕ ਕਲਿੱਕ ਨਾਲ ਪਿਛਲੇ ਆਰਡਰ ਦੀਆਂ ਫਸਲਾਂ ਆਪਣੀ ਮੌਜੂਦਾ ਟੋਕਰੀ ਵਿੱਚ ਦੁਬਾਰਾ ਪਾਓ'
                : 'Add items from previous orders directly into your current cart with one click.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {orders
              .filter((o) => o.id !== activeOrder.id)
              .map((pastOrder) => (
                <div
                  key={pastOrder.id}
                  className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs hover:border-emerald-300 transition-all space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-emerald-900 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                          {pastOrder.id}
                        </span>
                        <span className="text-xs text-stone-500">{pastOrder.createdAt}</span>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider bg-emerald-100 text-emerald-800">
                        {pastOrder.status.toUpperCase()}
                      </span>
                    </div>

                    {/* Items preview list */}
                    <div className="space-y-2">
                      {pastOrder.items.map((item, idx) => {
                        const loc = getProductLocalized(
                          item.product.id,
                          item.product.name,
                          item.product.category,
                          language,
                          item.product.description,
                          item.product.unit
                        );
                        return (
                          <div key={idx} className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2">
                              <img
                                src={item.product.image}
                                alt={loc.name}
                                className="w-8 h-8 rounded object-cover bg-stone-100 border border-stone-200"
                              />
                              <div>
                                <span className="text-stone-800 font-medium block">
                                  {loc.name}
                                </span>
                                <span className="text-stone-400 text-[11px]">
                                  {item.quantity} {loc.unit}
                                </span>
                              </div>
                            </div>
                            <span className="font-semibold text-stone-700 font-numeric">
                              ₹{item.product.price * item.quantity}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] text-stone-400 block">{t.orderTotal}</span>
                      <span className="font-bold text-sm text-stone-900 font-numeric">
                        ₹{pastOrder.total}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedOrderId(pastOrder.id)}
                        className="px-2.5 py-1.5 text-xs text-stone-600 hover:text-emerald-800 font-medium rounded-lg hover:bg-stone-50 border border-stone-200 transition-colors cursor-pointer"
                      >
                        {language === 'te'
                          ? 'వివరాలు'
                          : language === 'hi'
                          ? 'विवरण'
                          : language === 'ta'
                          ? 'விவரங்கள்'
                          : language === 'mr'
                          ? 'तपशील'
                          : language === 'pa'
                          ? 'ਵੇਰਵਾ'
                          : 'View Details'}
                      </button>
                      {/* One-click Quick Reorder button */}
                      <button
                        onClick={() => handleReorder(pastOrder.items)}
                        className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg shadow-2xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer"
                        title="Add items from this order directly into current cart with 1 click"
                      >
                        <RotateCw className="w-3.5 h-3.5" />
                        <span>{quickReorderLabel}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};
