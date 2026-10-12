import React, { useState } from 'react';
import { X, Trash2, ArrowRight, ShieldCheck, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (index: number, quantity: number) => void;
  onRemoveItem: (index: number) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}) => {
  if (!isOpen) return null;

  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');

  const subtotal = items.reduce((acc, curr) => acc + curr.product.price * curr.quantity, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const shippingThreshold = 150;
  const freeShipping = subtotal >= shippingThreshold || subtotal === 0;
  const shippingCost = freeShipping ? 0 : 15;
  const total = Math.max(0, subtotal - discountAmount + shippingCost);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'KINETIC10') {
      setDiscountPercent(10);
      setPromoMessage('10% Community Protocol Discount Applied');
    } else {
      setPromoMessage('Invalid code. Use KINETIC10 for 10% off');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <aside
          aria-label="Shopping Bag Drawer"
          className="w-screen max-w-md bg-[#0d0d12] border-l border-zinc-800 text-white flex flex-col justify-between shadow-2xl z-10"
        >
          {/* Drawer Header */}
          <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#ff5500]" />
              <h3 className="text-xl font-bold uppercase tracking-tight font-heading">
                Shopping Bag ({items.reduce((s, i) => s + i.quantity, 0)})
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-white border border-zinc-800 rounded bg-zinc-900"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="bg-zinc-950 px-6 py-3 border-b border-zinc-800/80">
            <div className="flex justify-between text-xs font-mono mb-1.5 text-zinc-400">
              <span>{freeShipping ? 'Free Global Shipping Unlocked' : `$${shippingThreshold - subtotal} Away from Free Delivery`}</span>
              <span className="text-[#ff5500]">{Math.min(100, Math.round((subtotal / shippingThreshold) * 100))}%</span>
            </div>
            <div className="w-full bg-zinc-800 h-1 overflow-hidden">
              <div
                className="bg-[#ff5500] h-full transition-all duration-300"
                style={{ width: `${Math.min(100, (subtotal / shippingThreshold) * 100)}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <ShoppingBag className="w-10 h-10 text-zinc-600 mx-auto" />
                <p className="text-sm font-mono text-zinc-400 uppercase">Your bag is empty</p>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-xs font-mono uppercase border border-zinc-700 text-white"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              items.map((item, idx) => (
                <div
                  key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}-${idx}`}
                  className="flex gap-4 p-3 bg-zinc-950 border border-zinc-800/80"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-18 h-22 object-cover object-center filter grayscale contrast-125 border border-zinc-800 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="text-sm font-bold uppercase font-heading leading-tight text-white">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(idx)}
                          className="text-zinc-500 hover:text-red-400 p-0.5 ml-2"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] font-mono text-zinc-400 mt-1">
                        Size: <strong className="text-zinc-200">{item.selectedSize}</strong> · Color: {item.selectedColor}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-zinc-800 bg-zinc-900 text-xs font-mono">
                        <button
                          onClick={() => onUpdateQuantity(idx, Math.max(1, item.quantity - 1))}
                          className="px-2 py-0.5 text-zinc-400 hover:text-white"
                        >
                          -
                        </button>
                        <span className="px-2 py-0.5 text-white font-bold">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                          className="px-2 py-0.5 text-zinc-400 hover:text-white"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-sm font-mono font-bold text-white tabular-nums">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer with Subtotal & Checkout */}
          {items.length > 0 && (
            <div className="p-6 border-t border-zinc-800 bg-zinc-950 space-y-4">
              {/* Promo input */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Code (e.g. KINETIC10)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 p-2 bg-zinc-900 border border-zinc-800 text-xs font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff5500]"
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-xs font-mono uppercase text-white"
                >
                  Apply
                </button>
              </form>
              {promoMessage && (
                <div className="text-[11px] font-mono text-[#ff5500]">{promoMessage}</div>
              )}

              {/* Pricing breakdown */}
              <div className="space-y-1.5 text-xs font-mono border-t border-zinc-800 pt-3">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal</span>
                  <span className="text-white">${subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#ff5500]">
                    <span>Community Protocol (-{discountPercent}%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-zinc-400">
                  <span>Shipping</span>
                  <span>{freeShipping ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-zinc-800">
                  <span>Total Due</span>
                  <span className="font-mono text-[#ff5500]">${total.toFixed(2)} USD</span>
                </div>
              </div>

              {/* Action */}
              <button
                onClick={onCheckout}
                className="w-full py-4 bg-[#ff5500] hover:bg-[#e04b00] text-black font-extrabold uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </button>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};
