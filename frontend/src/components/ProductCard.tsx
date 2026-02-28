import React from 'react';
import { Tag, IndianRupee } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Product } from '../backend';

interface ProductCardProps {
  product: Product;
  accentColor?: 'peacock' | 'lotus';
}

const ProductCard: React.FC<ProductCardProps> = ({ product, accentColor = 'peacock' }) => {
  const priceInRupees = Number(product.price);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 0,
    }).format(price);
  };

  const isValidImageUrl = (url: string) => {
    return url && url.trim().length > 0 && !url.includes('example.com');
  };

  const isLotus = accentColor === 'lotus';

  const topGradient = isLotus
    ? 'linear-gradient(90deg, oklch(0.78 0.12 340), oklch(0.72 0.18 55), oklch(0.78 0.12 340))'
    : 'linear-gradient(90deg, oklch(0.32 0.09 240), oklch(0.78 0.16 80), oklch(0.72 0.18 55))';

  const categoryBg = isLotus
    ? 'oklch(0.78 0.12 340 / 0.85)'
    : 'oklch(0.18 0.06 240 / 0.85)';

  const categoryColor = isLotus
    ? 'oklch(0.18 0.04 30)'
    : 'oklch(0.78 0.16 80)';

  const priceColor = isLotus
    ? 'oklch(0.45 0.10 340)'
    : 'oklch(0.32 0.09 240)';

  const buttonBg = isLotus
    ? 'linear-gradient(135deg, oklch(0.78 0.12 340), oklch(0.72 0.18 55))'
    : 'linear-gradient(135deg, oklch(0.78 0.16 80), oklch(0.72 0.18 55))';

  return (
    <div
      className="group relative flex flex-col overflow-hidden rounded-sm transition-all duration-300 hover:-translate-y-1"
      style={{
        background: 'oklch(0.99 0.008 80)',
        border: `1px solid ${isLotus ? 'oklch(0.78 0.12 340 / 0.35)' : 'oklch(0.78 0.16 80 / 0.3)'}`,
        boxShadow: '0 2px 12px oklch(0.32 0.09 240 / 0.08)',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 32px oklch(0.32 0.09 240 / 0.18), 0 2px 8px oklch(0.78 0.16 80 / 0.2)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 12px oklch(0.32 0.09 240 / 0.08)';
      }}
    >
      {/* Top accent line */}
      <div className="h-1 w-full" style={{ background: topGradient }} />

      {/* Product Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '3/4', background: 'oklch(0.95 0.02 80)' }}>
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
                color: 'oklch(0.18 0.06 240)',
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
              background: categoryBg,
              color: categoryColor,
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
          className="font-heading text-base font-semibold leading-snug"
          style={{ color: 'oklch(0.22 0.07 240)' }}
        >
          {product.name}
        </h3>

        <p
          className="font-body text-sm leading-relaxed flex-1"
          style={{ color: 'oklch(0.45 0.04 260)' }}
        >
          {product.description}
        </p>

        {/* Price & Action */}
        <div className="flex items-center justify-between mt-3 pt-3" style={{ borderTop: `1px solid ${isLotus ? 'oklch(0.78 0.12 340 / 0.2)' : 'oklch(0.78 0.16 80 / 0.2)'}` }}>
          <div className="flex items-center gap-1">
            <IndianRupee size={15} style={{ color: priceColor }} />
            <span
              className="font-heading text-xl font-bold"
              style={{ color: priceColor }}
            >
              {formatPrice(priceInRupees)}
            </span>
          </div>

          <a
            href="https://www.instagram.com/divyavastra_?igsh=eGd4eTc2bGl4MzN1"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-xs font-body font-bold tracking-wider uppercase rounded-sm transition-all duration-200 hover:shadow-gold hover:-translate-y-0.5"
            style={{
              background: buttonBg,
              color: 'oklch(0.18 0.06 240)',
            }}
          >
            Order Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
