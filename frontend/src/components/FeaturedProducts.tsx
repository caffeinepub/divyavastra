import React from 'react';
import { AlertCircle, Package } from 'lucide-react';
import ProductCard from './ProductCard';
import type { Product } from '../backend';

interface FeaturedProductsProps {
  products: Product[];
  isLoading: boolean;
  isError: boolean;
  accentColor?: 'crimson' | 'golden' | 'pink';
}

const SkeletonCard: React.FC = () => (
  <div className="rounded-sm overflow-hidden animate-pulse" style={{ border: '1px solid oklch(0.75 0.18 75 / 0.25)' }}>
    <div className="h-1" style={{ background: 'oklch(0.75 0.18 75 / 0.4)' }} />
    <div style={{ aspectRatio: '3/4', background: 'oklch(0.94 0.03 55)' }} />
    <div className="p-4 space-y-3">
      <div className="h-5 rounded" style={{ background: 'oklch(0.88 0.04 55)', width: '70%' }} />
      <div className="h-4 rounded" style={{ background: 'oklch(0.93 0.02 55)', width: '90%' }} />
      <div className="h-4 rounded" style={{ background: 'oklch(0.93 0.02 55)', width: '60%' }} />
      <div className="flex justify-between items-center pt-2">
        <div className="h-6 rounded" style={{ background: 'oklch(0.88 0.04 55)', width: '40%' }} />
        <div className="h-8 rounded-sm" style={{ background: 'oklch(0.88 0.04 55)', width: '30%' }} />
      </div>
    </div>
  </div>
);

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ products, isLoading, isError, accentColor = 'crimson' }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-4">
        <AlertCircle size={48} style={{ color: 'oklch(0.45 0.22 18)' }} />
        <p className="font-heading text-xl" style={{ color: 'oklch(0.22 0.14 18)' }}>
          Unable to load products
        </p>
        <p className="font-body text-sm" style={{ color: 'oklch(0.45 0.05 30)' }}>
          Please try refreshing the page.
        </p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-4">
        <Package size={48} style={{ color: 'oklch(0.75 0.18 75)' }} />
        <p className="font-heading text-xl" style={{ color: 'oklch(0.22 0.14 18)' }}>
          Collection coming soon
        </p>
        <p className="font-body text-sm" style={{ color: 'oklch(0.45 0.05 30)' }}>
          Our beautiful collection will be available shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} accentColor={accentColor} />
      ))}
    </div>
  );
};

export default FeaturedProducts;
