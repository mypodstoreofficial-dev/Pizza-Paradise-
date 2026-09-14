import React, { useState } from 'react';
import { MapPin, X, Check, Building2, Phone, Clock, ArrowRight, ShieldCheck, Search } from 'lucide-react';
import { NATIONAL_CITIES, NATIONAL_OUTLETS, NationalOutlet } from '../data/nationalData';

interface CitySelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCityId: string;
  onSelectCity: (cityId: string, outletId?: string) => void;
  selectedOutletId?: string;
}

export const CitySelectorModal: React.FC<CitySelectorModalProps> = ({
  isOpen,
  onClose,
  selectedCityId,
  onSelectCity,
  selectedOutletId,
}) => {
  const [activeCityTab, setActiveCityTab] = useState<string>(selectedCityId || 'karachi');
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const currentCityOutlets = NATIONAL_OUTLETS.filter((o) => o.cityId === activeCityTab);
  const filteredOutlets = currentCityOutlets.filter(
    (o) => 
      o.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.landmark.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedCityObj = NATIONAL_CITIES.find((c) => c.id === activeCityTab);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="bg-stone-950 border border-amber-500/40 rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-stone-800 flex items-center justify-between bg-gradient-to-r from-red-950/40 via-stone-900 to-amber-950/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-red-600 flex items-center justify-center text-stone-950 shadow-md">
              <MapPin className="w-5 h-5 fill-stone-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-950 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full">
                  🇵🇰 Nationwide Network
                </span>
                <span className="text-xs text-stone-400">12+ Cities Covered</span>
              </div>
              <h3 className="text-lg font-black text-white font-serif">
                Select Your City & Nearest Outlet
              </h3>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* City Selection Pills */}
        <div className="p-4 border-b border-stone-800 bg-stone-900/50">
          <label className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block mb-2">
            Select Your Delivery City:
          </label>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
            {NATIONAL_CITIES.map((city) => {
              const isSelected = city.id === activeCityTab;
              return (
                <button
                  key={city.id}
                  onClick={() => {
                    setActiveCityTab(city.id);
                    setSearchQuery('');
                  }}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-amber-500 text-stone-950 shadow-lg shadow-amber-500/20 font-black'
                      : 'bg-stone-950 text-stone-300 hover:bg-stone-800 border border-stone-800'
                  }`}
                >
                  <span>{city.name}</span>
                  <span className="text-[10px] opacity-75 font-urdu">({city.urduName})</span>
                  <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-mono ${
                    isSelected ? 'bg-stone-950/30 text-stone-950' : 'bg-stone-800 text-stone-400'
                  }`}>
                    {city.outletsCount}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Search inside selected city */}
        <div className="p-4 pb-2">
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={`Search area or outlet in ${selectedCityObj?.name || 'city'}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-stone-900 border border-stone-700 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder:text-stone-500 focus:outline-none focus:border-amber-500 transition"
            />
          </div>
        </div>

        {/* Outlets List */}
        <div className="p-4 overflow-y-auto max-h-80 space-y-3">
          <div className="flex items-center justify-between text-xs text-stone-400 px-1">
            <span>Available Outlets in {selectedCityObj?.name}:</span>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              All Open for Delivery & Dine-In
            </span>
          </div>

          {filteredOutlets.length === 0 ? (
            <div className="text-center py-8 text-stone-400 text-xs">
              No outlets found matching "{searchQuery}". Showing all outlets in {selectedCityObj?.name}.
            </div>
          ) : (
            filteredOutlets.map((outlet) => {
              const isCurrentSelected = selectedOutletId === outlet.id;
              return (
                <div
                  key={outlet.id}
                  onClick={() => {
                    onSelectCity(outlet.cityId, outlet.id);
                    onClose();
                  }}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer group flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    isCurrentSelected
                      ? 'bg-amber-950/30 border-amber-500 shadow-md'
                      : 'bg-stone-900/60 border-stone-800 hover:border-amber-500/60 hover:bg-stone-900'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-white group-hover:text-amber-400 transition">
                        {outlet.name}
                      </h4>
                      {outlet.isFlagship && (
                        <span className="text-[9px] font-black uppercase tracking-wider bg-red-950 text-red-400 border border-red-800 px-2 py-0.5 rounded-md">
                          Flagship Store
                        </span>
                      )}
                      {isCurrentSelected && (
                        <span className="text-[9px] font-black uppercase tracking-wider bg-amber-500 text-stone-950 px-2 py-0.5 rounded-md flex items-center gap-1">
                          <Check className="w-3 h-3" /> Active Store
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-stone-300">
                      {outlet.address}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 text-[11px] text-stone-400 pt-0.5">
                      <span className="flex items-center gap-1 text-emerald-400">
                        <Clock className="w-3 h-3" /> {outlet.timing}
                      </span>
                      <span className="flex items-center gap-1 text-amber-300">
                        <Phone className="w-3 h-3" /> {outlet.phone}
                      </span>
                      <span className="text-stone-500">
                        • {outlet.dineInCapacity}
                      </span>
                    </div>
                  </div>

                  <div className="shrink-0 flex sm:flex-col items-center sm:items-end justify-between gap-2">
                    <button
                      type="button"
                      className="text-xs font-black px-4 py-2 rounded-xl bg-amber-500 group-hover:bg-amber-400 text-stone-950 transition flex items-center gap-1.5 shadow"
                    >
                      <span>Select This Outlet</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info note */}
        <div className="p-3.5 bg-stone-900 border-t border-stone-800 text-[11px] text-stone-400 flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-stone-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            30-40 mins doorstep delivery guaranteed from nearest regional outlet
          </span>
          <span className="font-bold text-amber-400">
            UAN: 03-111-786-676
          </span>
        </div>
      </div>
    </div>
  );
};
