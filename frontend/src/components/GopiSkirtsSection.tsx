import React from 'react';
import { AlertCircle, Package } from 'lucide-react';
import ProductCard from './ProductCard';
import { useProductsByCategory } from '../hooks/useQueries';

const SkeletonCard: React.FC = () => (
  <div className="rounded-sm overflow-hidden animate-pulse" style={{ border: '1px solid oklch(0.78 0.16 80 / 0.25)' }}>
    <div className="h-1" style={{ background: 'oklch(0.78 0.16 80 / 0.4)' }} />
    <div style={{ aspectRatio: '3/4', background: 'oklch(0.93 0.02 240 / 0.3)' }} />
    <div className="p-4 space-y-3">
      <div className="h-5 rounded" style={{ background: 'oklch(0.88 0.03 80)', width: '70%' }} />
      <div className="h-4 rounded" style={{ background: 'oklch(0.93 0.02 80)', width: '90%' }} />
      <div className="h-4 rounded" style={{ background: 'oklch(0.93 0.02 80)', width: '60%' }} />
      <div className="flex justify-between items-center pt-2">
        <div className="h-6 rounded" style={{ background: 'oklch(0.88 0.03 80)', width: '30%' }} />
        <div className="h-8 rounded-sm" style={{ background: 'oklch(0.88 0.03 80)', width: '35%' }} />
      </div>
    </div>
  </div>
);

const GopiSkirtsSection: React.FC = () => {
  const { data: products = [], isLoading, isError } = useProductsByCategory('Gopi Skirt');

  return (
    <section id="gopi-skirts" className="py-16 md:py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(180deg, oklch(0.97 0.015 85) 0%, oklch(0.94 0.02 240 / 0.15) 50%, oklch(0.97 0.015 85) 100%)'
      }} />

      {/* Decorative peacock feather bg element */}
      <div className="absolute top-0 right-0 w-64 h-64 opacity-5 pointer-events-none" style={{
        background: 'radial-gradient(circle, oklch(0.32 0.09 240) 0%, transparent 70%)'
      }} />

      <div className="relative container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          {/* Decorative top */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-16" style={{ background: 'linear-gradient(90deg, transparent, oklch(0.78 0.16 80))' }} />
            <span className="text-2xl">🦚</span>
            <span className="font-body text-xs tracking-[0.3em] uppercase font-semibold" style={{ color: 'oklch(0.72 0.18 55)' }}>
              Divine Collection
            </span>
            <span className="text-2xl">🦚</span>
            <div className="h-px w-16" style={{ background: 'linear-gradient(90deg, oklch(0.78 0.16 80), transparent)' }} />
          </div>

          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-3" style={{ color: 'oklch(0.22 0.07 240)' }}>
            Gopi Skirts
          </h2>
          <p className="font-display text-sm tracking-widest uppercase mb-4" style={{ color: 'oklch(0.72 0.18 55)' }}>
            ✦ Inspired by Vrindavan ✦
          </p>

          <div className="gold-divider max-w-xs mx-auto mb-5" />

          <p className="font-body text-base md:text-lg max-w-xl mx-auto" style={{ color: 'oklch(0.45 0.04 260)' }}>
            Each skirt is crafted with love, celebrating the vibrant spirit of Radha's divine grace.
            Perfect for festivals, pujas, and every joyful occasion.
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* Error State */}
        {isError && !isLoading && (
          <div className="flex flex-col items-center justify-center py-16 gap-4">
            <AlertCircle size={48} style={{ color: 'oklch(0.72 0.18 55)' }} />
            <p className="font-heading text-xl" style={{ color: 'oklch(0.22 0.07 240)' }}>
              Unable to load products
            </p>
            <p className="font-body text-sm" style={{ color: 'oklch(0.45 0.04 260)' }}>
              Please try refreshing the page.
            </p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !isError && products.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 gap-4">
            <Package size={48} style={{ color: 'oklch(0.72 0.18 55)' }} />
            <p className="font-heading text-xl" style={{ color: 'oklch(0.22 0.07 240)' }}>
              Collection coming soon
            </p>
            <p className="font-body text-sm" style={{ color: 'oklch(0.45 0.04 260)' }}>
              Our beautiful Gopi skirts will be available shortly.
            </p>
          </div>
        )}

        {/* Products Grid */}
        {!isLoading && !isError && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} accentColor="peacock" />
            ))}
          </div>
        )}

        {/* Bottom decorative element */}
        {!isLoading && products.length > 0 && (
          <div className="flex items-center justify-center mt-12 gap-3">
            <div className="h-px w-24" style={{ background: 'linear-gradient(90deg, transparent, oklch(0.78 0.16 80))' }} />
            <span style={{ color: 'oklch(0.78 0.16 80)', fontSize: '20px' }}>🦚</span>
            <div className="h-px w-24" style={{ background: 'linear-gradient(90deg, oklch(0.78 0.16 80), transparent)' }} />
          </div>
        )}
      </div>
    </section>
  );
};

export default GopiSkirtsSection;
