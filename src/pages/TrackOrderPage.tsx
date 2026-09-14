import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Flame, 
  Package, 
  Truck, 
  ShoppingBag, 
  CheckCircle2, 
  Search, 
  PhoneCall, 
  MapPin, 
  Receipt,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { OrderDetails, PageId } from '../types';
import { STORE_INFO } from '../data/menuData';
import { ReturnToHomeButton } from '../components/ReturnToHomeButton';

interface TrackOrderPageProps {

  activeOrder: OrderDetails | null;
  onNavigate: (page: PageId) => void;
}

export const TrackOrderPage: React.FC<TrackOrderPageProps> = ({
  activeOrder,
  onNavigate,
}) => {
  const [searchId, setSearchId] = useState('');
  const [displayedOrder, setDisplayedOrder] = useState<OrderDetails | null>(activeOrder);
  const [currentStage, setCurrentStage] = useState<number>(2);
  const [minutesRemaining, setMinutesRemaining] = useState<number>(25);

  useEffect(() => {
    if (activeOrder) {
      setDisplayedOrder(activeOrder);
      setMinutesRemaining(activeOrder.estimatedMinutes || 30);
    }
  }, [activeOrder]);

  // Progressive simulated timer
  useEffect(() => {
    const stageTimer1 = setTimeout(() => setCurrentStage(2), 4000);
    const stageTimer2 = setTimeout(() => setCurrentStage(3), 14000);
    const stageTimer3 = setTimeout(() => setCurrentStage(4), 26000);

    const minInterval = setInterval(() => {
      setMinutesRemaining((prev) => (prev > 1 ? prev - 1 : 1));
    }, 60000);

    return () => {
      clearTimeout(stageTimer1);
      clearTimeout(stageTimer2);
      clearTimeout(stageTimer3);
      clearInterval(minInterval);
    };
  }, [displayedOrder?.id]);

  const handleSearchOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchId.trim()) return;

    // Check if matches active order or simulate a valid order
    if (activeOrder && activeOrder.id.toLowerCase().includes(searchId.toLowerCase())) {
      setDisplayedOrder(activeOrder);
    } else {
      // Generate realistic lookup result
      const mockLookupOrder: OrderDetails = {
        id: searchId.toUpperCase(),
        customerName: 'Valued Foodie Customer',
        customerPhone: '0300-XXXXXXX',
        orderType: 'delivery',
        deliveryAddress: 'House #42, Street 8, Block B',
        areaZone: 'Bahria Town Phase 4',
        paymentMethod: 'cash',
        items: [
          {
            cartItemId: '1',
            name: 'Paradise Crown Crust Pizza (Large 13")',
            selectedSize: 'Large 13"',
            selectedCrust: 'Cheesy Crown Crust',
            unitPrice: 1899,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
          },
          {
            cartItemId: '2',
            name: 'Monster Double Zinger Burger',
            unitPrice: 749,
            quantity: 2,
            image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
          },
        ],
        subtotal: 3397,
        discount: 200,
        deliveryFee: 150,
        total: 3347,
        status: 'out_for_delivery',
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        estimatedMinutes: 20,
      };
      setDisplayedOrder(mockLookupOrder);
    }
  };

  const stages = [
    {
      step: 1,
      title: 'Order Confirmed & Sent to Kitchen',
      desc: 'Ticket printed at stone oven station and prep team started',
      icon: CheckCircle2,
      time: 'Completed',
    },
    {
      step: 2,
      title: 'Baking in Stone Oven',
      desc: 'Fresh dough stretched, cheese bubbling, patties sizzling',
      icon: Flame,
      time: 'In progress',
    },
    {
      step: 3,
      title: 'Quality Check & Insulated Packing',
      desc: 'Packed in thermal heat-seal box with sauces, dips & tissues',
      icon: Package,
      time: 'Next step',
    },
    {
      step: 4,
      title: displayedOrder?.orderType === 'delivery' ? 'Rider Out for Doorstep Delivery' : 'Ready at Pickup Counter',
      desc: displayedOrder?.orderType === 'delivery' ? 'Delivery rider dispatched to your address' : 'Order ready for immediate collection',
      icon: displayedOrder?.orderType === 'delivery' ? Truck : ShoppingBag,
      time: 'Final stage',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Return to Home Action Bar */}
      <div className="flex items-center justify-between pb-2 border-b border-stone-800/80">
        <ReturnToHomeButton onNavigateHome={() => onNavigate('home')} />
        <span className="text-xs text-amber-400 font-bold hidden sm:inline">
          🕒 Live stone-oven baking & rider dispatch tracking
        </span>
      </div>

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider">
          <Clock className="w-3.5 h-3.5" />
          <span>Real-Time Kitchen Sync</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-serif">
          Live Order Tracker
        </h1>
        <p className="text-sm sm:text-base text-stone-400">
          Track the live baking and delivery progress of your stone-oven pizza and burger orders.
        </p>
      </div>

      {/* Order Lookup Search Bar */}
      <div className="max-w-xl mx-auto bg-stone-950/70 backdrop-blur-md border border-white/10 p-3 rounded-2xl shadow-xl">
        <form onSubmit={handleSearchOrder} className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder="Enter Order ID (e.g. PP-8492)..."
              className="w-full bg-stone-950 border border-stone-700 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-stone-400 focus:outline-none focus:border-amber-500 font-mono transition"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-black transition shrink-0"
          >
            Track
          </button>
        </form>
      </div>

      {/* Order Content */}
      {displayedOrder ? (
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Stepper & Status */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Countdown Box with 4-color running border */}
            <div className="box-run-4colors rounded-3xl p-6 text-center space-y-2 shadow-2xl relative overflow-hidden">
              <div className="text-xs font-black uppercase tracking-wider text-stone-400">
                Estimated Delivery / Readiness
              </div>
              <div className="text-4xl sm:text-5xl font-black text-amber-400 font-mono">
                ~{minutesRemaining} Mins
              </div>
              <div className="text-xs text-stone-300">
                Order Reference: <strong className="text-white font-mono">#{displayedOrder.id}</strong>
              </div>
            </div>

            {/* Stepper Timeline */}
            <div className="bg-stone-950/70 backdrop-blur-md border border-white/10 rounded-3xl p-6 shadow-xl space-y-6">
              <h3 className="text-base font-bold text-white font-serif border-b border-stone-800 pb-3">
                Live Kitchen Stages
              </h3>

              <div className="space-y-6">
                {stages.map((stage) => {
                  const isCompleted = currentStage >= stage.step;
                  const isCurrent = currentStage === stage.step;
                  const Icon = stage.icon;

                  return (
                    <div key={stage.step} className="flex items-start gap-4">
                      <div
                        className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 border transition-all ${
                          isCompleted
                            ? 'bg-amber-500 border-amber-400 text-stone-950 shadow-md shadow-amber-500/20'
                            : 'bg-stone-950 border-stone-800 text-stone-600'
                        } ${isCurrent ? 'ring-4 ring-amber-500/20 scale-105 animate-pulse' : ''}`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>

                      <div className="flex-1 pt-0.5">
                        <div className="flex items-center justify-between">
                          <h4 className={`text-sm font-bold ${isCompleted ? 'text-white' : 'text-stone-500'}`}>
                            {stage.title}
                          </h4>
                          <span className={`text-[10px] font-mono ${isCurrent ? 'text-amber-400 font-bold' : 'text-stone-500'}`}>
                            {stage.time}
                          </span>
                        </div>
                        <p className="text-xs text-stone-400 mt-0.5">{stage.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Order Receipt & Hotline */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Receipt Summary Card */}
            <div className="card-run-4colors rounded-3xl p-6 shadow-xl space-y-4">
              <div className="flex items-center gap-2 border-b border-stone-800 pb-3">
                <Receipt className="w-4 h-4 text-amber-400" />
                <h3 className="text-base font-bold text-white font-serif">Order Details</h3>
              </div>

              <div className="space-y-2 text-xs text-stone-300">
                <div className="flex justify-between">
                  <span className="text-stone-400">Customer:</span>
                  <span className="font-semibold text-white">{displayedOrder.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Phone:</span>
                  <span className="font-semibold text-white font-mono">{displayedOrder.customerPhone}</span>
                </div>
                {displayedOrder.deliveryAddress && (
                  <div className="flex justify-between">
                    <span className="text-stone-400">Address:</span>
                    <span className="font-semibold text-white text-right max-w-xs">{displayedOrder.deliveryAddress}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-stone-400">Payment:</span>
                  <span className="font-semibold text-white uppercase">{displayedOrder.paymentMethod}</span>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-2 pt-3 border-t border-stone-800">
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">Ordered Items:</span>
                <div className="space-y-1.5 max-h-48 overflow-y-auto">
                  {displayedOrder.items.map((it, idx) => (
                    <div key={idx} className="flex justify-between text-xs bg-stone-950 p-2.5 rounded-xl border border-stone-800">
                      <div>
                        <span className="font-bold text-white">{it.quantity}x {it.name}</span>
                        {it.selectedSize && <div className="text-[10px] text-stone-400">{it.selectedSize}</div>}
                      </div>
                      <span className="font-mono text-amber-400 font-bold shrink-0 ml-2">
                        Rs. {(it.unitPrice * it.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total Row */}
              <div className="pt-3 border-t border-stone-800 flex justify-between items-center text-sm font-bold text-white">
                <span>Total Amount:</span>
                <span className="text-lg font-black text-amber-400 font-mono">
                  Rs. {displayedOrder.total.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Hotline Call Button */}
            <div className="bg-stone-950/70 backdrop-blur-md border border-white/10 rounded-3xl p-5 text-center space-y-3 shadow-xl">
              <div className="text-xs text-stone-300">
                Questions or address updates for rider?
              </div>
              <a
                href={`tel:${STORE_INFO.hotlineRaw}`}
                className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs py-3 rounded-xl transition shadow-md"
              >
                <PhoneCall className="w-4 h-4 text-stone-950" />
                <span>Call Hotline: {STORE_INFO.hotline}</span>
              </a>
            </div>

          </div>

        </div>
      ) : (
        <div className="max-w-md mx-auto text-center py-12 bg-stone-900/60 border border-stone-800 rounded-3xl p-8 space-y-4">
          <div className="w-16 h-16 rounded-full bg-stone-800 text-stone-400 mx-auto flex items-center justify-center">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-white font-serif">No Active Order Found</h3>
          <p className="text-xs text-stone-400">
            You haven't placed an order yet or entered an order ID. Browse our mouth-watering menu or deals to get started!
          </p>
          <button
            onClick={() => onNavigate('menu')}
            className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-black transition"
          >
            Explore Menu Now
          </button>
        </div>
      )}

    </div>
  );
};
