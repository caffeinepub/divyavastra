import React from 'react';
import FeaturedProducts from './FeaturedProducts';
import { useProductsByCategory } from '../hooks/useQueries';

const SareesSection: React.FC = () => {
  const { data: products = [], isLoading, isError } = useProductsByCategory('Saree');

  return (
    <section id="sarees" className="py-16 md:py-24 relative overflow-hidden">
      {/* Deep red/golden background */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(180deg, oklch(0.97 0.018 55) 0%, oklch(0.95 0.030 30) 50%, oklch(0.97 0.018 55) 100%)'
      }} />

      {/* Decorative golden glow elements */}
      <div className="absolute top-0 right-0 w-80 h-80 opacity-10 pointer-events-none" style={{
        background: 'radial-gradient(circle, oklch(0.75 0.18 75) 0%, transparent 70%)'
      }} />
      <div className="absolute bottom-0 left-0 w-64 h-64 opacity-8 pointer-events-none" style={{
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
            <div className="h-px w-12 sm:w-16" style={{ background: 'linear-gradient(90deg, transparent, oklch(0.75 0.18 75))' }} />
            <span className="text-xl">✨</span>
            <span className="font-body text-xs tracking-[0.3em] uppercase font-semibold" style={{ color: 'oklch(0.55 0.16 70)' }}>
              Timeless Elegance
            </span>
            <span className="text-xl">✨</span>
            <div className="h-px w-12 sm:w-16" style={{ background: 'linear-gradient(90deg, oklch(0.75 0.18 75), transparent)' }} />
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-3" style={{ color: 'oklch(0.32 0.18 18)' }}>
            Sarees
          </h2>
          <p className="font-display text-sm tracking-widest uppercase mb-4" style={{ color: 'oklch(0.55 0.16 70)' }}>
            ✦ Grace &amp; Tradition ✦
          </p>

          <div className="gold-divider max-w-xs mx-auto mb-5" />

          <p className="font-body text-sm sm:text-base md:text-lg max-w-xl mx-auto" style={{ color: 'oklch(0.40 0.06 30)' }}>
            Drape yourself in the timeless beauty of our handpicked saree collection — 
            from silk to georgette, each saree tells a story of grace and tradition.
          </p>
        </div>

        {/* Products */}
        <FeaturedProducts
          products={products}
          isLoading={isLoading}
          isError={isError}
          accentColor="golden"
        />

        {/* Bottom decorative element */}
        {!isLoading && products.length > 0 && (
          <div className="flex items-center justify-center mt-12 gap-3">
            <div className="h-px w-20 sm:w-24" style={{ background: 'linear-gradient(90deg, transparent, oklch(0.75 0.18 75))' }} />
            <span style={{ color: 'oklch(0.75 0.18 75)', fontSize: '20px' }}>✨</span>
            <div className="h-px w-20 sm:w-24" style={{ background: 'linear-gradient(90deg, oklch(0.75 0.18 75), transparent)' }} />
          </div>
        )}
      </div>

      {/* Jaipuri border bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden" style={{ height: '8px' }}>
        <div className="w-full h-full" style={{
          background: 'linear-gradient(90deg, oklch(0.75 0.18 75), oklch(0.45 0.22 18), oklch(0.72 0.16 340), oklch(0.45 0.22 18), oklch(0.75 0.18 75))'
        }} />
      </div>
    </section>
  );
};

export default SareesSection;
