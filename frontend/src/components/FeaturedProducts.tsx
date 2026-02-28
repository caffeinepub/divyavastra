import React from 'react';
import { Loader2, AlertCircle, Package } from 'lucide-react';
import ProductCard from './ProductCard';
import type { Product } from '../backend';

interface FeaturedProductsProps {
  products: Product[];
  isLoading: boolean;
  isError: boolean;
}

const SkeletonCard: React.FC = () => (
  <div className="rounded-sm overflow-hidden animate-pulse" style={{ border: '1px solid oklch(0.88 0.03 55)' }}>
    <div className="h-1" style={{ background: 'oklch(0.88 0.03 55)' }} />
    <div style={{ aspectRatio: '3/4', background: 'oklch(0.93 0.02 60)' }} />
    <div className="p-4 space-y-3">
      <div className="h-5 rounded" style={{ background: 'oklch(0.88 0.03 55)', width: '70%' }} />
      <div className="h-4 rounded" style={{ background: 'oklch(0.93 0.02 60)', width: '90%' }} />
      <div className="h-4 rounded" style={{ background: 'oklch(0.93 0.02 60)', width: '60%' }} />
      <div className="flex justify-between items-center pt-2">
        <div className="h-6 rounded" style={{ background: 'oklch(0.88 0.03 55)', width: '30%' }} />
        <div className="h-8 rounded-sm" style={{ background: 'oklch(0.88 0.03 55)', width: '35%' }} />
      </div>
    </div>
  </div>
);

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ products, isLoading, isError }) => {
  return (
    <section id="collection" className="py-16 md:py-24" style={{ background: 'oklch(0.97 0.012 75)' }}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-16" style={{ background: 'linear-gradient(90deg, transparent, oklch(0.78 0.16 80))' }} />
            <span className="font-body text-xs tracking-[0.3em] uppercase font-semibold" style={{ color: 'oklch(0.72 0.18 55)' }}>
              ✦ Our Collection ✦
            </span>
            <div className="h-px w-16" style={{ background: 'linear-gradient(90deg, oklch(0.78 0.16 80), transparent)' }} />
          </div>

          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4" style={{ color: 'oklch(0.38 0.16 18)' }}>
            Gopi Skirts Collection
          </h2>

          <div className="gold-divider max-w-xs mx-auto mb-4" />

          <p className="font-body text-base md:text-lg max-w-xl mx-auto" style={{ color: 'oklch(0.45 0.04 30)' }}>
            Each skirt is crafted with love, celebrating the vibrant spirit of traditional Indian fashion.
            Perfect for festivals, pujas, and every joyful occasion.
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* Error State */}
        {isError && !isLoading && (
          <div className="flex flex-col items-center justify-center py-16 gap-4">
            <AlertCircle size={48} style={{ color: 'oklch(0.72 0.18 55)' }} />
            <p className="font-heading text-xl" style={{ color: 'oklch(0.38 0.16 18)' }}>
              Unable to load products
            </p>
            <p className="font-body text-sm" style={{ color: 'oklch(0.45 0.04 30)' }}>
              Please try refreshing the page.
            </p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !isError && products.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 gap-4">
            <Package size={48} style={{ color: 'oklch(0.72 0.18 55)' }} />
            <p className="font-heading text-xl" style={{ color: 'oklch(0.38 0.16 18)' }}>
              Collection coming soon
            </p>
            <p className="font-body text-sm" style={{ color: 'oklch(0.45 0.04 30)' }}>
              Our beautiful Gopi skirts will be available shortly.
            </p>
          </div>
        )}

        {/* Products Grid */}
        {!isLoading && !isError && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Bottom decorative element */}
        {!isLoading && products.length > 0 && (
          <div className="flex items-center justify-center mt-12 gap-3">
            <div className="h-px w-24" style={{ background: 'linear-gradient(90deg, transparent, oklch(0.78 0.16 80))' }} />
            <span style={{ color: 'oklch(0.78 0.16 80)' }}>✦</span>
            <div className="h-px w-24" style={{ background: 'linear-gradient(90deg, oklch(0.78 0.16 80), transparent)' }} />
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
