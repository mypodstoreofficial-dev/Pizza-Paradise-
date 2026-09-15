import React, { useState } from 'react';
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
  Zap,
  ArrowRight,
  Gift,
  CheckCircle2,
  PhoneCall,
  MapPin,
  CalendarDays,
  Layers,
  Maximize2,
  Building2,
  Check,
  Compass,
  Store,
  Truck,
  Users
} from 'lucide-react';
import { STORE_INFO, MENU_ITEMS, TESTIMONIALS } from '../data/menuData';
import { ASSETS_3D } from '../data/assets';
import { MenuItem, PageId, CategoryId } from '../types';
import { 
  NATIONAL_CITIES, 
  NATIONAL_OUTLETS, 
  NATIONAL_STANDARDS, 
  CORPORATE_SERVICES,
  NationalOutlet 
} from '../data/nationalData';

interface HomePageProps {
  onNavigate: (page: PageId, category?: CategoryId) => void;
  onSelectItem: (item: MenuItem) => void;
  onAddToCartDirect: (item: MenuItem) => void;
  selectedCityName?: string;
  selectedOutletName?: string;
  onOpenCitySelector?: () => void;
  onSelectCityDirect?: (cityId: string, outletId?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onSelectItem,
  onAddToCartDirect,
  selectedCityName = 'Karachi',
  selectedOutletName = 'Clifton Flagship',
  onOpenCitySelector,
  onSelectCityDirect,
}) => {
  const [active3dModel, setActive3dModel] = useState<'crown' | 'slice' | 'float' | 'burger' | 'pasta'>('crown');
  const [homeCityTab, setHomeCityTab] = useState<string>('karachi');

  // Pick signature bestsellers for Home page display
  const signatureItems = MENU_ITEMS.filter((item) => 
    item.id === 'pizza-1' || item.id === 'burger-1' || item.id === 'pasta-1' || item.id === 'pizza-2'
  );

  const categoryCards = [
    {
      id: 'pizzas' as CategoryId,
      name: 'Stone-Baked Pizzas',
      desc: 'Cheesy Crown Crust & Stuffed Knots',
      count: '8+ Varieties',
      img: ASSETS_3D.pizzaCrown,
      badge: '3D Crown',
      color: 'from-red-600/30 to-amber-600/30',
    },
    {
      id: 'burgers' as CategoryId,
      name: 'Gourmet Burgers',
      desc: 'Crispy Double Zinger & Smashed Beef',
      count: '6+ Burgers',
      img: ASSETS_3D.burgerCrisp,
      badge: '3D Monster',
      color: 'from-amber-600/30 to-yellow-600/30',
    },
    {
      id: 'pastas' as CategoryId,
      name: 'Creamy Pastas',
      desc: 'Alfredo Penne & Oven Lasagna',
      count: '4+ Pastas',
      img: ASSETS_3D.pastaBowl,
      badge: '3D Gourmet',
      color: 'from-emerald-600/30 to-teal-600/30',
    },
    {
      id: 'deals' as CategoryId,
      name: 'Mega Savings Deals',
      desc: 'Family Combos & Midnight Cravings',
      count: 'Up to 30% Off',
      img: ASSETS_3D.pizzaSlice,
      badge: 'Super Saver',
      color: 'from-purple-600/30 to-pink-600/30',
    },
  ];

  const models3dMap = {
    crown: {
      title: 'Cheesy Crown Crust Pizza',
      desc: '8 Molten cheese & kebab pockets stuffed along the golden ring',
      img: ASSETS_3D.pizzaCrown,
      price: 'Rs. 1,499',
      tag: '🔥 3D Signature Crown',
      itemId: 'pizza-1',
    },
    slice: {
      title: 'Mozzarella Stretchy Cheese Slice',
      desc: 'Golden crisp stone-baked slice with dripping mozzarella cheese pull',
      img: ASSETS_3D.pizzaSlice,
      price: 'Rs. 1,449',
      tag: '🧀 3D Stretchy Cheese',
      itemId: 'pizza-5',
    },
    float: {
      title: 'Floating Supreme Pizza & Herbs',
      desc: 'Fresh mushrooms, black olives, bell peppers and herbs floating in 3D',
      img: ASSETS_3D.pizzaFloat,
      price: 'Rs. 1,399',
      tag: '✨ 3D Floating Masterpiece',
      itemId: 'pizza-3',
    },
    burger: {
      title: 'Monster Double Zinger Burger',
      desc: 'Colossal crispy fried fillet, melting cheddar cheese & brioche buns',
      img: ASSETS_3D.burgerCrisp,
      price: 'Rs. 749',
      tag: '🍔 3D Crispy Zinger',
      itemId: 'burger-1',
    },
    pasta: {
      title: 'Creamy Chicken Alfredo Penne',
      desc: 'Velvety garlic parmesan sauce with grilled chicken and fresh parsley',
      img: ASSETS_3D.pastaBowl,
      price: 'Rs. 949',
      tag: '🍝 3D Italian Alfredo',
      itemId: 'pasta-1',
    },
  };

  const selectedModelData = models3dMap[active3dModel];

  return (
    <div className="space-y-16 pb-16">
      
      {/* 1. Hero Showcase with 3D Pizza Focus */}
      <section className="relative overflow-hidden bg-black/20 backdrop-blur-[2px] py-12 lg:py-20 border-b border-white/10">
        {/* Subtle Ambient 3D Glow Orbs */}
        <div className="absolute -top-24 left-1/4 w-[500px] h-[500px] bg-red-600/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute top-1/2 right-10 w-[450px] h-[450px] bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            
            {/* Left Column: Headlines & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* National Brand Authority Kicker & Live Status */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-950/80 via-stone-900 to-amber-950/80 border border-emerald-500/40 rounded-full px-4 py-1.5 shadow-xl backdrop-blur-md">
                  <span className="text-sm">🇵🇰</span>
                  <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-[11px] sm:text-xs font-black text-emerald-300 uppercase tracking-[0.18em]">
                    Islamic Republic of Pakistan • Official National Portal
                  </span>
                </div>
                <div className="inline-flex items-center gap-2 bg-stone-950/80 border border-amber-400/30 rounded-full px-3.5 py-1.5 text-[11px] font-bold text-amber-200 backdrop-blur-md shadow-lg">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span className="uppercase tracking-wider">Govt. Halal Reg #PK-FD-786</span>
                </div>
                <div className="hidden xl:inline-flex items-center gap-1.5 bg-black/60 border border-white/10 rounded-full px-3 py-1.5 text-[11px] font-bold text-stone-300 backdrop-blur-md">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span>ISO 22000 Food Safety Certified</span>
                </div>
              </div>

              {/* Sovereign National Brand Title: PIZZA PARADISE PAKISTAN */}
              <div className="space-y-3 pt-1">
                <div className="relative inline-block">
                  {/* Atmospheric Royal Backlight */}
                  <div className="absolute -inset-8 bg-gradient-to-r from-red-600/30 via-amber-500/25 to-emerald-500/25 blur-3xl opacity-90 pointer-events-none -z-10" />

                  {/* Brand Super-Badge */}
                  <div className="flex items-center justify-center lg:justify-start gap-2 mb-1.5">
                    <span className="h-[1px] w-6 bg-gradient-to-r from-transparent to-amber-400/80" />
                    <span className="text-[10px] sm:text-[11px] font-black tracking-[0.3em] uppercase text-amber-300/90 font-mono">
                      NATIONAL ARTISANAL HEARTH • ESTD. 2018
                    </span>
                    <span className="h-[1px] w-6 bg-gradient-to-l from-transparent to-amber-400/80" />
                  </div>

                  {/* Main Monumental National Typography with Logo */}
                  <div className="flex flex-col items-center lg:items-start select-none">
                    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                      {/* Authentic Pizza Paradise Official Logo Emblem with 4-color Running Border */}
                      <div className="relative nav-box-run-4colors p-1.5 rounded-2xl shadow-2xl shrink-0 group bg-stone-950/90">
                        <img
                          src={ASSETS_3D.logo}
                          alt="Pizza Paradise Official Logo"
                          referrerPolicy="no-referrer"
                          className="w-20 h-20 sm:w-24 sm:h-24 object-contain rounded-xl drop-shadow-[0_0_20px_rgba(245,158,11,0.6)] transform group-hover:scale-105 group-hover:rotate-2 transition-all duration-300"
                        />
                      </div>

                      <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                        <div className="flex items-center justify-center lg:justify-start">
                          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-black tracking-tight leading-none font-serif select-none drop-shadow-[0_10px_35px_rgba(0,0,0,0.95)]">
                            <span className="text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-300 to-amber-500 drop-shadow-[0_2px_12px_rgba(245,158,11,0.5)]">
                              PIZZA
                            </span>
                            {" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-b from-red-400 via-red-500 to-rose-700 drop-shadow-[0_4px_18px_rgba(239,68,68,0.7)]">
                              PARADISE
                            </span>
                          </h1>
                          <span className="text-xs sm:text-sm font-black text-amber-400/90 ml-1.5 -mt-6 border border-amber-400/40 rounded px-1.5 py-0.5 bg-black/60 font-sans">
                            TM
                          </span>
                        </div>

                        {/* Official National Flagship Title Banner */}
                        <div className="mt-2 inline-flex items-center gap-2 bg-gradient-to-r from-red-950/80 via-black to-emerald-950/80 border border-amber-500/40 px-3.5 py-1 rounded-lg shadow-inner">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          <span className="text-[11px] sm:text-xs font-black tracking-[0.16em] uppercase text-amber-200">
                            PAKISTAN'S OFFICIAL PIZZA & GOURMET CULINARY HEADQUARTERS
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* The Sovereign Standard of Crust & Taste™ */}
                <div className="space-y-2 pt-1">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-300 to-yellow-200 tracking-wide font-serif">
                    The Sovereign Standard of Crust & Taste
                  </h2>
                  <p className="text-xs sm:text-sm text-amber-400/80 font-medium tracking-wide">
                    Authentic Stone-Hearth Fired • 100% Pure Wisconsin Mozzarella • Heat-Locked Dispatch Fleet
                  </p>
                  
                  {/* Official Quality Hallmarks Bar */}
                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs font-bold pt-1">
                    <span className="inline-flex items-center gap-1.5 text-emerald-300 bg-emerald-950/80 border border-emerald-500/40 px-3 py-1 rounded-lg shadow-sm">
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>100% Pure Dairy Mozzarella</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-amber-300 bg-amber-950/80 border border-amber-500/40 px-3 py-1 rounded-lg shadow-sm">
                      <Flame className="w-3.5 h-3.5 text-amber-400" />
                      <span>Fresh Stone-Baked Daily</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-cyan-300 bg-cyan-950/80 border border-cyan-500/40 px-3 py-1 rounded-lg shadow-sm">
                      <Zap className="w-3.5 h-3.5 text-cyan-400" />
                      <span>30-Min Guaranteed Express Delivery</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-stone-300 bg-stone-900/90 border border-stone-700 px-3 py-1 rounded-lg shadow-sm">
                      <Store className="w-3.5 h-3.5 text-amber-400" />
                      <span>32+ National Flagship Hubs</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Executive Brand Statement */}
              <p className="text-sm sm:text-base lg:text-lg text-stone-200 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed bg-black/30 p-4 rounded-2xl border border-white/5 backdrop-blur-sm shadow-xl">
                Welcome to the official national culinary headquarters of <strong className="text-amber-300 font-bold">Pizza Paradise Pakistan</strong>. Serving over 32 metropolitan hubs with our signature molten <strong className="text-amber-400 font-bold">Cheesy Crown Crust Pizzas</strong>, colossal <strong className="text-amber-400 font-bold">Crispy Zinger Burgers</strong>, and velvety <strong className="text-amber-400 font-bold">Chicken Alfredo Pastas</strong> — stone-baked fresh to order and dispatched in sealed thermal heat-vaults guaranteed piping hot within 30 minutes!
              </p>

              {/* National Category Quick-Selector Hub with 7-Color Running Border */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                <button 
                  onClick={() => onNavigate('menu', 'pizzas')}
                  className="group relative flex flex-col items-start p-3 rounded-2xl hero-cat-run-7colors text-left shadow-lg cursor-pointer"
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="text-2xl p-1 rounded-xl bg-red-950/70 border border-red-800/50">🍕</span>
                    <span className="text-[10px] font-black uppercase tracking-wider text-red-400 bg-red-950/90 px-1.5 py-0.5 rounded">3D Crown</span>
                  </div>
                  <div className="text-xs sm:text-sm font-black text-white group-hover:text-amber-300 transition">3D Crown Pizzas</div>
                  <div className="text-[10px] text-stone-400 line-clamp-1">8+ Molten Crust Flavors</div>
                </button>

                <button 
                  onClick={() => onNavigate('menu', 'burgers')}
                  className="group relative flex flex-col items-start p-3 rounded-2xl hero-cat-run-7colors text-left shadow-lg cursor-pointer"
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="text-2xl p-1 rounded-xl bg-amber-950/70 border border-amber-800/50">🍔</span>
                    <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 bg-amber-950/90 px-1.5 py-0.5 rounded">Colossal</span>
                  </div>
                  <div className="text-xs sm:text-sm font-black text-white group-hover:text-amber-300 transition">Gourmet Burgers</div>
                  <div className="text-[10px] text-stone-400 line-clamp-1">Crispy Monster Fillets</div>
                </button>

                <button 
                  onClick={() => onNavigate('menu', 'pastas')}
                  className="group relative flex flex-col items-start p-3 rounded-2xl hero-cat-run-7colors text-left shadow-lg cursor-pointer"
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="text-2xl p-1 rounded-xl bg-emerald-950/70 border border-emerald-800/50">🍝</span>
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-950/90 px-1.5 py-0.5 rounded">Artisan</span>
                  </div>
                  <div className="text-xs sm:text-sm font-black text-white group-hover:text-amber-300 transition">Italian Pastas</div>
                  <div className="text-[10px] text-stone-400 line-clamp-1">Velvety Alfredo & Penne</div>
                </button>

                <button 
                  onClick={() => onNavigate('deals')}
                  className="group relative flex flex-col items-start p-3 rounded-2xl hero-cat-run-7colors text-left shadow-lg cursor-pointer"
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="text-2xl p-1 rounded-xl bg-yellow-950/70 border border-yellow-800/50">🎁</span>
                    <span className="text-[10px] font-black uppercase tracking-wider text-yellow-300 bg-yellow-950/90 px-1.5 py-0.5 rounded">-30% OFF</span>
                  </div>
                  <div className="text-xs sm:text-sm font-black text-white group-hover:text-amber-300 transition">Mega Deals</div>
                  <div className="text-[10px] text-stone-400 line-clamp-1">Family Feasts & Combos</div>
                </button>
              </div>

              {/* Executive Action Buttons with 7-Color Running Border */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3.5 pt-2">
                <button
                  onClick={() => onNavigate('menu')}
                  className="group flex-1 sm:flex-initial flex items-center justify-center gap-3 hero-btn-order-run-7colors text-white font-black text-base px-8 py-4 rounded-2xl shadow-2xl transition transform active:scale-95 cursor-pointer"
                >
                  <Flame className="w-5 h-5 text-amber-300 animate-pulse" />
                  <div className="text-left">
                    <div className="leading-tight">Order 3D Pizza Menu</div>
                    <div className="text-[10px] font-bold text-amber-200 uppercase tracking-wider">Instant Heat-Vault Dispatch</div>
                  </div>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => onNavigate('builder')}
                  className="group flex items-center justify-center gap-2.5 hero-btn-lab-run-7colors text-amber-300 font-extrabold text-sm px-6 py-4 rounded-2xl shadow-xl transition transform active:scale-95 cursor-pointer"
                >
                  <Sparkles className="w-5 h-5 text-amber-400 animate-spin" />
                  <div className="text-left">
                    <div className="leading-tight text-white group-hover:text-amber-300">Custom Pizza 3D Lab</div>
                    <div className="text-[10px] font-bold text-amber-400/80 uppercase tracking-wider">3D Crust & Topping Studio</div>
                  </div>
                </button>

                <a
                  href={`tel:${STORE_INFO.hotlineRaw}`}
                  className="flex items-center justify-center gap-2.5 hero-btn-uan-run-7colors text-stone-100 font-extrabold text-sm px-5 py-4 rounded-2xl shadow-xl transition cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-xl bg-emerald-950/90 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0 shadow-inner">
                    <Phone className="w-4 h-4 animate-bounce" />
                  </div>
                  <div className="text-left">
                    <div className="text-[10px] text-stone-400 uppercase tracking-wider font-bold">24/7 National UAN</div>
                    <div className="font-mono text-emerald-400 font-black">{STORE_INFO.hotline}</div>
                  </div>
                </a>
              </div>

              {/* National Trust & Certification Accreditation Grid with 7-Color Running Border */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-stone-800/90">
                <div className="flex items-center gap-2.5 text-left p-2.5 rounded-xl hero-trust-run-7colors">
                  <div className="w-9 h-9 rounded-xl bg-red-950/80 border border-red-800/60 text-red-400 flex items-center justify-center shrink-0 shadow-inner">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-black text-white">30-40 Mins</div>
                    <div className="text-[10px] text-stone-400 font-medium">Express Delivery</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 text-left p-2.5 rounded-xl hero-trust-run-7colors">
                  <div className="w-9 h-9 rounded-xl bg-amber-950/80 border border-amber-800/60 text-amber-400 flex items-center justify-center shrink-0 shadow-inner">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-black text-white">100% Halal</div>
                    <div className="text-[10px] text-stone-400 font-medium">Fresh Mozzarella</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 text-left p-2.5 rounded-xl hero-trust-run-7colors">
                  <div className="w-9 h-9 rounded-xl bg-emerald-950/80 border border-emerald-800/60 text-emerald-400 flex items-center justify-center shrink-0 shadow-inner">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  </div>
                  <div>
                    <div className="text-xs font-black text-white">4.9 / 5.0</div>
                    <div className="text-[10px] text-stone-400 font-medium">1,500+ Reviews</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 text-left p-2.5 rounded-xl hero-trust-run-7colors">
                  <div className="w-9 h-9 rounded-xl bg-blue-950/80 border border-blue-800/60 text-blue-400 flex items-center justify-center shrink-0 shadow-inner">
                    <Truck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-black text-white">Heat-Vault</div>
                    <div className="text-[10px] text-stone-400 font-medium">Insulated Fleet</div>
                  </div>
                </div>
              </div>

              {/* National Instant Delivery Hub Router with 7-Color Running Border */}
              <div className="pt-2 max-w-xl mx-auto lg:mx-0">
                <div className="hero-router-run-7colors rounded-2xl p-3 shadow-xl backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] uppercase tracking-wider font-black text-emerald-400 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> 30-Min Heat Vault Delivery Active
                        </span>
                      </div>
                      <div className="text-xs font-bold text-white">
                        Delivering in <strong className="text-amber-300">{selectedCityName}</strong> via <span className="text-stone-300">{selectedOutletName}</span>
                      </div>
                    </div>
                  </div>
                  {onOpenCitySelector && (
                    <button
                      onClick={onOpenCitySelector}
                      className="w-full sm:w-auto px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs transition flex items-center justify-center gap-1 shadow whitespace-nowrap cursor-pointer"
                    >
                      <Building2 className="w-3.5 h-3.5" />
                      <span>Change City</span>
                    </button>
                  )}
                </div>
              </div>

            </div>

            {/* Right Column: 3D Hero Visual Centerpiece */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Glowing Frame with 4-color running border */}
                <div className="relative rounded-3xl overflow-hidden box-run-4colors shadow-2xl p-3 group">
                  
                  <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden bg-stone-950 flex items-center justify-center">
                    
                    {/* 3D Render Image with smooth hover perspective */}
                    <img
                      src={ASSETS_3D.pizzaHero}
                      alt="3D Stone Baked Crown Crust Pizza"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transform group-hover:scale-110 group-hover:rotate-1 transition-all duration-700 drop-shadow-[0_20px_35px_rgba(245,158,11,0.25)]"
                    />
                    
                    {/* Top Hotline Floating Tag */}
                    <div className="absolute top-4 left-4 bg-stone-950/90 backdrop-blur-md border border-amber-500/60 text-white px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-xs font-black text-amber-300">Hotline: {STORE_INFO.hotline}</span>
                    </div>

                    {/* 3D Badge */}
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-red-600 to-amber-600 text-white text-[11px] font-black uppercase tracking-wider px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-spin" />
                      <span>3D Render</span>
                    </div>

                    {/* Bottom Info Overlay */}
                    <div className="absolute bottom-4 left-4 right-4 bg-stone-950/90 backdrop-blur-md p-4 rounded-2xl border border-stone-700/80 shadow-2xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-[10px] uppercase tracking-wider font-extrabold text-amber-400">Signature 3D Crown</span>
                          <h4 className="text-base font-bold text-white font-serif">Cheesy Crown Crust Pizza</h4>
                        </div>
                        <div className="text-right">
                          <span className="text-xs text-stone-400 line-through">Rs. 1,699</span>
                          <div className="text-base font-black text-amber-400 font-mono">Rs. 1,499</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-800/80">
                        <div className="flex items-center gap-1 text-amber-400 text-xs">
                          <Star className="w-3.5 h-3.5 fill-amber-400" />
                          <span className="font-bold">5.0</span>
                          <span className="text-stone-400 text-[11px]">(520+ reviews)</span>
                        </div>
                        <button
                          onClick={() => {
                            const item = MENU_ITEMS.find((m) => m.id === 'pizza-1');
                            if (item) onSelectItem(item);
                          }}
                          className="text-xs bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-stone-950 px-4 py-1.5 rounded-lg font-black transition shadow-md active:scale-95"
                        >
                          Order 3D Pizza
                        </button>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Sovereign National Operations & Live Metrics Counter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-stone-900/90 via-stone-950/95 to-stone-900/90 border border-amber-500/30 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center divide-y lg:divide-y-0 lg:divide-x divide-stone-800/80">
            <div className="space-y-1 pt-4 lg:pt-0">
              <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono tracking-tight">32+</div>
              <div className="text-xs font-bold text-white uppercase tracking-wider">Flagship Outlets</div>
              <div className="text-[11px] text-stone-400">Sindh, Punjab & KPK</div>
            </div>

            <div className="space-y-1 pt-4 lg:pt-0 lg:pl-4">
              <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono tracking-tight">100%</div>
              <div className="text-xs font-bold text-white uppercase tracking-wider">Halal Certified</div>
              <div className="text-[11px] text-stone-400">PHDA & Sindh Halal Auth</div>
            </div>

            <div className="space-y-1 pt-4 lg:pt-0 lg:pl-4">
              <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono tracking-tight">30 Min</div>
              <div className="text-xs font-bold text-white uppercase tracking-wider">Express Dispatch</div>
              <div className="text-[11px] text-stone-400">ThermaVault™ Heat-Lock</div>
            </div>

            <div className="space-y-1 pt-4 lg:pt-0 lg:pl-4">
              <div className="text-2xl sm:text-3xl font-black text-red-500 font-mono tracking-tight">100%</div>
              <div className="text-xs font-bold text-white uppercase tracking-wider">Pure Dairy Cheese</div>
              <div className="text-[11px] text-stone-400">Real Wisconsin Mozzarella</div>
            </div>

            <div className="space-y-1 pt-4 lg:pt-0 lg:pl-4">
              <div className="text-2xl sm:text-3xl font-black text-cyan-400 font-mono tracking-tight">1.8M+</div>
              <div className="text-xs font-bold text-white uppercase tracking-wider">Pizzas Hand-Baked</div>
              <div className="text-[11px] text-stone-400">Since 2018 Founding</div>
            </div>

            <div className="space-y-1 pt-4 lg:pt-0 lg:pl-4">
              <div className="text-2xl sm:text-3xl font-black text-amber-300 font-mono tracking-tight flex items-center justify-center gap-1">
                <span>4.9</span>
                <Star className="w-5 h-5 fill-amber-400 text-amber-400 inline" />
              </div>
              <div className="text-xs font-bold text-white uppercase tracking-wider">Highest Rated</div>
              <div className="text-[11px] text-stone-400">25,000+ Verified Reviews</div>
            </div>
          </div>
        </div>
      </section>

      {/* Website Dedicated Pages Hub - Har Page ko Button Press karke Alag Dekhein */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="box-run-4colors rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6 backdrop-blur-md">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/50 text-amber-300 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>تمام پیجز کا الگ الگ پورٹل • ALL WEBSITE PAGES HUB</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white font-serif">
              Explore Every Page Separately
            </h2>
            <p className="text-xs sm:text-sm text-stone-300">
              ہوم پیج کے علاوہ باقی تمام پیجز کو الگ الگ دیکھنے کے لیے نیچے دیے گئے بٹن پر کلک کریں۔ ہر پیج پر واپسی کا بٹن بھی موجود ہے۔
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-2">
            {/* 1. Menu Page Card */}
            <div className="card-run-4colors rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-xl group">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-3xl p-2.5 rounded-xl bg-red-950/80 border border-red-800/60">🍕</span>
                  <span className="text-[10px] font-black uppercase tracking-wider bg-red-950 text-red-400 border border-red-800/80 px-2 py-0.5 rounded-md">
                    20+ Varieties
                  </span>
                </div>
                <h3 className="text-xl font-black text-white group-hover:text-amber-400 transition font-serif">
                  Food Menu Page
                </h3>
                <p className="text-xs text-stone-400 leading-relaxed">
                  Stone-baked Cheesy Crown Pizzas, Crispy Monster Burgers, and Creamy Alfredo Pastas with full customization.
                </p>
              </div>
              <div className="pt-5 mt-4 border-t border-stone-800/90">
                <button
                  onClick={() => onNavigate('menu')}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-black text-xs shadow-lg transition active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Open Food Menu Page</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* 2. Deals Page Card */}
            <div className="card-run-4colors rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-xl group">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-3xl p-2.5 rounded-xl bg-yellow-950/80 border border-yellow-800/60">🎁</span>
                  <span className="text-[10px] font-black uppercase tracking-wider bg-yellow-950 text-yellow-300 border border-yellow-800/80 px-2 py-0.5 rounded-md">
                    Save Up to 30%
                  </span>
                </div>
                <h3 className="text-xl font-black text-white group-hover:text-yellow-400 transition font-serif">
                  Deals & Offers Page
                </h3>
                <p className="text-xs text-stone-400 leading-relaxed">
                  Family Feast combos, midnight hunger busters, twin pizza specials, and exclusive discount vouchers.
                </p>
              </div>
              <div className="pt-5 mt-4 border-t border-stone-800/90">
                <button
                  onClick={() => onNavigate('deals')}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-stone-950 font-black text-xs shadow-lg transition active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Open Deals & Offers Page</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* 3. Pizza Lab Page Card */}
            <div className="card-run-4colors rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-xl group">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-3xl p-2.5 rounded-xl bg-amber-950/80 border border-amber-800/60">🧪</span>
                  <span className="text-[10px] font-black uppercase tracking-wider bg-amber-950 text-amber-400 border border-amber-800/80 px-2 py-0.5 rounded-md">
                    Interactive 3D
                  </span>
                </div>
                <h3 className="text-xl font-black text-white group-hover:text-amber-400 transition font-serif">
                  Custom Pizza 3D Lab
                </h3>
                <p className="text-xs text-stone-400 leading-relaxed">
                  Build your custom crust (Cheesy Crown, Garlic Stuffed, Pan), secret sauces, pure Wisconsin mozzarella, and spicy Halal toppings.
                </p>
              </div>
              <div className="pt-5 mt-4 border-t border-stone-800/90">
                <button
                  onClick={() => onNavigate('builder')}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-red-700 via-amber-600 to-red-600 hover:brightness-110 text-white font-black text-xs shadow-lg transition active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Open 3D Pizza Lab Page</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* 4. Table Booking Page Card */}
            <div className="card-run-4colors rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-xl group">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-3xl p-2.5 rounded-xl bg-rose-950/80 border border-rose-800/60">📅</span>
                  <span className="text-[10px] font-black uppercase tracking-wider bg-rose-950 text-rose-300 border border-rose-800/80 px-2 py-0.5 rounded-md">
                    Instant Booking
                  </span>
                </div>
                <h3 className="text-xl font-black text-white group-hover:text-rose-400 transition font-serif">
                  Book Table & Reservations
                </h3>
                <p className="text-xs text-stone-400 leading-relaxed">
                  Book VIP dine-in tables, birthday party halls, corporate luncheons, and family celebrations with instant confirmation.
                </p>
              </div>
              <div className="pt-5 mt-4 border-t border-stone-800/90">
                <button
                  onClick={() => onNavigate('reservation')}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-700 to-amber-600 hover:from-rose-600 hover:to-amber-500 text-white font-black text-xs shadow-lg transition active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Open Reservation Page</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* 5. Outlets Page Card */}
            <div className="card-run-4colors rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-xl group">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-3xl p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-800/60">📍</span>
                  <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-950 text-emerald-300 border border-emerald-800/80 px-2 py-0.5 rounded-md">
                    32+ Locations
                  </span>
                </div>
                <h3 className="text-xl font-black text-white group-hover:text-emerald-400 transition font-serif">
                  Branches & Outlets Directory
                </h3>
                <p className="text-xs text-stone-400 leading-relaxed">
                  Complete directory of all 32 flagship kitchens in Karachi, Lahore, Islamabad, Rawalpindi, Multan, and Peshawar with maps and timings.
                </p>
              </div>
              <div className="pt-5 mt-4 border-t border-stone-800/90">
                <button
                  onClick={() => onNavigate('branches')}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs shadow-lg transition active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Open Outlets & Stores Page</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* 6. Live Track Order Page Card */}
            <div className="card-run-4colors rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-xl group">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-3xl p-2.5 rounded-xl bg-cyan-950/80 border border-cyan-800/60">🚚</span>
                  <span className="text-[10px] font-black uppercase tracking-wider bg-cyan-950 text-cyan-300 border border-cyan-800/80 px-2 py-0.5 rounded-md">
                    Live Status
                  </span>
                </div>
                <h3 className="text-xl font-black text-white group-hover:text-cyan-400 transition font-serif">
                  Live Order Tracker
                </h3>
                <p className="text-xs text-stone-400 leading-relaxed">
                  Track your pizza status in real-time: stone oven baking, thermal packing, and express rider dispatch.
                </p>
              </div>
              <div className="pt-5 mt-4 border-t border-stone-800/90">
                <button
                  onClick={() => onNavigate('track-order')}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-black text-xs shadow-lg transition active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Open Order Tracker Page</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Official Regulatory & Food Safety Accreditations Wall */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-900/60 border border-stone-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-800 pb-5">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-black uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Government & Regulatory Compliance</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white font-serif">
                Pakistan's Verified & Standardized Culinary Chain
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs text-stone-400 font-mono bg-stone-950 px-3 py-1.5 rounded-xl border border-stone-800">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>National Central Kitchen: Audited & Certified</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Accreditation 1 */}
            <div className="bg-stone-950/80 border border-stone-800/90 rounded-2xl p-4 space-y-2 hover:border-emerald-500/50 transition">
              <div className="flex items-center justify-between">
                <span className="text-xl">🇵🇰</span>
                <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-950 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-md">
                  Certified Halal
                </span>
              </div>
              <div className="font-bold text-white text-sm">Sindh & Punjab Halal Authorities</div>
              <p className="text-xs text-stone-400 leading-relaxed">
                100% hand-slaughtered poultry and prime beef, rigorously certified under Lic #PK-HAL-8849.
              </p>
            </div>

            {/* Accreditation 2 */}
            <div className="bg-stone-950/80 border border-stone-800/90 rounded-2xl p-4 space-y-2 hover:border-amber-500/50 transition">
              <div className="flex items-center justify-between">
                <Award className="w-6 h-6 text-amber-400" />
                <span className="text-[10px] font-black uppercase tracking-wider bg-amber-950 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded-md">
                  ISO 22000
                </span>
              </div>
              <div className="font-bold text-white text-sm">Food Safety Management System</div>
              <p className="text-xs text-stone-400 leading-relaxed">
                HACCP compliant central storage, temperature-monitored cold chains, and automated hygienic dough kneaders.
              </p>
            </div>

            {/* Accreditation 3 */}
            <div className="bg-stone-950/80 border border-stone-800/90 rounded-2xl p-4 space-y-2 hover:border-cyan-500/50 transition">
              <div className="flex items-center justify-between">
                <Building2 className="w-6 h-6 text-cyan-400" />
                <span className="text-[10px] font-black uppercase tracking-wider bg-cyan-950 text-cyan-300 border border-cyan-500/40 px-2 py-0.5 rounded-md">
                  PSQCA Standard
                </span>
              </div>
              <div className="font-bold text-white text-sm">Pakistan Standards Compliance</div>
              <p className="text-xs text-stone-400 leading-relaxed">
                Adhering to PS:385 food preparation codes with 0% trans-fats and chemical additives.
              </p>
            </div>

            {/* Accreditation 4 */}
            <div className="bg-stone-950/80 border border-stone-800/90 rounded-2xl p-4 space-y-2 hover:border-red-500/50 transition">
              <div className="flex items-center justify-between">
                <Truck className="w-6 h-6 text-red-400" />
                <span className="text-[10px] font-black uppercase tracking-wider bg-red-950 text-red-300 border border-red-500/40 px-2 py-0.5 rounded-md">
                  ThermaVault™
                </span>
              </div>
              <div className="font-bold text-white text-sm">Heat-Locked Fleet Dispatch</div>
              <p className="text-xs text-stone-400 leading-relaxed">
                Specialized courier boxes maintaining 65°C core temperature so crusts remain crunchy and cheese molten.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Interactive 3D Food Showcase & Gallery */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="box-run-4colors rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6 backdrop-blur-md">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-400 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>3D Visual Sizzle Gallery</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white font-serif">
                Explore Our High-Definition 3D Specialties
              </h2>
            </div>
            
            {/* 3D Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setActive3dModel('crown')}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition ${
                  active3dModel === 'crown'
                    ? 'bg-amber-500 text-stone-950 shadow-md'
                    : 'bg-stone-950 text-stone-300 hover:bg-stone-800'
                }`}
              >
                👑 3D Crown Pizza
              </button>
              <button
                onClick={() => setActive3dModel('slice')}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition ${
                  active3dModel === 'slice'
                    ? 'bg-amber-500 text-stone-950 shadow-md'
                    : 'bg-stone-950 text-stone-300 hover:bg-stone-800'
                }`}
              >
                🧀 3D Cheese Pull
              </button>
              <button
                onClick={() => setActive3dModel('float')}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition ${
                  active3dModel === 'float'
                    ? 'bg-amber-500 text-stone-950 shadow-md'
                    : 'bg-stone-950 text-stone-300 hover:bg-stone-800'
                }`}
              >
                🍕 3D Floating Supreme
              </button>
              <button
                onClick={() => setActive3dModel('burger')}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition ${
                  active3dModel === 'burger'
                    ? 'bg-amber-500 text-stone-950 shadow-md'
                    : 'bg-stone-950 text-stone-300 hover:bg-stone-800'
                }`}
              >
                🍔 3D Zinger Burger
              </button>
              <button
                onClick={() => setActive3dModel('pasta')}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition ${
                  active3dModel === 'pasta'
                    ? 'bg-amber-500 text-stone-950 shadow-md'
                    : 'bg-stone-950 text-stone-300 hover:bg-stone-800'
                }`}
              >
                🍝 3D Alfredo Pasta
              </button>
            </div>
          </div>

          {/* 3D Showcase Window with 4-color animated frame */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-black/60 backdrop-blur-md rounded-2xl p-6 border border-white/10">
            <div className="lg:col-span-6 flex justify-center">
              <div className="relative w-full max-w-sm aspect-square rounded-2xl overflow-hidden card-run-4colors shadow-2xl group">
                <img
                  src={selectedModelData.img}
                  alt={selectedModelData.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded shadow">
                  {selectedModelData.tag}
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-4 text-left">
              <div className="inline-block bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold px-3 py-1 rounded-full">
                3D Visual Render
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white font-serif">
                {selectedModelData.title}
              </h3>
              <p className="text-sm text-stone-300 leading-relaxed">
                {selectedModelData.desc}
              </p>
              
              <div className="pt-2 flex items-baseline gap-3">
                <span className="text-2xl font-black text-amber-400 font-mono">
                  {selectedModelData.price}
                </span>
                <span className="text-xs text-emerald-400 font-bold">
                  ✓ Freshly Prepared Upon Order
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-3">
                <button
                  onClick={() => {
                    const found = MENU_ITEMS.find((m) => m.id === selectedModelData.itemId);
                    if (found) onSelectItem(found);
                  }}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white text-xs font-black shadow-lg transition active:scale-95 flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Customize & Add to Cart</span>
                </button>
                <button
                  onClick={() => onNavigate('menu')}
                  className="px-4 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-700 text-xs font-bold transition"
                >
                  View All Menu Options
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Category Explorer Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-amber-400 mb-2">
              <UtensilsCrossed className="w-3.5 h-3.5" />
              <span>Explore By Category</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white font-serif">
              Our Paradise Kitchen
            </h2>
          </div>
          <button
            onClick={() => onNavigate('menu')}
            className="inline-flex items-center gap-2 text-sm font-bold text-amber-400 hover:text-amber-300 transition"
          >
            <span>View Complete Menu</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categoryCards.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onNavigate('menu', cat.id)}
              className="group relative rounded-3xl overflow-hidden card-run-4colors p-4 transition-all duration-300 cursor-pointer shadow-xl hover:-translate-y-1.5"
            >
              <div className="relative h-44 rounded-2xl overflow-hidden mb-4 bg-stone-950">
                <img
                  src={cat.img}
                  alt={cat.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent" />
                <span className="absolute top-3 right-3 bg-stone-950/80 border border-stone-700 text-amber-400 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full">
                  {cat.badge}
                </span>
                <span className="absolute bottom-3 left-3 text-xs font-mono font-bold text-stone-300 bg-stone-900/90 px-2 py-0.5 rounded-md">
                  {cat.count}
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="text-lg font-black text-white font-serif group-hover:text-amber-400 transition">
                  {cat.name}
                </h3>
                <p className="text-xs text-stone-400">
                  {cat.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-800 flex items-center justify-between text-xs font-bold text-amber-400">
                <span>Browse Category</span>
                <span className="group-hover:translate-x-1 transition">➔</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* The Sovereign Taste Standard - 4 Pillars of Excellence */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="card-run-4colors rounded-3xl p-6 sm:p-10 backdrop-blur-md">
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
            <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/40 text-amber-300 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>The National Standard of Taste</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white font-serif">
              Crafted Without Compromise Across Pakistan
            </h2>
            <p className="text-sm text-stone-300">
              Why thousands of food lovers, corporate teams, and families trust Paradise for their celebrations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {NATIONAL_STANDARDS.map((std) => (
              <div
                key={std.id}
                className="bg-stone-900/80 border border-stone-800 rounded-2xl p-5 flex flex-col justify-between hover:border-amber-500/50 hover:bg-stone-900 transition-all group shadow-lg"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl p-2.5 rounded-xl bg-stone-950 border border-stone-800">
                      {std.icon}
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full">
                      {std.badge}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition font-serif">
                    {std.title}
                  </h3>
                  <div className="text-xs font-semibold text-amber-400/90">
                    {std.subtitle}
                  </div>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    {std.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Bestsellers Section with Quick Buy */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="box-run-4colors rounded-3xl p-6 sm:p-10 space-y-8 backdrop-blur-md">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-red-400 mb-1">
                <Flame className="w-3.5 h-3.5 fill-red-400" />
                <span>Trending Most Ordered</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white font-serif">
                Paradise Signature Highlights
              </h2>
            </div>

            <button
              onClick={() => onNavigate('menu')}
              className="self-start sm:self-center px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-400 text-xs font-bold transition flex items-center gap-1"
            >
              <span>See All 20+ Items</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {signatureItems.map((item) => (
              <div
                key={item.id}
                className="card-run-4colors rounded-2xl p-4 flex flex-col justify-between transition group shadow-lg"
              >
                <div>
                  <div className="relative h-44 rounded-xl overflow-hidden mb-3 bg-stone-900">
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                    <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded shadow">
                      {item.tags?.[0] || 'Popular'}
                    </div>
                  </div>

                  <h3 className="text-sm font-bold text-white group-hover:text-amber-400 transition">
                    {item.name}
                  </h3>
                  <p className="text-xs text-stone-400 line-clamp-2 mt-1">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-stone-800/80 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-stone-500 uppercase font-semibold">Price</span>
                    <div className="text-sm font-black text-amber-400 font-mono">
                      Rs. {item.price.toLocaleString()}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {item.sizes?.length ? (
                      <button
                        onClick={() => onSelectItem(item)}
                        className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-black transition"
                      >
                        Customize
                      </button>
                    ) : (
                      <button
                        onClick={() => onAddToCartDirect(item)}
                        className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-black transition"
                      >
                        + Add
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. Special Custom Pizza Lab Teaser Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl box-run-4colors p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/40 text-amber-300 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Paradise Custom Pizza Lab</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-white font-serif">
                Create Your Dream 3D Pizza Slices Exactly How You Love It!
              </h2>

              <p className="text-sm sm:text-base text-stone-300 max-w-xl leading-relaxed">
                Choose your favorite crust (Cheesy Crown, Garlic Stuffed, Pan, Thin), customize secret gourmet sauces, double mozzarella cheese, and load it with spicy Halal tikka & veggies.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onNavigate('builder')}
                  className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-sm px-6 py-3 rounded-xl shadow-xl transition"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Launch Custom Pizza Builder</span>
                </button>

                <button
                  onClick={() => onNavigate('reservation')}
                  className="flex items-center gap-2 bg-stone-950 hover:bg-stone-800 text-stone-200 border border-stone-700 font-bold text-sm px-5 py-3 rounded-xl transition"
                >
                  <CalendarDays className="w-4 h-4 text-amber-400" />
                  <span>Reserve Table</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <div className="w-48 h-48 sm:w-60 sm:h-60 rounded-full bg-gradient-to-tr from-amber-500/20 to-red-500/20 border-2 border-amber-500/40 p-2 flex items-center justify-center shadow-2xl">
                <img
                  src={ASSETS_3D.pizzaFloat}
                  alt="3D Custom Pizza"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-full shadow-2xl transform hover:rotate-12 transition-transform duration-700"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. Nationwide Store Network & Reservations Gateway Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Outlets Directory Gateway Card */}
          <div className="card-run-4colors rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 backdrop-blur-md shadow-2xl">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
                <Store className="w-3.5 h-3.5 text-emerald-400" />
                <span>32+ Flagship Kitchens in Pakistan</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white font-serif">
                Nationwide Store Network
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                Looking for your nearest Pizza Paradise outlet in Karachi, Lahore, Islamabad, Rawalpindi, Peshawar, or Faisalabad? Press the button below to open the dedicated Outlets Page with complete store hours, phone numbers, and maps.
              </p>
            </div>

            <div className="pt-4 border-t border-stone-800">
              <button
                onClick={() => onNavigate('branches')}
                className="w-full py-3.5 px-6 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-black transition shadow-xl flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <MapPin className="w-4 h-4" />
                <span>Open Dedicated Branches Page</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Table Reservations Gateway Card */}
          <div className="card-run-4colors rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 backdrop-blur-md shadow-2xl">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 bg-rose-950/80 border border-rose-500/40 text-rose-300 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
                <CalendarDays className="w-3.5 h-3.5 text-rose-400" />
                <span>VIP Table & Party Booking</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white font-serif">
                Table Reservations & Corporate Dining
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                Planning a family get-together, birthday party, or corporate luncheon? Reserve a private dining hall or VIP table with personalized stone-hearth feast menus and instant SMS confirmations.
              </p>
            </div>

            <div className="pt-4 border-t border-stone-800">
              <button
                onClick={() => onNavigate('reservation')}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white text-xs font-black transition shadow-xl flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <CalendarDays className="w-4 h-4" />
                <span>Open Dedicated Reservation Page</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Verified Nationwide Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/40 text-amber-300 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>Trusted Across Pakistan</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white font-serif">
            Customer Reviews From Every Province
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-stone-900/90 border border-stone-800 rounded-2xl p-5 flex flex-col justify-between hover:border-amber-500/40 transition shadow-lg"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-stone-500">
                    {t.date}
                  </span>
                </div>

                <p className="text-xs text-stone-300 italic leading-relaxed">
                  "{t.comment}"
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-stone-800/80">
                <div className="text-sm font-bold text-white">{t.name}</div>
                <div className="text-[11px] text-amber-400 font-semibold">{t.role} ({t.city || 'Verified'})</div>
                <div className="text-[10px] text-stone-500 truncate mt-0.5">{t.branch}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. Corporate Franchising & Sovereign Expansion Hub */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-stone-900 via-stone-950 to-amber-950/40 border border-amber-500/40 rounded-3xl p-6 sm:p-10 space-y-6 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/40 text-amber-300 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
                <Building2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Franchise & Institutional Partnerships</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white font-serif tracking-tight">
                Bring Pizza Paradise To Your City
              </h2>
              <p className="text-sm text-stone-300 leading-relaxed">
                Join Pakistan's highest-grossing fast-casual pizza network. We offer turnkey stone-hearth kitchen setups, direct cold-chain dairy logistics from Wisconsin, and proprietary automated POS systems.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigate('branches')}
                className="px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-black transition shadow-xl flex items-center gap-2"
              >
                <span>Apply for Franchise</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate('reservation')}
                className="px-5 py-3.5 rounded-2xl bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-700 text-xs font-bold transition"
              >
                Corporate Catering Inquiry
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-stone-800">
            <div className="flex items-start gap-3 bg-stone-950/60 p-3.5 rounded-xl border border-stone-800/80">
              <span className="text-xl">📈</span>
              <div>
                <div className="text-xs font-bold text-white">High ROI Architecture</div>
                <div className="text-[11px] text-stone-400">Proven 24–28% average store-level operating margins.</div>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-stone-950/60 p-3.5 rounded-xl border border-stone-800/80">
              <span className="text-xl">❄️</span>
              <div>
                <div className="text-xs font-bold text-white">Centralized Cold Chain</div>
                <div className="text-[11px] text-stone-400">100% Halal poultry and mozzarella supplied directly.</div>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-stone-950/60 p-3.5 rounded-xl border border-stone-800/80">
              <span className="text-xl">🇵🇰</span>
              <div>
                <div className="text-xs font-bold text-white">Prime Territory Openings</div>
                <div className="text-[11px] text-stone-400">Active expansion in Sialkot, Abbottabad, Gujrat, and Bahawalpur.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. National Helpline & Operations Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="box-run-4colors rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
              <PhoneCall className="w-7 h-7 animate-pulse" />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-950 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full">
                🇵🇰 24/7 National Operations
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white font-serif">
                Order Online or Dial National UAN Helpline
              </h3>
              <p className="text-xs text-stone-300 max-w-lg leading-relaxed">
                Centralized customer dispatch center serving Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, Multan, and Peshawar.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('branches')}
              className="px-5 py-3 rounded-xl bg-stone-950 hover:bg-stone-800 text-stone-200 border border-stone-700 text-xs font-bold transition"
            >
              Locate Outlets & Franchises
            </button>
            <a
              href={`tel:${STORE_INFO.hotlineRaw}`}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-sm font-black transition shadow-xl"
            >
              <Phone className="w-4 h-4 text-stone-950" />
              <span>Call UAN: {STORE_INFO.hotline}</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

