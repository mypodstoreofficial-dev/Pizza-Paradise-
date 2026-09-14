import React, { useState } from 'react';
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
  ExternalLink,
  Star,
  Quote,
  CheckCircle2,
  Search,
  Building2,
  Navigation,
  ArrowRight,
  Store,
  Truck,
  Check
} from 'lucide-react';
import { STORE_INFO, TESTIMONIALS } from '../data/menuData';
import { NATIONAL_CITIES, NATIONAL_OUTLETS, NationalOutlet } from '../data/nationalData';
import { PageId } from '../types';
import { ReturnToHomeButton } from '../components/ReturnToHomeButton';

interface BranchPageProps {
  onNavigate: (page: PageId) => void;
  onSelectCityDirect?: (cityId: string, outletId?: string) => void;
}

export const BranchPage: React.FC<BranchPageProps> = ({
  onNavigate,
  onSelectCityDirect,
}) => {
  const [selectedCityFilter, setSelectedCityFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [franchiseSubmitted, setFranchiseSubmitted] = useState(false);
  const [franchiseForm, setFranchiseForm] = useState({
    fullName: '',
    phone: '',
    city: 'Karachi',
    proposedLocation: '',
    investmentBudget: 'PKR 15M - 25M',
  });

  const filteredOutlets = NATIONAL_OUTLETS.filter((outlet) => {
    const matchesCity = selectedCityFilter === 'all' || outlet.cityId === selectedCityFilter;
    const matchesSearch = 
      outlet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      outlet.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      outlet.cityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      outlet.landmark.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCity && matchesSearch;
  });

  const handleFranchiseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFranchiseSubmitted(true);
    setTimeout(() => {
      setFranchiseSubmitted(false);
      setFranchiseForm({
        fullName: '',
        phone: '',
        city: 'Karachi',
        proposedLocation: '',
        investmentBudget: 'PKR 15M - 25M',
      });
    }, 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Return to Home Action Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-stone-800/80">
        <ReturnToHomeButton onNavigateHome={() => onNavigate('home')} />
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-black uppercase tracking-wider bg-emerald-950 text-emerald-300 border border-emerald-500/40 px-3 py-1 rounded-full flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            20+ Outlets Serving Pakistan
          </span>
        </div>
      </div>

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-950/80 to-amber-950/80 border border-amber-500/40 text-amber-300 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider">
          <Store className="w-3.5 h-3.5 text-amber-400" />
          <span>National Outlets & Store Locator</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white font-serif tracking-tight">
          Find A Paradise Outlet Near You
        </h1>
        <p className="text-sm sm:text-base text-stone-300 max-w-2xl mx-auto leading-relaxed">
          Experience our authentic stone-hearth pizzerias, executive dining lounges, and 30-minute temperature-locked delivery hubs spanning across Pakistan.
        </p>
      </div>

      {/* Flagship Showcases Carousel / Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <h3 className="text-base font-bold text-white font-serif">
              National Flagship Destinations
            </h3>
          </div>
          <span className="text-xs text-stone-400 font-mono">Dine-In • Takeaway • Delivery</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {NATIONAL_OUTLETS.filter((o) => o.isFlagship).map((flagship) => (
            <div
              key={flagship.id}
              className="bg-stone-900/90 border border-amber-500/40 rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl group hover:border-amber-400 transition"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider bg-red-600 text-white px-2.5 py-0.5 rounded-md">
                    Flagship • {flagship.cityName}
                  </span>
                  <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Open Now
                  </span>
                </div>

                <h4 className="text-xl font-black text-white font-serif group-hover:text-amber-300 transition">
                  {flagship.name}
                </h4>

                <p className="text-xs text-stone-300">
                  {flagship.address}
                </p>

                <div className="pt-2 border-t border-stone-800 space-y-1.5 text-xs text-stone-400">
                  <div className="flex items-center gap-2 text-stone-300">
                    <Users className="w-3.5 h-3.5 text-amber-400" />
                    <span>{flagship.dineInCapacity}</span>
                  </div>
                  <div className="flex items-center gap-2 text-stone-300">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{flagship.timing}</span>
                  </div>
                  <div className="flex items-center gap-2 text-stone-300">
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span className="font-mono">{flagship.phone} (UAN: {STORE_INFO.hotline})</span>
                  </div>
                </div>
              </div>

              <div className="pt-5 mt-4 border-t border-stone-800 flex items-center justify-between gap-2">
                <a
                  href={flagship.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2 px-3 rounded-xl bg-stone-950 hover:bg-stone-800 border border-stone-700 text-stone-200 text-xs font-bold transition text-center flex items-center justify-center gap-1.5"
                >
                  <Navigation className="w-3.5 h-3.5 text-amber-400" />
                  <span>Get Directions</span>
                </a>
                <button
                  onClick={() => {
                    if (onSelectCityDirect) {
                      onSelectCityDirect(flagship.cityId, flagship.id);
                    }
                    onNavigate('menu');
                  }}
                  className="flex-1 py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-black transition text-center shadow flex items-center justify-center gap-1"
                >
                  <span>Order Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter and Search Controls Bar */}
      <div className="space-y-4 pt-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* City Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
            <button
              onClick={() => setSelectedCityFilter('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedCityFilter === 'all'
                  ? 'bg-amber-500 text-stone-950 font-black shadow-md'
                  : 'bg-stone-900 text-stone-300 hover:bg-stone-800 border border-stone-800'
              }`}
            >
              All Pakistan ({NATIONAL_OUTLETS.length})
            </button>
            {NATIONAL_CITIES.map((city) => {
              const isSelected = selectedCityFilter === city.id;
              return (
                <button
                  key={city.id}
                  onClick={() => setSelectedCityFilter(city.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    isSelected
                      ? 'bg-amber-500 text-stone-950 font-black shadow-md'
                      : 'bg-stone-900 text-stone-300 hover:bg-stone-800 border border-stone-800'
                  }`}
                >
                  <span>{city.name}</span>
                  <span className="text-[10px] opacity-75 font-urdu">({city.urduName})</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isSelected ? 'bg-stone-950/20 text-stone-950' : 'bg-stone-800 text-stone-400'
                  }`}>
                    {city.outletsCount}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search box */}
          <div className="relative shrink-0 w-full md:w-64">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search area, road, or city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-stone-900 border border-stone-700 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder:text-stone-500 focus:outline-none focus:border-amber-500 transition"
            />
          </div>
        </div>
      </div>

      {/* Outlets Listing Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOutlets.length === 0 ? (
          <div className="col-span-full text-center py-12 bg-stone-900/50 rounded-3xl border border-stone-800 space-y-3">
            <Store className="w-8 h-8 text-stone-500 mx-auto" />
            <p className="text-stone-400 text-sm">
              No outlets found matching your criteria. Try selecting another city or clearing your search.
            </p>
            <button
              onClick={() => {
                setSelectedCityFilter('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-amber-500 text-stone-950 text-xs font-black"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredOutlets.map((outlet) => (
            <div
              key={outlet.id}
              className="bg-stone-900/80 border border-stone-800 rounded-2xl p-5 flex flex-col justify-between hover:border-amber-500/60 transition group shadow-lg"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-base font-bold text-white group-hover:text-amber-400 transition font-serif">
                        {outlet.name}
                      </h4>
                      {outlet.isFlagship && (
                        <span className="text-[9px] font-black uppercase tracking-wider bg-red-950 text-red-400 border border-red-800 px-1.5 py-0.5 rounded">
                          Flagship
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-stone-400 font-semibold">{outlet.cityName}, Pakistan</div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full shrink-0">
                    Open Now
                  </span>
                </div>

                <p className="text-xs text-stone-300">
                  {outlet.address}
                </p>

                <div className="text-[11px] text-stone-400">
                  <span className="text-amber-400/90 font-semibold">Landmark:</span> {outlet.landmark}
                </div>

                {/* Amenities Badges */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[10px] bg-stone-950 text-stone-300 border border-stone-800 px-2 py-0.5 rounded-md flex items-center gap-1">
                    <UtensilsCrossed className="w-3 h-3 text-amber-400" /> Dine-In
                  </span>
                  <span className="text-[10px] bg-stone-950 text-stone-300 border border-stone-800 px-2 py-0.5 rounded-md flex items-center gap-1">
                    <Truck className="w-3 h-3 text-emerald-400" /> 30-Min Delivery
                  </span>
                  <span className="text-[10px] bg-stone-950 text-stone-300 border border-stone-800 px-2 py-0.5 rounded-md flex items-center gap-1">
                    <Wifi className="w-3 h-3 text-blue-400" /> High-Speed WiFi
                  </span>
                </div>

                <div className="pt-2 border-t border-stone-800/80 text-xs text-stone-400 space-y-1">
                  <div className="flex items-center justify-between">
                    <span>Operating Hours:</span>
                    <span className="text-white font-mono">{outlet.timing}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Phone:</span>
                    <a href={`tel:${outlet.phone}`} className="text-amber-400 hover:underline font-mono">
                      {outlet.phone}
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-stone-800 flex items-center justify-between gap-2">
                <a
                  href={outlet.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2 px-3 rounded-xl bg-stone-950 hover:bg-stone-800 border border-stone-700 text-stone-200 text-xs font-bold transition text-center flex items-center justify-center gap-1.5"
                >
                  <Navigation className="w-3.5 h-3.5 text-amber-400" />
                  <span>Map</span>
                </a>
                <button
                  onClick={() => {
                    if (onSelectCityDirect) {
                      onSelectCityDirect(outlet.cityId, outlet.id);
                    }
                    onNavigate('menu');
                  }}
                  className="flex-1 py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-black transition text-center shadow flex items-center justify-center gap-1"
                >
                  <span>Order Now</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Franchise & Corporate Expansion Desk */}
      <div className="card-run-4colors rounded-3xl p-6 sm:p-10 space-y-6 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/40 text-amber-300 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
              <Building2 className="w-3.5 h-3.5 text-amber-400" />
              <span>National Franchise Expansion Desk</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white font-serif">
              Partner With Pakistan's Sovereign Pizza Chain
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              We are expanding into prime commercial corridors across Punjab, Sindh, KPK, and Balochistan. Partner with our proven kitchen systems, master supply chain, and centralized digital ordering ecosystem.
            </p>

            <div className="space-y-2 pt-2 text-xs text-stone-300">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Turnkey Pizzeria Architecture & Imported Volcanic Stone Ovens</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Comprehensive Chef Training & Standardized SOPs</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Centralized UAN Dispatch & Nationwide Digital Marketing Support</span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={`tel:${STORE_INFO.hotlineRaw}`}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-900 border border-stone-700 text-stone-200 text-xs font-bold hover:bg-stone-800 transition"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>Corporate Desk: 03-111-786-676</span>
              </a>
            </div>
          </div>

          {/* Franchise Quick Form */}
          <div className="lg:col-span-6 bg-stone-900/90 border border-stone-800 rounded-2xl p-6 shadow-xl">
            {franchiseSubmitted ? (
              <div className="py-10 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-white font-serif">Inquiry Received Successfully!</h4>
                <p className="text-xs text-stone-400 max-w-sm mx-auto">
                  Our Corporate Franchise Development Executive will contact you within 24 hours with the detailed investor dossier.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFranchiseSubmit} className="space-y-3.5">
                <h4 className="text-base font-bold text-white font-serif border-b border-stone-800 pb-2">
                  Franchise Inquiry Expression of Interest
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-stone-400 uppercase block mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Tariq Mehmood"
                      value={franchiseForm.fullName}
                      onChange={(e) => setFranchiseForm({ ...franchiseForm, fullName: e.target.value })}
                      className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-stone-400 uppercase block mb-1">Contact Phone</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 0300-1234567"
                      value={franchiseForm.phone}
                      onChange={(e) => setFranchiseForm({ ...franchiseForm, phone: e.target.value })}
                      className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-stone-400 uppercase block mb-1">Target City</label>
                    <select
                      value={franchiseForm.city}
                      onChange={(e) => setFranchiseForm({ ...franchiseForm, city: e.target.value })}
                      className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                    >
                      {NATIONAL_CITIES.map((c) => (
                        <option key={c.id} value={c.name}>{c.name}</option>
                      ))}
                      <option value="Other">Other City / District</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-stone-400 uppercase block mb-1">Investment Range</label>
                    <select
                      value={franchiseForm.investmentBudget}
                      onChange={(e) => setFranchiseForm({ ...franchiseForm, investmentBudget: e.target.value })}
                      className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                    >
                      <option value="PKR 10M - 15M">PKR 10 Million – 15 Million</option>
                      <option value="PKR 15M - 25M">PKR 15 Million – 25 Million</option>
                      <option value="PKR 25M+">PKR 25 Million+ (Flagship)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-stone-400 uppercase block mb-1">Proposed Location / Area</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Main Commercial Boulevard, Phase 6"
                    value={franchiseForm.proposedLocation}
                    onChange={(e) => setFranchiseForm({ ...franchiseForm, proposedLocation: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-black transition shadow-lg flex items-center justify-center gap-2 mt-2"
                >
                  <Building2 className="w-4 h-4" />
                  <span>Submit Franchise Expression of Interest</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </div>

    </div>
  );
};
