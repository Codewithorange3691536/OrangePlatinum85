/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CurriculumSection } from './components/CurriculumSection';
import { ProductCatalog } from './components/ProductCatalog';
import { CoachProfiles } from './components/CoachProfiles';
import { MemberStories } from './components/MemberStories';
import { CommunitySection } from './components/CommunitySection';
import { Footer } from './components/Footer';
import { GrainParallax } from './components/GrainParallax';
import { StickyTrialBar } from './components/StickyTrialBar';
import { ProductDetailModal } from './components/ProductDetailModal';
import { TrialBookingModal } from './components/TrialBookingModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { Product, CartItem } from './types';
import { PRODUCTS } from './data/storeData';

export default function App() {
  // Shopping Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: PRODUCTS[0],
      selectedSize: 'L',
      selectedColor: 'Pure Obsidian',
      quantity: 1
    }
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Modals state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isTrialModalOpen, setIsTrialModalOpen] = useState(false);
  const [trialGoalId, setTrialGoalId] = useState<string | null>(null);
  const [trialCoachId, setTrialCoachId] = useState<string | null>(null);

  // Goal-based catalog filter
  const [catalogGoalFilter, setCatalogGoalFilter] = useState<string | null>(null);

  const totalCartCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  // Cart operations
  const handleAddToCart = (product: Product, size: string, color: string, quantity = 1) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === size &&
          item.selectedColor === color
      );
      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity += quantity;
        return next;
      } else {
        return [...prev, { product, selectedSize: size, selectedColor: color, quantity }];
      }
    });
    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (index: number, quantity: number) => {
    setCartItems((prev) => {
      const next = [...prev];
      next[index].quantity = quantity;
      return next;
    });
  };

  const handleRemoveCartItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleOrderSuccess = () => {
    setCartItems([]);
  };

  // Navigations & triggers
  const handleExploreApparel = () => {
    const el = document.getElementById('collection');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectGoalApparel = (goalId: string) => {
    setCatalogGoalFilter(goalId);
    const el = document.getElementById('collection');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBookGoalTrial = (goalId: string) => {
    setTrialGoalId(goalId);
    setTrialCoachId(null);
    setIsTrialModalOpen(true);
  };

  const handleBookWithCoach = (coachId: string) => {
    setTrialCoachId(coachId);
    setTrialGoalId(null);
    setIsTrialModalOpen(true);
  };

  const handleExploreGearFromStory = (gearName: string) => {
    const found = PRODUCTS.find((p) => gearName.toLowerCase().includes(p.name.toLowerCase().split(' ')[0]));
    if (found) {
      setSelectedProduct(found);
    } else {
      handleExploreApparel();
    }
  };

  return (
    <div className="min-h-screen bg-[#08080a] text-zinc-100 selection:bg-[#ff5500] selection:text-black font-body relative overflow-x-hidden">
      {/* Drifting grain parallax overlay */}
      <GrainParallax />

      {/* Top Bar Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenTrialModal={() => {
          setTrialGoalId(null);
          setTrialCoachId(null);
          setIsTrialModalOpen(true);
        }}
      />

      {/* Hero Section */}
      <HeroSection
        onOpenTrialModal={() => {
          setTrialGoalId(null);
          setTrialCoachId(null);
          setIsTrialModalOpen(true);
        }}
        onExploreApparel={handleExploreApparel}
      />

      {/* Curriculum by Goals */}
      <CurriculumSection
        onSelectGoalApparel={handleSelectGoalApparel}
        onBookGoalTrial={handleBookGoalTrial}
      />

      {/* Performance Apparel Catalog */}
      <ProductCatalog
        onQuickView={(prod) => setSelectedProduct(prod)}
        onAddToCart={(prod, size, color) => handleAddToCart(prod, size, color, 1)}
        selectedGoalFilter={catalogGoalFilter}
        onClearGoalFilter={() => setCatalogGoalFilter(null)}
      />

      {/* 3D Flip Coach Profiles */}
      <CoachProfiles onBookWithCoach={handleBookWithCoach} />

      {/* Transformation Member Stories with Rubber-band Drag */}
      <MemberStories onExploreGear={handleExploreGearFromStory} />

      {/* Community Doctrine & Belonging */}
      <CommunitySection
        onJoinCommunity={() => {
          setTrialGoalId(null);
          setTrialCoachId(null);
          setIsTrialModalOpen(true);
        }}
      />

      {/* Footer */}
      <Footer
        onOpenTrialModal={() => {
          setTrialGoalId(null);
          setTrialCoachId(null);
          setIsTrialModalOpen(true);
        }}
        onSelectCategory={() => {
          setCatalogGoalFilter(null);
          handleExploreApparel();
        }}
      />

      {/* Sticky Bottom Trial Bar on scroll */}
      <StickyTrialBar
        onOpenTrialModal={() => {
          setTrialGoalId(null);
          setTrialCoachId(null);
          setIsTrialModalOpen(true);
        }}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(prod, size, color, qty) => handleAddToCart(prod, size, color, qty)}
      />

      {/* Book a Trial Class Modal */}
      <TrialBookingModal
        isOpen={isTrialModalOpen}
        onClose={() => setIsTrialModalOpen(false)}
        preselectedGoalId={trialGoalId}
        preselectedCoachId={trialCoachId}
      />

      {/* Shopping Bag Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onOrderSuccess={handleOrderSuccess}
      />
    </div>
  );
}
