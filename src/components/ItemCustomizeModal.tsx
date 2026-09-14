import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, Check, Star, ShoppingBag, Flame, Sparkles } from 'lucide-react';
import { MenuItem, CartItem } from '../types';

interface ItemCustomizeModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (cartItem: CartItem) => void;
}

export const ItemCustomizeModal: React.FC<ItemCustomizeModalProps> = ({
  item,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  if (!isOpen || !item) return null;

  const [selectedSize, setSelectedSize] = useState<string>(
    item.sizes?.[0]?.name || ''
  );
  const [selectedCrust, setSelectedCrust] = useState<string>(
    item.crusts?.[0]?.name || ''
  );
  const [selectedSpice, setSelectedSpice] = useState<string>(
    item.spiceLevels?.[0] || 'Medium'
  );
  const [selectedAddons, setSelectedAddons] = useState<{ id: string; name: string; price: number }[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

  // Reset states when item changes
  useEffect(() => {
    if (item) {
      setSelectedSize(item.sizes?.[0]?.name || '');
      setSelectedCrust(item.crusts?.[0]?.name || '');
      setSelectedSpice(item.spiceLevels?.[0] || 'Medium');
      setSelectedAddons([]);
      setSpecialInstructions('');
      setQuantity(1);
    }
  }, [item]);

  // Calculate Unit Price
  const sizeMod = item.sizes?.find((s) => s.name === selectedSize)?.priceModifier || 0;
  const crustMod = item.crusts?.find((c) => c.name === selectedCrust)?.priceModifier || 0;
  const addonsTotal = selectedAddons.reduce((sum, a) => sum + a.price, 0);

  const unitPrice = item.price + sizeMod + crustMod + addonsTotal;
  const totalPrice = unitPrice * quantity;

  const handleToggleAddon = (addon: { id: string; name: string; price: number }) => {
    setSelectedAddons((prev) => {
      const exists = prev.some((a) => a.id === addon.id);
      if (exists) {
        return prev.filter((a) => a.id !== addon.id);
      } else {
        return [...prev, addon];
      }
    });
  };

  const handleConfirmAdd = () => {
    const cartItem: CartItem = {
      cartItemId: `${item.id}-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      menuItem: item,
      name: item.name,
      selectedSize: selectedSize || undefined,
      selectedCrust: selectedCrust || undefined,
      selectedSpice: item.spiceLevels ? selectedSpice : undefined,
      selectedAddons: selectedAddons.length > 0 ? selectedAddons : undefined,
      specialInstructions: specialInstructions.trim() || undefined,
      unitPrice,
      quantity,
      image: item.image,
    };

    onAddToCart(cartItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative bg-stone-900 border border-stone-700 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header with Photo */}
        <div className="relative h-60 sm:h-72 w-full shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/30 to-black/40" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/70 hover:bg-black text-white p-2 rounded-full backdrop-blur-xs transition"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header Info Overlay */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-black uppercase tracking-wider bg-amber-500 text-stone-950 px-2.5 py-0.5 rounded-md">
                {item.category.toUpperCase()}
              </span>
              <div className="flex items-center gap-1 text-amber-400 text-xs font-bold bg-stone-900/80 px-2 py-0.5 rounded-md">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{item.rating} ({item.reviewsCount} reviews)</span>
              </div>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-serif leading-tight">
              {item.name}
            </h2>
            {item.urduName && (
              <p className="text-xs text-amber-300 font-sans">{item.urduName}</p>
            )}
          </div>
        </div>

        {/* Modal Body / Customization Form */}
        <div className="p-6 space-y-6 flex-1">
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
            {item.description}
          </p>

          {/* Included in Deal if Deal */}
          {item.dealIncludes && (
            <div className="bg-stone-950 border border-stone-800 p-4 rounded-2xl space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Deal Package Contains:</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {item.dealIncludes.map((inc, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-stone-200">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{inc}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sizes Selection */}
          {item.sizes && item.sizes.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black uppercase tracking-wider text-amber-400">
                  Select Size (Required)
                </label>
                <span className="text-[11px] text-stone-400">Choose 1</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {item.sizes.map((s) => {
                  const isSelected = selectedSize === s.name;
                  return (
                    <button
                      key={s.name}
                      type="button"
                      onClick={() => setSelectedSize(s.name)}
                      className={`p-3 rounded-2xl border text-left transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-amber-500/15 border-amber-500 text-white ring-1 ring-amber-500'
                          : 'bg-stone-950 border-stone-800 text-stone-300 hover:border-stone-700'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-bold text-white">{s.name}</div>
                        {s.label && <div className="text-[10px] text-stone-400">{s.label}</div>}
                        {s.slicesOrServing && <div className="text-[10px] text-amber-300/80">{s.slicesOrServing}</div>}
                      </div>
                      <div className="text-xs font-mono font-bold text-amber-400">
                        {s.priceModifier > 0 ? `+Rs. ${s.priceModifier}` : 'Included'}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Crust Selection */}
          {item.crusts && item.crusts.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black uppercase tracking-wider text-amber-400">
                  Select Crust Style
                </label>
                <span className="text-[11px] text-stone-400">Choose 1</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {item.crusts.map((c) => {
                  const isSelected = selectedCrust === c.name;
                  return (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => setSelectedCrust(c.name)}
                      className={`p-3 rounded-2xl border text-left transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-amber-500/15 border-amber-500 text-white ring-1 ring-amber-500'
                          : 'bg-stone-950 border-stone-800 text-stone-300 hover:border-stone-700'
                      }`}
                    >
                      <span className="text-xs font-bold text-white">{c.name}</span>
                      <span className="text-xs font-mono font-bold text-amber-400">
                        {c.priceModifier > 0 ? `+Rs. ${c.priceModifier}` : 'Standard'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spice Level */}
          {item.spiceLevels && item.spiceLevels.length > 0 && (
            <div className="space-y-3">
              <label className="block text-xs font-black uppercase tracking-wider text-amber-400">
                Spice Level Preference
              </label>
              <div className="flex flex-wrap gap-2">
                {item.spiceLevels.map((spice) => {
                  const isSelected = selectedSpice === spice;
                  return (
                    <button
                      key={spice}
                      type="button"
                      onClick={() => setSelectedSpice(spice)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-red-600 text-white shadow ring-1 ring-red-400'
                          : 'bg-stone-950 border border-stone-800 text-stone-300 hover:bg-stone-800'
                      }`}
                    >
                      <Flame className="w-3.5 h-3.5" />
                      <span>{spice}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Extra Addons */}
          {item.addons && item.addons.length > 0 && (
            <div className="space-y-3">
              <label className="block text-xs font-black uppercase tracking-wider text-amber-400">
                Delicious Add-ons (Optional)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {item.addons.map((addon) => {
                  const isSelected = selectedAddons.some((a) => a.id === addon.id);
                  return (
                    <button
                      key={addon.id}
                      type="button"
                      onClick={() => handleToggleAddon(addon)}
                      className={`p-3 rounded-2xl border text-left transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-emerald-500/20 border-emerald-500 text-white'
                          : 'bg-stone-950 border-stone-800 text-stone-300 hover:border-stone-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                          isSelected ? 'bg-emerald-500 border-emerald-500 text-stone-950' : 'border-stone-700'
                        }`}>
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className="text-xs font-bold">{addon.name}</span>
                      </div>
                      <span className="text-xs font-mono font-bold text-emerald-400">+Rs. {addon.price}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Special Instructions Note */}
          <div className="space-y-2">
            <label className="block text-xs font-black uppercase tracking-wider text-stone-400">
              Kitchen Instructions / Cooking Preferences
            </label>
            <textarea
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="e.g. Cut in 8 pieces, extra crispy crust, no mayo sauce..."
              rows={2}
              className="w-full bg-stone-950 border border-stone-800 rounded-2xl p-3 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        {/* Modal Footer / Quantity & Action Button */}
        <div className="p-5 bg-stone-950 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 sticky bottom-0 z-10">
          
          {/* Quantity selector */}
          <div className="flex items-center gap-3 bg-stone-900 border border-stone-800 p-1.5 rounded-2xl">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className="w-8 h-8 rounded-xl bg-stone-800 hover:bg-stone-700 disabled:opacity-40 text-white flex items-center justify-center transition"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center text-sm font-black text-white font-mono">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 flex items-center justify-center font-bold transition"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add to Cart CTA */}
          <button
            onClick={handleConfirmAdd}
            className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 via-red-500 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-black text-sm py-3.5 px-6 rounded-2xl shadow-xl shadow-red-600/20 transition transform active:scale-95"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Add to Order • Rs. {totalPrice.toLocaleString()}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
