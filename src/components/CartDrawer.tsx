import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Sparkles, 
  Tag, 
  Check, 
  Flame,
  Truck
} from 'lucide-react';
import { CartItem } from '../types';
import { STORE_INFO } from '../data/menuData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
  onProceedToCheckout: () => void;
  orderMode: 'delivery' | 'takeaway';
  appliedCoupon: { code: string; discountAmount: number } | null;
  onApplyCoupon: (code: string) => boolean;
  onRemoveCoupon: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedToCheckout,
  orderMode,
  appliedCoupon,
  onApplyCoupon,
  onRemoveCoupon,
}) => {
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const deliveryFee = orderMode === 'delivery' ? (subtotal >= STORE_INFO.freeDeliveryThreshold ? 0 : STORE_INFO.deliveryFee) : 0;
  const discount = appliedCoupon ? appliedCoupon.discountAmount : 0;
  const finalTotal = Math.max(0, subtotal - discount + deliveryFee);

  const amountNeededForFreeDelivery = Math.max(0, STORE_INFO.freeDeliveryThreshold - subtotal);
  const freeDeliveryProgress = Math.min(100, (subtotal / STORE_INFO.freeDeliveryThreshold) * 100);

  const handleApplyCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (!couponInput.trim()) return;

    const success = onApplyCoupon(couponInput.trim().toUpperCase());
    if (!success) {
      setCouponError('Invalid coupon code. Try PARADISE15 or HOTLINE786');
    } else {
      setCouponInput('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-stone-900 border-l border-stone-800 shadow-2xl flex flex-col">
          
          {/* Cart Header */}
          <div className="p-5 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-black text-white font-serif">Your Paradise Order</h3>
                <span className="text-[11px] text-stone-400">
                  {items.length} {items.length === 1 ? 'item' : 'items'} • Mode: <strong className="text-amber-400 uppercase">{orderMode}</strong>
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {items.length > 0 && (
                <button
                  onClick={onClearCart}
                  className="text-xs text-stone-400 hover:text-red-400 transition px-2 py-1"
                  title="Empty cart"
                >
                  Clear
                </button>
              )}
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Free Delivery Meter (for delivery mode) */}
          {orderMode === 'delivery' && (
            <div className="bg-stone-950/60 px-5 py-3 border-b border-stone-800/80">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-stone-300 flex items-center gap-1.5 font-semibold">
                  <Truck className="w-3.5 h-3.5 text-amber-400" />
                  {amountNeededForFreeDelivery === 0 ? (
                    <span className="text-emerald-400 font-bold">🎉 You unlocked FREE Delivery!</span>
                  ) : (
                    <span>Add <strong>Rs. {amountNeededForFreeDelivery.toLocaleString()}</strong> for Free Delivery</span>
                  )}
                </span>
                <span className="text-[11px] font-mono text-stone-400">{Math.round(freeDeliveryProgress)}%</span>
              </div>
              <div className="w-full h-1.5 bg-stone-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-500"
                  style={{ width: `${freeDeliveryProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-20 h-20 rounded-full bg-stone-950 border border-stone-800 flex items-center justify-center text-3xl">
                  🍕
                </div>
                <div className="space-y-1">
                  <h4 className="text-lg font-bold text-white">Your cart is hungry!</h4>
                  <p className="text-xs text-stone-400 max-w-xs">
                    Explore our cheesy crown crust pizzas, smashed burgers, or creamy pastas to fill it up.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-amber-500 text-stone-950 text-xs font-black shadow-lg hover:bg-amber-400 transition"
                >
                  Browse Delicious Menu
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.cartItemId}
                  className="bg-stone-950 border border-stone-800 rounded-2xl p-3.5 flex gap-3 relative group"
                >
                  {/* Item Thumbnail */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-xl object-cover shrink-0 border border-stone-800"
                  />

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="text-xs font-black text-white truncate">{item.name}</h4>
                      <button
                        onClick={() => onRemoveItem(item.cartItemId)}
                        className="text-stone-500 hover:text-red-400 transition p-1"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Modifiers info */}
                    <div className="text-[11px] text-stone-400 space-y-0.5 mt-0.5">
                      {item.selectedSize && <div>Size: <span className="text-stone-200">{item.selectedSize}</span></div>}
                      {item.selectedCrust && <div>Crust: <span className="text-stone-200">{item.selectedCrust}</span></div>}
                      {item.selectedSpice && <div>Spice: <span className="text-red-400">{item.selectedSpice}</span></div>}
                      
                      {item.selectedAddons && item.selectedAddons.length > 0 && (
                        <div className="text-[10px] text-emerald-400 truncate">
                          + {item.selectedAddons.map((a) => a.name).join(', ')}
                        </div>
                      )}

                      {item.specialInstructions && (
                        <div className="text-[10px] text-stone-400 italic truncate">
                          Note: "{item.specialInstructions}"
                        </div>
                      )}
                    </div>

                    {/* Price & Quantity Controls */}
                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-stone-800/80">
                      <div className="text-xs font-black text-amber-400 font-mono">
                        Rs. {(item.unitPrice * item.quantity).toLocaleString()}
                        <span className="text-[10px] text-stone-500 font-normal"> (Rs. {item.unitPrice} each)</span>
                      </div>

                      <div className="flex items-center gap-1.5 bg-stone-900 border border-stone-800 px-1 py-0.5 rounded-lg">
                        <button
                          onClick={() => onUpdateQuantity(item.cartItemId, item.quantity - 1)}
                          className="w-5 h-5 rounded flex items-center justify-center text-stone-400 hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-5 text-center text-xs font-bold text-white font-mono">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.cartItemId, item.quantity + 1)}
                          className="w-5 h-5 rounded flex items-center justify-center text-amber-400 hover:text-amber-300"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer / Bill Summary */}
          {items.length > 0 && (
            <div className="p-5 bg-stone-950 border-t border-stone-800 space-y-4">
              
              {/* Coupon Code section */}
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-800 text-xs">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold">
                    <Tag className="w-3.5 h-3.5" />
                    <span>Coupon "{appliedCoupon.code}" applied (-Rs. {appliedCoupon.discountAmount})</span>
                  </div>
                  <button
                    onClick={onRemoveCoupon}
                    className="text-stone-400 hover:text-red-400 text-xs font-semibold"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCouponSubmit} className="space-y-1">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="Promo code (e.g. PARADISE15)"
                      className="flex-1 bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-500 uppercase"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold rounded-xl transition"
                    >
                      Apply
                    </button>
                  </div>
                  {couponError && (
                    <p className="text-[11px] text-red-400">{couponError}</p>
                  )}
                  <div className="text-[10px] text-stone-500 flex gap-2">
                    <span>Try: <strong className="text-amber-400">PARADISE15</strong> (15% OFF)</span>
                    <span>•</span>
                    <span><strong className="text-amber-400">HOTLINE786</strong> (Rs. 200 OFF)</span>
                  </div>
                </form>
              )}

              {/* Subtotal breakdown */}
              <div className="space-y-1.5 text-xs text-stone-400 border-t border-stone-800/80 pt-3">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-mono text-stone-200">Rs. {subtotal.toLocaleString()}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount:</span>
                    <span className="font-mono">-Rs. {discount.toLocaleString()}</span>
                  </div>
                )}

                {orderMode === 'delivery' && (
                  <div className="flex justify-between">
                    <span>Delivery Fee:</span>
                    <span className="font-mono text-stone-200">
                      {deliveryFee === 0 ? <span className="text-emerald-400 font-bold">FREE</span> : `Rs. ${deliveryFee}`}
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-sm font-black text-white pt-2 border-t border-stone-800">
                  <span>Grand Total:</span>
                  <span className="text-amber-400 text-base font-mono">
                    Rs. {finalTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Proceed Button */}
              <button
                id="checkout-proceed-btn"
                onClick={onProceedToCheckout}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 via-red-500 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-black text-sm py-3.5 rounded-2xl shadow-xl shadow-red-600/25 transition transform active:scale-95"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
