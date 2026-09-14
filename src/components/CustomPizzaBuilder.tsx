import React, { useState } from 'react';
import { Sparkles, Plus, Check, RotateCcw, ShoppingBag, Flame, Layers } from 'lucide-react';
import { CustomPizzaConfig, CartItem } from '../types';
import { ASSETS_3D } from '../data/assets';

interface CustomPizzaBuilderProps {
  onAddCustomPizzaToCart: (customPizza: CartItem) => void;
}

export const CustomPizzaBuilder: React.FC<CustomPizzaBuilderProps> = ({
  onAddCustomPizzaToCart,
}) => {
  const [size, setSize] = useState<CustomPizzaConfig['size']>('large');
  const [crust, setCrust] = useState<CustomPizzaConfig['crust']>('crown');
  const [sauce, setSauce] = useState<CustomPizzaConfig['sauce']>('marinara');
  const [cheeseLevel, setCheeseLevel] = useState<CustomPizzaConfig['cheeseLevel']>('extra');
  const [selectedMeats, setSelectedMeats] = useState<string[]>(['Chicken Tikka Chunks', 'Halal Pepperoni']);
  const [selectedVeggies, setSelectedVeggies] = useState<string[]>(['Fresh Mushrooms', 'Black Olives', 'Spicy Jalapeños']);
  const [specialNote, setSpecialNote] = useState('');
  const [showAddedNotice, setShowAddedNotice] = useState(false);

  // Prices and details
  const sizeOptions = [
    { id: 'small', name: 'Small 9"', basePrice: 899, desc: '4 Slices • 1-2 Persons' },
    { id: 'medium', name: 'Medium 11"', basePrice: 1399, desc: '6 Slices • 2-3 Persons' },
    { id: 'large', name: 'Large 13"', basePrice: 1899, desc: '8 Slices • 3-4 Persons' },
    { id: 'jumbo', name: 'Jumbo Beast 16"', basePrice: 2499, desc: '12 Slices • 5-6 Persons' },
  ] as const;

  const crustOptions = [
    { id: 'crown', name: '👑 Cheesy Crown Crust', price: 250, desc: 'Crust with 8 molten cheese & kabab stuffed pockets' },
    { id: 'pan', name: '🍕 Classic Golden Pan', price: 0, desc: 'Thick, fluffy golden-baked classic crust' },
    { id: 'stuffed', name: '🧀 Garlic Stuffed Crust', price: 290, desc: 'Gooey mozzarella & garlic herb filled rim' },
    { id: 'handTossed', name: '🤌 Hand Tossed Traditional', price: 50, desc: 'Crispy outer ring with tender center' },
    { id: 'thin', name: 'Crispy Thin Crust', price: 0, desc: 'Ultra-light, cracker-crisp Italian crust' },
  ] as const;

  const sauceOptions = [
    { id: 'marinara', name: 'Paradise Spicy Marinara', color: '#DC2626', icon: '🍅' },
    { id: 'garlicMayo', name: 'Creamy White Garlic Mayo', color: '#FEF3C7', icon: '🧄' },
    { id: 'bbq', name: 'Smoky Hickory BBQ', color: '#78350F', icon: '🔥' },
    { id: 'periPeriRanch', name: 'Spicy Peri-Peri Ranch', color: '#EA580C', icon: '🌶️' },
    { id: 'chipotle', name: 'Zesty Chipotle Sauce', color: '#C2410C', icon: '🌮' },
  ] as const;

  const cheeseOptions = [
    { id: 'regular', name: 'Standard Mozzarella', price: 0, desc: 'Generous 100% pure dairy mozzarella layer' },
    { id: 'extra', name: 'Extra Mozzarella & Cheddar', price: 180, desc: 'Double cheese stretch with sharp cheddar notes' },
    { id: 'tripleBlast', name: 'Triple Cheese Volcano', price: 320, desc: 'Mozzarella, Cheddar & Parmesan overload' },
  ] as const;

  const meatOptions = [
    { name: 'Chicken Tikka Chunks', price: 150 },
    { name: 'Spicy Chicken Fajita', price: 150 },
    { name: 'Halal Pepperoni', price: 160 },
    { name: 'Creamy Malai Boti', price: 160 },
    { name: 'Smoked Chicken Rashers', price: 140 },
    { name: 'Italian Beef Sausages', price: 160 },
  ];

  const veggieOptions = [
    { name: 'Fresh Mushrooms', price: 90 },
    { name: 'Black Olives', price: 80 },
    { name: 'Spicy Jalapeños', price: 80 },
    { name: 'Sweet Corn', price: 70 },
    { name: 'Green Bell Peppers', price: 60 },
    { name: 'Caramelized Sweet Onions', price: 60 },
    { name: 'Juicy Diced Tomatoes', price: 60 },
  ];

  // Calculate live total
  const selectedSizeObj = sizeOptions.find((s) => s.id === size)!;
  const selectedCrustObj = crustOptions.find((c) => c.id === crust)!;
  const selectedCheeseObj = cheeseOptions.find((c) => c.id === cheeseLevel)!;

  const meatsCost = selectedMeats.reduce((sum, meat) => {
    const found = meatOptions.find((m) => m.name === meat);
    return sum + (found ? found.price : 0);
  }, 0);

  const veggiesCost = selectedVeggies.reduce((sum, veg) => {
    const found = veggieOptions.find((v) => v.name === veg);
    return sum + (found ? found.price : 0);
  }, 0);

  const calculatedTotal =
    selectedSizeObj.basePrice +
    selectedCrustObj.price +
    selectedCheeseObj.price +
    meatsCost +
    veggiesCost;

  const handleToggleMeat = (meatName: string) => {
    setSelectedMeats((prev) =>
      prev.includes(meatName) ? prev.filter((m) => m !== meatName) : [...prev, meatName]
    );
  };

  const handleToggleVeggie = (vegName: string) => {
    setSelectedVeggies((prev) =>
      prev.includes(vegName) ? prev.filter((v) => v !== vegName) : [...prev, vegName]
    );
  };

  const handleReset = () => {
    setSize('large');
    setCrust('crown');
    setSauce('marinara');
    setCheeseLevel('extra');
    setSelectedMeats(['Chicken Tikka Chunks', 'Halal Pepperoni']);
    setSelectedVeggies(['Fresh Mushrooms', 'Black Olives', 'Spicy Jalapeños']);
    setSpecialNote('');
  };

  const handleAddToCart = () => {
    const config: CustomPizzaConfig = {
      size,
      crust,
      sauce,
      cheeseLevel,
      meats: selectedMeats,
      veggies: selectedVeggies,
      notes: specialNote,
    };

    const cartItem: CartItem = {
      cartItemId: `custom-pizza-${Date.now()}`,
      isCustomPizza: true,
      customPizzaConfig: config,
      name: `Custom ${selectedSizeObj.name} ${selectedCrustObj.name.replace('👑 ', '')} Pizza`,
      selectedSize: selectedSizeObj.name,
      selectedCrust: selectedCrustObj.name,
      selectedSpice: 'Custom Crafted',
      specialInstructions: specialNote,
      unitPrice: calculatedTotal,
      quantity: 1,
      image: ASSETS_3D.pizzaCrown,
    };

    onAddCustomPizzaToCart(cartItem);
    setShowAddedNotice(true);
    setTimeout(() => setShowAddedNotice(false), 3000);
  };

  return (
    <section id="custom-builder" className="py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-4 py-1.5 text-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Paradise Pizza Lab™</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-serif">
            Build Your Dream Cheesy Pizza
          </h2>
          <p className="text-sm sm:text-base text-stone-400 mt-2">
            Select your favorite crust, secret sauce, artisan meats, and fresh veggies. We bake it fresh in our stone ovens!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Customizer Steps Controls */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Step 1: Size */}
            <div className="bg-stone-900/90 border border-stone-800 rounded-3xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs">1</span>
                  Select Pizza Size
                </span>
                <span className="text-xs text-stone-400">Step 1 of 6</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {sizeOptions.map((s) => {
                  const isSelected = size === s.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setSize(s.id)}
                      className={`p-3.5 rounded-2xl border text-left transition-all ${
                        isSelected
                          ? 'bg-amber-500/15 border-amber-500 text-white shadow-lg ring-1 ring-amber-500'
                          : 'bg-stone-950 border-stone-800 text-stone-300 hover:border-stone-700'
                      }`}
                    >
                      <div className="text-sm font-black text-white">{s.name}</div>
                      <div className="text-[11px] text-amber-400 font-bold mt-1">Rs. {s.basePrice}</div>
                      <div className="text-[10px] text-stone-400 mt-1 leading-tight">{s.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Crust */}
            <div className="bg-stone-900/90 border border-stone-800 rounded-3xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs">2</span>
                  Select Crust Style
                </span>
                <span className="text-xs text-stone-400">Step 2 of 6</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {crustOptions.map((c) => {
                  const isSelected = crust === c.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => setCrust(c.id)}
                      className={`p-3.5 rounded-2xl border text-left transition-all flex items-start justify-between ${
                        isSelected
                          ? 'bg-amber-500/15 border-amber-500 text-white shadow-lg ring-1 ring-amber-500'
                          : 'bg-stone-950 border-stone-800 text-stone-300 hover:border-stone-700'
                      }`}
                    >
                      <div>
                        <div className="text-sm font-black text-white">{c.name}</div>
                        <div className="text-[11px] text-stone-400 mt-0.5">{c.desc}</div>
                      </div>
                      <div className="text-xs font-bold text-amber-400 shrink-0 ml-2">
                        {c.price > 0 ? `+Rs. ${c.price}` : 'Free'}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Base Sauce */}
            <div className="bg-stone-900/90 border border-stone-800 rounded-3xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs">3</span>
                  Secret Signature Sauce
                </span>
                <span className="text-xs text-stone-400">Included</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {sauceOptions.map((sc) => {
                  const isSelected = sauce === sc.id;
                  return (
                    <button
                      key={sc.id}
                      onClick={() => setSauce(sc.id)}
                      className={`p-3 rounded-2xl border text-left transition-all flex items-center gap-2.5 ${
                        isSelected
                          ? 'bg-red-600/20 border-red-500 text-white shadow ring-1 ring-red-500'
                          : 'bg-stone-950 border-stone-800 text-stone-300 hover:border-stone-700'
                      }`}
                    >
                      <span className="text-xl">{sc.icon}</span>
                      <span className="text-xs font-bold text-white leading-tight">{sc.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Cheese Blend */}
            <div className="bg-stone-900/90 border border-stone-800 rounded-3xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs">4</span>
                  Cheese Intensity
                </span>
                <span className="text-xs text-stone-400">Step 4 of 6</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {cheeseOptions.map((ch) => {
                  const isSelected = cheeseLevel === ch.id;
                  return (
                    <button
                      key={ch.id}
                      onClick={() => setCheeseLevel(ch.id)}
                      className={`p-3.5 rounded-2xl border text-left transition-all ${
                        isSelected
                          ? 'bg-amber-500/15 border-amber-500 text-white shadow-lg ring-1 ring-amber-500'
                          : 'bg-stone-950 border-stone-800 text-stone-300 hover:border-stone-700'
                      }`}
                    >
                      <div className="text-xs font-black text-white">{ch.name}</div>
                      <div className="text-[11px] text-amber-400 font-bold mt-1">
                        {ch.price > 0 ? `+Rs. ${ch.price}` : 'Standard (Included)'}
                      </div>
                      <div className="text-[10px] text-stone-400 mt-1">{ch.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 5: Premium Meats */}
            <div className="bg-stone-900/90 border border-stone-800 rounded-3xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs">5</span>
                  Choose Halal Meats ({selectedMeats.length} selected)
                </span>
                <span className="text-xs text-stone-400">Pick any number</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {meatOptions.map((meat) => {
                  const isSelected = selectedMeats.includes(meat.name);
                  return (
                    <button
                      key={meat.name}
                      onClick={() => handleToggleMeat(meat.name)}
                      className={`p-3 rounded-2xl border text-left transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-amber-500/20 border-amber-500 text-white shadow'
                          : 'bg-stone-950 border-stone-800 text-stone-300 hover:border-stone-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                          isSelected ? 'bg-amber-500 border-amber-500 text-stone-950' : 'border-stone-700'
                        }`}>
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className="text-xs font-bold">{meat.name}</span>
                      </div>
                      <span className="text-xs font-semibold text-amber-400">+Rs. {meat.price}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 6: Veggies & Toppings */}
            <div className="bg-stone-900/90 border border-stone-800 rounded-3xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs">6</span>
                  Fresh Garden Toppings ({selectedVeggies.length} selected)
                </span>
                <span className="text-xs text-stone-400">Fresh & Crisp</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {veggieOptions.map((veg) => {
                  const isSelected = selectedVeggies.includes(veg.name);
                  return (
                    <button
                      key={veg.name}
                      onClick={() => handleToggleVeggie(veg.name)}
                      className={`p-3 rounded-2xl border text-left transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-emerald-500/20 border-emerald-500 text-white shadow'
                          : 'bg-stone-950 border-stone-800 text-stone-300 hover:border-stone-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                          isSelected ? 'bg-emerald-500 border-emerald-500 text-stone-950' : 'border-stone-700'
                        }`}>
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className="text-xs font-bold">{veg.name}</span>
                      </div>
                      <span className="text-xs font-semibold text-emerald-400">+Rs. {veg.price}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Special Instructions Note */}
            <div className="bg-stone-900/90 border border-stone-800 rounded-3xl p-6 shadow-lg">
              <label className="block text-xs font-black uppercase tracking-wider text-stone-300 mb-2">
                Special Instructions for the Pizza Chef (Optional)
              </label>
              <textarea
                value={specialNote}
                onChange={(e) => setSpecialNote(e.target.value)}
                placeholder="e.g. Well done crust, extra oregano flakes, less chili sauce..."
                rows={2}
                className="w-full bg-stone-950 border border-stone-800 rounded-2xl p-3 text-xs text-white placeholder-stone-500 focus:border-amber-500 focus:outline-none"
              />
            </div>

          </div>

          {/* Right: Live Pizza Simulator & Order Summary Card (Sticky) */}
          <div className="lg:col-span-5 sticky top-28 space-y-6">
            
            <div className="box-run-4colors rounded-3xl p-6 shadow-2xl space-y-6 backdrop-blur-md">
              
              <div className="flex items-center justify-between border-b border-stone-800 pb-4">
                <div>
                  <span className="text-[10px] uppercase font-black text-amber-400 tracking-wider">Live Preview</span>
                  <h3 className="text-lg font-black text-white font-serif">Your Pizza Creation</h3>
                </div>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1 text-xs text-stone-400 hover:text-white transition"
                  title="Reset to default"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              </div>

              {/* Pizza Visual Graphic / Illustration representation */}
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 mx-auto flex items-center justify-center">
                {/* Crown Crust / Outer glow */}
                <div className={`w-full h-full rounded-full border-4 ${
                  crust === 'crown' ? 'border-amber-400 border-dashed animate-spin' : 'border-amber-600'
                } bg-gradient-to-br from-amber-700 via-amber-800 to-yellow-900 p-2 shadow-2xl flex items-center justify-center transition-all`}
                  style={{ animationDuration: '60s' }}
                >
                  {/* Sauce Layer */}
                  <div className="w-full h-full rounded-full flex items-center justify-center p-2 transition-colors"
                    style={{ backgroundColor: sauceOptions.find((s) => s.id === sauce)?.color || '#DC2626' }}
                  >
                    {/* Cheese Layer */}
                    <div className="w-full h-full rounded-full bg-gradient-to-tr from-amber-200 via-yellow-100 to-amber-300 relative overflow-hidden shadow-inner flex items-center justify-center p-4">
                      
                      {/* Decorative Toppings overlay */}
                      <div className="absolute inset-0 flex flex-wrap items-center justify-center gap-2 p-3 text-sm opacity-90 select-none pointer-events-none">
                        {selectedMeats.map((m, i) => (
                          <span key={i} className="animate-pulse" title={m}>🍗</span>
                        ))}
                        {selectedVeggies.map((v, i) => (
                          <span key={i} title={v}>🫒</span>
                        ))}
                      </div>

                      <div className="text-center z-10 bg-black/40 backdrop-blur-xs px-2 py-1 rounded-full text-white font-black text-[11px]">
                        {selectedSizeObj.name}
                      </div>

                    </div>
                  </div>
                </div>

                {crust === 'crown' && (
                  <div className="absolute -top-2 bg-amber-400 text-stone-950 font-black text-[10px] px-2 py-0.5 rounded-full shadow">
                    👑 Cheesy Crown
                  </div>
                )}
              </div>

              {/* Selected Ingredients Breakdown */}
              <div className="space-y-2 text-xs border-t border-stone-800 pt-4">
                <div className="flex justify-between text-stone-300">
                  <span>Size: <strong>{selectedSizeObj.name}</strong></span>
                  <span className="font-mono">Rs. {selectedSizeObj.basePrice}</span>
                </div>
                <div className="flex justify-between text-stone-300">
                  <span>Crust: <strong>{selectedCrustObj.name}</strong></span>
                  <span className="font-mono">{selectedCrustObj.price > 0 ? `+Rs. ${selectedCrustObj.price}` : 'Free'}</span>
                </div>
                <div className="flex justify-between text-stone-300">
                  <span>Sauce: <strong>{sauceOptions.find((s) => s.id === sauce)?.name}</strong></span>
                  <span className="font-mono text-emerald-400">Included</span>
                </div>
                <div className="flex justify-between text-stone-300">
                  <span>Cheese: <strong>{selectedCheeseObj.name}</strong></span>
                  <span className="font-mono">{selectedCheeseObj.price > 0 ? `+Rs. ${selectedCheeseObj.price}` : 'Standard'}</span>
                </div>

                {selectedMeats.length > 0 && (
                  <div className="flex justify-between text-stone-300 pt-1">
                    <span className="text-stone-400">Meats ({selectedMeats.length}): <span className="text-stone-200">{selectedMeats.join(', ')}</span></span>
                    <span className="font-mono shrink-0 ml-2">+Rs. {meatsCost}</span>
                  </div>
                )}

                {selectedVeggies.length > 0 && (
                  <div className="flex justify-between text-stone-300 pt-1">
                    <span className="text-stone-400">Veggies ({selectedVeggies.length}): <span className="text-stone-200">{selectedVeggies.join(', ')}</span></span>
                    <span className="font-mono shrink-0 ml-2">+Rs. {veggiesCost}</span>
                  </div>
                )}
              </div>

              {/* Total & Action */}
              <div className="border-t border-stone-800 pt-4 space-y-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-bold text-stone-300">Total Price:</span>
                  <div className="text-2xl font-black text-amber-400 font-mono">
                    Rs. {calculatedTotal.toLocaleString()}
                  </div>
                </div>

                {showAddedNotice && (
                  <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500 text-emerald-300 text-xs font-bold text-center flex items-center justify-center gap-1.5 animate-in fade-in">
                    <Check className="w-4 h-4" />
                    Custom Pizza Added to Cart!
                  </div>
                )}

                <button
                  id="add-custom-pizza-btn"
                  onClick={handleAddToCart}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-black text-sm py-3.5 px-6 rounded-2xl shadow-xl shadow-amber-500/20 transition transform active:scale-95"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add Custom Pizza to Cart (Rs. {calculatedTotal})</span>
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
