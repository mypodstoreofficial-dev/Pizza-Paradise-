import React, { useState } from 'react';
import { 
  Flame, 
  Gift, 
  Sparkles, 
  Copy, 
  Check, 
  Clock, 
  Percent, 
  Plus, 
  ShoppingBag,
  Zap,
  Phone
} from 'lucide-react';
import { MENU_ITEMS, STORE_INFO } from '../data/menuData';
import { MenuItem, PageId } from '../types';
import { ReturnToHomeButton } from '../components/ReturnToHomeButton';

interface DealsPageProps {
  onSelectItem: (item: MenuItem) => void;
  onAddToCartDirect: (item: MenuItem) => void;
  onApplyCouponCode?: (code: string) => boolean;
  onNavigate?: (page: PageId) => void;
}

export const DealsPage: React.FC<DealsPageProps> = ({
  onSelectItem,
  onAddToCartDirect,
  onApplyCouponCode,
  onNavigate,
}) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [appliedNotice, setAppliedNotice] = useState<string | null>(null);

  const deals = MENU_ITEMS.filter((item) => item.category === 'deals');

  const promoCoupons = [
    {
      code: 'PARADISE15',
      discount: '15% OFF',
      description: 'On all orders above Rs. 1,500 across whole menu',
      validity: 'Valid online all week',
    },
    {
      code: 'HOTLINE786',
      discount: 'Rs. 200 Flat OFF',
      description: 'Instant discount on any family combo or large pizza',
      validity: 'Special Hotline promo code',
    },
    {
      code: 'PARADISE20',
      discount: '20% OFF',
      description: 'Midnight orders between 12:00 AM – 3:30 AM',
      validity: 'Late night cravings special',
    },
  ];

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    if (onApplyCouponCode) {
      const success = onApplyCouponCode(code);
      if (success) {
        setAppliedNotice(`Coupon "${code}" applied to cart!`);
      }
    }
    setTimeout(() => {
      setCopiedCode(null);
      setAppliedNotice(null);
    }, 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Return to Home Action Bar */}
      {onNavigate && (
        <div className="flex items-center justify-between pb-2 border-b border-stone-800/80">
          <ReturnToHomeButton onNavigateHome={() => onNavigate('home')} />
          <span className="text-xs text-amber-400 font-bold hidden sm:inline">
            🎁 Exclusive discount combos & promo vouchers
          </span>
        </div>
      )}

      {/* Deals Header Banner with 4-color running border */}
      <div className="relative overflow-hidden rounded-3xl box-run-4colors p-8 sm:p-12 shadow-2xl text-center space-y-4">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="inline-flex items-center gap-2 bg-black/40 border border-red-500/40 text-red-300 px-4 py-1 rounded-full text-xs font-black uppercase tracking-wider">
          <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
          <span>Mega Value Combos & Limited-Time Savings</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white font-serif tracking-tight">
          Pizza Paradise Deals & Combos
        </h1>
        <p className="text-sm sm:text-base text-stone-300 max-w-2xl mx-auto leading-relaxed">
          Feeding the whole family or craving a late-night feast? Save up to 35% with our curated party bundles, burger-pizza pairings, and student specials.
        </p>
      </div>

      {/* Applied Notice banner */}
      {appliedNotice && (
        <div className="bg-emerald-950 border border-emerald-500 text-emerald-200 px-4 py-3 rounded-2xl text-xs font-bold text-center animate-in fade-in">
          🎉 {appliedNotice} Check your cart to view the discount.
        </div>
      )}

      {/* Interactive Coupon Code Hub */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Gift className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl font-bold text-white font-serif">Paradise Promo Vouchers</h2>
          </div>
          <span className="text-xs text-stone-400">Click coupon to copy & apply instantly</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {promoCoupons.map((coupon) => (
            <div
              key={coupon.code}
              className="relative overflow-hidden card-run-4colors-subtle rounded-2xl p-5 flex flex-col justify-between group transition shadow-lg"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="bg-red-950 text-red-400 border border-red-800 text-[10px] font-black uppercase px-2 py-0.5 rounded-md">
                    {coupon.discount}
                  </span>
                  <span className="text-[10px] text-stone-400 font-mono">{coupon.validity}</span>
                </div>
                <div className="text-sm font-bold text-white">
                  {coupon.description}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-800 flex items-center justify-between">
                <div className="font-mono text-base font-black text-amber-400 bg-stone-950 px-3 py-1 rounded-xl border border-stone-800">
                  {coupon.code}
                </div>
                <button
                  onClick={() => handleCopy(coupon.code)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-black transition"
                >
                  {copiedCode === coupon.code ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-stone-950" />
                      <span>Applied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy & Apply</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mega Deals Cards Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-stone-800 pb-3">
          <h2 className="text-2xl font-black text-white font-serif flex items-center gap-2">
            <span>🔥 All Mega Savings Combos</span>
            <span className="text-xs font-normal text-stone-400 font-sans">({deals.length} Active Deals)</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {deals.map((deal) => {
            const savings = deal.originalPrice ? deal.originalPrice - deal.price : 0;

            return (
              <div
                key={deal.id}
                className="card-run-4colors rounded-3xl overflow-hidden flex flex-col justify-between shadow-2xl transition group hover:-translate-y-1"
              >
                <div>
                  {/* Deal Image with Discount Ribbon */}
                  <div className="relative h-60 overflow-hidden bg-stone-950">
                    <img
                      src={deal.image}
                      alt={deal.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />

                    <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-black uppercase px-3 py-1 rounded-xl shadow-lg flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 fill-white" />
                      <span>{deal.tags?.[0] || 'HOT DEAL'}</span>
                    </div>

                    {savings > 0 && (
                      <div className="absolute top-3 right-3 bg-amber-500 text-stone-950 text-xs font-black uppercase px-3 py-1 rounded-xl shadow-lg">
                        Save Rs. {savings.toLocaleString()}
                      </div>
                    )}
                  </div>

                  {/* Deal Content */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-xl font-black text-white group-hover:text-amber-400 transition font-serif">
                        {deal.name}
                      </h3>
                      {deal.urduName && (
                        <span className="text-xs text-amber-400/80 shrink-0 font-sans">
                          {deal.urduName}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-stone-300 leading-relaxed">
                      {deal.description}
                    </p>

                    {/* Deal Includes Bullet List */}
                    {deal.dealIncludes && deal.dealIncludes.length > 0 && (
                      <div className="bg-stone-950/80 border border-stone-800 rounded-2xl p-3.5 space-y-1.5">
                        <span className="text-[11px] font-black uppercase tracking-wider text-amber-400 flex items-center gap-1">
                          <Gift className="w-3.5 h-3.5" />
                          What's Included in this Combo:
                        </span>
                        <ul className="space-y-1 text-xs text-stone-200">
                          {deal.dealIncludes.map((inc, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                              <span>{inc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Price & Add To Cart Button */}
                <div className="p-6 pt-0">
                  <div className="pt-4 border-t border-stone-800 flex items-center justify-between">
                    <div>
                      {deal.originalPrice && (
                        <span className="text-xs text-stone-500 line-through font-mono block">
                          Rs. {deal.originalPrice.toLocaleString()}
                        </span>
                      )}
                      <div className="text-2xl font-black text-amber-400 font-mono">
                        Rs. {deal.price.toLocaleString()}
                      </div>
                    </div>

                    <button
                      onClick={() => onAddToCartDirect(deal)}
                      className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-black text-xs px-5 py-3 rounded-2xl shadow-xl transition transform active:scale-95"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Order This Deal</span>
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* Hotline Support for Custom Bulk Orders */}
      <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="space-y-1">
          <h4 className="text-base font-bold text-white font-serif">Planning a Birthday Party, Corporate Event or Large Gathering?</h4>
          <p className="text-xs text-stone-400">Call our manager hotline directly for customized bulk catering packages & exclusive party rates!</p>
        </div>
        <a
          href={`tel:${STORE_INFO.hotlineRaw}`}
          className="shrink-0 flex items-center gap-2 px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs transition shadow-lg"
        >
          <Phone className="w-4 h-4 text-stone-950" />
          <span>Call Hotline: {STORE_INFO.hotline}</span>
        </a>
      </div>

    </div>
  );
};
