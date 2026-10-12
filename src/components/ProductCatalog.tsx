import React, { useState } from 'react';
import { ShoppingBag, Eye, Check, SlidersHorizontal } from 'lucide-react';
import { Product, CategoryType } from '../types';
import { PRODUCTS } from '../data/storeData';

interface ProductCatalogProps {
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, size: string, color: string) => void;
  selectedGoalFilter: string | null;
  onClearGoalFilter: () => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  onQuickView,
  onAddToCart,
  selectedGoalFilter,
  onClearGoalFilter
}) => {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('all');
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  // Filter products based on category and optional goal filter
  const filteredProducts = PRODUCTS.filter((item) => {
    if (selectedGoalFilter && item.curriculumGoalId !== selectedGoalFilter) {
      return false;
    }
    if (activeCategory === 'all') return true;
    if (activeCategory === 'tshirt') return item.category === 'tshirt';
    if (activeCategory === 'shirt') return item.category === 'shirt';
    if (activeCategory === 'mens') return item.demographic === 'mens';
    if (activeCategory === 'womens') return item.demographic === 'womens';
    if (activeCategory === 'children') return item.demographic === 'children';
    return true;
  });

  const handleQuickAdd = (product: Product) => {
    const defaultSize = product.sizes[0];
    const defaultColor = product.colorways[0];
    onAddToCart(product, defaultSize, defaultColor);
    setAddedProductId(product.id);
    setTimeout(() => {
      setAddedProductId(null);
    }, 1500);
  };

  return (
    <section id="collection" className="py-24 bg-[#08080a] border-b border-zinc-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-zinc-800/80">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#ff5500] font-mono font-semibold mb-2">
              Performance Apparel
            </div>
            <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white font-heading">
              Apparel Collection
            </h2>
          </div>

          <div className="text-xs uppercase tracking-wider text-zinc-400 font-mono flex items-center gap-2">
            <span>High-Contrast Monochrome</span>
            <span aria-hidden="true">·</span>
            <span className="text-zinc-200">{filteredProducts.length} Specifications</span>
          </div>
        </div>

        {/* Goal filter active banner */}
        {selectedGoalFilter && (
          <div className="mt-6 flex items-center justify-between p-3 bg-zinc-900 border border-[#ff5500]/50 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#ff5500]" />
              <span className="text-zinc-300 font-mono">
                Filtering by Curriculum Goal: <strong className="text-white uppercase">{selectedGoalFilter}</strong>
              </span>
            </div>
            <button
              onClick={onClearGoalFilter}
              className="text-[#ff5500] hover:text-white underline font-mono uppercase"
            >
              Reset Filter
            </button>
          </div>
        )}

        {/* Segmented Category Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2 py-8">
          {(
            [
              { key: 'all', label: 'All Catalog' },
              { key: 'tshirt', label: 'T-Shirts' },
              { key: 'shirt', label: 'Shirts' },
              { key: 'mens', label: "Men's" },
              { key: 'womens', label: "Women's" },
              { key: 'children', label: 'Children' }
            ] as { key: CategoryType; label: string }[]
          ).map((tab) => {
            const isActive = activeCategory === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveCategory(tab.key)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-150 border ${
                  isActive
                    ? 'bg-zinc-100 text-black border-white shadow-sm'
                    : 'bg-zinc-950/80 text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-700'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* 3-Column Responsive Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product) => {
            const isAdded = addedProductId === product.id;
            return (
              <div
                key={product.id}
                className="group relative bg-[#0e0e12] border border-zinc-800/90 hover:border-zinc-700 transition-all duration-200 flex flex-col justify-between"
              >
                {/* Product Image Slot (65-75% height) */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-950">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center filter grayscale contrast-125 transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />

                  {/* Fallback pattern */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute top-3 left-3 bg-black/80 border border-zinc-700/80 px-2 py-0.5 text-[11px] font-mono uppercase tracking-wider text-zinc-200">
                      {product.badge}
                    </div>
                  )}

                  {/* Weight tag */}
                  <div className="absolute top-3 right-3 bg-black/80 border border-zinc-700/80 px-2 py-0.5 text-[11px] font-mono text-[#c0c5ce]">
                    {product.weightGsm} GSM
                  </div>

                  {/* Quick Action Overlay on desktop hover */}
                  <div className="absolute inset-x-3 bottom-3 flex items-center gap-2 opacity-95 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
                    <button
                      onClick={() => onQuickView(product)}
                      className="flex-1 py-2.5 px-3 bg-zinc-900/90 hover:bg-zinc-800 text-white text-xs font-semibold tracking-wider uppercase border border-zinc-700/80 flex items-center justify-center gap-1.5 backdrop-blur-sm"
                    >
                      <Eye className="w-3.5 h-3.5 text-zinc-300" />
                      <span>Specifications</span>
                    </button>
                    <button
                      onClick={() => handleQuickAdd(product)}
                      className={`flex-1 py-2.5 px-3 text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-1.5 transition-all ${
                        isAdded
                          ? 'bg-emerald-500 text-black'
                          : 'bg-[#ff5500] hover:bg-[#e04b00] text-black'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Quick Add</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Product Metadata & Info (High Information Density) */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    {/* Clean unboxed metadata with dot separators */}
                    <div className="flex items-center gap-2 text-xs font-mono uppercase text-zinc-400">
                      <span>{product.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{product.demographic}</span>
                      <span aria-hidden="true">·</span>
                      <span>{product.sizes.length} Sizes</span>
                    </div>

                    <h3 className="text-xl font-bold uppercase tracking-tight text-white font-heading leading-tight group-hover:text-[#ff5500] transition-colors">
                      {product.name}
                    </h3>

                    <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                      {product.fabricSpec}
                    </p>
                  </div>

                  {/* Price & Primary Buy */}
                  <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-zinc-400 font-mono mr-1">USD</span>
                      <span className="text-xl font-bold text-white font-mono tabular-nums">
                        ${product.price}
                      </span>
                    </div>

                    <div className="text-[11px] font-mono text-zinc-400">
                      Ships 24h
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
