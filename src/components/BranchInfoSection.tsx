import React from 'react';
import { 
  MapPin, 
  Phone, 
  Clock, 
  Car, 
  Wifi, 
  Users, 
  Sparkles, 
  UtensilsCrossed, 
  CalendarDays,
  ShieldCheck,
  Flame,
  PhoneCall,
  ExternalLink
} from 'lucide-react';
import { STORE_INFO, BRANCH_AMENITIES } from '../data/menuData';

interface BranchInfoSectionProps {
  onOpenReservation: () => void;
}

export const BranchInfoSection: React.FC<BranchInfoSectionProps> = ({
  onOpenReservation,
}) => {
  return (
    <section id="branch-location" className="py-16 bg-stone-950 border-b border-stone-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 bg-red-950/80 border border-red-800 text-red-400 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-3">
            <MapPin className="w-3.5 h-3.5 fill-red-400" />
            <span>Visit Us In Person</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-serif">
            Pizza Paradise Main Branch
          </h2>
          <p className="text-sm sm:text-base text-stone-400 mt-2">
            Experience our vibrant dining hall, fresh aroma of stone ovens, and friendly family atmosphere.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Visual representation matching the physical building with facade details */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            
            {/* Building Banner Card with authentic architectural representation */}
            <div className="relative rounded-3xl overflow-hidden bg-stone-900 border-2 border-stone-800 shadow-2xl p-6 space-y-6">
              
              {/* Branch Facade Header Box (matching the building sign from photo) */}
              <div className="bg-stone-950 border border-stone-700 rounded-2xl p-4 shadow-inner">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-800 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Branch Open Now (12 PM – 3:30 AM)</span>
                  </div>
                  <span className="text-[11px] font-mono text-stone-400">Ground Floor • Landmark: Fitness Hub</span>
                </div>

                {/* Simulated Signboard Banner */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4 bg-gradient-to-r from-stone-900 via-stone-950 to-stone-900 p-4 rounded-xl border border-stone-800">
                  
                  {/* Category billboard */}
                  <div className="bg-black/80 px-3 py-1.5 rounded-lg border border-stone-700 text-[11px] font-black tracking-widest text-white uppercase">
                    PIZZA - PASTA - BURGER
                  </div>

                  {/* Center Logo */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-extrabold text-amber-400 bg-amber-950 px-1.5 py-0.5 rounded border border-amber-500/30">PIZZA</span>
                    <span className="text-xl font-black text-red-500 font-serif tracking-tight">PARAD</span>
                    <span className="text-emerald-400 -mt-1 font-bold text-xl">🌴</span>
                    <span className="text-xl font-black text-red-500 font-serif tracking-tight">SE</span>
                  </div>

                  {/* Hotline sign */}
                  <a
                    href={`tel:${STORE_INFO.hotlineRaw}`}
                    className="bg-amber-400 hover:bg-amber-300 text-stone-950 px-3 py-1.5 rounded-lg text-xs font-black tracking-wider transition flex items-center gap-1 shadow"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>03-111-786-676</span>
                  </a>

                </div>
              </div>

              {/* Map & Location Interactive View */}
              <div className="bg-stone-950 rounded-2xl border border-stone-800 p-4 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-red-400 shrink-0" />
                      Pizza Paradise Flagship Store
                    </h4>
                    <p className="text-xs text-stone-400">
                      {STORE_INFO.address}
                    </p>
                  </div>

                  <a
                    href={`https://maps.google.com/?q=Pizza+Paradise`}
                    target="_blank"
                    rel="noreferrer"
                    className="shrink-0 flex items-center gap-1 text-xs font-bold text-amber-400 hover:text-amber-300 bg-stone-900 border border-stone-800 px-3 py-1.5 rounded-xl transition"
                  >
                    <span>Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* Simulated stylized map view with pin */}
                <div className="relative h-44 rounded-xl overflow-hidden bg-stone-900 border border-stone-800 flex items-center justify-center">
                  <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:16px_16px]" />
                  
                  <div className="relative z-10 flex flex-col items-center gap-2 bg-stone-950/90 border border-amber-500/50 p-3.5 rounded-2xl shadow-xl">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                      <span>Pizza Paradise Location</span>
                    </div>
                    <span className="text-[11px] text-stone-300 text-center">
                      Ground Floor, Main Commercial Center
                    </span>
                    <span className="text-[10px] text-emerald-400 font-mono">Delivery Radius: 12 km</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons for Dine-in & Reservation */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={onOpenReservation}
                  className="flex-1 flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs py-3 rounded-xl shadow-md transition"
                >
                  <CalendarDays className="w-4 h-4" />
                  <span>Reserve Table or Family Booth</span>
                </button>

                <a
                  href={`tel:${STORE_INFO.hotlineRaw}`}
                  className="flex-1 flex items-center justify-center gap-2 bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold text-xs py-3 rounded-xl transition"
                >
                  <PhoneCall className="w-4 h-4 text-emerald-400" />
                  <span>Hotline: {STORE_INFO.hotline}</span>
                </a>
              </div>

            </div>

          </div>

          {/* Right Column: Branch Amenities & Timings */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Opening Hours Card */}
            <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-serif">Operating Hours</h3>
                  <span className="text-xs text-stone-400">Open all 7 days of the week</span>
                </div>
              </div>

              <div className="space-y-2 text-xs border-t border-stone-800 pt-3">
                <div className="flex justify-between py-1 border-b border-stone-800/60">
                  <span className="text-stone-300">Monday – Thursday:</span>
                  <span className="font-mono font-bold text-amber-400">12:00 PM – 3:30 AM</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-800/60">
                  <span className="text-stone-300">Friday (After Jummah):</span>
                  <span className="font-mono font-bold text-amber-400">2:00 PM – 4:00 AM</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-800/60">
                  <span className="text-stone-300">Saturday & Sunday:</span>
                  <span className="font-mono font-bold text-amber-400">12:00 PM – 4:00 AM</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-stone-300">Midnight Delivery Hotline:</span>
                  <span className="font-mono font-bold text-emerald-400">Till 3:30 AM</span>
                </div>
              </div>
            </div>

            {/* Branch Amenities Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {BRANCH_AMENITIES.map((am, i) => (
                <div
                  key={i}
                  className="bg-stone-900/80 border border-stone-800/90 rounded-2xl p-4 space-y-1.5 shadow"
                >
                  <h5 className="text-xs font-black text-white flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    {am.title}
                  </h5>
                  <p className="text-[11px] text-stone-400 leading-relaxed">
                    {am.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
