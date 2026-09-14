import React, { useState } from 'react';
import { 
  Phone, 
  ShoppingBag, 
  Search, 
  CalendarDays, 
  MapPin, 
  Clock, 
  Sparkles, 
  Menu as MenuIcon, 
  X, 
  Check, 
  Copy,
  Flame,
  UtensilsCrossed,
  Gift,
  Compass,
  Truck,
  ShieldCheck,
  Building2,
  Award
} from 'lucide-react';
import { STORE_INFO } from '../data/menuData';
import { PageId, CategoryId, OrderDetails } from '../types';
import { SevenColorBorderToggle } from './SevenColorBorderToggle';
import { ThreeDBackgroundToggle } from './ThreeDBackgroundToggle';

interface NavbarProps {
  activePage: PageId;
  onNavigate: (page: PageId, category?: CategoryId) => void;
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  orderMode: 'delivery' | 'takeaway';
  onToggleOrderMode: (mode: 'delivery' | 'takeaway') => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  activeOrder?: OrderDetails | null;
  sevenColorBorder?: boolean;
  onToggleSevenColorBorder?: () => void;
  threeDBackground?: boolean;
  onToggleThreeDBackground?: () => void;
  selectedCityName?: string;
  selectedOutletName?: string;
  onOpenCitySelector?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  onNavigate,
  cartCount,
  cartTotal,
  onOpenCart,
  orderMode,
  onToggleOrderMode,
  searchQuery,
  onSearchChange,
  activeOrder,
  sevenColorBorder = true,
  onToggleSevenColorBorder,
  threeDBackground = true,
  onToggleThreeDBackground,
  selectedCityName = 'Karachi',
  selectedOutletName = 'Clifton Flagship',
  onOpenCitySelector,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(STORE_INFO.hotline);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const navPages: { id: PageId; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'home', label: 'Home', icon: <span className="text-sm">🏠</span> },
    { id: 'menu', label: 'Menu', icon: <UtensilsCrossed className="w-3.5 h-3.5" /> },
    { id: 'deals', label: 'Deals & Offers', icon: <Gift className="w-3.5 h-3.5 text-yellow-400" />, badge: 'Save 30%' },
    { id: 'builder', label: 'Pizza Lab', icon: <Sparkles className="w-3.5 h-3.5 text-amber-400" /> },
    { id: 'reservation', label: 'Book Table', icon: <CalendarDays className="w-3.5 h-3.5 text-red-400" /> },
    { id: 'branches', label: 'Outlets & Stores', icon: <MapPin className="w-3.5 h-3.5 text-emerald-400" /> },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-stone-950/80 backdrop-blur-md border-b border-white/10 transition-all shadow-xl">
      {/* National Corporate Utility Bar */}
      <div className="bg-stone-950/98 border-b border-stone-800/90 text-stone-300 text-[11px] font-medium py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Left: National Identity & Accreditation Badges */}
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 text-emerald-300 font-black bg-emerald-950/80 border border-emerald-500/40 px-2.5 py-0.5 rounded-full text-[10px] tracking-wider uppercase shadow-sm">
              <span>🇵🇰</span>
              <span>ISLAMIC REPUBLIC OF PAKISTAN • OFFICIAL PORTAL</span>
            </span>
            <span className="hidden xl:inline-flex items-center gap-2 text-stone-300 text-[11px]">
              <span className="flex items-center gap-1 text-amber-300 font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>Govt. Halal Reg #PK-FD-786</span>
              </span>
              <span className="text-stone-600">•</span>
              <span className="flex items-center gap-1 text-stone-300">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>ISO 22000 Certified</span>
              </span>
              <span className="text-stone-600">•</span>
              <span className="text-emerald-400 font-bold">32+ National Flagship Hubs</span>
            </span>
          </div>

          {/* Right: City Selector, WhatsApp, & 24/7 National Helpline */}
          <div className="flex items-center gap-2.5">
            {/* Interactive City Selector */}
            <button
              onClick={onOpenCitySelector}
              className="flex items-center gap-1.5 bg-stone-900 hover:bg-stone-850 border border-amber-500/40 text-stone-200 hover:text-white px-2.5 py-0.5 rounded-lg text-[11px] transition shadow-sm group"
              title="Click to change your delivery city & outlet"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <MapPin className="w-3 h-3 text-amber-400 group-hover:scale-110 transition-transform" />
              <span className="text-stone-400 font-normal">City:</span>
              <strong className="text-amber-300 font-bold">{selectedCityName}</strong>
              <span className="text-[10px] font-black text-amber-400 uppercase ml-0.5 bg-amber-950/80 px-1 py-0.2 rounded border border-amber-500/30">
                Switch ▾
              </span>
            </button>

            {/* WhatsApp Express Order */}
            <a
              href="https://wa.me/923111786676?text=Assalam%20o%20Alaikum%20Pizza%20Paradise!%20I%20would%20like%20to%20place%20an%20order."
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 bg-emerald-950/70 border border-emerald-500/40 px-2.5 py-0.5 rounded-lg text-[11px] font-bold transition shadow-sm"
              title="Fast order via official WhatsApp"
            >
              <span className="text-xs">💬</span>
              <span>WhatsApp Order</span>
            </a>

            {/* Central National UAN Helpline */}
            <a
              href={`tel:${STORE_INFO.hotlineRaw}`}
              className="inline-flex items-center gap-1.5 text-amber-300 hover:text-amber-200 font-black bg-stone-900 border border-amber-500/40 px-2.5 py-0.5 rounded-lg text-[11px] transition shadow-sm"
            >
              <Phone className="w-3 h-3 text-emerald-400 animate-pulse" />
              <span className="text-stone-400 font-normal">UAN:</span>
              <span className="font-mono text-amber-300 font-black">{STORE_INFO.hotline}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Brand Logo - Official National Sovereign Insignia */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => onNavigate('home')} 
              className="group flex items-center gap-2.5 text-left focus:outline-none"
            >
              {/* Custom Logo Badge with 4-color running border */}
              <div className="relative flex items-center nav-box-run-4colors px-3.5 py-1.5 rounded-2xl shadow-lg transition-all">
                <div className="flex flex-col items-start leading-none">
                  <span className="text-[10px] font-black tracking-widest text-amber-400 uppercase bg-amber-950/80 px-1.5 py-0.5 rounded border border-amber-500/30 mb-0.5">
                    PIZZA
                  </span>
                  <div className="flex items-center text-xl sm:text-2xl font-black tracking-tight text-white font-serif">
                    <span className="text-red-500 group-hover:text-red-400 transition-colors">PARAD</span>
                    {/* Palm Tree icon in place of I */}
                    <span className="relative inline-flex items-center justify-center text-emerald-400 px-0.5">
                      <svg className="w-5 h-5 -mt-0.5 text-emerald-400 filter drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C12.5 3 13 4.5 13 6C15 4.5 17 4 19 4.5C18 6.5 16.5 8 14.5 8.5C16.5 9.5 18 11.5 18.5 13.5C16.5 13 15 11.5 13.5 10C13 13 13 18 13.5 22H10.5C11 18 11 13 10.5 10C9 11.5 7.5 13 5.5 13.5C6 11.5 7.5 9.5 9.5 8.5C7.5 8 6 6.5 5 4.5C7 4 9 4.5 11 6C11 4.5 11.5 3 12 2Z" />
                      </svg>
                    </span>
                    <span className="text-red-500 group-hover:text-red-400 transition-colors">SE</span>
                  </div>
                </div>
              </div>

              {/* National Brand Title Lockup */}
              <div className="hidden xl:flex flex-col border-l border-stone-800/80 pl-3 leading-tight">
                <span className="text-[11px] font-black text-amber-300 tracking-wider uppercase font-sans">
                  Pizza Paradise Pakistan
                </span>
                <span className="text-[9px] text-stone-400 font-medium">
                  National Artisanal Hearth • Estd. 2018
                </span>
              </div>
            </button>
          </div>

          {/* Unified Desktop Navigation Bar with 4-color running border */}
          <nav className="hidden lg:flex items-center gap-1 nav-pill-run-4colors p-1.5 rounded-full shadow-lg">
            {navPages.map((page) => {
              const isActive = activePage === page.id;
              return (
                <button
                  key={page.id}
                  onClick={() => onNavigate(page.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap relative ${
                    isActive
                      ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
                      : 'text-stone-300 hover:text-white hover:bg-stone-800/80'
                  }`}
                >
                  {page.icon}
                  <span>{page.label}</span>
                  {page.badge && !isActive && (
                    <span className="text-[9px] font-black uppercase bg-red-600 text-white px-1.5 py-0.2 rounded-full -mr-1">
                      {page.badge}
                    </span>
                  )}
                </button>
              );
            })}

            {/* Track Order Tab */}
            <button
              onClick={() => onNavigate('track-order')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                activePage === 'track-order'
                  ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
                  : activeOrder
                  ? 'bg-red-600/20 text-red-400 hover:bg-red-600/30 border border-red-500/40 animate-pulse'
                  : 'text-stone-300 hover:text-white hover:bg-stone-800/80'
              }`}
            >
              <Truck className="w-3.5 h-3.5" />
              <span>Track Order</span>
              {activeOrder && (
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              )}
            </button>
          </nav>

          {/* Right Actions: Order Mode Toggle, Search, Cart */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Delivery / Takeaway Switch with 4-color running border */}
            <div className="hidden sm:flex nav-box-run-4colors p-1 rounded-2xl shadow-lg">
              <button
                onClick={() => onToggleOrderMode('delivery')}
                className={`px-2.5 py-1 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 ${
                  orderMode === 'delivery'
                    ? 'bg-red-600 text-white shadow'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <span>🛵 Delivery</span>
              </button>
              <button
                onClick={() => onToggleOrderMode('takeaway')}
                className={`px-2.5 py-1 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 ${
                  orderMode === 'takeaway'
                    ? 'bg-amber-500 text-stone-950 shadow'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <span>🛍️ Takeaway</span>
              </button>
            </div>

            {/* Search Toggle / Input with 4-color running border */}
            <div className="relative">
              {showSearchInput ? (
                <div className="flex items-center nav-btn-run-4colors rounded-xl px-2.5 py-1 shadow-md w-40 sm:w-52">
                  <Search className="w-4 h-4 text-amber-400 shrink-0 mr-1.5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      onSearchChange(e.target.value);
                      if (activePage !== 'menu') {
                        onNavigate('menu');
                      }
                    }}
                    placeholder="Search menu..."
                    className="bg-transparent text-xs text-white placeholder-stone-400 outline-none w-full"
                    autoFocus
                  />
                  <button
                    onClick={() => {
                      onSearchChange('');
                      setShowSearchInput(false);
                    }}
                    className="text-stone-400 hover:text-white text-xs ml-1"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setShowSearchInput(true);
                    if (activePage !== 'menu') {
                      onNavigate('menu');
                    }
                  }}
                  className="p-2.5 rounded-xl nav-btn-run-4colors text-stone-300 hover:text-amber-400 transition shadow-sm"
                  title="Search menu"
                >
                  <Search className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* 3D Background Toggle Button (Matching User Screenshot) */}
            {onToggleThreeDBackground && (
              <div className="hidden md:flex items-center">
                <ThreeDBackgroundToggle
                  isEnabled={threeDBackground}
                  onToggle={onToggleThreeDBackground}
                  id="navbar-threed-bg-toggle"
                />
              </div>
            )}

            {/* 7-Color Border Toggle Button (Matching User Image) */}
            {onToggleSevenColorBorder && (
              <div className="hidden sm:flex items-center">
                <SevenColorBorderToggle
                  isEnabled={sevenColorBorder}
                  onToggle={onToggleSevenColorBorder}
                  id="navbar-seven-color-toggle"
                />
              </div>
            )}

            {/* Cart Button with Live Counter and Price */}
            <button
              id="cart-trigger-button"
              onClick={onOpenCart}
              className="relative flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold px-3.5 py-2 rounded-xl shadow-lg shadow-amber-500/25 transition-all transform active:scale-95"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center animate-bounce shadow">
                    {cartCount}
                  </span>
                )}
              </div>
              <div className="hidden sm:flex flex-col text-left leading-tight">
                <span className="text-[10px] uppercase tracking-wider text-stone-900 font-extrabold">Cart</span>
                <span className="text-xs font-black">Rs. {cartTotal.toLocaleString()}</span>
              </div>
            </button>

            {/* Mobile Menu Button with 4-color running border */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl nav-btn-run-4colors text-stone-300 hover:text-white"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Universal All-Device Page Buttons Strip - Har Page ko Button Press karke Alag Dekhein */}
      <div className="bg-stone-950/98 border-t border-stone-800/90 py-2 px-2 sm:px-4 shadow-inner">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-1.5 sm:gap-2">
            {navPages.map((page) => {
              const isActive = activePage === page.id;
              return (
                <button
                  key={page.id}
                  onClick={() => onNavigate(page.id)}
                  title={`Open ${page.label} Page`}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-xs font-black transition-all whitespace-nowrap cursor-pointer select-none active:scale-95 ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 shadow-md shadow-amber-500/30 ring-2 ring-amber-400'
                      : 'bg-stone-900/90 text-stone-300 hover:text-white hover:bg-stone-800 border border-stone-800'
                  }`}
                >
                  {page.icon}
                  <span>{page.label}</span>
                  {page.badge && (
                    <span className={`text-[9px] font-black uppercase px-1.5 py-0.2 rounded-full ${
                      isActive ? 'bg-stone-950 text-amber-300' : 'bg-red-600 text-white'
                    }`}>
                      {page.badge}
                    </span>
                  )}
                </button>
              );
            })}

            {/* Track Order Button */}
            <button
              onClick={() => onNavigate('track-order')}
              title="Open Track Order Page"
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap cursor-pointer select-none active:scale-95 ${
                activePage === 'track-order'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 shadow-md ring-2 ring-amber-400'
                  : 'bg-stone-900/90 text-stone-300 hover:text-white hover:bg-stone-800 border border-stone-800'
              }`}
            >
              <Truck className="w-3.5 h-3.5" />
              <span>Track Order</span>
            </button>
          </div>

          {/* Active Page Indicator */}
          <div className="hidden lg:flex items-center gap-2 text-[11px] font-mono text-stone-400 shrink-0 bg-stone-900 px-3 py-1.5 rounded-xl border border-stone-800">
            <span className="text-stone-500">Current View:</span>
            <span className="text-amber-400 font-bold uppercase tracking-wider">
              {activePage === 'home' ? '🏠 Home Page' :
               activePage === 'menu' ? '🍕 Food Menu' :
               activePage === 'deals' ? '🎁 Deals & Offers' :
               activePage === 'builder' ? '🧪 Pizza Lab' :
               activePage === 'reservation' ? '📅 Table Booking' :
               activePage === 'branches' ? '📍 Outlets / Stores' :
               '🚚 Live Order Tracker'}
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-stone-950 border-b border-stone-800 px-4 pt-3 pb-6 space-y-4 animate-in slide-in-from-top duration-200">
          
          {/* City / Outlet Selector for Mobile */}
          {onOpenCitySelector && (
            <button
              onClick={() => {
                onOpenCitySelector();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between p-3 rounded-2xl bg-stone-900 border border-amber-500/40 text-left transition hover:bg-stone-800"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-stone-400 uppercase font-bold tracking-wider">Delivering To:</div>
                  <div className="text-xs font-bold text-white">
                    {selectedCityName} <span className="text-amber-400 font-normal">({selectedOutletName})</span>
                  </div>
                </div>
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider bg-amber-500 text-stone-950 px-2 py-1 rounded-lg">
                Change
              </span>
            </button>
          )}

          {/* Mode Switch for Mobile */}
          <div className="grid grid-cols-2 gap-2 nav-box-run-4colors p-1 rounded-xl">
            <button
              onClick={() => onToggleOrderMode('delivery')}
              className={`py-2 text-xs font-bold rounded-lg text-center transition-all ${
                orderMode === 'delivery' ? 'bg-red-600 text-white shadow' : 'text-stone-400'
              }`}
            >
              🛵 Delivery
            </button>
            <button
              onClick={() => onToggleOrderMode('takeaway')}
              className={`py-2 text-xs font-bold rounded-lg text-center transition-all ${
                orderMode === 'takeaway' ? 'bg-amber-500 text-stone-950 shadow' : 'text-stone-400'
              }`}
            >
              🛍️ Takeaway
            </button>
          </div>

          {/* 3D Background Toggle for Mobile */}
          {onToggleThreeDBackground && (
            <div className="flex items-center justify-between p-3 rounded-2xl bg-stone-900 border border-stone-800">
              <span className="text-xs font-bold text-stone-300">3D Scene:</span>
              <ThreeDBackgroundToggle
                isEnabled={threeDBackground}
                onToggle={onToggleThreeDBackground}
                id="mobile-threed-bg-toggle"
              />
            </div>
          )}

          {/* 7-Color Border Toggle for Mobile */}
          {onToggleSevenColorBorder && (
            <div className="flex items-center justify-between p-3 rounded-2xl bg-stone-900 border border-stone-800">
              <span className="text-xs font-bold text-stone-300">Border FX:</span>
              <SevenColorBorderToggle
                isEnabled={sevenColorBorder}
                onToggle={onToggleSevenColorBorder}
                id="mobile-seven-color-toggle"
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-2">
            {navPages.map((page) => (
              <button
                key={page.id}
                onClick={() => {
                  onNavigate(page.id);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center gap-2 px-3.5 py-3 rounded-2xl text-xs font-bold text-left transition ${
                  activePage === page.id
                    ? 'bg-amber-500 text-stone-950 shadow'
                    : 'bg-stone-900 text-stone-200 hover:bg-stone-800'
                }`}
              >
                {page.icon}
                <span>{page.label}</span>
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-2 pt-2 border-t border-stone-800">
            <button
              onClick={() => {
                onNavigate('track-order');
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-between p-3 rounded-xl bg-stone-900 text-stone-200 hover:bg-stone-800 font-bold text-xs"
            >
              <span className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-amber-400" />
                Live Order Tracker
              </span>
              <span>→</span>
            </button>

            <a
              href={`tel:${STORE_INFO.hotlineRaw}`}
              className="flex items-center justify-center gap-2 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-sm shadow-md"
            >
              <Phone className="w-4 h-4" />
              Call Hotline: {STORE_INFO.hotline}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
