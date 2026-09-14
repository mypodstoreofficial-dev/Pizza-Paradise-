import React from 'react';
import { Star, Quote, Heart, CheckCircle2 } from 'lucide-react';
import { TESTIMONIALS } from '../data/menuData';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-16 bg-stone-900/60 border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-black uppercase tracking-wider text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            Loved By Thousands Of Foodies
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white font-serif mt-3">
            What Our Paradise Customers Say
          </h2>
          <p className="text-sm text-stone-400 mt-2">
            Read real feedback from our dine-in guests and delivery lovers across the city.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((test) => (
            <div
              key={test.id}
              className="bg-stone-950 border border-stone-800 rounded-3xl p-6 relative flex flex-col justify-between shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-400 gap-1">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-stone-500">{test.date}</span>
                </div>

                <Quote className="w-8 h-8 text-stone-700/60 mb-2 -ml-1" />

                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed italic">
                  "{test.comment}"
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-stone-800 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white flex items-center gap-1">
                    <span>{test.name}</span>
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  </h4>
                  <span className="text-[10px] text-stone-400">{test.role}</span>
                </div>

                <span className="text-[10px] bg-stone-900 border border-stone-800 text-amber-400 font-semibold px-2 py-0.5 rounded-lg">
                  {test.branch}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
