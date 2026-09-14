import React from 'react';
import { 
  Flame, 
  Sparkles, 
  Phone, 
  Clock, 
  ShieldCheck, 
  ChevronRight, 
  Star, 
  UtensilsCrossed, 
  Award,
  Zap
} from 'lucide-react';
import { STORE_INFO } from '../data/menuData';

interface HeroProps {
  onExploreMenu: () => void;
  onOpenCustomBuilder: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreMenu,
  onOpenCustomBuilder,
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950 py-12 lg:py-20 border-b border-stone-800">
      {/* Glow / Ambient background lights */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 bg-stone-900 border border-amber-500/30 rounded-full px-3.5 py-1.5 shadow-md">
              <span className="flex h-2 w-2 rounded-full bg-red-500 animate-ping" />
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                🌟 The Home of Cheesy Crown Crust & Smashed Burgers
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] font-serif">
              Taste The <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-red-500 to-amber-500">Paradise</span> In Every Cheesy Bite!
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-stone-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              From our famous <strong className="text-amber-400 font-semibold">Crown Crust Pizzas</strong> and juicy <strong className="text-amber-400 font-semibold">Monster Zinger Burgers</strong> to velvety <strong className="text-amber-400 font-semibold">Chicken Alfredo Pastas</strong> — crafted hot, fresh, and delivered in 30 minutes!
            </p>

            {/* Highlighted Categories Pill Group matching the image facade "PIZZA - PASTA - BURGER" */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 pt-1">
              <div className="flex items-center gap-1.5 bg-stone-950/80 border border-stone-800 text-stone-200 px-3 py-1.5 rounded-xl text-xs font-bold shadow">
                <span className="text-red-500 text-sm font-black">🍕</span> Signature Pizzas
              </div>
              <div className="flex items-center gap-1.5 bg-stone-950/80 border border-stone-800 text-stone-200 px-3 py-1.5 rounded-xl text-xs font-bold shadow">
                <span className="text-amber-500 text-sm font-black">🍝</span> Italian & Fusion Pastas
              </div>
              <div className="flex items-center gap-1.5 bg-stone-950/80 border border-stone-800 text-stone-200 px-3 py-1.5 rounded-xl text-xs font-bold shadow">
                <span className="text-emerald-400 text-sm font-black">🍔</span> Gourmet Burgers
              </div>
              <div className="flex items-center gap-1.5 bg-stone-950/80 border border-stone-800 text-stone-200 px-3 py-1.5 rounded-xl text-xs font-bold shadow">
                <span className="text-yellow-400 text-sm font-black">🎁</span> Mega Savings Deals
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-3">
              <button
                id="hero-order-now-btn"
                onClick={onExploreMenu}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 via-red-500 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-extrabold text-base px-7 py-3.5 rounded-xl shadow-xl shadow-red-600/30 transition transform active:scale-95"
              >
                <Flame className="w-5 h-5 text-amber-300 animate-pulse" />
                <span>Order Online Now</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenCustomBuilder}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-stone-950 hover:bg-stone-800 text-amber-300 border border-amber-500/40 font-bold text-base px-6 py-3.5 rounded-xl shadow-lg transition transform active:scale-95"
              >
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span>Build Custom Pizza</span>
              </button>

              <a
                href={`tel:${STORE_INFO.hotlineRaw}`}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-700 font-bold text-sm px-5 py-3.5 rounded-xl transition"
                title="Call hotline directly"
              >
                <Phone className="w-4 h-4 text-emerald-400 animate-bounce" />
                <span>{STORE_INFO.hotline}</span>
              </a>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-stone-800/80 max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center gap-2 text-left">
                <div className="p-2 rounded-lg bg-red-950/60 border border-red-800/50 text-red-400 shrink-0">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">30-40 Mins</div>
                  <div className="text-[11px] text-stone-400">Express Delivery</div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-left">
                <div className="p-2 rounded-lg bg-amber-950/60 border border-amber-800/50 text-amber-400 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">100% Halal</div>
                  <div className="text-[11px] text-stone-400">Fresh Ingredients</div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-left">
                <div className="p-2 rounded-lg bg-emerald-950/60 border border-emerald-800/50 text-emerald-400 shrink-0">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">4.9 / 5.0</div>
                  <div className="text-[11px] text-stone-400">1,500+ Reviews</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Hero Banner with Floating Badges */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Featured Food Card */}
              <div className="relative rounded-3xl overflow-hidden bg-stone-900 border-2 border-stone-700 shadow-2xl p-2 group">
                <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1000&q=80"
                    alt="Pizza Paradise Signature Pizza"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-black/30" />
                  
                  {/* Floating Hotline Badge over image */}
                  <div className="absolute top-4 left-4 bg-stone-950/90 backdrop-blur-md border border-amber-500/50 text-white px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-black text-amber-300">Hotline: {STORE_INFO.hotline}</span>
                  </div>

                  {/* Top Right Pizza Paradise Tag */}
                  <div className="absolute top-4 right-4 bg-red-600 text-white text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg shadow">
                    🔥 Hot Deal
                  </div>

                  {/* Bottom Image Overlay Details */}
                  <div className="absolute bottom-4 left-4 right-4 bg-stone-950/85 backdrop-blur-md p-4 rounded-2xl border border-stone-800">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider font-extrabold text-amber-400">Signature Item</span>
                        <h4 className="text-base font-bold text-white font-serif">Paradise Crown Crust Pizza</h4>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-stone-400 line-through">Rs. 1,699</span>
                        <div className="text-base font-black text-amber-400">Rs. 1,499</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-amber-400 text-xs mt-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span className="font-bold">5.0</span>
                      <span className="text-stone-400 text-[11px]">(520+ orders this week)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Mini Food Card 1: Burger */}
              <div className="absolute -bottom-6 -left-6 bg-stone-950/95 backdrop-blur-md border border-stone-700 p-3 rounded-2xl shadow-xl hidden sm:flex items-center gap-3 w-60 animate-bounce duration-1000">
                <img
                  src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=200&q=80"
                  alt="Zinger Burger"
                  className="w-12 h-12 rounded-xl object-cover border border-amber-500/30 shrink-0"
                />
                <div className="overflow-hidden">
                  <div className="text-[10px] font-bold text-amber-400 uppercase">Monster Zinger</div>
                  <div className="text-xs font-bold text-white truncate">Juicy Double Fillet</div>
                  <div className="text-xs font-black text-red-400">Rs. 749</div>
                </div>
              </div>

              {/* Floating Mini Food Card 2: Creamy Pasta */}
              <div className="absolute -top-6 -right-6 bg-stone-950/95 backdrop-blur-md border border-stone-700 p-3 rounded-2xl shadow-xl hidden sm:flex items-center gap-3 w-56">
                <img
                  src="https://images.unsplash.com/photo-1621996346565-e3d5d6281691?auto=format&fit=crop&w=200&q=80"
                  alt="Alfredo Pasta"
                  className="w-12 h-12 rounded-xl object-cover border border-amber-500/30 shrink-0"
                />
                <div>
                  <div className="text-[10px] font-bold text-emerald-400 uppercase">Creamy Alfredo</div>
                  <div className="text-xs font-bold text-white">Parmesan Garlic Penne</div>
                  <div className="text-xs font-black text-amber-400">Rs. 949</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
