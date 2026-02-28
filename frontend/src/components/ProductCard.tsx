import React from 'react';
import { Tag, IndianRupee } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Product } from '../backend';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const priceInRupees = Number(product.price);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 0,
    }).format(price);
  };

  const isValidImageUrl = (url: string) => {
    return url && url.startsWith('http') && !url.includes('example.com');
  };

  return (
    <div
      className="group relative flex flex-col overflow-hidden rounded-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-warm-lg"
      style={{
        background: 'oklch(var(--card))',
        border: '1px solid oklch(0.88 0.03 55)',
      }}
    >
      {/* Top accent line */}
      <div className="h-1 w-full" style={{
        background: 'linear-gradient(90deg, oklch(0.38 0.16 18), oklch(0.72 0.18 55), oklch(0.78 0.16 80))'
      }} />

      {/* Product Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '3/4', background: 'oklch(0.93 0.02 60)' }}>
        <img
          src={isValidImageUrl(product.imageUrl) ? product.imageUrl : '/assets/generated/product-placeholder.dim_600x700.png'}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/assets/generated/product-placeholder.dim_600x700.png';
          }}
        />

        {/* Availability badge */}
        {product.available && (
          <div className="absolute top-3 right-3">
            <Badge
              className="text-xs font-body font-bold tracking-wider uppercase px-2 py-1 rounded-sm"
              style={{
                background: 'linear-gradient(135deg, oklch(0.78 0.16 80), oklch(0.72 0.18 55))',
                color: 'oklch(0.18 0.04 30)',
                border: 'none',
              }}
            >
              In Stock
            </Badge>
          </div>
        )}

        {/* Category tag */}
        <div className="absolute bottom-3 left-3">
          <span
            className="flex items-center gap-1 text-xs font-body font-semibold tracking-wider uppercase px-2 py-1 rounded-sm"
            style={{
              background: 'oklch(0.38 0.16 18 / 0.85)',
              color: 'oklch(0.78 0.16 80)',
            }}
          >
            <Tag size={10} />
            {product.category}
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        <h3
          className="font-heading text-lg font-semibold leading-snug"
          style={{ color: 'oklch(0.18 0.04 30)' }}
        >
          {product.name}
        </h3>

        <p
          className="font-body text-sm leading-relaxed flex-1"
          style={{ color: 'oklch(0.45 0.04 30)' }}
        >
          {product.description}
        </p>

        {/* Price & Action */}
        <div className="flex items-center justify-between mt-3 pt-3" style={{ borderTop: '1px solid oklch(0.88 0.03 55)' }}>
          <div className="flex items-center gap-1">
            <IndianRupee size={16} style={{ color: 'oklch(0.38 0.16 18)' }} />
            <span
              className="font-heading text-xl font-bold"
              style={{ color: 'oklch(0.38 0.16 18)' }}
            >
              {formatPrice(priceInRupees)}
            </span>
          </div>

          <button
            className="px-4 py-2 text-xs font-body font-bold tracking-wider uppercase rounded-sm transition-all duration-200 hover:shadow-gold hover:-translate-y-0.5"
            style={{
              background: 'linear-gradient(135deg, oklch(0.78 0.16 80), oklch(0.72 0.18 55))',
              color: 'oklch(0.18 0.04 30)',
            }}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
