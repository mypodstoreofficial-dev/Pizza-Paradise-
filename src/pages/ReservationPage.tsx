import React, { useState } from 'react';
import { 
  CalendarDays, 
  Users, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  Phone, 
  UtensilsCrossed, 
  Heart, 
  Cake, 
  ShieldCheck,
  Building
} from 'lucide-react';
import { STORE_INFO } from '../data/menuData';
import { PageId } from '../types';
import { ReturnToHomeButton } from '../components/ReturnToHomeButton';

interface ReservationPageProps {
  onNavigate?: (page: PageId) => void;
}

export const ReservationPage: React.FC<ReservationPageProps> = ({
  onNavigate,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [guests, setGuests] = useState(4);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState('08:00 PM');
  const [seatingArea, setSeatingArea] = useState('family-booth');
  const [occasion, setOccasion] = useState('Family Dinner');
  const [specialRequests, setSpecialRequests] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');


  const timeSlots = [
    '01:00 PM', '02:30 PM', '04:00 PM', '06:00 PM', 
    '07:30 PM', '08:30 PM', '09:30 PM', '10:30 PM', '11:30 PM', '12:30 AM'
  ];

  const occasions = [
    'Family Dinner', 'Birthday Celebration 🎂', 'Friends Hangout', 'Anniversary 💖', 'Office / Team Treat', 'Casual Dining'
  ];

  const seatingOptions = [
    {
      id: 'family-booth',
      title: 'Family Private Booth',
      desc: 'Enclosed comfortable leather booth, quiet atmosphere',
      icon: '👨‍👩‍👧‍👦',
    },
    {
      id: 'main-hall',
      title: 'Main Dining Hall',
      desc: 'Vibrant ambient view of stone pizza ovens and lively music',
      icon: '🍽️',
    },
    {
      id: 'party-zone',
      title: 'Party & Celebration Area',
      desc: 'Extended tables with birthday balloon space for up to 30 people',
      icon: '🎉',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Please provide your full name');
      return;
    }
    if (!phone.trim() || phone.length < 10) {
      setError('Please provide a valid contact phone number');
      return;
    }

    setIsSuccess(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Return to Home Action Bar */}
      {onNavigate && (
        <div className="flex items-center justify-between pb-2 border-b border-stone-800/80">
          <ReturnToHomeButton onNavigateHome={() => onNavigate('home')} />
          <span className="text-xs text-amber-400 font-bold hidden sm:inline">
            🍽️ Reserved seating for families, parties & celebrations
          </span>
        </div>
      )}

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 text-amber-400 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider">
          <CalendarDays className="w-3.5 h-3.5" />
          <span>Dine-In & Events</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-serif">
          Table & Party Reservation
        </h1>
        <p className="text-sm sm:text-base text-stone-400">
          Book your table at Pizza Paradise Main Branch for family dinners, birthdays, anniversaries, and friendly get-togethers.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Reservation Form */}
        <div className="lg:col-span-7 card-run-4colors rounded-3xl p-6 sm:p-8 shadow-2xl">
          
          {isSuccess ? (
            <div className="text-center py-10 space-y-5">
              <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mx-auto flex items-center justify-center animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-white font-serif">Reservation Confirmed!</h3>
                <p className="text-sm text-stone-300 max-w-md mx-auto">
                  Thank you, <strong>{name}</strong>! Your table reservation for <strong>{guests} guests</strong> on <strong>{date} at {time}</strong> is reserved in the <strong>{seatingOptions.find(s => s.id === seatingArea)?.title}</strong>.
                </p>
              </div>

              <div className="bg-stone-950 p-4 rounded-2xl border border-stone-800 text-xs text-amber-400 max-w-md mx-auto space-y-1">
                <div className="font-bold">Confirmation Reference: #RES-{Math.floor(100000 + Math.random() * 900000)}</div>
                <p className="text-stone-400">An SMS confirmation has been logged for {phone}. For sudden changes, call: <strong>{STORE_INFO.hotline}</strong></p>
              </div>

              <button
                onClick={() => {
                  setIsSuccess(false);
                  setName('');
                  setPhone('');
                  setSpecialRequests('');
                }}
                className="mt-4 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-black transition"
              >
                Make Another Reservation
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div>
                <h3 className="text-lg font-black text-white font-serif mb-1">Book Your Seating</h3>
                <p className="text-xs text-stone-400">Fill in your reservation details below. Instant confirmation.</p>
              </div>

              {error && (
                <div className="p-3 rounded-xl bg-red-950/80 border border-red-800 text-red-300 text-xs font-semibold">
                  ⚠️ {error}
                </div>
              )}

              {/* Seating Style Selector */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-wider text-stone-300">
                  Select Seating Preference
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {seatingOptions.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSeatingArea(opt.id)}
                      className={`p-3 rounded-2xl border text-left transition ${
                        seatingArea === opt.id
                          ? 'bg-amber-500/15 border-amber-500 text-white shadow ring-1 ring-amber-500'
                          : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-white'
                      }`}
                    >
                      <div className="text-xl mb-1">{opt.icon}</div>
                      <div className="text-xs font-bold text-white">{opt.title}</div>
                      <div className="text-[10px] text-stone-400 mt-0.5 leading-tight">{opt.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Guest & Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-300">Your Full Name *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Asad Rehman"
                    className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-500 transition"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-300">Contact Phone Number *</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0300-1234567"
                    className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-500 font-mono transition"
                  />
                </div>
              </div>

              {/* Guests, Date, Time */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-300">Number of Guests</label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  >
                    {[1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20, 25, 30].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-300">Reservation Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-300">Time Slot</label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  >
                    {timeSlots.map((ts) => (
                      <option key={ts} value={ts}>
                        {ts}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Occasion buttons */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-300">Occasion Type</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {occasions.map((occ) => (
                    <button
                      key={occ}
                      type="button"
                      onClick={() => setOccasion(occ)}
                      className={`p-2 rounded-xl border text-xs font-bold transition ${
                        occasion === occ
                          ? 'bg-amber-500/20 border-amber-500 text-white'
                          : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-white'
                      }`}
                    >
                      {occ}
                    </button>
                  ))}
                </div>
              </div>

              {/* Special instructions */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-300">Special Notes & Decor Requests</label>
                <textarea
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="e.g. Need birthday table decoration, extra high-chair for toddler, quiet booth..."
                  rows={3}
                  className="w-full bg-stone-950 border border-stone-700 rounded-xl p-3 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-black text-sm py-3.5 rounded-2xl shadow-xl transition transform active:scale-95"
              >
                <CalendarDays className="w-4 h-4" />
                <span>Confirm Table Reservation</span>
              </button>
            </form>
          )}

        </div>

        {/* Right Column: Branch Dining Highlights & Info */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="card-run-4colors rounded-3xl p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-400">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white font-serif">Dine-In Experience</h3>
                <p className="text-xs text-stone-400">Fresh stone-baked aromas straight from the oven</p>
              </div>
            </div>

            <ul className="space-y-2.5 text-xs text-stone-300 border-t border-stone-800 pt-4">
              <li className="flex items-center gap-2">
                <span className="text-emerald-400">✔</span>
                <span>Dedicated Air-Conditioned Family Dining Hall</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-400">✔</span>
                <span>Complimentary Birthday Song & Sparkler presentation on request</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-400">✔</span>
                <span>High-Speed Guest Wi-Fi & Clean Facilities</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-400">✔</span>
                <span>Valet & Dedicated Front Parking</span>
              </li>
            </ul>
          </div>

          <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 space-y-3">
            <h4 className="text-sm font-bold text-white font-serif flex items-center gap-2">
              <Phone className="w-4 h-4 text-amber-400" />
              Need Immediate Confirmation?
            </h4>
            <p className="text-xs text-stone-400">
              For parties greater than 20 people or custom catering packages, please contact our store manager directly:
            </p>
            <a
              href={`tel:${STORE_INFO.hotlineRaw}`}
              className="flex items-center justify-center gap-2 bg-stone-950 hover:bg-stone-800 text-amber-400 border border-amber-500/40 py-3 rounded-2xl text-xs font-black transition"
            >
              <span>Hotline: {STORE_INFO.hotline}</span>
            </a>
          </div>

        </div>

      </div>

    </div>
  );
};
