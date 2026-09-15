import React, { useState } from 'react';
import { 
  Phone, 
  ShoppingBag, 
  Search, 
  CalendarDays, 
  MapPin, 
  Sparkles, 
  Menu as MenuIcon, 
  X, 
  UtensilsCrossed,
  Gift,
  Truck,
  Building2
} from 'lucide-react';
import { STORE_INFO } from '../data/menuData';
import { ASSETS_3D } from '../data/assets';
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
  const [showSearchInput, setShowSearchInput] = useState(false);

  const navPages: { id: PageId; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'home', label: 'Home', icon: <span className="text-sm">🏠</span> },
    { id: 'menu', label: 'Menu', icon: <UtensilsCrossed className="w-3.5 h-3.5 text-amber-400" /> },
    { id: 'deals', label: 'Deals', icon: <Gift className="w-3.5 h-3.5 text-yellow-400" />, badge: '30% Off' },
    { id: 'builder', label: 'Pizza Lab', icon: <Sparkles className="w-3.5 h-3.5 text-amber-400" /> },
    { id: 'reservation', label: 'Book Table', icon: <CalendarDays className="w-3.5 h-3.5 text-red-400" /> },
    { id: 'branches', label: 'Outlets', icon: <MapPin className="w-3.5 h-3.5 text-emerald-400" /> },
    { id: 'track-order', label: 'Track', icon: <Truck className="w-3.5 h-3.5 text-cyan-400" /> },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-stone-950/95 backdrop-blur-md border-b border-stone-800 transition-all shadow-2xl">
      {/* ONE SINGLE UNIFIED NAVBAR ROW */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20 gap-2 sm:gap-4">
          
          {/* 1. Left: Brand Logo - Official Pizza Paradise Insignia */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button 
              onClick={() => onNavigate('home')} 
              className="group flex items-center gap-2 text-left focus:outline-none cursor-pointer"
            >
              {/* Custom Logo Badge with 4-color running border & Real Uploaded Logo */}
              <div className="relative flex items-center gap-2 nav-box-run-4colors px-2 sm:px-2.5 py-1 rounded-2xl shadow-xl transition-all group-hover:scale-105 duration-200">
                <img 
                  src={ASSETS_3D.logo}
                  alt="Pizza Paradise Official Logo"
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 sm:w-12 sm:h-12 object-contain rounded-xl drop-shadow-[0_0_12px_rgba(245,158,11,0.5)] transform group-hover:rotate-2 transition-transform"
                />
                <div className="flex flex-col items-start leading-none pr-1">
                  <div className="flex items-center text-sm sm:text-base font-black tracking-tight text-white font-serif">
                    <span className="text-amber-400">PIZZA</span>
                    <span className="text-red-500 ml-1">PARADISE</span>
                  </div>
                  <span className="text-[8px] sm:text-[9px] font-bold tracking-widest text-emerald-400 uppercase mt-0.5">
                    PAKISTAN OFFICIAL
                  </span>
                </div>
              </div>

              {/* National Brand Title Lockup (Desktop) */}
              <div className="hidden 2xl:flex flex-col border-l border-stone-800 pl-2.5 leading-tight">
                <span className="text-[11px] font-black text-amber-300 tracking-wider uppercase">
                  National Kitchens
                </span>
                <span className="text-[9px] text-stone-400 font-medium">
                  32+ Sovereign Outlets
                </span>
              </div>
            </button>
          </div>

          {/* 2. Center: All Page Navigation Buttons (Single Unified Strip) */}
          <nav className="hidden lg:flex items-center gap-1 nav-pill-run-4colors p-1 rounded-full shadow-lg">
            {navPages.map((page) => {
              const isActive = activePage === page.id;
              return (
                <button
                  key={page.id}
                  onClick={() => onNavigate(page.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20 font-black'
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
                  {page.id === 'track-order' && activeOrder && (
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping ml-0.5" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* 3. Right: Delivery Mode, City, 7-Color, 3D, Search, Cart, Mobile Menu */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            
            {/* Interactive City Selector */}
            {onOpenCitySelector && (
              <button
                onClick={onOpenCitySelector}
                className="hidden xl:flex items-center gap-1 bg-stone-900 hover:bg-stone-800 border border-amber-500/30 text-stone-200 hover:text-white px-2.5 py-1.5 rounded-xl text-xs transition shadow-sm cursor-pointer group"
                title="Switch delivery city"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <MapPin className="w-3 h-3 text-amber-400" />
                <span className="font-bold text-amber-300">{selectedCityName}</span>
                <span className="text-[10px] text-stone-400">▾</span>
              </button>
            )}

            {/* Delivery / Takeaway Switch */}
            <div className="hidden md:flex nav-box-run-4colors p-0.5 rounded-xl shadow-md">
              <button
                onClick={() => onToggleOrderMode('delivery')}
                className={`px-2 py-1 text-[11px] font-bold rounded-lg transition-all cursor-pointer ${
                  orderMode === 'delivery'
                    ? 'bg-red-600 text-white shadow'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                🛵 Delivery
              </button>
              <button
                onClick={() => onToggleOrderMode('takeaway')}
                className={`px-2 py-1 text-[11px] font-bold rounded-lg transition-all cursor-pointer ${
                  orderMode === 'takeaway'
                    ? 'bg-amber-500 text-stone-950 shadow'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                🛍️ Takeaway
              </button>
            </div>

            {/* 7-Color Border Toggle Button */}
            {onToggleSevenColorBorder && (
              <div className="flex items-center">
                <SevenColorBorderToggle
                  isEnabled={sevenColorBorder}
                  onToggle={onToggleSevenColorBorder}
                  id="navbar-seven-color-toggle"
                />
              </div>
            )}

            {/* 3D Background Toggle Button */}
            {onToggleThreeDBackground && (
              <div className="hidden sm:flex items-center">
                <ThreeDBackgroundToggle
                  isEnabled={threeDBackground}
                  onToggle={onToggleThreeDBackground}
                  id="navbar-threed-bg-toggle"
                />
              </div>
            )}

            {/* Search Toggle / Input */}
            <div className="relative">
              {showSearchInput ? (
                <div className="flex items-center nav-btn-run-4colors rounded-xl px-2 py-1 shadow-md w-36 sm:w-48">
                  <Search className="w-3.5 h-3.5 text-amber-400 shrink-0 mr-1.5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      onSearchChange(e.target.value);
                      if (activePage !== 'menu') {
                        onNavigate('menu');
                      }
                    }}
                    placeholder="Search food..."
                    className="bg-transparent text-xs text-white placeholder-stone-400 outline-none w-full"
                    autoFocus
                  />
                  <button
                    onClick={() => {
                      onSearchChange('');
                      setShowSearchInput(false);
                    }}
                    className="text-stone-400 hover:text-white text-xs ml-1 cursor-pointer"
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
                  className="p-2 rounded-xl nav-btn-run-4colors text-stone-300 hover:text-amber-400 transition shadow-sm cursor-pointer"
                  title="Search menu"
                >
                  <Search className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Cart Button with Live Counter and Price */}
            <button
              id="cart-trigger-button"
              onClick={onOpenCart}
              className="relative flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold px-3 py-2 rounded-xl shadow-lg shadow-amber-500/25 transition-all transform active:scale-95 cursor-pointer shrink-0"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center animate-bounce shadow">
                    {cartCount}
                  </span>
                )}
              </div>
              <div className="hidden sm:flex flex-col text-left leading-tight">
                <span className="text-[9px] uppercase tracking-wider text-stone-900 font-black">Cart</span>
                <span className="text-xs font-black">Rs. {cartTotal.toLocaleString()}</span>
              </div>
            </button>

            {/* Mobile Menu Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl nav-btn-run-4colors text-stone-300 hover:text-white cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu (Visible only when mobile hamburger is tapped) */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-stone-950/98 border-t border-stone-800 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top duration-200 shadow-2xl">
          
          {/* City / Outlet Selector for Mobile */}
          {onOpenCitySelector && (
            <button
              onClick={() => {
                onOpenCitySelector();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between p-2.5 rounded-xl bg-stone-900 border border-amber-500/40 text-left transition hover:bg-stone-850 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400" />
                <div className="text-xs font-bold text-white">
                  Delivering in: <strong className="text-amber-300">{selectedCityName}</strong>
                </div>
              </div>
              <span className="text-[10px] font-black uppercase bg-amber-500 text-stone-950 px-2 py-0.5 rounded-md">
                Change
              </span>
            </button>
          )}

          {/* Mode Switch for Mobile */}
          <div className="grid grid-cols-2 gap-2 nav-box-run-4colors p-1 rounded-xl">
            <button
              onClick={() => onToggleOrderMode('delivery')}
              className={`py-2 text-xs font-bold rounded-lg text-center transition-all cursor-pointer ${
                orderMode === 'delivery' ? 'bg-red-600 text-white shadow' : 'text-stone-400'
              }`}
            >
              🛵 Delivery
            </button>
            <button
              onClick={() => onToggleOrderMode('takeaway')}
              className={`py-2 text-xs font-bold rounded-lg text-center transition-all cursor-pointer ${
                orderMode === 'takeaway' ? 'bg-amber-500 text-stone-950 shadow' : 'text-stone-400'
              }`}
            >
              🛍️ Takeaway
            </button>
          </div>

          {/* Mobile All Navigation Pages Grid */}
          <div className="grid grid-cols-2 gap-2">
            {navPages.map((page) => (
              <button
                key={page.id}
                onClick={() => {
                  onNavigate(page.id);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold text-left transition cursor-pointer ${
                  activePage === page.id
                    ? 'bg-amber-500 text-stone-950 shadow font-black'
                    : 'bg-stone-900 text-stone-200 hover:bg-stone-800'
                }`}
              >
                {page.icon}
                <span>{page.label}</span>
                {page.badge && (
                  <span className="text-[8px] font-black uppercase bg-red-600 text-white px-1 rounded ml-auto">
                    {page.badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Hotline Quick Call */}
          <a
            href={`tel:${STORE_INFO.hotlineRaw}`}
            className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-xs shadow-md transition"
          >
            <Phone className="w-4 h-4 animate-pulse" />
            <span>24/7 National UAN: {STORE_INFO.hotline}</span>
          </a>
        </div>
      )}
    </header>
  );
};
