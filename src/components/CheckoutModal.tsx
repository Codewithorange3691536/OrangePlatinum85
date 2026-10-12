import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, Truck, CreditCard } from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderSuccess
}) => {
  if (!isOpen) return null;

  const [isOrdered, setIsOrdered] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [shippingDetails, setShippingDetails] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'United States'
  });

  const subtotal = items.reduce((s, i) => s + i.product.price * i.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const orderId = `KN-ORD-${Math.floor(10000 + Math.random() * 90000)}`;
    setOrderNumber(orderId);
    setIsOrdered(true);
    onOrderSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl bg-[#0e0e13] border border-zinc-800 shadow-2xl text-left my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white border border-zinc-800 bg-zinc-900 rounded-md transition-colors"
          aria-label="Close checkout"
        >
          <X className="w-5 h-5" />
        </button>

        {isOrdered ? (
          <div className="p-8 sm:p-12 text-center space-y-6">
            <div className="w-16 h-16 bg-[#ff5500]/10 border border-[#ff5500] text-[#ff5500] mx-auto flex items-center justify-center rounded-full">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <div className="text-xs uppercase tracking-widest text-[#ff5500] font-mono">
                Order Confirmed · Preparing Shipment
              </div>
              <h3 className="text-3xl font-black uppercase text-white font-heading">
                Order #{orderNumber}
              </h3>
              <p className="text-sm text-zinc-300 max-w-md mx-auto">
                Thank you, <strong className="text-white">{shippingDetails.fullName}</strong>. Your KINETIC NOIR technical gear is being packaged in our climate-sealed apparel facility.
              </p>
            </div>

            <div className="bg-zinc-950 border border-zinc-800 p-4 max-w-md mx-auto text-left text-xs font-mono space-y-2">
              <div className="flex justify-between text-zinc-400">
                <span>Destination:</span>
                <span className="text-white font-bold">{shippingDetails.address}, {shippingDetails.city}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Estimated Delivery:</span>
                <span className="text-emerald-400 font-bold">2 - 3 Business Days</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Tracking Notification:</span>
                <span className="text-zinc-200">{shippingDetails.email}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="px-8 py-3.5 bg-[#ff5500] hover:bg-[#e04b00] text-black font-extrabold uppercase tracking-wider text-xs transition-colors"
            >
              Continue Exploring
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-6">
            <div>
              <div className="text-xs uppercase tracking-widest text-[#ff5500] font-mono font-semibold mb-1">
                Direct-From-Atelier Fulfillment
              </div>
              <h3 className="text-2xl sm:text-3xl font-black uppercase text-white font-heading">
                Order Dispatch
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Orders ship in tamper-resistant matte black carbon packaging with lifetime structural stitch warranty.
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-1">
                  Recipient Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jordan Cross"
                  value={shippingDetails.fullName}
                  onChange={(e) => setShippingDetails({ ...shippingDetails, fullName: e.target.value })}
                  className="w-full p-2.5 bg-zinc-950 border border-zinc-800 text-sm text-white focus:border-[#ff5500] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-1">
                  Email Dispatch Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="jordan@domain.com"
                  value={shippingDetails.email}
                  onChange={(e) => setShippingDetails({ ...shippingDetails, email: e.target.value })}
                  className="w-full p-2.5 bg-zinc-950 border border-zinc-800 text-sm text-white focus:border-[#ff5500] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-1">
                  Delivery Address *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Street Address or Facility Bay"
                  value={shippingDetails.address}
                  onChange={(e) => setShippingDetails({ ...shippingDetails, address: e.target.value })}
                  className="w-full p-2.5 bg-zinc-950 border border-zinc-800 text-sm text-white focus:border-[#ff5500] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Metropolis"
                    value={shippingDetails.city}
                    onChange={(e) => setShippingDetails({ ...shippingDetails, city: e.target.value })}
                    className="w-full p-2.5 bg-zinc-950 border border-zinc-800 text-sm text-white focus:border-[#ff5500] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-1">
                    Postal Code *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="90210"
                    value={shippingDetails.postalCode}
                    onChange={(e) => setShippingDetails({ ...shippingDetails, postalCode: e.target.value })}
                    className="w-full p-2.5 bg-zinc-950 border border-zinc-800 text-sm text-white focus:border-[#ff5500] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Total and Order Button */}
            <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-zinc-400">Total: </span>
                <strong className="text-lg font-mono text-white">${subtotal.toFixed(2)} USD</strong>
              </div>
              <button
                type="submit"
                className="px-8 py-3.5 bg-[#ff5500] hover:bg-[#e04b00] text-black font-extrabold uppercase tracking-wider text-xs transition-colors"
              >
                Place Official Order
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
