import React, { useState } from 'react';
import { X, ShoppingBag, Check, ShieldCheck, Ruler, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, color: string, quantity: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart
}) => {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState<string>(product.colorways[0] || 'Pure Obsidian');
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, selectedSize, selectedColor, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#0e0e13] border border-zinc-800 shadow-2xl text-left my-8 grid grid-cols-1 md:grid-cols-12 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-zinc-400 hover:text-white border border-zinc-800 bg-zinc-900 rounded-md transition-colors"
          aria-label="Close product view"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: High-Contrast Visual */}
        <div className="md:col-span-6 relative aspect-square md:aspect-auto min-h-[380px] bg-black">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover object-center filter grayscale contrast-125"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

          {/* GSM Stamp */}
          <div className="absolute bottom-4 left-4 bg-black/90 border border-zinc-700/80 px-3 py-1.5 text-xs font-mono text-[#c0c5ce]">
            <span>DENSITY: </span>
            <strong className="text-white font-bold">{product.weightGsm} GSM</strong>
          </div>
        </div>

        {/* Right Column: High Information Density Specifications & Purchasing */}
        <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* Metadata */}
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-zinc-400">
              <span className="text-[#ff5500] font-bold">{product.badge || 'KINETIC SPEC'}</span>
              <span aria-hidden="true">·</span>
              <span>{product.category}</span>
              <span aria-hidden="true">·</span>
              <span>{product.demographic}</span>
            </div>

            {/* Title & Price */}
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white font-heading">
                {product.name}
              </h3>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-white font-mono tabular-nums">
                  ${product.price}
                </span>
                <span className="text-xs font-mono text-zinc-400">USD (Tax Included)</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {product.description}
            </p>

            {/* Technical Spec List */}
            <div className="space-y-1.5 pt-2 border-t border-zinc-800">
              <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                Fabric Architecture:
              </div>
              <div className="text-xs font-mono text-zinc-200 bg-zinc-950 p-2.5 border border-zinc-800/80">
                {product.fabricSpec}
              </div>
            </div>

            {/* Colorway Selection */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                Colorway: <span className="text-white">{selectedColor}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {product.colorways.map((col) => (
                  <button
                    key={col}
                    onClick={() => setSelectedColor(col)}
                    className={`px-3 py-1.5 text-xs font-mono uppercase border transition-colors ${
                      selectedColor === col
                        ? 'bg-zinc-200 text-black border-white font-bold'
                        : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:border-zinc-600'
                    }`}
                  >
                    {col}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                  Select Size: <span className="text-white">{selectedSize}</span>
                </label>
                <span className="text-[11px] font-mono text-zinc-500">True to Athletic Size</span>
              </div>
              <div className="grid grid-cols-5 gap-1.5">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`py-2 text-xs font-mono font-bold uppercase border transition-colors ${
                      selectedSize === s
                        ? 'bg-[#ff5500] text-black border-[#ff5500]'
                        : 'bg-zinc-950 text-zinc-300 border-zinc-800 hover:border-zinc-600'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Stepper */}
            <div className="flex items-center gap-3 pt-2">
              <span className="text-xs font-mono uppercase text-zinc-400">Quantity:</span>
              <div className="flex items-center border border-zinc-800 bg-zinc-950 font-mono text-xs">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 text-zinc-400 hover:text-white"
                >
                  -
                </button>
                <span className="px-3 py-1.5 text-white font-bold">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1.5 text-zinc-400 hover:text-white"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Action */}
          <div className="pt-4 border-t border-zinc-800">
            <button
              onClick={handleAdd}
              className={`w-full py-4 text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                isAdded
                  ? 'bg-emerald-500 text-black'
                  : 'bg-[#ff5500] hover:bg-[#e04b00] text-black'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Shopping Bag</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag — ${(product.price * quantity).toFixed(2)}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
