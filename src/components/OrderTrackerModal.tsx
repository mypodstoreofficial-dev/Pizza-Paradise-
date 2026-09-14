import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  Flame, 
  Package, 
  Truck, 
  MapPin, 
  Phone, 
  X, 
  ShoppingBag, 
  Sparkles,
  PhoneCall
} from 'lucide-react';
import { OrderDetails } from '../types';
import { STORE_INFO } from '../data/menuData';

interface OrderTrackerModalProps {
  order: OrderDetails | null;
  isOpen: boolean;
  onClose: () => void;
}

export const OrderTrackerModal: React.FC<OrderTrackerModalProps> = ({
  order,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !order) return null;

  const [currentStage, setCurrentStage] = useState<number>(1);
  const [minutesRemaining, setMinutesRemaining] = useState<number>(order.estimatedMinutes || 35);

  // Progressive simulated timer for realistic order tracking
  useEffect(() => {
    const stageTimer1 = setTimeout(() => setCurrentStage(2), 5000);
    const stageTimer2 = setTimeout(() => setCurrentStage(3), 15000);
    const stageTimer3 = setTimeout(() => setCurrentStage(4), 28000);

    const minInterval = setInterval(() => {
      setMinutesRemaining((prev) => (prev > 1 ? prev - 1 : 1));
    }, 60000);

    return () => {
      clearTimeout(stageTimer1);
      clearTimeout(stageTimer2);
      clearTimeout(stageTimer3);
      clearInterval(minInterval);
    };
  }, [order.id]);

  const stages = [
    {
      step: 1,
      title: 'Order Confirmed',
      desc: 'Ticket sent to kitchen screen & oven prepared',
      icon: CheckCircle2,
      time: 'Just now',
    },
    {
      step: 2,
      title: 'Baking in Stone Oven',
      desc: 'Dough stretched, cheese bubbling, patties sizzling',
      icon: Flame,
      time: 'In progress',
    },
    {
      step: 3,
      title: 'Quality Check & Packed',
      desc: 'Packed in thermal insulated bag with sauces & tissues',
      icon: Package,
      time: 'Approx 15 mins',
    },
    {
      step: 4,
      title: order.orderType === 'delivery' ? 'Rider On The Way' : 'Ready for Pickup / Serving',
      desc: order.orderType === 'delivery' ? 'Rider heading to your address' : 'Order ready at the counter / table',
      icon: order.orderType === 'delivery' ? Truck : ShoppingBag,
      time: 'Final Stage',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative bg-stone-900 border border-stone-700 rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-red-950 via-stone-950 to-amber-950 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Clock className="w-5 h-5 animate-spin" style={{ animationDuration: '10s' }} />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-400">Live Tracker</span>
              <h3 className="text-lg font-black text-white font-serif">Order #{order.id}</h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tracker Body */}
        <div className="p-6 space-y-6 flex-1">
          
          {/* Estimated Time Card */}
          <div className="bg-stone-950 border border-amber-500/30 p-5 rounded-3xl text-center space-y-2 relative overflow-hidden">
            <div className="text-xs font-black uppercase tracking-wider text-stone-400">
              Estimated Delivery / Preparation Time
            </div>
            <div className="text-4xl font-black text-amber-400 font-mono">
              ~{minutesRemaining} Mins
            </div>
            <p className="text-xs text-stone-300">
              Hotline Support: <a href={`tel:${STORE_INFO.hotlineRaw}`} className="text-amber-400 font-bold underline">{STORE_INFO.hotline}</a>
            </p>
          </div>

          {/* Stepper Progression */}
          <div className="space-y-4 relative">
            <div className="space-y-6">
              {stages.map((stage) => {
                const isCompleted = currentStage >= stage.step;
                const isCurrent = currentStage === stage.step;
                const Icon = stage.icon;

                return (
                  <div key={stage.step} className="flex items-start gap-4">
                    <div
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 border transition-all ${
                        isCompleted
                          ? 'bg-amber-500 border-amber-400 text-stone-950 shadow-md shadow-amber-500/20'
                          : 'bg-stone-950 border-stone-800 text-stone-600'
                      } ${isCurrent ? 'ring-4 ring-amber-500/20 scale-105' : ''}`}
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

          {/* Delivery & Customer Summary */}
          <div className="bg-stone-950 border border-stone-800 p-4 rounded-2xl space-y-2.5 text-xs text-stone-300">
            <div className="font-bold text-amber-400 text-[11px] uppercase tracking-wider">
              Order Receipt Details
            </div>
            <div className="flex justify-between">
              <span>Customer:</span>
              <span className="font-semibold text-white">{order.customerName} ({order.customerPhone})</span>
            </div>
            {order.deliveryAddress && (
              <div className="flex justify-between">
                <span>Address:</span>
                <span className="font-semibold text-white text-right max-w-xs">{order.deliveryAddress} ({order.areaZone})</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Payment:</span>
              <span className="font-semibold text-white uppercase">{order.paymentMethod}</span>
            </div>
            <div className="flex justify-between border-t border-stone-800 pt-2 font-bold text-white">
              <span>Total Amount:</span>
              <span className="text-amber-400 font-mono text-sm">Rs. {order.total.toLocaleString()}</span>
            </div>
          </div>

          {/* Ordered Items quick list */}
          <div className="space-y-1.5 text-xs">
            <span className="text-[11px] font-bold text-stone-400 uppercase">Items Ordered:</span>
            {order.items.map((it, idx) => (
              <div key={idx} className="flex justify-between text-stone-300 bg-stone-950/60 p-2 rounded-xl border border-stone-800/80">
                <span>{it.quantity}x {it.name} {it.selectedSize ? `(${it.selectedSize})` : ''}</span>
                <span className="font-mono text-amber-400">Rs. {(it.unitPrice * it.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>

        </div>

        {/* Footer actions */}
        <div className="p-5 bg-stone-950 border-t border-stone-800 flex items-center justify-between gap-3">
          <a
            href={`tel:${STORE_INFO.hotlineRaw}`}
            className="flex-1 flex items-center justify-center gap-2 bg-stone-900 hover:bg-stone-800 text-amber-300 border border-stone-700 py-3 rounded-xl text-xs font-bold transition"
          >
            <PhoneCall className="w-4 h-4 text-emerald-400" />
            <span>Call Hotline {STORE_INFO.hotline}</span>
          </a>

          <button
            onClick={onClose}
            className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-black transition"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
