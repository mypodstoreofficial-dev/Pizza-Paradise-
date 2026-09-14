import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Phone, 
  User, 
  CreditCard, 
  Banknote, 
  MessageSquare, 
  CheckCircle2, 
  ArrowRight, 
  Truck, 
  ShoppingBag, 
  Utensils, 
  ShieldCheck, 
  Clock, 
  PhoneCall
} from 'lucide-react';
import { CartItem, OrderDetails } from '../types';
import { STORE_INFO } from '../data/menuData';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  orderMode: 'delivery' | 'takeaway';
  appliedCoupon: { code: string; discountAmount: number } | null;
  onOrderPlaced: (order: OrderDetails) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  orderMode: initialOrderMode,
  appliedCoupon,
  onOrderPlaced,
}) => {
  if (!isOpen) return null;

  const [orderType, setOrderType] = useState<'delivery' | 'takeaway' | 'dinein'>(
    initialOrderMode === 'delivery' ? 'delivery' : 'takeaway'
  );
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [areaZone, setAreaZone] = useState('Central City (30 mins)');
  const [tableNumber, setTableNumber] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | 'onlineTransfer'>('cash');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const deliveryFee = orderType === 'delivery' ? (subtotal >= STORE_INFO.freeDeliveryThreshold ? 0 : STORE_INFO.deliveryFee) : 0;
  const discount = appliedCoupon ? appliedCoupon.discountAmount : 0;
  const grandTotal = Math.max(0, subtotal - discount + deliveryFee);

  const deliveryAreas = [
    'Central City (30 mins)',
    'Model Town / Civil Lines (35 mins)',
    'Satellite Town / Commercial (30 mins)',
    'Cantt & Defense Area (40 mins)',
    'University Road / Tech Zone (35 mins)',
    'Ring Road / Outer Sector (45 mins)',
  ];

  const handleCreateOrder = (sendToWhatsApp: boolean = false) => {
    setErrorMessage('');

    if (!customerName.trim()) {
      setErrorMessage('Please enter your full name');
      return;
    }
    if (!customerPhone.trim() || customerPhone.trim().length < 10) {
      setErrorMessage('Please enter a valid active phone number (e.g. 0300-1234567)');
      return;
    }
    if (orderType === 'delivery' && !deliveryAddress.trim()) {
      setErrorMessage('Please enter complete delivery street & house address');
      return;
    }
    if (orderType === 'dinein' && !tableNumber.trim()) {
      setErrorMessage('Please enter your table number');
      return;
    }

    setIsSubmitting(true);

    const orderId = `PP-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder: OrderDetails = {
      id: orderId,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      orderType,
      deliveryAddress: orderType === 'delivery' ? deliveryAddress.trim() : undefined,
      areaZone: orderType === 'delivery' ? areaZone : undefined,
      tableNumber: orderType === 'dinein' ? tableNumber.trim() : undefined,
      specialNotes: specialNotes.trim() || undefined,
      paymentMethod,
      items: [...items],
      subtotal,
      discount,
      deliveryFee,
      total: grandTotal,
      couponCode: appliedCoupon?.code,
      status: 'received',
      createdAt: new Date().toISOString(),
      estimatedMinutes: orderType === 'delivery' ? 35 : orderType === 'takeaway' ? 20 : 15,
    };

    if (sendToWhatsApp) {
      // Build WhatsApp message for hotline 03-111-786-676
      const itemLines = items
        .map(
          (it, idx) =>
            `${idx + 1}. *${it.name}* (x${it.quantity}) - Rs. ${(it.unitPrice * it.quantity).toLocaleString()}${
              it.selectedSize ? `\n   - Size: ${it.selectedSize}` : ''
            }${it.selectedCrust ? `\n   - Crust: ${it.selectedCrust}` : ''}${
              it.selectedSpice ? `\n   - Spice: ${it.selectedSpice}` : ''
            }${it.specialInstructions ? `\n   - Note: ${it.specialInstructions}` : ''}`
        )
        .join('\n');

      const messageText = `🍕 *NEW ORDER - PIZZA PARADISE* 🍕\n*Order ID:* ${orderId}\n*Hotline:* ${STORE_INFO.hotline}\n--------------------------\n*Customer:* ${customerName}\n*Phone:* ${customerPhone}\n*Type:* ${orderType.toUpperCase()}\n${
        orderType === 'delivery'
          ? `*Address:* ${deliveryAddress} (${areaZone})\n`
          : orderType === 'dinein'
          ? `*Table:* #${tableNumber}\n`
          : ''
      }*Payment:* ${paymentMethod.toUpperCase()}\n--------------------------\n*ITEMS:*\n${itemLines}\n--------------------------\n*Subtotal:* Rs. ${subtotal.toLocaleString()}\n${
        discount > 0 ? `*Discount:* -Rs. ${discount.toLocaleString()}\n` : ''
      }${orderType === 'delivery' ? `*Delivery Fee:* Rs. ${deliveryFee}\n` : ''}*TOTAL AMOUNT:* Rs. ${grandTotal.toLocaleString()}\n\n_Please confirm our order! Thank you!_`;

      const encodedMsg = encodeURIComponent(messageText);
      window.open(`https://wa.me/${STORE_INFO.whatsapp}?text=${encodedMsg}`, '_blank');
    }

    setTimeout(() => {
      setIsSubmitting(false);
      onOrderPlaced(newOrder);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative bg-stone-900 border border-stone-700 rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Checkout Header */}
        <div className="p-5 bg-stone-950 border-b border-stone-800 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white font-serif">Checkout & Order Confirmation</h3>
              <p className="text-xs text-stone-400">
                Hotline: <strong className="text-amber-400">{STORE_INFO.hotline}</strong> • Fast confirmation
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-6 flex-1">
          
          {/* Order Type Selector */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-wider text-amber-400">
              Select Dining / Fulfillment Method
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setOrderType('delivery')}
                className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1 ${
                  orderType === 'delivery'
                    ? 'bg-red-600/20 border-red-500 text-white shadow ring-1 ring-red-500'
                    : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-white'
                }`}
              >
                <Truck className="w-5 h-5 text-red-400" />
                <span className="text-xs font-bold">🛵 Home Delivery</span>
                <span className="text-[10px] text-stone-400">30-45 Mins</span>
              </button>

              <button
                type="button"
                onClick={() => setOrderType('takeaway')}
                className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1 ${
                  orderType === 'takeaway'
                    ? 'bg-amber-500/20 border-amber-500 text-white shadow ring-1 ring-amber-500'
                    : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-white'
                }`}
              >
                <ShoppingBag className="w-5 h-5 text-amber-400" />
                <span className="text-xs font-bold">🛍️ Takeaway</span>
                <span className="text-[10px] text-stone-400">Pick from branch</span>
              </button>

              <button
                type="button"
                onClick={() => setOrderType('dinein')}
                className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1 ${
                  orderType === 'dinein'
                    ? 'bg-emerald-500/20 border-emerald-500 text-white shadow ring-1 ring-emerald-500'
                    : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-white'
                }`}
              >
                <Utensils className="w-5 h-5 text-emerald-400" />
                <span className="text-xs font-bold">🍽️ Dine-In</span>
                <span className="text-[10px] text-stone-400">At our hall</span>
              </button>
            </div>
          </div>

          {/* Customer Personal Details */}
          <div className="bg-stone-950 border border-stone-800 p-4 rounded-2xl space-y-4">
            <span className="text-xs font-black uppercase tracking-wider text-stone-300 flex items-center gap-2">
              <User className="w-3.5 h-3.5 text-amber-400" />
              Customer Contact Information
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-stone-400">Your Full Name *</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Muhammad Ali"
                  className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-stone-400">Active Mobile Number *</label>
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="0300-1234567"
                  className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-500 font-mono"
                />
              </div>
            </div>
          </div>

          {/* Delivery Address or Dine-in Table */}
          {orderType === 'delivery' ? (
            <div className="bg-stone-950 border border-stone-800 p-4 rounded-2xl space-y-4">
              <span className="text-xs font-black uppercase tracking-wider text-stone-300 flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-red-400" />
                Delivery Address & Location
              </span>

              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-stone-400">Select City Zone / Area</label>
                  <select
                    value={areaZone}
                    onChange={(e) => setAreaZone(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  >
                    {deliveryAreas.map((area) => (
                      <option key={area} value={area}>
                        {area}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-stone-400">Complete Street Address, House/Apartment # & Landmark *</label>
                  <textarea
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="e.g. House # 12, Street 4, Sector B, Near Central Mosque..."
                    rows={2}
                    className="w-full bg-stone-900 border border-stone-800 rounded-xl p-3 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            </div>
          ) : orderType === 'dinein' ? (
            <div className="bg-stone-950 border border-stone-800 p-4 rounded-2xl space-y-3">
              <span className="text-xs font-black uppercase tracking-wider text-stone-300 flex items-center gap-2">
                <Utensils className="w-3.5 h-3.5 text-emerald-400" />
                Dine-In Table Information
              </span>
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-stone-400">Table Number / Family Booth *</label>
                <input
                  type="text"
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                  placeholder="e.g. Table 05 or Family Cabin 2"
                  className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          ) : (
            <div className="bg-stone-950 border border-stone-800 p-4 rounded-2xl space-y-2">
              <span className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-2">
                <ShoppingBag className="w-3.5 h-3.5" />
                Branch Pickup Information
              </span>
              <p className="text-xs text-stone-300">
                You can pick up your fresh order from the main Pizza Paradise takeaway counter (Ground Floor, Opposite Fitness Hub). Ready in approx 20 mins!
              </p>
            </div>
          )}

          {/* Payment Method */}
          <div className="bg-stone-950 border border-stone-800 p-4 rounded-2xl space-y-3">
            <span className="text-xs font-black uppercase tracking-wider text-stone-300 flex items-center gap-2">
              <Banknote className="w-3.5 h-3.5 text-emerald-400" />
              Payment Method
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setPaymentMethod('cash')}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  paymentMethod === 'cash'
                    ? 'bg-emerald-500/20 border-emerald-500 text-white ring-1 ring-emerald-500'
                    : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-white'
                }`}
              >
                <div className="text-xs font-bold text-white">💵 Cash On Delivery</div>
                <div className="text-[10px] text-stone-400 mt-0.5">Pay rider in cash</div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  paymentMethod === 'card'
                    ? 'bg-emerald-500/20 border-emerald-500 text-white ring-1 ring-emerald-500'
                    : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-white'
                }`}
              >
                <div className="text-xs font-bold text-white">💳 Card / POS Machine</div>
                <div className="text-[10px] text-stone-400 mt-0.5">Rider brings card terminal</div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('onlineTransfer')}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  paymentMethod === 'onlineTransfer'
                    ? 'bg-emerald-500/20 border-emerald-500 text-white ring-1 ring-emerald-500'
                    : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-white'
                }`}
              >
                <div className="text-xs font-bold text-white">📱 JazzCash / Easypaisa</div>
                <div className="text-[10px] text-stone-400 mt-0.5">Direct wallet transfer</div>
              </button>
            </div>
          </div>

          {/* Delivery Note */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-stone-400">Order & Delivery Notes (Optional)</label>
            <input
              type="text"
              value={specialNotes}
              onChange={(e) => setSpecialNotes(e.target.value)}
              placeholder="e.g. Ring bell twice, leave with security guard, extra napkins..."
              className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Error notice */}
          {errorMessage && (
            <div className="p-3 rounded-xl bg-red-950/80 border border-red-800 text-red-300 text-xs font-semibold">
              ⚠️ {errorMessage}
            </div>
          )}

          {/* Order Summary Recap */}
          <div className="bg-stone-950 border border-stone-800 p-4 rounded-2xl space-y-2 text-xs text-stone-300">
            <div className="flex justify-between">
              <span>Items Total ({items.length}):</span>
              <span className="font-mono">Rs. {subtotal.toLocaleString()}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-emerald-400">
                <span>Coupon Discount ({appliedCoupon?.code}):</span>
                <span className="font-mono">-Rs. {discount.toLocaleString()}</span>
              </div>
            )}
            {orderType === 'delivery' && (
              <div className="flex justify-between">
                <span>Delivery Charges:</span>
                <span className="font-mono">
                  {deliveryFee === 0 ? <span className="text-emerald-400 font-bold">FREE</span> : `Rs. ${deliveryFee}`}
                </span>
              </div>
            )}
            <div className="flex justify-between text-sm font-black text-white pt-2 border-t border-stone-800">
              <span>Total Payable Amount:</span>
              <span className="text-amber-400 text-lg font-mono">
                Rs. {grandTotal.toLocaleString()}
              </span>
            </div>
          </div>

        </div>

        {/* Modal Action Buttons */}
        <div className="p-5 bg-stone-950 border-t border-stone-800 grid grid-cols-1 sm:grid-cols-2 gap-3 sticky bottom-0 z-20">
          
          {/* WhatsApp Direct Order Button */}
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => handleCreateOrder(true)}
            className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-3.5 px-4 rounded-2xl shadow-lg transition transform active:scale-95"
            title="Send itemized order invoice directly to WhatsApp hotline"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Order via WhatsApp (03-111-786-676)</span>
          </button>

          {/* Direct Web Order Button */}
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => handleCreateOrder(false)}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 via-red-500 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-black text-xs sm:text-sm py-3.5 px-4 rounded-2xl shadow-xl shadow-red-600/30 transition transform active:scale-95"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isSubmitting ? 'Confirming Order...' : `Place Online Order (Rs. ${grandTotal.toLocaleString()})`}</span>
          </button>

        </div>

      </div>
    </div>
  );
};
