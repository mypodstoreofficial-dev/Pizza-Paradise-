import React from 'react';
import { 
  Phone, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  ArrowUp,
  Truck,
  Sparkles,
  Gift,
  CalendarDays,
  UtensilsCrossed,
  Store,
  Award,
  Building2
} from 'lucide-react';
import { STORE_INFO } from '../data/menuData';
import { NATIONAL_CITIES } from '../data/nationalData';
import { PageId, CategoryId } from '../types';

interface FooterProps {
  onNavigate: (page: PageId, category?: CategoryId) => void;
  selectedCityName?: string;
  selectedOutletName?: string;
  onOpenCitySelector?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  selectedCityName,
  selectedOutletName,
  onOpenCitySelector,
}) => {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
    if ('scrollBehavior' in document.documentElement.style) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    }
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  return (
    <footer className="bg-stone-950/90 backdrop-blur-md text-stone-300 border-t border-white/10 relative">
      
      {/* National Hotline Big Banner Bar */}
      <div className="bg-gradient-to-r from-red-700 via-amber-600 to-red-700 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="text-white space-y-1">
            <div className="inline-flex items-center gap-1.5 bg-black/30 border border-white/20 text-amber-200 px-3 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider">
              <span>🇵🇰 24/7 National Operations Network</span>
            </div>
            <h3 className="text-lg sm:text-xl font-black font-serif tracking-tight">
              Order Online Across Pakistan or Dial National UAN
            </h3>
            <p className="text-xs text-amber-100 font-medium">
              Karachi • Lahore • Islamabad • Rawalpindi • Faisalabad • Multan • Peshawar
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={`tel:${STORE_INFO.hotlineRaw}`}
              className="flex items-center gap-2 bg-stone-950 hover:bg-stone-900 text-amber-300 px-5 py-2.5 rounded-xl font-black text-sm transition shadow-xl"
            >
              <Phone className="w-4 h-4 text-emerald-400 animate-bounce" />
              <span>UAN: {STORE_INFO.hotline}</span>
            </a>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Col 1 & 2: Brand details & Selected Hub */}
          <div className="lg:col-span-2 space-y-4">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <button 
                onClick={() => { onNavigate('home'); scrollToTop(); }}
                className="flex flex-col items-start bg-stone-900 border border-stone-700 px-3 py-1 rounded-xl focus:outline-none"
              >
                <span className="text-[9px] font-black tracking-widest text-amber-400 uppercase">PIZZA</span>
                <div className="flex items-center text-lg font-black tracking-tight text-white font-serif">
                  <span className="text-red-500">PARAD</span>
                  <span className="text-emerald-400">🌴</span>
                  <span className="text-red-500">SE</span>
                </div>
              </button>
              <div className="flex flex-col">
                <span className="text-xs font-black tracking-wider text-white">PIZZA PARADISE PAKISTAN</span>
                <span className="text-[10px] text-amber-400/90 font-medium">Sovereign Taste • National Network</span>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Pizza Paradise is Pakistan's premier stone-baked culinary destination. Offering live-fired artisan crusts, signature cheesy crowns, gourmet crispy zinger burgers, and rich Italian pasta bowls nationwide.
            </p>

            {/* Selected Branch Hub Indicator */}
            {selectedCityName && selectedOutletName && (
              <div className="bg-stone-900/90 border border-amber-500/30 rounded-xl p-3 max-w-sm space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-amber-300 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" /> Current Ordering City:
                  </span>
                  {onOpenCitySelector && (
                    <button
                      onClick={onOpenCitySelector}
                      className="text-[10px] font-bold text-emerald-400 hover:underline"
                    >
                      Change City
                    </button>
                  )}
                </div>
                <div className="text-xs font-semibold text-white">
                  {selectedCityName} — <span className="text-stone-300">{selectedOutletName}</span>
                </div>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-3 text-xs text-stone-400 pt-1">
              <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <ShieldCheck className="w-4 h-4" /> 100% Halal Certified
              </span>
              <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
                <Award className="w-4 h-4" /> ISO Quality & Food Safety
              </span>
            </div>
          </div>

          {/* Col 3: Menu Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white">
              Gourmet Menu
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button onClick={() => { onNavigate('menu', 'pizzas'); scrollToTop(); }} className="hover:text-amber-400 transition">
                  🍕 Signature Pizzas
                </button>
              </li>
              <li>
                <button onClick={() => { onNavigate('menu', 'burgers'); scrollToTop(); }} className="hover:text-amber-400 transition">
                  🍔 Monster Zinger Burgers
                </button>
              </li>
              <li>
                <button onClick={() => { onNavigate('menu', 'pastas'); scrollToTop(); }} className="hover:text-amber-400 transition">
                  🍝 Creamy Alfredo Pastas
                </button>
              </li>
              <li>
                <button onClick={() => { onNavigate('deals'); scrollToTop(); }} className="hover:text-amber-400 transition">
                  🎁 National Family Deals
                </button>
              </li>
              <li>
                <button onClick={() => { onNavigate('menu', 'appetizers'); scrollToTop(); }} className="hover:text-amber-400 transition">
                  🍗 Crispy Starters & Fries
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Corporate & Guest Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white">
              National Services
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button onClick={() => { onNavigate('branches'); scrollToTop(); }} className="hover:text-amber-400 transition flex items-center gap-1.5">
                  <Store className="w-3.5 h-3.5 text-amber-400" />
                  <span>Outlets & Store Directory</span>
                </button>
              </li>
              <li>
                <button onClick={() => { onNavigate('builder'); scrollToTop(); }} className="hover:text-amber-400 transition flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Custom Pizza 3D Lab</span>
                </button>
              </li>
              <li>
                <button onClick={() => { onNavigate('reservation'); scrollToTop(); }} className="hover:text-amber-400 transition flex items-center gap-1.5">
                  <CalendarDays className="w-3.5 h-3.5 text-red-400" />
                  <span>Corporate Catering & Tables</span>
                </button>
              </li>
              <li>
                <button onClick={() => { onNavigate('track-order'); scrollToTop(); }} className="hover:text-amber-400 transition flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Live 30-Min Order Tracker</span>
                </button>
              </li>
              <li>
                <button onClick={() => { onNavigate('branches'); scrollToTop(); }} className="hover:text-amber-400 transition flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-blue-400" />
                  <span>Franchise Expansion Desk</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Central Dispatch & Timings */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white">
              Central UAN Helpline
            </h4>
            <div className="space-y-2 text-xs text-stone-400">
              <div className="flex items-start gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <a href={`tel:${STORE_INFO.hotlineRaw}`} className="text-white hover:text-amber-400 font-bold block">
                    {STORE_INFO.hotline}
                  </a>
                  <span className="text-[10px] text-stone-500">Toll-Free UAN (All Networks)</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-stone-300 block">12:00 PM – 3:30 AM</span>
                  <span className="text-[10px] text-stone-500">7 Days a Week Nationwide</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                <span className="text-stone-400 text-[11px]">
                  National Corporate HQ: Suite 401, Executive Tower, Clifton, Karachi, Pakistan
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Major Cities Bar */}
        <div className="mt-10 pt-6 border-t border-stone-900">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs text-stone-400">
            <div className="space-y-1">
              <span className="font-bold text-amber-400 uppercase tracking-wider text-[10px] block">
                Serving Metropolitan Cities Across Pakistan:
              </span>
              <div className="flex flex-wrap gap-2 text-[11px] text-stone-300">
                {NATIONAL_CITIES.map((c, idx) => (
                  <span key={c.id} className="hover:text-amber-400 transition cursor-default">
                    {c.name} {idx < NATIONAL_CITIES.length - 1 && '•'}
                  </span>
                ))}
              </div>
            </div>

            {/* Payment & Security Logos */}
            <div className="space-y-1 md:text-right">
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                Accepted National Payment Gateways:
              </span>
              <div className="flex flex-wrap items-center md:justify-end gap-2 text-[10px] text-stone-300 font-mono">
                <span className="bg-stone-900 border border-stone-800 px-2 py-0.5 rounded text-emerald-400 font-bold">💵 Cash on Delivery</span>
                <span className="bg-stone-900 border border-stone-800 px-2 py-0.5 rounded text-amber-300 font-bold">💳 Visa / MasterCard</span>
                <span className="bg-stone-900 border border-stone-800 px-2 py-0.5 rounded text-red-400 font-bold">📱 JazzCash</span>
                <span className="bg-stone-900 border border-stone-800 px-2 py-0.5 rounded text-emerald-400 font-bold">📲 EasyPaisa</span>
                <span className="bg-stone-900 border border-stone-800 px-2 py-0.5 rounded text-cyan-400 font-bold">🏦 UnionPay & PayPak</span>
              </div>
            </div>
          </div>
        </div>

        {/* Corporate Legal & Tax Registrations */}
        <div className="mt-8 pt-5 border-t border-stone-900/80 flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] text-stone-400">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-amber-300 font-mono font-bold">NTN: 8294719-3</span>
            <span>•</span>
            <span className="text-stone-300 font-mono">STRN: 3277876129481</span>
            <span>•</span>
            <span className="text-emerald-400 font-mono">Govt. Halal Lic: PK-HAL-8849</span>
            <span>•</span>
            <span className="text-stone-400">FBR Active Taxpayer Entity</span>
          </div>

          <div className="text-[11px] text-stone-400">
            Corporate HQ: Suite 401, Executive Tower, Main Clifton, Karachi, Pakistan
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-6 pt-5 border-t border-stone-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-400">
          <div>
            © {new Date().getFullYear()} Pizza Paradise Pakistan (Sovereign Fast Food Corp Pvt. Ltd). All Rights Reserved.
          </div>
          <div className="flex items-center gap-3 text-stone-400">
            <span>Terms of Service</span>
            <span>•</span>
            <span>Halal Quality Charter</span>
            <span>•</span>
            <span>Privacy Policy</span>
            <span>•</span>
            <button onClick={scrollToTop} className="text-amber-400 hover:underline">
              Top ⇡
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
