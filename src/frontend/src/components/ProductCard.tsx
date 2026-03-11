import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Currency } from "@/hooks/useCurrency";
import { formatPrice } from "@/hooks/useCurrency";
import type { Product } from "@/lib/store";
import { Link } from "@tanstack/react-router";

type Props = {
  product: Product;
  currency: Currency;
  ocid?: string;
};

export default function ProductCard({ product, currency, ocid }: Props) {
  const detailPath = `/products/${product.id}` as "/products/$id";
  const displayImage = product.images?.[0] || product.imageUrl;

  return (
    <div
      data-ocid={ocid}
      className="product-card rounded-lg overflow-hidden flex flex-col"
    >
      <Link to={detailPath} params={{ id: product.id }} className="block">
        <div className="placeholder-img aspect-[4/3]">
          {displayImage ? (
            <img
              src={displayImage}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-4xl select-none">🪷</span>
          )}
        </div>
      </Link>

      <div className="p-4 flex flex-col flex-1">
        <Badge
          variant="secondary"
          className="self-start text-xs mb-2 bg-gold-pale text-gold border-0"
        >
          {product.category}
        </Badge>
        <Link to={detailPath} params={{ id: product.id }}>
          <h3 className="font-heading font-semibold text-[15px] leading-snug hover:text-gold transition-colors mb-1">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-muted-foreground line-clamp-2 flex-1 mb-3">
          {product.description}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <span className="font-semibold text-foreground text-base">
            {formatPrice(product.price, currency)}
          </span>
          <Button
            asChild
            size="sm"
            variant="outline"
            className="border-gold/40 text-gold hover:bg-gold-pale text-xs"
          >
            <Link to={detailPath} params={{ id: product.id }}>
              View Details
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
