import React, { useState, useEffect } from 'react';
import { Sparkles, Flame, Clock, Check, Plus, Tag, ArrowRight } from 'lucide-react';
import { MenuItem } from '../types';

interface DealsSectionProps {
  deals: MenuItem[];
  onSelectItem: (item: MenuItem) => void;
  onAddToCartDirect: (item: MenuItem) => void;
}

export const DealsSection: React.FC<DealsSectionProps> = ({
  deals,
  onSelectItem,
  onAddToCartDirect,
}) => {
  // Simple countdown timer for today's deal urgency
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 28, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 5, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="mega-deals" className="py-12 bg-stone-900/60 border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-red-950/80 border border-red-800 text-red-400 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-2">
              <Flame className="w-3.5 h-3.5 fill-red-400" />
              <span>Unbeatable Savings</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white font-serif">
              Paradise Mega Combos & Deals
            </h2>
            <p className="text-sm text-stone-400 mt-1">
              Bundle your favorite pizzas, burgers, pastas, and drinks at huge discounted prices!
            </p>
          </div>

          {/* Deal of the Day Urgency Banner */}
          <div className="bg-stone-950 border border-amber-500/40 px-4 py-2.5 rounded-2xl flex items-center gap-3 shadow-lg">
            <Clock className="w-5 h-5 text-amber-400 animate-spin" style={{ animationDuration: '8s' }} />
            <div>
              <div className="text-[10px] uppercase font-extrabold text-amber-400">Midnight & Daily Deals Reset In:</div>
              <div className="text-sm font-mono font-black text-white">
                {String(timeLeft.hours).padStart(2, '0')}h : {String(timeLeft.minutes).padStart(2, '0')}m : {String(timeLeft.seconds).padStart(2, '0')}s
              </div>
            </div>
          </div>
        </div>

        {/* Deals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {deals.map((deal) => {
            const savings = deal.originalPrice ? deal.originalPrice - deal.price : null;

            return (
              <div
                key={deal.id}
                className="group relative flex flex-col bg-stone-950 border border-stone-800 hover:border-amber-500/60 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300"
              >
                {/* Deal Image with Discount Ribbon */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={deal.image}
                    alt={deal.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />
                  
                  {savings && (
                    <div className="absolute top-3 left-3 bg-red-600 text-white font-black text-xs px-2.5 py-1 rounded-xl shadow-md flex items-center gap-1">
                      <Tag className="w-3 h-3" />
                      Save Rs. {savings.toLocaleString()}
                    </div>
                  )}

                  <div className="absolute top-3 right-3 bg-stone-900/90 text-amber-400 text-[11px] font-extrabold px-2 py-0.5 rounded-lg border border-stone-700">
                    ★ {deal.rating}
                  </div>
                </div>

                {/* Deal Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-black text-white group-hover:text-amber-400 transition-colors font-serif leading-tight">
                      {deal.name}
                    </h3>
                    {deal.urduName && (
                      <p className="text-xs text-stone-500 font-sans mt-0.5">{deal.urduName}</p>
                    )}
                    
                    <p className="text-xs text-stone-400 mt-2 line-clamp-2 leading-relaxed">
                      {deal.description}
                    </p>

                    {/* Includes checklist */}
                    {deal.dealIncludes && (
                      <div className="mt-3 pt-3 border-t border-stone-800/80 space-y-1.5">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-amber-500">Includes:</span>
                        <ul className="text-xs text-stone-300 space-y-1">
                          {deal.dealIncludes.map((inc, i) => (
                            <li key={i} className="flex items-center gap-1.5">
                              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                              <span className="truncate">{inc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Price & Action */}
                  <div className="pt-4 mt-4 border-t border-stone-800 flex items-center justify-between gap-2">
                    <div>
                      {deal.originalPrice && (
                        <div className="text-xs text-stone-500 line-through">
                          Rs. {deal.originalPrice.toLocaleString()}
                        </div>
                      )}
                      <div className="text-xl font-black text-amber-400">
                        Rs. {deal.price.toLocaleString()}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => onSelectItem(deal)}
                        className="px-3 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-200 hover:text-white border border-stone-700 text-xs font-bold transition"
                        title="Customize Deal"
                      >
                        Customize
                      </button>
                      <button
                        onClick={() => onAddToCartDirect(deal)}
                        className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs transition shadow-md flex items-center gap-1"
                        title="Add to Cart"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
