import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { ShieldCheck, Zap, Store, MapPin } from 'lucide-react';
import { MENU_ITEMS } from './data/menuData';
import { CategoryId, MenuItem, CartItem, OrderDetails, PageId } from './types';
import { Navbar } from './components/Navbar';
import { ItemCustomizeModal } from './components/ItemCustomizeModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { Footer } from './components/Footer';
import { ScrollToTopButton } from './components/ScrollToTopButton';

// Individual Pages
import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';
import { DealsPage } from './pages/DealsPage';
import { PizzaLabPage } from './pages/PizzaLabPage';
import { ReservationPage } from './pages/ReservationPage';
import { BranchPage } from './pages/BranchPage';
import { TrackOrderPage } from './pages/TrackOrderPage';
import { SevenColorBorderToggle } from './components/SevenColorBorderToggle';
import { ThreeDBackgroundToggle } from './components/ThreeDBackgroundToggle';
import { ThreeDVideoBackground } from './components/ThreeDVideoBackground';
import { CitySelectorModal } from './components/CitySelectorModal';
import { NATIONAL_CITIES, NATIONAL_OUTLETS } from './data/nationalData';

export default function App() {
  // Page Navigation State
  const [activePage, setActivePage] = useState<PageId>('home');
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [orderMode, setOrderMode] = useState<'delivery' | 'takeaway'>('delivery');

  // National City & Outlet Selection State
  const [selectedCityId, setSelectedCityId] = useState<string>(() => {
    try {
      return localStorage.getItem('pizza_paradise_selected_city') || 'karachi';
    } catch {
      return 'karachi';
    }
  });

  const [selectedOutletId, setSelectedOutletId] = useState<string>(() => {
    try {
      return localStorage.getItem('pizza_paradise_selected_outlet') || 'khi-clifton';
    } catch {
      return 'khi-clifton';
    }
  });

  const [isCityModalOpen, setIsCityModalOpen] = useState<boolean>(false);

  const handleSelectCity = (cityId: string, outletId?: string) => {
    setSelectedCityId(cityId);
    try {
      localStorage.setItem('pizza_paradise_selected_city', cityId);
    } catch {}

    const outletsForCity = NATIONAL_OUTLETS.filter((o) => o.cityId === cityId);
    const targetOutletId = outletId || (outletsForCity.length > 0 ? outletsForCity[0].id : '');
    setSelectedOutletId(targetOutletId);
    try {
      localStorage.setItem('pizza_paradise_selected_outlet', targetOutletId);
    } catch {}
  };

  const selectedCityData = NATIONAL_CITIES.find((c) => c.id === selectedCityId) || NATIONAL_CITIES[0];
  const selectedOutletData = NATIONAL_OUTLETS.find((o) => o.id === selectedOutletId) || NATIONAL_OUTLETS[0];

  // 3D Background State (requested by user)
  const [threeDBackground, setThreeDBackground] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('threed_background_state');
      return saved !== null ? saved === 'true' : true;
    } catch {
      return true;
    }
  });

  const toggleThreeDBackground = () => {
    setThreeDBackground((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('threed_background_state', String(next));
      } catch {}
      return next;
    });
  };

  // 7-Color Animated Running Border State (requested by user)
  const [sevenColorBorder, setSevenColorBorder] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('seven_color_border_state');
      return saved !== null ? saved === 'true' : true;
    } catch {
      return true;
    }
  });

  const toggleSevenColorBorder = () => {
    setSevenColorBorder((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('seven_color_border_state', String(next));
      } catch {}
      return next;
    });
  };

  // Cart state with localStorage initialization
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('pizza_paradise_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modal states
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(null);
  const [isCustomizeModalOpen, setIsCustomizeModalOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  
  // Active Order and Tracker state
  const [activeOrder, setActiveOrder] = useState<OrderDetails | null>(() => {
    try {
      const savedOrder = localStorage.getItem('pizza_paradise_last_order');
      return savedOrder ? JSON.parse(savedOrder) : null;
    } catch {
      return null;
    }
  });

  // Coupon state
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discountAmount: number } | null>(null);

  // Persist cart
  useEffect(() => {
    try {
      localStorage.setItem('pizza_paradise_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Error saving cart', e);
    }
  }, [cartItems]);

  // Cart calculations
  const cartSubtotal = cartItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Recalculate coupon discount when subtotal changes
  useEffect(() => {
    if (appliedCoupon) {
      if (appliedCoupon.code === 'PARADISE15') {
        setAppliedCoupon({ code: 'PARADISE15', discountAmount: Math.round(cartSubtotal * 0.15) });
      } else if (appliedCoupon.code === 'PARADISE20') {
        setAppliedCoupon({ code: 'PARADISE20', discountAmount: Math.round(cartSubtotal * 0.20) });
      } else if (appliedCoupon.code === 'HOTLINE786') {
        setAppliedCoupon({ code: 'HOTLINE786', discountAmount: 200 });
      }
    }
  }, [cartSubtotal]);

  // Navigation helper
  const handleNavigate = (page: PageId, category?: CategoryId) => {
    setActivePage(page);
    if (category) {
      setActiveCategory(category);
    }
    window.scrollTo(0, 0);
    if ('scrollBehavior' in document.documentElement.style) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    }
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  // Cart actions
  const handleAddToCart = (newItem: CartItem) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.name === newItem.name &&
          item.selectedSize === newItem.selectedSize &&
          item.selectedCrust === newItem.selectedCrust &&
          item.selectedSpice === newItem.selectedSpice &&
          JSON.stringify(item.selectedAddons) === JSON.stringify(newItem.selectedAddons) &&
          item.specialInstructions === newItem.specialInstructions
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += newItem.quantity;
        return updated;
      }
      return [...prev, newItem];
    });
  };

  const handleAddToCartDirect = (item: MenuItem) => {
    if (item.sizes?.length || item.crusts?.length) {
      setSelectedMenuItem(item);
      setIsCustomizeModalOpen(true);
      return;
    }

    const defaultCartItem: CartItem = {
      cartItemId: `${item.id}-${Date.now()}`,
      menuItem: item,
      name: item.name,
      unitPrice: item.price,
      quantity: 1,
      image: item.image,
    };
    handleAddToCart(defaultCartItem);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
    setAppliedCoupon(null);
  };

  const handleApplyCoupon = (code: string): boolean => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'PARADISE15') {
      setAppliedCoupon({ code: 'PARADISE15', discountAmount: Math.round(cartSubtotal * 0.15) });
      return true;
    }
    if (cleanCode === 'PARADISE20') {
      setAppliedCoupon({ code: 'PARADISE20', discountAmount: Math.round(cartSubtotal * 0.20) });
      return true;
    }
    if (cleanCode === 'HOTLINE786') {
      setAppliedCoupon({ code: 'HOTLINE786', discountAmount: 200 });
      return true;
    }
    return false;
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
  };

  const handleSelectItemForCustomization = (item: MenuItem) => {
    setSelectedMenuItem(item);
    setIsCustomizeModalOpen(true);
  };

  const handleOrderPlaced = (newOrder: OrderDetails) => {
    setActiveOrder(newOrder);
    try {
      localStorage.setItem('pizza_paradise_last_order', JSON.stringify(newOrder));
    } catch {}

    setCartItems([]);
    setAppliedCoupon(null);
    setIsCheckoutOpen(false);

    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#DC2626', '#F59E0B', '#10B981', '#ffffff'],
      });
    } catch {}

    // Navigate to live track order page
    setActivePage('track-order');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`relative min-h-screen text-stone-100 flex flex-col font-sans selection:bg-amber-500 selection:text-black ${
      sevenColorBorder ? 'seven-color-active' : 'seven-color-inactive-site'
    }`}>
      
      {/* 3D Atmospheric Video Background Layer (Real 3D Pizza & Hearth) */}
      <ThreeDVideoBackground isEnabled={threeDBackground} />

      {/* App Content Layer */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Unified Single Top Navbar */}
      <Navbar
        activePage={activePage}
        onNavigate={handleNavigate}
        cartCount={cartCount}
        cartTotal={cartSubtotal}
        onOpenCart={() => setIsCartOpen(true)}
        orderMode={orderMode}
        onToggleOrderMode={setOrderMode}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeOrder={activeOrder}
        sevenColorBorder={sevenColorBorder}
        onToggleSevenColorBorder={toggleSevenColorBorder}
        threeDBackground={threeDBackground}
        onToggleThreeDBackground={toggleThreeDBackground}
        selectedCityName={selectedCityData?.name}
        selectedOutletName={selectedOutletData?.name}
        onOpenCitySelector={() => setIsCityModalOpen(true)}
      />

      {/* National Live Network Operations Ribbon */}
      <div className="bg-gradient-to-r from-emerald-950 via-stone-950 to-amber-950 border-b border-stone-800/80 py-1.5 px-4 overflow-hidden shadow-inner text-[11px] text-stone-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400">
              Live Network Status:
            </span>
            <span className="text-white font-bold hidden sm:inline">
              All 32 Flagship Kitchens Online & Stone-Baking
            </span>
          </div>

          <div className="hidden md:flex items-center gap-4 text-stone-400 font-medium">
            <span className="flex items-center gap-1 text-amber-300">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>100% Halal Certified</span>
            </span>
            <span className="text-stone-700">•</span>
            <span className="flex items-center gap-1 text-cyan-300">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>30-Min Heat Vault Dispatch</span>
            </span>
            <span className="text-stone-700">•</span>
            <span className="text-stone-300">
              Serving <strong className="text-amber-400">{selectedCityData?.name || 'Karachi'}</strong> & 8+ Cities
            </span>
          </div>

          <div className="flex items-center gap-2.5 text-[11px]">
            <button 
              onClick={() => setIsCityModalOpen(true)}
              className="text-amber-400 hover:text-amber-300 font-bold underline cursor-pointer flex items-center gap-1"
            >
              <MapPin className="w-3 h-3" />
              <span>Select Outlet</span>
            </button>
            <span className="text-stone-700">|</span>
            <button 
              onClick={() => handleNavigate('branches')}
              className="text-stone-300 hover:text-white font-medium cursor-pointer"
            >
              Store Directory
            </button>
          </div>
        </div>
      </div>

      {/* Floating Active Order Tracker Banner if customer has an ongoing order */}
      {activeOrder && activePage !== 'track-order' && (
        <div className="bg-amber-500 text-stone-950 py-2 px-4 shadow-md text-xs font-black flex items-center justify-between z-30">
          <div className="flex items-center gap-2 max-w-7xl mx-auto w-full justify-between">
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
              Active Order #{activeOrder.id} is baking in the stone oven!
            </span>
            <button
              onClick={() => handleNavigate('track-order')}
              className="bg-stone-950 text-amber-400 px-3 py-1 rounded-full text-xs hover:bg-stone-900 transition flex items-center gap-1 font-bold"
            >
              <span>Track Live Status</span>
              <span>➔</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Pages Switcher */}
      <main className="flex-1">
        {activePage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onSelectItem={handleSelectItemForCustomization}
            onAddToCartDirect={handleAddToCartDirect}
            selectedCityName={selectedCityData?.name}
            selectedOutletName={selectedOutletData?.name}
            onOpenCitySelector={() => setIsCityModalOpen(true)}
            onSelectCityDirect={handleSelectCity}
          />
        )}

        {activePage === 'menu' && (
          <MenuPage
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onSelectItem={handleSelectItemForCustomization}
            onAddToCartDirect={handleAddToCartDirect}
            onNavigate={handleNavigate}
          />
        )}

        {activePage === 'deals' && (
          <DealsPage
            onSelectItem={handleSelectItemForCustomization}
            onAddToCartDirect={handleAddToCartDirect}
            onApplyCouponCode={handleApplyCoupon}
            onNavigate={handleNavigate}
          />
        )}

        {activePage === 'builder' && (
          <PizzaLabPage
            onAddCustomPizzaToCart={(customPizza) => {
              handleAddToCart(customPizza);
              setIsCartOpen(true);
            }}
            onNavigate={handleNavigate}
          />
        )}

        {activePage === 'reservation' && (
          <ReservationPage onNavigate={handleNavigate} />
        )}


        {activePage === 'branches' && (
          <BranchPage
            onNavigate={handleNavigate}
            onSelectCityDirect={(cityId, outletId) => {
              handleSelectCity(cityId, outletId);
            }}
          />
        )}

        {activePage === 'track-order' && (
          <TrackOrderPage
            activeOrder={activeOrder}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Unified Footer */}
      <Footer
        onNavigate={handleNavigate}
        selectedCityName={selectedCityData?.name}
        selectedOutletName={selectedOutletData?.name}
        onOpenCitySelector={() => setIsCityModalOpen(true)}
      />

      {/* Item Customization Modal */}
      <ItemCustomizeModal
        item={selectedMenuItem}
        isOpen={isCustomizeModalOpen}
        onClose={() => {
          setIsCustomizeModalOpen(false);
          setSelectedMenuItem(null);
        }}
        onAddToCart={(cartItem) => {
          handleAddToCart(cartItem);
          setIsCartOpen(true);
        }}
      />

      {/* Cart Slide-over Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        orderMode={orderMode}
        appliedCoupon={appliedCoupon}
        onApplyCoupon={handleApplyCoupon}
        onRemoveCoupon={handleRemoveCoupon}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        orderMode={orderMode}
        appliedCoupon={appliedCoupon}
        onOrderPlaced={handleOrderPlaced}
      />

      {/* Nationwide City & Branch Selector Modal */}
      <CitySelectorModal
        isOpen={isCityModalOpen}
        onClose={() => setIsCityModalOpen(false)}
        selectedCityId={selectedCityId}
        selectedOutletId={selectedOutletId}
        onSelectCity={(cityId, outletId) => {
          handleSelectCity(cityId, outletId);
          setIsCityModalOpen(false);
        }}
      />

      {/* Floating Display Controls Widget Dock (3D Background & 7-Color Border) */}
      <div className="fixed bottom-6 left-6 z-40 flex flex-col sm:flex-row items-start sm:items-center gap-2.5">
        <ThreeDBackgroundToggle
          isEnabled={threeDBackground}
          onToggle={toggleThreeDBackground}
          id="floating-threed-bg-toggle"
          className="shadow-2xl hover:scale-105"
        />
        <SevenColorBorderToggle
          isEnabled={sevenColorBorder}
          onToggle={toggleSevenColorBorder}
          id="floating-seven-color-toggle"
          className="shadow-2xl hover:scale-105"
        />
      </div>

      {/* Instant Direct Scroll-to-Top Floating Button */}
      <ScrollToTopButton />

      </div>
    </div>
  );
}
