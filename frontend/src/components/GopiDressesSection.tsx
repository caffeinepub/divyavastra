import React from 'react';
import FeaturedProducts from './FeaturedProducts';
import { useProductsByCategory } from '../hooks/useQueries';

const GopiDressesSection: React.FC = () => {
  const { data: products = [], isLoading, isError } = useProductsByCategory('Gopi Dress');

  return (
    <section id="gopi-dresses" className="py-16 md:py-24 relative overflow-hidden">
      {/* Soft pink/rose background with warm glow */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(180deg, oklch(0.97 0.018 55) 0%, oklch(0.95 0.028 350) 50%, oklch(0.97 0.018 55) 100%)'
      }} />

      {/* Decorative radial glow - pink/crimson */}
      <div className="absolute top-0 left-0 w-80 h-80 opacity-10 pointer-events-none" style={{
        background: 'radial-gradient(circle, oklch(0.72 0.16 340) 0%, transparent 70%)'
      }} />
      <div className="absolute bottom-0 right-0 w-64 h-64 opacity-8 pointer-events-none" style={{
        background: 'radial-gradient(circle, oklch(0.45 0.22 18) 0%, transparent 70%)'
      }} />

      <div className="relative container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          {/* Golden floral divider image */}
          <div className="mb-4">
            <img
              src="/assets/generated/golden-floral-divider.dim_600x40.png"
              alt=""
              className="mx-auto max-w-xs w-full"
              style={{ height: '36px', objectFit: 'contain' }}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>

          {/* Decorative top */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 sm:w-16" style={{ background: 'linear-gradient(90deg, transparent, oklch(0.72 0.16 340))' }} />
            <span className="text-xl">🌸</span>
            <span className="font-body text-xs tracking-[0.3em] uppercase font-semibold" style={{ color: 'oklch(0.50 0.16 340)' }}>
              Divine Collection
            </span>
            <span className="text-xl">🌸</span>
            <div className="h-px w-12 sm:w-16" style={{ background: 'linear-gradient(90deg, oklch(0.72 0.16 340), transparent)' }} />
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-3" style={{ color: 'oklch(0.32 0.18 18)' }}>
            Gopi Dresses
          </h2>
          <p className="font-display text-sm tracking-widest uppercase mb-4" style={{ color: 'oklch(0.50 0.16 340)' }}>
            ✦ Radha Ki Bhakti ✦
          </p>

          <div className="gold-divider max-w-xs mx-auto mb-5" />

          <p className="font-body text-sm sm:text-base md:text-lg max-w-xl mx-auto" style={{ color: 'oklch(0.40 0.06 30)' }}>
            Beautifully crafted Gopi Dresses inspired by the divine love of Radha and Krishna.
            Perfect for Janmashtami, Holi, and all devotional celebrations.
          </p>
        </div>

        {/* Products */}
        <FeaturedProducts
          products={products}
          isLoading={isLoading}
          isError={isError}
          accentColor="pink"
        />

        {/* Bottom decorative element */}
        {!isLoading && products.length > 0 && (
          <div className="flex items-center justify-center mt-12 gap-3">
            <div className="h-px w-20 sm:w-24" style={{ background: 'linear-gradient(90deg, transparent, oklch(0.72 0.16 340))' }} />
            <span style={{ color: 'oklch(0.72 0.16 340)', fontSize: '20px' }}>🌸</span>
            <div className="h-px w-20 sm:w-24" style={{ background: 'linear-gradient(90deg, oklch(0.72 0.16 340), transparent)' }} />
          </div>
        )}
      </div>

      {/* Jaipuri border bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden" style={{ height: '8px' }}>
        <div className="w-full h-full" style={{
          background: 'linear-gradient(90deg, oklch(0.72 0.16 340), oklch(0.45 0.22 18), oklch(0.75 0.18 75), oklch(0.45 0.22 18), oklch(0.72 0.16 340))'
        }} />
      </div>
    </section>
  );
};

export default GopiDressesSection;
